import csv
import io
import json
import os
import re
import secrets
import sqlite3
from datetime import datetime
from functools import wraps
from flask import Flask, jsonify, render_template, request, session
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.secret_key = (os.environ.get("SECRET_KEY") or "").strip() or secrets.token_hex(32)
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "scholars_cbt.db")
ADMIN_PIN = (os.environ.get("CBT_ADMIN_PIN") or "2026").strip()
VALID_CLASSES = {"JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"}
CLASS_ALIASES = {
    "SS 1": "SSS 1",
    "SS 2": "SSS 2",
    "SS 3": "SSS 3",
    "JSS1": "JSS 1",
    "JSS2": "JSS 2",
    "JSS3": "JSS 3",
    "SSS1": "SSS 1",
    "SSS2": "SSS 2",
    "SSS3": "SSS 3",
}


def examiner_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if not session.get("is_examiner"):
            return jsonify({"error": "Examiner authorization required."}), 403
        return fn(*args, **kwargs)

    return wrapper


def get_db_connection():
    conn = sqlite3.connect(DB_PATH, timeout=15)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    return conn


def ensure_column_exists(cursor, table_name, column_name, column_def):
    cursor.execute(f"PRAGMA table_info({table_name})")
    existing_cols = {row["name"] for row in cursor.fetchall()}
    if column_name not in existing_cols:
        cursor.execute(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_def}")


def normalize_key(value):
    return " ".join((value or "").strip().split()).lower()


def normalize_class_level(raw_val, default="JSS 3"):
    cleaned = " ".join(str(raw_val or "").strip().upper().split())
    if not cleaned:
        cleaned = default
    return CLASS_ALIASES.get(cleaned, cleaned)


def migrate_class_levels(cursor):
    for old_label, new_label in CLASS_ALIASES.items():
        cursor.execute(
            "UPDATE questions SET class_level = ? WHERE UPPER(TRIM(class_level)) = ?",
            (new_label, old_label),
        )
        cursor.execute(
            "UPDATE students SET class_level = ? WHERE UPPER(TRIM(class_level)) = ?",
            (new_label, old_label),
        )
        cursor.execute(
            "UPDATE exam_records SET class_level = ? WHERE UPPER(TRIM(class_level)) = ?",
            (new_label, old_label),
        )
        cursor.execute(
            "UPDATE study_notes SET class_level = ? WHERE UPPER(TRIM(class_level)) = ?",
            (new_label, old_label),
        )


