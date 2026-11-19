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

    # Safe schema migrations for existing scholars_cbt.db files
    ensure_column_exists(cursor, "questions", "exam_source", "TEXT DEFAULT 'WAEC/JAMB/NECO'")
    ensure_column_exists(cursor, "exam_records", "reg_number", "TEXT DEFAULT ''")
    ensure_column_exists(cursor, "exam_records", "tab_warnings", "INTEGER DEFAULT 0")
    ensure_column_exists(cursor, "exam_records", "topic_stats_json", "TEXT DEFAULT '{}'")
    ensure_column_exists(cursor, "exam_records", "question_ids_json", "TEXT DEFAULT '[]'")
    migrate_class_levels(cursor)

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


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/register", methods=["POST"])
def api_register():
    data = request.get_json(silent=True) or {}
    school_name = " ".join(str(data.get("school_name", "")).strip().split())
    class_level = normalize_class_level(data.get("class_level", ""), default="")
    full_name = " ".join(str(data.get("full_name", "")).strip().split())
    pin = str(data.get("pin", "")).strip()

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
            INSERT INTO students (school_name, school_key, class_level, full_name, name_key, pin_hash, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (school_name, school_key, class_level, full_name, name_key, pin_hash, datetime.utcnow().isoformat()))
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
            "full_name": full_name
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
        SELECT id, school_name, class_level, full_name, pin_hash
        FROM students
        WHERE school_key = ? AND class_level = ? AND name_key = ?
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
            "full_name": student["full_name"]
        }
    }), 200


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


@app.route("/api/questions", methods=["GET"])
def api_get_questions():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM questions ORDER BY id ASC").fetchall()
    conn.close()
    return jsonify([row_to_question_dict(r) for r in rows])


@app.route("/api/questions", methods=["POST"])
@examiner_required
def api_add_question():
    data = request.get_json(silent=True) or {}
    options = data.get("options") or []
    if len(options) < 4:
        return jsonify({"error": "All 4 options (A–D) are required."}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO questions (
            class_level, subject, topic, exam_source, prompt, diagram_svg, diagram_image,
            options_json, correct_index, explanation, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        normalize_class_level(data.get("classLevel", "JSS 3"), default="JSS 3"),
        str(data.get("subject", "")).strip(),
        str(data.get("topic", "General Topic")).strip(),
        str(data.get("examSource", "WAEC/JAMB/NECO")).strip() or "WAEC/JAMB/NECO",
        str(data.get("prompt", "")).strip(),
        data.get("diagramSVG"),
        data.get("diagramImage"),
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

    reader = csv.DictReader(io.StringIO(raw_text))
    if not reader.fieldnames:
        return jsonify({"error": "CSV file is empty or missing headers."}), 400

    normalized_headers = {h.strip().lower(): h for h in reader.fieldnames if h}
    required_keys = ["class_level", "subject", "prompt", "option_a", "option_b", "option_c", "option_d"]
    for key in required_keys:
        if key not in normalized_headers:
            return jsonify({"error": f"Missing required CSV column: '{key}'"}), 400

    def get_col(row_dict, key, default=""):
        header_name = normalized_headers.get(key)
        return str(row_dict.get(header_name, default) or default).strip()

    inserted_count = 0
    conn = get_db_connection()
    cursor = conn.cursor()
    now_iso = datetime.utcnow().isoformat()

    for row_dict in reader:
        prompt = get_col(row_dict, "prompt")
        subject = get_col(row_dict, "subject")
        if not prompt or not subject:
            continue

        class_level = normalize_class_level(get_col(row_dict, "class_level", "JSS 3"), default="JSS 3")
        topic = get_col(row_dict, "topic", "General Syllabus Topic") or "General Syllabus Topic"
        exam_source = get_col(row_dict, "exam_source", "WAEC/JAMB/NECO") or "WAEC/JAMB/NECO"
        opts = [
            get_col(row_dict, "option_a"),
            get_col(row_dict, "option_b"),
            get_col(row_dict, "option_c"),
            get_col(row_dict, "option_d")
        ]
        if not all(opts):
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
            None,
            None,
            json.dumps(opts),
            correct_idx,
            explanation,
            now_iso
        ))
        inserted_count += 1

    conn.commit()
    rows = conn.execute("SELECT * FROM questions ORDER BY id ASC").fetchall()
    conn.close()

    if inserted_count == 0:
        return jsonify({"error": "No valid rows found in CSV."}), 400

    return jsonify({
        "inserted": inserted_count,
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


@app.route("/api/records", methods=["DELETE"])
@examiner_required
def api_clear_records():
    conn = get_db_connection()
    conn.execute("DELETE FROM exam_records")
    conn.commit()
    conn.close()
    return jsonify({"status": "cleared"})


if __name__ == "__main__":
    debug_enabled = os.environ.get("FLASK_DEBUG", "").strip() == "1"
    app.run(host="0.0.0.0", port=5000, debug=debug_enabled)