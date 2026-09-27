import os
import requests
import psycopg2

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Load variables from .env
load_dotenv()

app = FastAPI()

# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://pashu-mitra-theta.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# DATABASE
# --------------------------------------------------

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is not configured in .env"
    )


def get_connection():
    # Supabase PostgreSQL connection.
    # The connection string copied from Supabase already includes
    # the required connection details.
    return psycopg2.connect(DATABASE_URL)


# --------------------------------------------------
# OPENWEATHER
# --------------------------------------------------

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")


# --------------------------------------------------
# ROOT
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "PashuMitra backend is running"
    }


# --------------------------------------------------
# RISK CALCULATION
# --------------------------------------------------

def calculate_risk(animal_age, symptoms):

    if isinstance(symptoms, list):
        symptoms_list = [
            str(item).strip().lower()
            for item in symptoms
        ]
    else:
        symptoms_list = [str(symptoms).strip().lower()]

    score = 0
    reasons = []

    if "fever" in symptoms_list:
        score += 25
        reasons.append("Fever reported (+25)")

    if "salivation" in symptoms_list:
        score += 30
        reasons.append("Excessive salivation reported (+30)")

    if (
        "difficulty_walking" in symptoms_list
        or "difficulty walking" in symptoms_list
    ):
        score += 30
        reasons.append("Difficulty walking reported (+30)")

    if "coughing" in symptoms_list:
        score += 15
        reasons.append("Coughing reported (+15)")

    if animal_age <= 1:
        score += 10
        reasons.append("Young animal (1 year or below) (+10)")

    if (
        "fever" in symptoms_list
        and "salivation" in symptoms_list
        and (
            "difficulty_walking" in symptoms_list
            or "difficulty walking" in symptoms_list
        )
    ):
        score = max(score, 85)
        reasons.append(
            "Serious symptom combination triggered a high-risk safety override"
        )

    if score >= 70:
        priority = "High"
    elif score >= 35:
        priority = "Medium"
    else:
        priority = "Low"

    return score, priority, reasons


# --------------------------------------------------
# CASE LIFECYCLE
# --------------------------------------------------

# Current and supported case states.
# Legacy values are kept so existing records continue to work.
CASE_STATUSES = {
    "New",
    "Escalated",
    "Under Review",
    "Visit Scheduled",
    "In Treatment",
    "Resolved",
    # Legacy value used by older records
    "Pending",
}


def validate_case_status(status):
    if status not in CASE_STATUSES:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Invalid case status",
                "allowed_statuses": sorted(CASE_STATUSES),
            },
        )


# --------------------------------------------------
# CREATE ANIMAL REPORT
# --------------------------------------------------