def normalize_existing_student_keys(cursor):
    rows = cursor.execute("SELECT id, school_name, full_name, school_key, name_key FROM students").fetchall()
    for r in rows:
        expected_school_key = normalize_key(r["school_name"])
        expected_name_key = normalize_key(r["full_name"])
        if r["school_key"] != expected_school_key or r["name_key"] != expected_name_key:
            try:
                cursor.execute(
                    "UPDATE students SET school_key = ?, name_key = ? WHERE id = ?",
                    (expected_school_key, expected_name_key, r["id"]),
                )
            except sqlite3.IntegrityError:
                pass


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            school_name TEXT NOT NULL,
            school_key TEXT NOT NULL,
            class_level TEXT NOT NULL,
            full_name TEXT NOT NULL,
            name_key TEXT NOT NULL,
            pin_hash TEXT NOT NULL,
            avatar_data TEXT DEFAULT '',
            created_at TEXT NOT NULL,
            UNIQUE(school_key, class_level, name_key)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_level TEXT NOT NULL,
            subject TEXT NOT NULL,
            topic TEXT NOT NULL,
            exam_source TEXT DEFAULT 'WAEC/JAMB/NECO',
            prompt TEXT NOT NULL,
            diagram_svg TEXT,
            diagram_image TEXT,
            options_json TEXT NOT NULL,
            correct_index INTEGER NOT NULL,
            explanation TEXT,
            created_at TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS exam_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reg_number TEXT DEFAULT '',
            candidate_name TEXT NOT NULL,
            class_level TEXT NOT NULL,
            subjects_json TEXT NOT NULL,
            correct INTEGER NOT NULL,
            total INTEGER NOT NULL,
            percentage INTEGER NOT NULL,
            points_earned INTEGER NOT NULL,
            streak INTEGER NOT NULL,
            tab_warnings INTEGER DEFAULT 0,
            topic_stats_json TEXT DEFAULT '{}',
            question_ids_json TEXT DEFAULT '[]',
            date_label TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tournament_state (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            active_stage TEXT NOT NULL DEFAULT 'qualifiers',
            is_open INTEGER NOT NULL DEFAULT 0,
            cup_name TEXT NOT NULL DEFAULT 'Scholars Super Cup'
        )
    """)
    cursor.execute("""
        INSERT OR IGNORE INTO tournament_state (id, active_stage, is_open, cup_name)
        VALUES (1, 'qualifiers', 0, 'Scholars Super Cup')
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tournament_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER DEFAULT 0,
            division TEXT NOT NULL,
            stage TEXT NOT NULL DEFAULT 'qualifiers',
            tournament_title TEXT NOT NULL,
            student_name TEXT NOT NULL,
            school_name TEXT DEFAULT '',
            class_level TEXT NOT NULL,
            subjects_json TEXT NOT NULL,
            correct INTEGER NOT NULL,
            total INTEGER NOT NULL,
            percentage INTEGER NOT NULL,
            points_earned INTEGER NOT NULL,
            time_taken_seconds INTEGER DEFAULT 0,
            speed_bonus INTEGER DEFAULT 0,
            avatar_data TEXT DEFAULT '',
            date_label TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)

    # Dedicated Study Notes table (isolated from question banks & leaderboard)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS study_notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_level TEXT NOT NULL,
            subject TEXT NOT NULL,
            subject_key TEXT NOT NULL,
            topic TEXT NOT NULL,
            topic_key TEXT NOT NULL,
            note_content TEXT NOT NULL,
            video_url TEXT DEFAULT '',
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            UNIQUE(class_level, subject_key, topic_key)
        )
    """)

    # Lightweight Error / Typo Flags table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS error_flags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_type TEXT NOT NULL,
            item_id INTEGER NOT NULL,
            class_level TEXT DEFAULT '',
            subject TEXT DEFAULT '',
            topic TEXT DEFAULT '',
            reported_by TEXT DEFAULT 'Student',
            reason TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'open',
            created_at TEXT NOT NULL
        )
    """)

    # Isolated Custom Tournament tables (2-Class & 1-on-1)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS custom_tournaments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            mode TEXT NOT NULL,
            class_a TEXT DEFAULT '',
            class_b TEXT DEFAULT '',
            player_a_name TEXT DEFAULT '',
            player_b_name TEXT DEFAULT '',
            is_open INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS custom_tournament_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tournament_id INTEGER NOT NULL,
            student_id INTEGER NOT NULL,
            student_name TEXT NOT NULL,
            school_name TEXT DEFAULT '',
            class_level TEXT NOT NULL,
            subjects_json TEXT NOT NULL,
            correct INTEGER NOT NULL,
            total INTEGER NOT NULL,
            percentage INTEGER NOT NULL,
            points_earned INTEGER NOT NULL,
            time_taken_seconds INTEGER DEFAULT 0,
            speed_bonus INTEGER DEFAULT 0,
            avatar_data TEXT DEFAULT '',
            date_label TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY (tournament_id) REFERENCES custom_tournaments(id) ON DELETE CASCADE
        )
    """)

    ensure_column_exists(cursor, "students", "avatar_data", "TEXT DEFAULT ''")
    ensure_column_exists(cursor, "questions", "exam_source", "TEXT DEFAULT 'WAEC/JAMB/NECO'")
    ensure_column_exists(cursor, "exam_records", "reg_number", "TEXT DEFAULT ''")
    ensure_column_exists(cursor, "exam_records", "tab_warnings", "INTEGER DEFAULT 0")
    ensure_column_exists(cursor, "exam_records", "topic_stats_json", "TEXT DEFAULT '{}'")
    ensure_column_exists(cursor, "exam_records", "question_ids_json", "TEXT DEFAULT '[]'")
    ensure_column_exists(cursor, "tournament_state", "is_open", "INTEGER NOT NULL DEFAULT 0")
    ensure_column_exists(cursor, "tournament_entries", "student_id", "INTEGER DEFAULT 0")
    ensure_column_exists(cursor, "tournament_entries", "stage", "TEXT NOT NULL DEFAULT 'qualifiers'")
    ensure_column_exists(cursor, "tournament_entries", "time_taken_seconds", "INTEGER DEFAULT 0")
    ensure_column_exists(cursor, "tournament_entries", "speed_bonus", "INTEGER DEFAULT 0")
    ensure_column_exists(cursor, "tournament_entries", "avatar_data", "TEXT DEFAULT ''")
    migrate_class_levels(cursor)
    normalize_existing_student_keys(cursor)

    cursor.execute("SELECT COUNT(*) AS cnt FROM questions")
    if cursor.fetchone()["cnt"] == 0:
        starter_questions = [
            (
                "JSS 3",
                "Intermediate Science (Basic Science)",
                "Light Energy: Reflection, Refraction & Dispersion",
                "BECE / Junior WAEC",
                "In Intermediate Science, what happens to the speed of a ray of light when it moves from air into a denser glass medium?",
                """<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="150" fill="#FFFFFF"/><rect x="65" y="65" width="190" height="65" fill="#EFF6FF" stroke="#1E3A8A" stroke-width="2.5"/><line x1="85" y1="15" x2="160" y2="65" stroke="#D97706" stroke-width="3"/><line x1="160" y1="65" x2="195" y2="130" stroke="#059669" stroke-width="3"/><text x="76" y="88" fill="#1E3A8A" font-size="12" font-weight="bold">Glass</text></svg>""",
                None,
                json.dumps([
                    "It decreases and bends towards the normal",
                    "It increases and bends away from the normal",
                    "It stops completely",
                    "It remains unchanged in direction"
                ]),
                0,
                "Light travels slower in optically denser media like glass and bends toward the normal.",
                datetime.utcnow().isoformat()
            ),
            (
                "JSS 3",
                "Basic Technology",
                "Isometric, Oblique & Orthographic Projections",
                "BECE / Junior WAEC",
                "In Basic Technology technical drawing, what angle do the two receding axes make with the horizontal line in an isometric drawing?",
                None,
                None,
                json.dumps(["30°", "45°", "60°", "75°"]),
                0,
                "Isometric projection uses receding axes inclined at 30° to the horizontal.",
                datetime.utcnow().isoformat()
            ),
            (
                "SSS 1",
                "Physics",
                "Position, Distance, Displacement, Speed, Velocity & Acceleration",
                "WAEC",
                "A car accelerates uniformly from rest at 4 m/s² for 5 seconds. What is its velocity at the end of 5 seconds?",
                None,
                None,
                json.dumps(["9 m/s", "20 m/s", "1.25 m/s", "50 m/s"]),
                1,
                "Using v = u + at where u = 0, a = 4 m/s², and t = 5 s: v = 0 + (4 × 5) = 20 m/s.",
                datetime.utcnow().isoformat()
            ),
            (
                "SSS 1",
                "Government",
                "Constitutions, Rule of Law & Separation of Powers",
                "JAMB",
                "Which organ of government is primarily responsible for interpreting laws and adjudicating disputes?",
                None,
                None,
                json.dumps(["Executive", "Legislature", "Judiciary", "Electoral Commission"]),
                2,
                "The Judiciary interprets laws made by the legislature and settles legal disputes.",
                datetime.utcnow().isoformat()
            ),
            (
                "SSS 1",
                "Citizenship and Heritage Studies",
                "Nigerian Cultural Heritage, Historical Monuments & Preservation",
                "NECO",
                "Preserving cultural heritage and historical monuments in Citizenship and Heritage Studies promotes:",
                None,
                None,
                json.dumps([
                    "National identity and cultural continuity",
                    "Political apathy",
                    "Loss of indigenous languages",
                    "Violation of civic duties"
                ]),
                0,
                "Cultural preservation strengthens national identity, unity, and appreciation of heritage.",
                datetime.utcnow().isoformat()
            )
        ]
        cursor.executemany("""
            INSERT INTO questions (
                class_level, subject, topic, exam_source, prompt, diagram_svg, diagram_image,
                options_json, correct_index, explanation, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, starter_questions)

    conn.commit()
    conn.close()


init_db()


def row_to_question_dict(row):
    try:
        options = json.loads(row["options_json"])
    except Exception:
        options = ["Option A", "Option B", "Option C", "Option D"]
    return {
        "id": row["id"],
        "classLevel": row["class_level"],
        "subject": row["subject"],
        "topic": row["topic"],
        "examSource": row["exam_source"] or "WAEC/JAMB/NECO",
        "prompt": row["prompt"],
        "diagramSVG": row["diagram_svg"],
        "diagramImage": row["diagram_image"],
        "options": options,
        "correctIndex": int(row["correct_index"]),
        "explanation": row["explanation"] or ""
    }


def row_to_record_dict(row):
    try:
        subjects = json.loads(row["subjects_json"])
    except Exception:
        subjects = []
    try:
        topic_stats = json.loads(row["topic_stats_json"] or "{}")
    except Exception:
        topic_stats = {}
    try:
        question_ids = json.loads(row["question_ids_json"] or "[]")
    except Exception:
        question_ids = []
    return {
        "id": row["id"],
        "regNumber": row["reg_number"] or "",
        "candidateName": row["candidate_name"],
        "classLevel": row["class_level"],
        "subjects": subjects,
        "correct": row["correct"],
        "total": row["total"],
        "percentage": row["percentage"],
        "pointsEarned": row["points_earned"],
        "streak": row["streak"],
        "tabWarnings": row["tab_warnings"] or 0,
        "topicStats": topic_stats,
        "questionIds": question_ids,
        "date": row["date_label"]
    }


