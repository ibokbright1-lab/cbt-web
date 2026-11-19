import re
import sqlite3
from contextlib import contextmanager
from datetime import date, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

DB_PATH = "school_exam.db"
VALID_CLASSES = {"JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"}
MAX_FAILED_ATTEMPTS = 5


@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH, timeout=15)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA foreign_keys=ON;")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                school_name TEXT NOT NULL,
                school_key TEXT NOT NULL,
                class_level TEXT NOT NULL,
                full_name TEXT NOT NULL,
                name_key TEXT NOT NULL,
                pin_hash TEXT NOT NULL,
                failed_attempts INTEGER NOT NULL DEFAULT 0,
                locked_until_date TEXT,
                current_streak INTEGER NOT NULL DEFAULT 0,
                longest_streak INTEGER NOT NULL DEFAULT 0,
                last_exam_date TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(school_key, class_level, name_key)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS ledger (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER NOT NULL,
                class_level TEXT NOT NULL,
                subject TEXT NOT NULL,
                correct_count INTEGER NOT NULL,
                wrong_count INTEGER NOT NULL,
                total_questions INTEGER NOT NULL,
                accuracy REAL NOT NULL,
                net_points INTEGER NOT NULL,
                warnings_count INTEGER NOT NULL DEFAULT 0,
                taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (student_id) REFERENCES students(id)
            )
        """)


def normalize_text(value: str) -> str:
    """Trim spaces, collapse extra whitespace, and lowercase for exact matching."""
    return " ".join((value or "").strip().split()).lower()


def is_valid_pin(pin: str) -> bool:
    """Strictly enforce a 4-digit numeric PIN."""
    return bool(re.fullmatch(r"\d{4}", (pin or "").strip()))


def register_student(school_name: str, class_level: str, full_name: str, pin: str):
    school_clean = " ".join((school_name or "").strip().split())
    name_clean = " ".join((full_name or "").strip().split())
    class_clean = (class_level or "").strip().upper()
    pin_clean = (pin or "").strip()

    if not school_clean or not name_clean:
        return False, "School name and full name are required."
    if class_clean not in VALID_CLASSES:
        return False, f"Invalid class level. Choose from: {', '.join(sorted(VALID_CLASSES))}."
    if not is_valid_pin(pin_clean):
        return False, "PIN must be exactly 4 digits (e.g., 1234)."

    school_key = normalize_text(school_clean)
    name_key = normalize_text(name_clean)
    pin_hash = generate_password_hash(pin_clean)

    try:
        with get_db() as conn:
            cursor = conn.execute(
                """
                INSERT INTO students (school_name, school_key, class_level, full_name, name_key, pin_hash)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (school_clean, school_key, class_clean, name_clean, name_key, pin_hash),
            )
            return True, {
                "id": cursor.lastrowid,
                "school_name": school_clean,
                "school_key": school_key,
                "class_level": class_clean,
                "full_name": name_clean,
                "current_streak": 0,
                "longest_streak": 0,
            }
    except sqlite3.IntegrityError:
        return False, "A student with this name is already registered in this class."