@app.post("/report")
def create_report(report: dict):

    print("REPORT PAYLOAD:", report)

    # Accept the current React camelCase payload.
    # Also accept the older snake_case format.
    animal_type = (
        report.get("animalType")
        or report.get("animal_type")
    )

    animal_age = report.get("animalAge")
    if animal_age is None:
        animal_age = report.get("animal_age")

    # Age is optional for mortality reports. Treat an empty form field as None.
    if animal_age == "":
        animal_age = None

    symptoms = report.get("symptoms") or []
    location = report.get("location")

    # Mortality-specific details.
    death_count = report.get("deathCount")
    if death_count is None:
        death_count = report.get("death_count")

    death_date = report.get("deathDate")
    if death_date is None:
        death_date = report.get("death_date")

    death_time = report.get("deathTime")
    if death_time is None:
        death_time = report.get("death_time")

    suspected_cause = report.get("suspectedCause") or report.get("suspected_cause")
    additional_notes = report.get("additionalNotes") or report.get("additional_notes")

    # Distinguish normal health reports from mortality reports.
    report_type = (
        report.get("reportType")
        or report.get("report_type")
        or "health_issue"
    )

    latitude = report.get("latitude")
    longitude = report.get("longitude")

    if not animal_type:
        raise HTTPException(
            status_code=400,
            detail="Animal type is required"
        )

    if report_type not in {"health_issue", "mortality"}:
        raise HTTPException(
            status_code=400,
            detail="Invalid report type"
        )

    if animal_age is None and report_type == "health_issue":
        raise HTTPException(
            status_code=400,
            detail="Animal age is required"
        )

    if report_type == "mortality":
        if death_count is None:
            raise HTTPException(status_code=400, detail="Number of animals died is required")

        try:
            death_count_value = int(death_count)
        except (TypeError, ValueError):
            raise HTTPException(status_code=400, detail="Number of animals died must be a valid number")

        if death_count_value < 1:
            raise HTTPException(status_code=400, detail="Number of animals died must be at least 1")

        if not death_date:
            raise HTTPException(status_code=400, detail="Date of death is required")

        # A mortality report needs a location, either as a typed place
        # or through captured GPS coordinates.
        if not location and (latitude is None or longitude is None):
            raise HTTPException(
                status_code=400,
                detail="Location or GPS coordinates are required for mortality reports"
            )
    else:
        death_count_value = None

    # Symptoms are required for health-issue reports,
    # but optional for mortality reports.
    if report_type == "health_issue" and not symptoms:
        raise HTTPException(
            status_code=400,
            detail="Symptoms are required"
        )

    try:
        animal_age_value = float(animal_age) if animal_age is not None else None
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=400,
            detail="Animal age must be a valid number"
        )

    if not isinstance(symptoms, list):
        symptoms = [symptoms]

    if report_type == "mortality":
        score = 100
        priority = "High"
        reasons = [
            "Animal mortality reported",
            "Mortality report requires veterinary surveillance"
        ]
    else:
        score, priority, reasons = calculate_risk(
            animal_age_value,
            symptoms
        )

    # Your existing PostgreSQL 'symptoms' column is kept as text.
    symptoms_for_db = ", ".join(
        str(item)
        for item in symptoms
        if item is not None
    )

    conn = None
    cursor = None

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO animal_reports
            (
                animal_type,
                animal_age,
                symptoms,
                location,
                priority,
                latitude,
                longitude,
                status,
                report_type,
                death_count,
                death_date,
                death_time,
                suspected_cause,
                additional_notes
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
            """,
            (
                animal_type,
                animal_age_value,
                symptoms_for_db,
                location,
                priority,
                latitude,
                longitude,
                # High-risk reports are automatically escalated.
                "Escalated" if priority == "High" else "New",
                report_type,
                death_count_value,
                death_date,
                death_time,
                suspected_cause,
                additional_notes
            )
        )

        report_id = cursor.fetchone()[0]

        conn.commit()

        return {
            "message": "Animal report submitted successfully",
            "report_id": report_id,
            "risk_score": score,
            "priority": priority,
            "reasons": reasons,
            "status": "Escalated" if priority == "High" else "New",
            "report_type": report_type,
            "death_count": death_count_value,
            "death_date": death_date,
            "death_time": death_time,
            "suspected_cause": suspected_cause,
            "additional_notes": additional_notes
        }

    except Exception as e:
       print("REPORT DATABASE ERROR:", repr(e))

       raise HTTPException(
        status_code=500,
        detail=f"Database error: {str(e)}"
    )

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()



# --------------------------------------------------
# GET ALL REPORTS
# --------------------------------------------------

@app.get("/reports")
def get_reports():

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT
                id,
                animal_type,
                animal_age,
                symptoms,
                location,
                created_at,
                status,
                priority,
                latitude,
                longitude,
                vaccination_status,
                treatment_history,
                assigned_vet,
                report_type,
                death_count,
                death_date,
                death_time,
                suspected_cause,
                additional_notes,
                vaccination_due_date
            FROM animal_reports
            ORDER BY created_at DESC
            """
        )

        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        reports = []

        for row in rows:

            # Recalculate the same risk reasons for existing reports so
            # the Vet Dashboard can explain why the case has its priority.
            report_type = row[13] or "health_issue"

            if report_type == "mortality":
                reasons = [
                    "Animal mortality reported",
                    "Mortality report requires veterinary surveillance"
                ]
            else:
                _, calculated_priority, reasons = calculate_risk(
                    float(row[2]),
                    [item.strip() for item in str(row[3] or "").split(",") if item.strip()]
                )

            reports.append({
                "id": row[0],
                "animal_type": row[1],
                "animal_age": row[2],
                "symptoms": row[3],
                "location": row[4],
                "created_at": row[5],
                "status": row[6],
                "priority": row[7],
                "latitude": row[8],
                "longitude": row[9],
                "vaccination_status": row[10],
                "treatment_history": row[11],
                "assigned_vet": row[12],
                "reasons": reasons,
                "report_type": report_type,
                "death_count": row[14],
                "death_date": row[15],
                "death_time": row[16],
                "suspected_cause": row[17],
                "additional_notes": row[18],
                "vaccination_due_date": row[19]
            })

        return reports

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# --------------------------------------------------
# UPDATE STATUS
# --------------------------------------------------