def row_to_tournament_dict(row):
    try:
        subjects = json.loads(row["subjects_json"])
    except Exception:
        subjects = []
    return {
        "id": row["id"],
        "studentId": row["student_id"] or 0,
        "division": row["division"],
        "stage": row["stage"] or "qualifiers",
        "tournamentTitle": row["tournament_title"],
        "studentName": row["student_name"],
        "schoolName": row["school_name"] or "",
        "classLevel": row["class_level"],
        "subjects": subjects,
        "correct": row["correct"],
        "total": row["total"],
        "percentage": row["percentage"],
        "pointsEarned": row["points_earned"],
        "timeTakenSeconds": row["time_taken_seconds"] or 0,
        "speedBonus": row["speed_bonus"] or 0,
        "avatarData": row["avatar_data"] or "",
        "date": row["date_label"]
    }


def row_to_study_note_dict(row):
    return {
        "id": row["id"],
        "classLevel": row["class_level"],
        "subject": row["subject"],
        "topic": row["topic"],
        "noteContent": row["note_content"],
        "videoUrl": row["video_url"] or "",
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
    }


def row_to_flag_dict(row):
    return {
        "id": row["id"],
        "itemType": row["item_type"],
        "itemId": row["item_id"],
        "classLevel": row["class_level"] or "",
        "subject": row["subject"] or "",
        "topic": row["topic"] or "",
        "reportedBy": row["reported_by"] or "Student",
        "reason": row["reason"],
        "status": row["status"],
        "createdAt": row["created_at"],
    }


def row_to_custom_entry_dict(row):
    try:
        subjects = json.loads(row["subjects_json"])
    except Exception:
        subjects = []
    return {
        "id": row["id"],
        "tournamentId": row["tournament_id"],
        "studentId": row["student_id"],
        "studentName": row["student_name"],
        "schoolName": row["school_name"] or "",
        "classLevel": row["class_level"],
        "subjects": subjects,
        "correct": row["correct"],
        "total": row["total"],
        "percentage": row["percentage"],
        "pointsEarned": row["points_earned"],
        "timeTakenSeconds": row["time_taken_seconds"] or 0,
        "speedBonus": row["speed_bonus"] or 0,
        "avatarData": row["avatar_data"] or "",
        "date": row["date_label"],
    }


def rank_tournament_key(entry):
    return (
        entry["pointsEarned"],
        entry["percentage"],
        entry["speedBonus"],
        -entry["timeTakenSeconds"],
        -entry["id"]
    )


def parse_correct_option(raw_val):
    cleaned = str(raw_val or "").strip().upper()
    mapping = {"A": 0, "B": 1, "C": 2, "D": 3, "0": 0, "1": 1, "2": 2, "3": 3}
    if cleaned in mapping:
        return mapping[cleaned]
    if cleaned.startswith("OPTION "):
        suffix = cleaned.replace("OPTION ", "").strip()
        if suffix in mapping:
            return mapping[suffix]
    return 0