def verify_student(school_name: str, class_level: str, full_name: str, pin: str):
    class_clean = (class_level or "").strip().upper()
    pin_clean = (pin or "").strip()

    if not (school_name or "").strip() or not (full_name or "").strip() or class_clean not in VALID_CLASSES or not is_valid_pin(pin_clean):
        return False, "Check your school name, class level, full name, and 4-digit PIN."

    school_key = normalize_text(school_name)
    name_key = normalize_text(full_name)
    today_iso = date.today().isoformat()

    with get_db() as conn:
        student = conn.execute(
            """
            SELECT id, school_name, school_key, class_level, full_name, pin_hash,
                   failed_attempts, locked_until_date, current_streak, longest_streak
            FROM students
            WHERE school_key = ? AND class_level = ? AND name_key = ?
            """,
            (school_key, class_clean, name_key),
        ).fetchone()

        if not student:
            return False, "No matching student record found. Check the spelling of your name and class."

        if student["locked_until_date"] == today_iso:
            return False, "Too many incorrect PIN attempts today. Ask your examiner to reset your PIN."

        if not check_password_hash(student["pin_hash"], pin_clean):
            attempts = student["failed_attempts"] + 1
            lock_date = today_iso if attempts >= MAX_FAILED_ATTEMPTS else None
            conn.execute(
                """
                UPDATE students
                SET failed_attempts = ?, locked_until_date = ?
                WHERE id = ?
                """,
                (attempts, lock_date, student["id"]),
            )
            remaining = max(0, MAX_FAILED_ATTEMPTS - attempts)
            if lock_date:
                return False, "Incorrect PIN. Account temporarily locked for today after 5 failed attempts."
            return False, f"Incorrect 4-digit PIN ({remaining} attempt(s) remaining today)."

        if student["failed_attempts"] > 0 or student["locked_until_date"] is not None:
            conn.execute(
                "UPDATE students SET failed_attempts = 0, locked_until_date = NULL WHERE id = ?",
                (student["id"],),
            )

    return True, {
        "id": student["id"],
        "school_name": student["school_name"],
        "school_key": student["school_key"],
        "class_level": student["class_level"],
        "full_name": student["full_name"],
        "current_streak": student["current_streak"],
        "longest_streak": student["longest_streak"],
    }


def calculate_quiz_metrics(correct_count: int, wrong_count: int, total_questions: int):
    """Reward accuracy, penalize wrong guesses, and award a 70%+ pass bonus."""
    if total_questions <= 0:
        return 0.0, 0

    accuracy = round((correct_count / total_questions) * 100, 2)
    raw_points = (correct_count * 3) - (wrong_count * 1)
    pass_bonus = 10 if accuracy >= 70.0 else 0
    net_points = max(0, raw_points + pass_bonus)
    return accuracy, net_points


def _update_streak(conn, student_id: int, accuracy: float):
    """Update daily practice streak only when the student scores at least 40%."""
    row = conn.execute(
        "SELECT current_streak, longest_streak, last_exam_date FROM students WHERE id = ?",
        (student_id,),
    ).fetchone()

    current_streak = row["current_streak"]
    longest_streak = row["longest_streak"]
    last_date_str = row["last_exam_date"]

    if accuracy < 40.0:
        return current_streak, longest_streak

    today = date.today()
    yesterday = today - timedelta(days=1)

    if last_date_str == today.isoformat():
        return current_streak, longest_streak
    elif last_date_str == yesterday.isoformat():
        current_streak += 1
    else:
        current_streak = 1

    if current_streak > longest_streak:
        longest_streak = current_streak

    conn.execute(
        """
        UPDATE students
        SET current_streak = ?, longest_streak = ?, last_exam_date = ?
        WHERE id = ?
        """,
        (current_streak, longest_streak, today.isoformat(), student_id),
    )
    return current_streak, longest_streak