@app.put("/report/{report_id}/status")
def update_status(report_id: int, data: dict):

    status = data.get("status")

    if not status:
        raise HTTPException(
            status_code=400,
            detail="Status is required"
        )

    validate_case_status(status)

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE animal_reports
            SET status = %s
            WHERE id = %s
            """,
            (status, report_id)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return {
            "message": "Status updated successfully",
            "report_id": report_id,
            "status": status
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# --------------------------------------------------
# ESCALATE CASE
# --------------------------------------------------

@app.put("/report/{report_id}/escalate")
def escalate_case(report_id: int):
    """Escalate a high-risk case for priority veterinary action."""

    conn = None
    cursor = None

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT priority, status
            FROM animal_reports
            WHERE id = %s
            """,
            (report_id,)
        )

        row = cursor.fetchone()

        if not row:
            raise HTTPException(
                status_code=404,
                detail="Case not found"
            )

        priority, current_status = row

        if current_status == "Resolved":
            raise HTTPException(
                status_code=400,
                detail="A resolved case cannot be escalated"
            )

        if priority != "High":
            raise HTTPException(
                status_code=400,
                detail="Only high-risk cases can be escalated automatically"
            )

        cursor.execute(
            """
            UPDATE animal_reports
            SET status = %s
            WHERE id = %s
            """,
            ("Escalated", report_id)
        )

        conn.commit()

        return {
            "message": "Case escalated successfully",
            "report_id": report_id,
            "status": "Escalated"
        }

    except HTTPException:
        if conn:
            conn.rollback()
        raise

    except Exception as e:
        if conn:
            conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()


# --------------------------------------------------
# UPDATE VACCINATION
# --------------------------------------------------

@app.put("/report/{report_id}/vaccination")
def update_vaccination(report_id: int, data: dict):

    vaccination_status = data.get(
        "vaccination_status"
    )
    vaccination_due_date = data.get(
        "vaccination_due_date"
    )

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE animal_reports
            SET vaccination_status = %s,
                vaccination_due_date = %s
            WHERE id = %s
            """,
            (
                vaccination_status,
                vaccination_due_date,
                report_id
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

        return {
            "message": "Vaccination status and due date updated successfully",
            "vaccination_status": vaccination_status,
            "vaccination_due_date": vaccination_due_date
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# --------------------------------------------------
# UPDATE TREATMENT
# --------------------------------------------------

@app.put("/report/{report_id}/treatment")
def update_treatment(report_id: int, data: dict):

    treatment_history = data.get(
        "treatment_history"
    )

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE animal_reports
            SET treatment_history = %s
            WHERE id = %s
            """,
            (
                treatment_history,
                report_id
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

        return {
            "message": "Treatment updated successfully"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# --------------------------------------------------
# ASSIGN VETERINARIAN
# --------------------------------------------------

@app.put("/report/{report_id}/vet")
def assign_vet(report_id: int, data: dict):

    assigned_vet = data.get("assigned_vet")

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE animal_reports
            SET assigned_vet = %s
            WHERE id = %s
            """,
            (
                assigned_vet,
                report_id
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

        return {
            "message": "Veterinarian assigned successfully"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# --------------------------------------------------
# WEATHER
# --------------------------------------------------

@app.get("/weather")
def get_weather(lat: float, lon: float):

    if not OPENWEATHER_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="OpenWeather API key is not configured."
        )

    url = (
        "https://api.openweathermap.org/data/2.5/weather"
    )

    params = {
        "lat": lat,
        "lon": lon,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric"
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        # If OpenWeather rejects the request,
        # return its actual error to the frontend.
        if response.status_code != 200:

            try:
                error_data = response.json()
            except Exception:
                error_data = response.text

            raise HTTPException(
                status_code=response.status_code,
                detail={
                    "message": "OpenWeather request failed",
                    "openweather_response": error_data
                }
            )

        data = response.json()

        return {
            "location": data.get("name"),

            "temperature": data["main"].get(
                "temp"
            ),

            "feels_like": data["main"].get(
                "feels_like"
            ),

            "humidity": data["main"].get(
                "humidity"
            ),

            "pressure": data["main"].get(
                "pressure"
            ),

            "weather": data["weather"][0].get(
                "main"
            ),

            "description": data["weather"][0].get(
                "description"
            ),

            "wind_speed": data["wind"].get(
                "speed"
            ),

            "cloudiness": data["clouds"].get(
                "all"
            ),

            "latitude": lat,
            "longitude": lon
        }

    except HTTPException:
        raise

    except requests.RequestException as e:

        raise HTTPException(
            status_code=502,
            detail=f"Weather service connection failed: {str(e)}"
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Weather processing error: {str(e)}"
        )