def insert_questions_from_csv_text(cursor, raw_text, default_class="JSS 3", default_subject="", default_topic=""):
    reader = csv.DictReader(io.StringIO(raw_text))
    if not reader.fieldnames:
        return 0, 0, 0, "CSV is empty or missing headers."

    normalized_headers = {h.strip().lower(): h for h in reader.fieldnames if h}
    required_keys = ["prompt", "option_a", "option_b", "option_c", "option_d"]
    for key in required_keys:
        if key not in normalized_headers:
            return 0, 0, 0, f"Missing required CSV column: '{key}'"

    def get_col(row_dict, key, fallback=""):
        header_name = normalized_headers.get(key)
        val = str(row_dict.get(header_name, "") or "").strip() if header_name else ""
        return val if val else fallback

    existing_rows = cursor.execute(
        "SELECT class_level, subject, prompt FROM questions"
    ).fetchall()
    existing_keys = {
        (
            normalize_class_level(r["class_level"]),
            normalize_key(r["subject"]),
            normalize_key(r["prompt"]),
        )
        for r in existing_rows
    }

    inserted_count = 0
    duplicate_count = 0
    skipped_count = 0
    now_iso = datetime.utcnow().isoformat()

    for row_dict in reader:
        prompt = get_col(row_dict, "prompt")
        subject = get_col(row_dict, "subject", default_subject)
        if not prompt or not subject:
            skipped_count += 1
            continue

        class_level = normalize_class_level(get_col(row_dict, "class_level", default_class), default=default_class)
        topic = get_col(row_dict, "topic", default_topic or "General Syllabus Topic") or "General Syllabus Topic"
        exam_source = get_col(row_dict, "exam_source", "WAEC/JAMB/NECO") or "WAEC/JAMB/NECO"
        diagram_svg = get_col(row_dict, "diagram_svg", "") or None
        opts = [
            get_col(row_dict, "option_a"),
            get_col(row_dict, "option_b"),
            get_col(row_dict, "option_c"),
            get_col(row_dict, "option_d")
        ]
        if not all(opts):
            skipped_count += 1
            continue

        dedup_key = (class_level, normalize_key(subject), normalize_key(prompt))
        if dedup_key in existing_keys:
            duplicate_count += 1
            continue

        correct_idx = parse_correct_option(get_col(row_dict, "correct_option", "A"))
        explanation = get_col(row_dict, "explanation", "")

        cursor.execute("""
            INSERT INTO questions (
                class_level, subject, topic, exam_source, prompt, diagram_svg, diagram_image,
                options_json, correct_index, explanation, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            class_level,
            subject,
            topic,
            exam_source,
            prompt,
            diagram_svg,
            None,
            json.dumps(opts),
            correct_idx,
            explanation,
            now_iso
        ))
        existing_keys.add(dedup_key)
        inserted_count += 1

    return inserted_count, duplicate_count, skipped_count, None


@app.route("/")
def index():
    return render_template("index.html")


# =========================================================
# STUDENT AUTHENTICATION (CASE-INSENSITIVE NAME, STRICT PIN)
# =========================================================

@app.route("/api/register", methods=["POST"])
def api_register():
    data = request.get_json(silent=True) or {}
    school_name = " ".join(str(data.get("school_name", "")).strip().split())
    class_level = normalize_class_level(data.get("class_level", ""), default="")
    full_name = " ".join(str(data.get("full_name", "")).strip().split())
    pin = str(data.get("pin", "")).strip()
    avatar_data = str(data.get("avatar_data", "")).strip()

    if not school_name or not full_name:
        return jsonify({"ok": False, "error": "School name and full name are required."}), 400
    if class_level not in VALID_CLASSES:
        return jsonify({"ok": False, "error": "Select a valid class level (JSS 1 – SSS 3)."}), 400
    if not re.fullmatch(r"\d{4}", pin):
        return jsonify({"ok": False, "error": "PIN must be exactly 4 digits."}), 400

    school_key = normalize_key(school_name)
    name_key = normalize_key(full_name)
    pin_hash = generate_password_hash(pin)

    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO students (
                school_name, school_key, class_level, full_name, name_key, pin_hash, avatar_data, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (school_name, school_key, class_level, full_name, name_key, pin_hash, avatar_data, datetime.utcnow().isoformat()))
        new_id = cursor.lastrowid
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({"ok": False, "error": "A student with this name is already registered in this class."}), 400

    conn.close()
    return jsonify({
        "ok": True,
        "student": {
            "id": new_id,
            "school_name": school_name,
            "class_level": class_level,
            "full_name": full_name,
            "avatar_data": avatar_data
        }
    }), 201


@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json(silent=True) or {}
    school_key = normalize_key(data.get("school_name", ""))
    class_level = normalize_class_level(data.get("class_level", ""), default="")
    name_key = normalize_key(data.get("full_name", ""))
    pin = str(data.get("pin", "")).strip()

    if not school_key or not name_key or class_level not in VALID_CLASSES or not re.fullmatch(r"\d{4}", pin):
        return jsonify({"ok": False, "error": "Enter your school name, class, full name, and 4-digit PIN."}), 400

    conn = get_db_connection()
    student = conn.execute("""
        SELECT id, school_name, class_level, full_name, pin_hash, avatar_data
        FROM students
        WHERE LOWER(TRIM(school_key)) = ? AND UPPER(TRIM(class_level)) = ? AND LOWER(TRIM(name_key)) = ?
    """, (school_key, class_level, name_key)).fetchone()
    conn.close()

    if not student:
        return jsonify({"ok": False, "error": "No matching profile found. Check your name spelling, school, and class."}), 401

    if not check_password_hash(student["pin_hash"], pin):
        return jsonify({"ok": False, "error": "Incorrect 4-digit PIN."}), 401

    return jsonify({
        "ok": True,
        "student": {
            "id": student["id"],
            "school_name": student["school_name"],
            "class_level": student["class_level"],
            "full_name": student["full_name"],
            "avatar_data": student["avatar_data"] or ""
        }
    }), 200


@app.route("/api/student/avatar", methods=["POST"])
def api_update_student_avatar():
    data = request.get_json(silent=True) or {}
    student_id = data.get("student_id")
    avatar_data = str(data.get("avatar_data", "")).strip()
    if not student_id:
        return jsonify({"ok": False, "error": "Student ID required."}), 400

    conn = get_db_connection()
    conn.execute("UPDATE students SET avatar_data = ? WHERE id = ?", (avatar_data, int(student_id)))
    conn.execute("UPDATE tournament_entries SET avatar_data = ? WHERE student_id = ?", (avatar_data, int(student_id)))
    conn.execute("UPDATE custom_tournament_entries SET avatar_data = ? WHERE student_id = ?", (avatar_data, int(student_id)))
    conn.commit()
    conn.close()
    return jsonify({"ok": True, "avatar_data": avatar_data})


@app.route("/api/logout", methods=["POST"])
def api_logout():
    session.pop("is_examiner", None)
    return jsonify({"ok": True})


@app.route("/api/verify-pin", methods=["POST"])
def api_verify_pin():
    data = request.get_json(silent=True) or {}
    entered = str(data.get("pin", "")).strip()
    is_valid = bool(entered) and entered == ADMIN_PIN
    if is_valid:
        session["is_examiner"] = True
        return jsonify({"valid": True}), 200
    session.pop("is_examiner", None)
    return jsonify({"valid": False, "error": "Invalid examiner passcode."}), 401


# =========================================================
# QUESTIONS API (100% DATABASE-BACKED + SMART FILTERING)
# =========================================================

@app.route("/api/questions/counts", methods=["GET"])
def api_get_question_counts():
    conn = get_db_connection()
    rows = conn.execute(
        "SELECT class_level, subject, COUNT(*) AS cnt FROM questions GROUP BY class_level, subject"
    ).fetchall()
    conn.close()
    counts = {}
    total = 0
    for r in rows:
        key = f"{normalize_class_level(r['class_level'])}__{r['subject'].strip()}"
        counts[key] = counts.get(key, 0) + int(r["cnt"])
        total += int(r["cnt"])
    return jsonify({"total": total, "bySubject": counts})


@app.route("/api/questions", methods=["GET"])
def api_get_questions():
    class_level = request.args.get("class_level", "").strip()
    subjects_param = request.args.get("subjects", "").strip()
    subject_single = request.args.get("subject", "").strip()
    topic_param = request.args.get("topic", "").strip()

    conn = get_db_connection()
    query = "SELECT * FROM questions WHERE 1=1"
    params = []

    if class_level:
        norm_cls = normalize_class_level(class_level, default=class_level)
        query += " AND UPPER(TRIM(class_level)) = ?"
        params.append(norm_cls)

    if subjects_param:
        sub_keys = [normalize_key(s) for s in subjects_param.split("||") if s.strip()]
        if sub_keys:
            placeholders = ",".join("?" for _ in sub_keys)
            query += f" AND LOWER(TRIM(subject)) IN ({placeholders})"
            params.extend(sub_keys)
        else:
            conn.close()
            return jsonify([])
    elif subject_single:
        query += " AND LOWER(TRIM(subject)) = ?"
        params.append(normalize_key(subject_single))

    if topic_param:
        query += " AND LOWER(TRIM(topic)) = ?"
        params.append(normalize_key(topic_param))

    query += " ORDER BY id ASC"
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return jsonify([row_to_question_dict(r) for r in rows])


@app.route("/api/questions", methods=["POST"])
@examiner_required
def api_add_question():
    data = request.get_json(silent=True) or {}
    options = data.get("options") or []
    if len(options) < 4:
        return jsonify({"error": "All 4 options (A–D) are required."}), 400

    class_level = normalize_class_level(data.get("classLevel", "JSS 3"), default="JSS 3")
    subject = str(data.get("subject", "")).strip()
    prompt = str(data.get("prompt", "")).strip()

    conn = get_db_connection()
    cursor = conn.cursor()
    dup = cursor.execute("""
        SELECT id FROM questions
        WHERE UPPER(TRIM(class_level)) = ? AND LOWER(TRIM(subject)) = ? AND LOWER(TRIM(prompt)) = ?
    """, (class_level, normalize_key(subject), normalize_key(prompt))).fetchone()

    if dup:
        conn.close()
        return jsonify({"error": "Duplicate question: this prompt already exists in this class and subject."}), 409

    cursor.execute("""
        INSERT INTO questions (
            class_level, subject, topic, exam_source, prompt, diagram_svg, diagram_image,
            options_json, correct_index, explanation, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        class_level,
        subject,
        str(data.get("topic", "General Topic")).strip(),
        str(data.get("examSource", "WAEC/JAMB/NECO")).strip() or "WAEC/JAMB/NECO",
        prompt,
        data.get("diagramSVG") or None,
        data.get("diagramImage") or None,
        json.dumps([str(o).strip() for o in options[:4]]),
        int(data.get("correctIndex", 0)),
        str(data.get("explanation", "")).strip(),
        datetime.utcnow().isoformat()
    ))
    new_id = cursor.lastrowid
    conn.commit()
    row = conn.execute("SELECT * FROM questions WHERE id = ?", (new_id,)).fetchone()
    conn.close()
    return jsonify(row_to_question_dict(row)), 201