def add_ledger_entry(
    student_id: int,
    class_level: str,
    subject: str,
    correct_count: int,
    wrong_count: int,
    total_questions: int,
    warnings_count: int = 0,
):
    safe_total = max(0, int(total_questions))
    safe_correct = max(0, min(int(correct_count), safe_total))
    safe_wrong = max(0, min(int(wrong_count), safe_total - safe_correct))
    safe_warnings = max(0, int(warnings_count))

    accuracy, net_points = calculate_quiz_metrics(safe_correct, safe_wrong, safe_total)

    with get_db() as conn:
        conn.execute(
            """
            INSERT INTO ledger (
                student_id, class_level, subject, correct_count, wrong_count,
                total_questions, accuracy, net_points, warnings_count
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                student_id,
                (class_level or "").strip().upper(),
                (subject or "General").strip(),
                safe_correct,
                safe_wrong,
                safe_total,
                accuracy,
                net_points,
                safe_warnings,
            ),
        )
        current_streak, longest_streak = _update_streak(conn, student_id, accuracy)

    return {
        "accuracy": accuracy,
        "net_points": net_points,
        "warnings_count": safe_warnings,
        "current_streak": current_streak,
        "longest_streak": longest_streak,
    }


def get_student_ledger(student_id: int):
    with get_db() as conn:
        rows = conn.execute(
            """
            SELECT l.id, s.school_name, s.full_name, l.class_level, l.subject,
                   l.correct_count, l.wrong_count, l.total_questions,
                   l.accuracy, l.net_points, l.warnings_count, l.taken_at
            FROM ledger l
            JOIN students s ON s.id = l.student_id
            WHERE l.student_id = ?
            ORDER BY l.taken_at DESC
            """,
            (student_id,),
        ).fetchall()
    return [dict(row) for row in rows]


def get_class_leaderboard(school_key: str, class_level: str, current_student_id: int, subject: str = None):
    today_iso = date.today().isoformat()

    query = """
        SELECT
            s.id AS student_id,
            s.full_name,
            s.current_streak,
            s.longest_streak,
            s.last_exam_date,
            COUNT(l.id) AS quizzes_taken,
            COALESCE(SUM(l.correct_count), 0) AS total_correct,
            COALESCE(SUM(l.wrong_count), 0) AS total_wrong,
            COALESCE(SUM(l.total_questions), 0) AS total_questions,
            COALESCE(SUM(l.net_points), 0) AS total_net_points,
            COALESCE(SUM(l.warnings_count), 0) AS total_warnings
        FROM students s
        JOIN ledger l ON l.student_id = s.id
        WHERE s.school_key = ? AND s.class_level = ?
    """
    params = [school_key, class_level]

    if subject and subject.strip().lower() != "all":
        query += " AND LOWER(l.subject) = LOWER(?)"
        params.append(subject.strip())

    query += " GROUP BY s.id"

    with get_db() as conn:
        rows = conn.execute(query, params).fetchall()

    standings = []
    for r in rows:
        total_q = r["total_questions"]
        overall_accuracy = round((r["total_correct"] / total_q) * 100, 2) if total_q > 0 else 0.0
        performance_rating = round(r["total_net_points"] * (overall_accuracy / 100.0), 2)
        streak_at_risk = r["current_streak"] > 0 and r["last_exam_date"] != today_iso

        standings.append({
            "student_id": r["student_id"],
            "full_name": r["full_name"],
            "quizzes_taken": r["quizzes_taken"],
            "total_correct": r["total_correct"],
            "total_wrong": r["total_wrong"],
            "accuracy": overall_accuracy,
            "net_points": r["total_net_points"],
            "performance_rating": performance_rating,
            "current_streak": r["current_streak"],
            "streak_at_risk": streak_at_risk,
            "total_warnings": r["total_warnings"],
            "is_current_user": r["student_id"] == current_student_id,
        })

    standings.sort(
        key=lambda x: (-x["performance_rating"], -x["accuracy"], -x["total_correct"], x["full_name"])
    )

    medals = {1: "gold", 2: "silver", 3: "bronze"}
    my_rank = None

    for idx, entry in enumerate(standings, start=1):
        entry["rank"] = idx
        entry["medal"] = medals.get(idx)
        if entry["is_current_user"]:
            my_rank = entry

    return {
        "class_level": class_level,
        "subject": subject or "All Subjects",
        "podium": standings[:3],
        "rankings": standings,
        "my_rank": my_rank,
    }


def get_admin_ledger(school_name=None, class_level=None, subject=None, student_name=None):
    query = """
        SELECT l.id, s.school_name, s.full_name, l.class_level, l.subject,
               l.correct_count, l.wrong_count, l.total_questions,
               l.accuracy, l.net_points, l.warnings_count, l.taken_at
        FROM ledger l
        JOIN students s ON s.id = l.student_id
        WHERE 1=1
    """
    params = []

    if school_name:
        query += " AND s.school_key = ?"
        params.append(normalize_text(school_name))
    if class_level:
        query += " AND l.class_level = ?"
        params.append(class_level.strip().upper())
    if subject:
        query += " AND LOWER(l.subject) = LOWER(?)"
        params.append(subject.strip())
    if student_name:
        query += " AND s.name_key LIKE ?"
        params.append(f"%{normalize_text(student_name)}%")

    query += " ORDER BY l.taken_at DESC"

    with get_db() as conn:
        rows = conn.execute(query, params).fetchall()
    return [dict(row) for row in rows]