@app.route("/api/questions/bulk-csv", methods=["POST"])
@examiner_required
def api_bulk_csv_questions():
    if "file" not in request.files:
        return jsonify({"error": "No CSV file uploaded."}), 400

    uploaded_file = request.files["file"]
    try:
        raw_text = uploaded_file.read().decode("utf-8-sig")
    except UnicodeDecodeError:
        uploaded_file.seek(0)
        raw_text = uploaded_file.read().decode("latin-1")

    conn = get_db_connection()
    cursor = conn.cursor()
    inserted_count, duplicate_count, skipped_count, err_msg = insert_questions_from_csv_text(cursor, raw_text)

    if err_msg:
        conn.close()
        return jsonify({"error": err_msg}), 400

    conn.commit()
    rows = conn.execute("SELECT * FROM questions ORDER BY id ASC").fetchall()
    conn.close()

    if inserted_count == 0 and duplicate_count == 0:
        return jsonify({"error": "No valid rows found in CSV."}), 400

    return jsonify({
        "inserted": inserted_count,
        "duplicates": duplicate_count,
        "skipped": skipped_count,
        "questions": [row_to_question_dict(r) for r in rows]
    }), 201


@app.route("/api/questions/<int:q_id>", methods=["DELETE"])
@examiner_required
def api_delete_question(q_id):
    conn = get_db_connection()
    conn.execute("DELETE FROM questions WHERE id = ?", (q_id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "deleted", "id": q_id})


@app.route("/api/questions/import", methods=["POST"])
@examiner_required
def api_import_questions():
    items = request.get_json(silent=True)
    if not isinstance(items, list):
        return jsonify({"error": "Expected a JSON list of questions."}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM questions")
    now_iso = datetime.utcnow().isoformat()

    for q in items:
        opts = q.get("options") or ["Option A", "Option B", "Option C", "Option D"]
        cursor.execute("""
            INSERT INTO questions (
                class_level, subject, topic, exam_source, prompt, diagram_svg, diagram_image,
                options_json, correct_index, explanation, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            normalize_class_level(q.get("classLevel", "JSS 3"), default="JSS 3"),
            str(q.get("subject", "")).strip(),
            str(q.get("topic", "General Topic")).strip(),
            str(q.get("examSource", "WAEC/JAMB/NECO")).strip() or "WAEC/JAMB/NECO",
            str(q.get("prompt", "")).strip(),
            q.get("diagramSVG"),
            q.get("diagramImage"),
            json.dumps([str(o) for o in opts[:4]]),
            int(q.get("correctIndex", 0)),
            str(q.get("explanation", "")).strip(),
            now_iso
        ))

    conn.commit()
    rows = conn.execute("SELECT * FROM questions ORDER BY id ASC").fetchall()
    conn.close()
    return jsonify([row_to_question_dict(r) for r in rows])


# =========================================================
# STUDY NOTES & BUNDLED TOPIC+QUESTIONS API
# =========================================================

@app.route("/api/study-notes", methods=["GET"])
def api_get_study_notes():
    class_level = request.args.get("class_level", "").strip()
    subject = request.args.get("subject", "").strip()
    topic = request.args.get("topic", "").strip()

    conn = get_db_connection()
    query = "SELECT * FROM study_notes WHERE 1=1"
    params = []

    if class_level:
        query += " AND UPPER(TRIM(class_level)) = ?"
        params.append(normalize_class_level(class_level, default=class_level))
    if subject:
        query += " AND subject_key = ?"
        params.append(normalize_key(subject))
    if topic:
        query += " AND topic_key = ?"
        params.append(normalize_key(topic))

    query += " ORDER BY class_level ASC, subject ASC, topic ASC"
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return jsonify([row_to_study_note_dict(r) for r in rows])


@app.route("/api/study-notes", methods=["POST"])
@examiner_required
def api_save_study_note():
    data = request.get_json(silent=True) or {}
    class_level = normalize_class_level(data.get("classLevel", "JSS 3"), default="JSS 3")
    subject = str(data.get("subject", "")).strip()
    topic = str(data.get("topic", "")).strip()
    note_content = str(data.get("noteContent", "")).strip()
    video_url = str(data.get("videoUrl", "")).strip()

    if not subject or not topic or not note_content:
        return jsonify({"error": "Subject, topic, and study note content are required."}), 400

    subject_key = normalize_key(subject)
    topic_key = normalize_key(topic)
    now_iso = datetime.utcnow().isoformat()

    conn = get_db_connection()
    cursor = conn.cursor()
    existing = cursor.execute("""
        SELECT id FROM study_notes
        WHERE class_level = ? AND subject_key = ? AND topic_key = ?
    """, (class_level, subject_key, topic_key)).fetchone()

    if existing:
        cursor.execute("""
            UPDATE study_notes
            SET subject = ?, topic = ?, note_content = ?, video_url = ?, updated_at = ?
            WHERE id = ?
        """, (subject, topic, note_content, video_url, now_iso, existing["id"]))
        note_id = existing["id"]
    else:
        cursor.execute("""
            INSERT INTO study_notes (
                class_level, subject, subject_key, topic, topic_key, note_content, video_url, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (class_level, subject, subject_key, topic, topic_key, note_content, video_url, now_iso, now_iso))
        note_id = cursor.lastrowid

    conn.commit()
    row = conn.execute("SELECT * FROM study_notes WHERE id = ?", (note_id,)).fetchone()
    conn.close()
    return jsonify(row_to_study_note_dict(row)), 201


@app.route("/api/study-notes/bundle", methods=["POST"])
@examiner_required
def api_save_study_bundle():
    data = request.get_json(silent=True) or {}
    class_level = normalize_class_level(data.get("classLevel", "JSS 3"), default="JSS 3")
    subject = str(data.get("subject", "")).strip()
    topic = str(data.get("topic", "")).strip()
    note_content = str(data.get("noteContent", "")).strip()
    video_url = str(data.get("videoUrl", "")).strip()
    questions_csv = str(data.get("questionsCsv", "")).strip()

    if not subject or not topic or not note_content:
        return jsonify({"error": "Class, subject, topic, and study note content are required."}), 400

    subject_key = normalize_key(subject)
    topic_key = normalize_key(topic)
    now_iso = datetime.utcnow().isoformat()

    conn = get_db_connection()
    cursor = conn.cursor()

    existing = cursor.execute("""
        SELECT id FROM study_notes
        WHERE class_level = ? AND subject_key = ? AND topic_key = ?
    """, (class_level, subject_key, topic_key)).fetchone()

    if existing:
        cursor.execute("""
            UPDATE study_notes
            SET subject = ?, topic = ?, note_content = ?, video_url = ?, updated_at = ?
            WHERE id = ?
        """, (subject, topic, note_content, video_url, now_iso, existing["id"]))
        note_id = existing["id"]
    else:
        cursor.execute("""
            INSERT INTO study_notes (
                class_level, subject, subject_key, topic, topic_key, note_content, video_url, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (class_level, subject, subject_key, topic, topic_key, note_content, video_url, now_iso, now_iso))
        note_id = cursor.lastrowid

    inserted = 0
    duplicates = 0
    skipped = 0
    if questions_csv:
        inserted, duplicates, skipped, err_msg = insert_questions_from_csv_text(
            cursor, questions_csv, default_class=class_level, default_subject=subject, default_topic=topic
        )
        if err_msg:
            conn.rollback()
            conn.close()
            return jsonify({"error": f"Note not saved — Question CSV error: {err_msg}"}), 400

    conn.commit()
    note_row = conn.execute("SELECT * FROM study_notes WHERE id = ?", (note_id,)).fetchone()
    conn.close()

    return jsonify({
        "ok": True,
        "note": row_to_study_note_dict(note_row),
        "inserted": inserted,
        "duplicates": duplicates,
        "skipped": skipped
    }), 201


@app.route("/api/study-notes/<int:note_id>", methods=["DELETE"])
@examiner_required
def api_delete_study_note(note_id):
    conn = get_db_connection()
    conn.execute("DELETE FROM study_notes WHERE id = ?", (note_id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "deleted", "id": note_id})


# =========================================================
# LIGHTWEIGHT ERROR / TYPO FLAGS API
# =========================================================

@app.route("/api/flags", methods=["POST"])
def api_create_flag():
    data = request.get_json(silent=True) or {}
    item_type = str(data.get("itemType", "question")).strip().lower()
    if item_type not in {"question", "note"}:
        item_type = "question"
    item_id = int(data.get("itemId") or 0)
    reason = str(data.get("reason", "")).strip()
    if not reason:
        return jsonify({"error": "Please briefly describe the typo or error."}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO error_flags (
            item_type, item_id, class_level, subject, topic, reported_by, reason, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'open', ?)
    """, (
        item_type,
        item_id,
        normalize_class_level(data.get("classLevel", ""), default=""),
        str(data.get("subject", "")).strip(),
        str(data.get("topic", "")).strip(),
        str(data.get("reportedBy", "Student")).strip() or "Student",
        reason,
        datetime.utcnow().isoformat()
    ))
    new_id = cursor.lastrowid
    conn.commit()
    row = conn.execute("SELECT * FROM error_flags WHERE id = ?", (new_id,)).fetchone()
    conn.close()
    return jsonify({"ok": True, "flag": row_to_flag_dict(row)}), 201


@app.route("/api/flags", methods=["GET"])
@examiner_required
def api_get_flags():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM error_flags ORDER BY CASE WHEN status='open' THEN 0 ELSE 1 END, id DESC").fetchall()
    conn.close()
    return jsonify([row_to_flag_dict(r) for r in rows])


@app.route("/api/flags/<int:flag_id>/resolve", methods=["POST"])
@examiner_required
def api_resolve_flag(flag_id):
    conn = get_db_connection()
    conn.execute("UPDATE error_flags SET status = 'resolved' WHERE id = ?", (flag_id,))
    conn.commit()
    conn.close()
    return jsonify({"ok": True, "id": flag_id})


# =========================================================
# EXAM RECORDS & LEADERBOARD (100% PRESERVED — ZERO REGRESSION)
# =========================================================

@app.route("/api/records", methods=["GET"])
def api_get_records():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM exam_records ORDER BY id ASC").fetchall()
    conn.close()
    return jsonify([row_to_record_dict(r) for r in rows])


@app.route("/api/records", methods=["POST"])
def api_save_record():
    data = request.get_json(silent=True) or {}
    reg_number = str(data.get("regNumber", "")).strip()
    candidate_name = str(data.get("candidateName", "Candidate")).strip() or "Candidate"
    class_level = normalize_class_level(data.get("classLevel", "JSS 3"), default="JSS 3")
    subjects = data.get("subjects") or []
    correct = int(data.get("correct", 0))
    total = int(data.get("total", 0))
    percentage = int(data.get("percentage", 0))
    points_earned = int(data.get("pointsEarned", 0))
    tab_warnings = int(data.get("tabWarnings", 0))
    topic_stats = data.get("topicStats") or {}
    question_ids = data.get("questionIds") or []
    date_label = datetime.now().strftime("%d %b %Y")

    conn = get_db_connection()
    cursor = conn.cursor()

    if reg_number:
        prior_rows = cursor.execute(
            "SELECT percentage FROM exam_records WHERE LOWER(reg_number) = LOWER(?) ORDER BY id ASC",
            (reg_number,)
        ).fetchall()
    else:
        prior_rows = cursor.execute(
            "SELECT percentage FROM exam_records WHERE LOWER(candidate_name) = LOWER(?) AND class_level = ? ORDER BY id ASC",
            (candidate_name, class_level)
        ).fetchall()

    streak = 0
    for r in reversed(prior_rows):
        if r["percentage"] >= 50:
            streak += 1
        else:
            break
    streak = (streak + 1) if percentage >= 50 else 0

    cursor.execute("""
        INSERT INTO exam_records (
            reg_number, candidate_name, class_level, subjects_json, correct, total,
            percentage, points_earned, streak, tab_warnings, topic_stats_json,
            question_ids_json, date_label, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        reg_number,
        candidate_name,
        class_level,
        json.dumps(subjects),
        correct,
        total,
        percentage,
        points_earned,
        streak,
        tab_warnings,
        json.dumps(topic_stats),
        json.dumps(question_ids),
        date_label,
        datetime.utcnow().isoformat()
    ))
    new_id = cursor.lastrowid
    conn.commit()
    row = conn.execute("SELECT * FROM exam_records WHERE id = ?", (new_id,)).fetchone()
    conn.close()
    return jsonify(row_to_record_dict(row)), 201


@app.route("/api/records/sync", methods=["POST"])
def api_sync_local_records():
    items = request.get_json(silent=True)
    if not isinstance(items, list):
        return jsonify({"synced": 0}), 200

    conn = get_db_connection()
    cursor = conn.cursor()
    synced = 0

    for data in items:
        candidate_name = " ".join(str(data.get("candidateName", "")).strip().split())
        if not candidate_name:
            continue
        class_level = normalize_class_level(data.get("classLevel", "JSS 3"), default="JSS 3")
        reg_number = str(data.get("regNumber", "")).strip()
        subjects = data.get("subjects") or []
        correct = int(data.get("correct", 0))
        total = int(data.get("total", 0))
        percentage = int(data.get("percentage", 0))
        points_earned = int(data.get("pointsEarned", 0))
        streak = int(data.get("streak", 0))
        tab_warnings = int(data.get("tabWarnings", 0))
        topic_stats = data.get("topicStats") or {}
        question_ids = data.get("questionIds") or []
        date_label = str(data.get("date", "")).strip() or datetime.now().strftime("%d %b %Y")
        subjects_json = json.dumps(subjects)

        exists = cursor.execute("""
            SELECT id FROM exam_records
            WHERE LOWER(TRIM(candidate_name)) = LOWER(?) AND class_level = ?
              AND subjects_json = ? AND correct = ? AND total = ? AND date_label = ?
        """, (candidate_name, class_level, subjects_json, correct, total, date_label)).fetchone()

        if not exists:
            cursor.execute("""
                INSERT INTO exam_records (
                    reg_number, candidate_name, class_level, subjects_json, correct, total,
                    percentage, points_earned, streak, tab_warnings, topic_stats_json,
                    question_ids_json, date_label, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                reg_number, candidate_name, class_level, subjects_json, correct, total,
                percentage, points_earned, streak, tab_warnings, json.dumps(topic_stats),
                json.dumps(question_ids), date_label, datetime.utcnow().isoformat()
            ))
            synced += 1

    conn.commit()
    conn.close()
    return jsonify({"synced": synced}), 200


@app.route("/api/records", methods=["DELETE"])
@examiner_required
def api_clear_records():
    conn = get_db_connection()
    conn.execute("DELETE FROM exam_records")
    conn.commit()
    conn.close()
    return jsonify({"status": "cleared"})


# =========================================================
# ALL-CLASS WORLD CUP TOURNAMENT (100% PRESERVED)
# =========================================================

@app.route("/api/tournaments", methods=["GET"])
def api_get_tournaments():
    conn = get_db_connection()
    rows = conn.execute(
        "SELECT * FROM tournament_entries ORDER BY points_earned DESC, percentage DESC, speed_bonus DESC, id ASC"
    ).fetchall()
    conn.close()
    return jsonify([row_to_tournament_dict(r) for r in rows])


@app.route("/api/tournaments/bracket", methods=["GET"])
def api_get_tournament_bracket():
    conn = get_db_connection()
    state_row = conn.execute("SELECT active_stage, is_open, cup_name FROM tournament_state WHERE id = 1").fetchone()
    rows = conn.execute("SELECT * FROM tournament_entries ORDER BY id ASC").fetchall()
    conn.close()

    active_stage = state_row["active_stage"] if state_row else "qualifiers"
    is_open = bool(state_row["is_open"]) if state_row else False
    cup_name = state_row["cup_name"] if state_row else "Scholars Super Cup"
    entries = [row_to_tournament_dict(r) for r in rows]

    class_list = ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"]
    reps = {}
    for cls in class_list:
        cls_entries = [e for e in entries if e["stage"] == "qualifiers" and e["classLevel"] == cls]
        reps[cls] = max(cls_entries, key=rank_tournament_key) if cls_entries else None

    jss_playoffs = sorted(
        [e for e in entries if e["stage"] == "playoffs" and e["division"] == "JSS"],
        key=rank_tournament_key,
        reverse=True
    )
    sss_playoffs = sorted(
        [e for e in entries if e["stage"] == "playoffs" and e["division"] == "SSS"],
        key=rank_tournament_key,
        reverse=True
    )
    junior_champion = jss_playoffs[0] if jss_playoffs else None
    senior_champion = sss_playoffs[0] if sss_playoffs else None

    finale_entries = sorted(
        [e for e in entries if e["stage"] == "finale"],
        key=rank_tournament_key,
        reverse=True
    )
    overall_champion = finale_entries[0] if finale_entries else None

    return jsonify({
        "isOpen": is_open,
        "activeStage": active_stage,
        "cupName": cup_name,
        "reps": reps,
        "playoffs": {
            "JSS": jss_playoffs,
            "SSS": sss_playoffs
        },
        "juniorChampion": junior_champion,
        "seniorChampion": senior_champion,
        "finale": finale_entries,
        "overallChampion": overall_champion,
        "entries": sorted(entries, key=rank_tournament_key, reverse=True)
    })


@app.route("/api/tournaments/control", methods=["POST"])
@examiner_required
def api_control_tournament():
    data = request.get_json(silent=True) or {}
    conn = get_db_connection()
    current = conn.execute("SELECT active_stage, is_open, cup_name FROM tournament_state WHERE id = 1").fetchone()

    new_stage = str(data.get("stage", current["active_stage"] if current else "qualifiers")).strip().lower()
    if new_stage not in {"qualifiers", "playoffs", "finale"}:
        conn.close()
        return jsonify({"error": "Invalid stage. Choose qualifiers, playoffs, or finale."}), 400

    is_open = int(bool(data.get("isOpen", bool(current["is_open"]) if current else False)))
    cup_name = str(data.get("cupName", current["cup_name"] if current else "Scholars Super Cup")).strip() or "Scholars Super Cup"

    conn.execute(
        "UPDATE tournament_state SET active_stage = ?, is_open = ?, cup_name = ? WHERE id = 1",
        (new_stage, is_open, cup_name)
    )
    conn.commit()
    conn.close()
    return jsonify({"ok": True, "activeStage": new_stage, "isOpen": bool(is_open), "cupName": cup_name})


@app.route("/api/tournaments", methods=["POST"])
def api_save_tournament_entry():
    data = request.get_json(silent=True) or {}
    conn = get_db_connection()
    state_row = conn.execute("SELECT active_stage, is_open, cup_name FROM tournament_state WHERE id = 1").fetchone()

    if not state_row or not state_row["is_open"]:
        conn.close()
        return jsonify({"error": "Tournament round is currently closed. Wait for the Examiner to open it."}), 403

    active_stage = state_row["active_stage"]
    student_id = int(data.get("studentId") or 0)
    student = None
    if student_id:
        student = conn.execute(
            "SELECT id, full_name, school_name, class_level, avatar_data FROM students WHERE id = ?",
            (student_id,)
        ).fetchone()
    else:
        name_key = normalize_key(data.get("studentName", ""))
        class_level = normalize_class_level(data.get("classLevel", ""), default="")
        if name_key and class_level:
            student = conn.execute(
                "SELECT id, full_name, school_name, class_level, avatar_data FROM students WHERE name_key = ? AND class_level = ?",
                (name_key, class_level)
            ).fetchone()

    if not student:
        conn.close()
        return jsonify({"error": "Only registered platform members can participate in the tournament."}), 403

    existing = conn.execute(
        "SELECT id FROM tournament_entries WHERE student_id = ? AND stage = ?",
        (student["id"], active_stage)
    ).fetchone()
    if existing:
        conn.close()
        return jsonify({"error": f"You have already completed the {active_stage} round."}), 400

    class_level = student["class_level"]
    division = "SSS" if class_level.startswith("SSS") else "JSS"
    tournament_title = state_row["cup_name"] or "Scholars Super Cup"
    subjects = data.get("subjects") or []
    correct = int(data.get("correct", 0))
    total = int(data.get("total", 0))
    percentage = int(data.get("percentage", 0))
    points_earned = int(data.get("pointsEarned", 0))
    time_taken_seconds = max(0, int(data.get("timeTakenSeconds", 0)))
    speed_bonus = max(0, int(data.get("speedBonus", 0)))
    date_label = datetime.now().strftime("%d %b %Y")

    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO tournament_entries (
            student_id, division, stage, tournament_title, student_name, school_name, class_level,
            subjects_json, correct, total, percentage, points_earned,
            time_taken_seconds, speed_bonus, avatar_data, date_label, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        student["id"],
        division,
        active_stage,
        tournament_title,
        student["full_name"],
        student["school_name"],
        class_level,
        json.dumps(subjects),
        correct,
        total,
        percentage,
        points_earned,
        time_taken_seconds,
        speed_bonus,
        student["avatar_data"] or "",
        date_label,
        datetime.utcnow().isoformat()
    ))
    new_id = cursor.lastrowid
    conn.commit()
    row = conn.execute("SELECT * FROM tournament_entries WHERE id = ?", (new_id,)).fetchone()
    conn.close()
    return jsonify(row_to_tournament_dict(row)), 201


@app.route("/api/tournaments", methods=["DELETE"])
@examiner_required
def api_clear_tournaments():
    conn = get_db_connection()
    conn.execute("DELETE FROM tournament_entries")
    conn.execute("UPDATE tournament_state SET active_stage = 'qualifiers', is_open = 0 WHERE id = 1")
    conn.commit()
    conn.close()
    return jsonify({"status": "cleared", "activeStage": "qualifiers", "isOpen": False})


# =========================================================
# CUSTOM TOURNAMENTS API (TWO-CLASS & 1-ON-1 HEAD-TO-HEAD)
# =========================================================

@app.route("/api/custom-tournaments", methods=["GET"])
def api_get_custom_tournaments():
    conn = get_db_connection()
    t_rows = conn.execute("SELECT * FROM custom_tournaments ORDER BY id DESC").fetchall()
    e_rows = conn.execute("SELECT * FROM custom_tournament_entries ORDER BY id ASC").fetchall()
    conn.close()

    entries_by_t = {}
    for r in e_rows:
        item = row_to_custom_entry_dict(r)
        entries_by_t.setdefault(item["tournamentId"], []).append(item)

    result = []
    for t in t_rows:
        t_entries = sorted(
            entries_by_t.get(t["id"], []),
            key=rank_tournament_key,
            reverse=True
        )
        winner = t_entries[0] if t_entries else None
        result.append({
            "id": t["id"],
            "title": t["title"],
            "mode": t["mode"],
            "classA": t["class_a"] or "",
            "classB": t["class_b"] or "",
            "playerAName": t["player_a_name"] or "",
            "playerBName": t["player_b_name"] or "",
            "isOpen": bool(t["is_open"]),
            "createdAt": t["created_at"],
            "winner": winner,
            "entries": t_entries,
        })
    return jsonify(result)


@app.route("/api/custom-tournaments", methods=["POST"])
@examiner_required
def api_create_custom_tournament():
    data = request.get_json(silent=True) or {}
    title = str(data.get("title", "")).strip() or "Custom Scholars Match"
    mode = str(data.get("mode", "two_class")).strip().lower()
    if mode not in {"two_class", "one_on_one"}:
        return jsonify({"error": "Invalid mode. Choose two_class or one_on_one."}), 400

    class_a = normalize_class_level(data.get("classA", ""), default="")
    class_b = normalize_class_level(data.get("classB", ""), default="")
    player_a = " ".join(str(data.get("playerAName", "")).strip().split())
    player_b = " ".join(str(data.get("playerBName", "")).strip().split())

    if mode == "two_class" and (class_a not in VALID_CLASSES or class_b not in VALID_CLASSES):
        return jsonify({"error": "Select two valid classes for a Two-Class Competition."}), 400
    if mode == "one_on_one" and (not player_a or not player_b):
        return jsonify({"error": "Enter both candidate names for a 1-on-1 Head-to-Head match."}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO custom_tournaments (
            title, mode, class_a, class_b, player_a_name, player_b_name, is_open, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?)
    """, (title, mode, class_a, class_b, player_a, player_b, datetime.utcnow().isoformat()))
    new_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return jsonify({"ok": True, "id": new_id}), 201


@app.route("/api/custom-tournaments/<int:t_id>/toggle", methods=["POST"])
@examiner_required
def api_toggle_custom_tournament(t_id):
    data = request.get_json(silent=True) or {}
    is_open = int(bool(data.get("isOpen", False)))
    conn = get_db_connection()
    conn.execute("UPDATE custom_tournaments SET is_open = ? WHERE id = ?", (is_open, t_id))
    conn.commit()
    conn.close()
    return jsonify({"ok": True, "id": t_id, "isOpen": bool(is_open)})


@app.route("/api/custom-tournaments/<int:t_id>", methods=["DELETE"])
@examiner_required
def api_delete_custom_tournament(t_id):
    conn = get_db_connection()
    conn.execute("DELETE FROM custom_tournament_entries WHERE tournament_id = ?", (t_id,))
    conn.execute("DELETE FROM custom_tournaments WHERE id = ?", (t_id,))
    conn.commit()
    conn.close()
    return jsonify({"ok": True, "id": t_id})


@app.route("/api/custom-tournaments/<int:t_id>/entries", methods=["POST"])
def api_save_custom_tournament_entry(t_id):
    data = request.get_json(silent=True) or {}
    conn = get_db_connection()
    t_row = conn.execute("SELECT * FROM custom_tournaments WHERE id = ?", (t_id,)).fetchone()
    if not t_row:
        conn.close()
        return jsonify({"error": "Custom tournament not found."}), 404
    if not t_row["is_open"]:
        conn.close()
        return jsonify({"error": "This custom tournament is currently closed."}), 403

    student_id = int(data.get("studentId") or 0)
    student = conn.execute(
        "SELECT id, full_name, school_name, class_level, avatar_data FROM students WHERE id = ?",
        (student_id,)
    ).fetchone() if student_id else None

    if not student:
        conn.close()
        return jsonify({"error": "Only registered platform members can participate."}), 403

    if t_row["mode"] == "two_class":
        allowed_classes = {t_row["class_a"], t_row["class_b"]}
        if student["class_level"] not in allowed_classes:
            conn.close()
            return jsonify({"error": f"This match is restricted to {t_row['class_a']} and {t_row['class_b']}."}), 403
    elif t_row["mode"] == "one_on_one":
        allowed_names = {normalize_key(t_row["player_a_name"]), normalize_key(t_row["player_b_name"])}
        if normalize_key(student["full_name"]) not in allowed_names:
            conn.close()
            return jsonify({"error": f"This 1-on-1 match is restricted to {t_row['player_a_name']} and {t_row['player_b_name']}."}), 403

    existing = conn.execute(
        "SELECT id FROM custom_tournament_entries WHERE tournament_id = ? AND student_id = ?",
        (t_id, student["id"])
    ).fetchone()
    if existing:
        conn.close()
        return jsonify({"error": "You have already submitted your score for this custom match."}), 400

    subjects = data.get("subjects") or []
    correct = int(data.get("correct", 0))
    total = int(data.get("total", 0))
    percentage = int(data.get("percentage", 0))
    points_earned = int(data.get("pointsEarned", 0))
    time_taken_seconds = max(0, int(data.get("timeTakenSeconds", 0)))
    speed_bonus = max(0, int(data.get("speedBonus", 0)))
    date_label = datetime.now().strftime("%d %b %Y")

    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO custom_tournament_entries (
            tournament_id, student_id, student_name, school_name, class_level,
            subjects_json, correct, total, percentage, points_earned,
            time_taken_seconds, speed_bonus, avatar_data, date_label, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        t_id,
        student["id"],
        student["full_name"],
        student["school_name"],
        student["class_level"],
        json.dumps(subjects),
        correct,
        total,
        percentage,
        points_earned,
        time_taken_seconds,
        speed_bonus,
        student["avatar_data"] or "",
        date_label,
        datetime.utcnow().isoformat()
    ))
    new_id = cursor.lastrowid
    conn.commit()
    row = conn.execute("SELECT * FROM custom_tournament_entries WHERE id = ?", (new_id,)).fetchone()
    conn.close()
    return jsonify(row_to_custom_entry_dict(row)), 201


if __name__ == "__main__":
    debug_enabled = os.environ.get("FLASK_DEBUG", "").strip() == "1"
    app.run(host="0.0.0.0", port=5000, debug=debug_enabled)
