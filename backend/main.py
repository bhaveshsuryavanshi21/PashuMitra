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
]
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
# CREATE ANIMAL REPORT
# --------------------------------------------------

@app.post("/report")
def create_report(report: dict):

    # Accept the current React camelCase payload.
    # Also accept the older snake_case format.
    animal_type = (
        report.get("animalType")
        or report.get("animal_type")
    )

    animal_age = report.get("animalAge")
    if animal_age is None:
        animal_age = report.get("animal_age")

    symptoms = report.get("symptoms")
    location = report.get("location")

    latitude = report.get("latitude")
    longitude = report.get("longitude")

    if not animal_type:
        raise HTTPException(
            status_code=400,
            detail="Animal type is required"
        )

    if animal_age is None:
        raise HTTPException(
            status_code=400,
            detail="Animal age is required"
        )

    if not symptoms:
        raise HTTPException(
            status_code=400,
            detail="Symptoms are required"
        )

    try:
        animal_age_value = float(animal_age)
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=400,
            detail="Animal age must be a valid number"
        )

    if not isinstance(symptoms, list):
        symptoms = [symptoms]

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
                longitude
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id
            """,
            (
                animal_type,
                animal_age_value,
                symptoms_for_db,
                location,
                priority,
                latitude,
                longitude
            )
        )

        report_id = cursor.fetchone()[0]

        conn.commit()

        return {
            "message": "Animal report submitted successfully",
            "report_id": report_id,
            "risk_score": score,
            "priority": priority,
            "reasons": reasons
        }

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
                assigned_vet
            FROM animal_reports
            ORDER BY created_at DESC
            """
        )

        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        reports = []

        for row in rows:

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
                "assigned_vet": row[12]
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
            "message": "Status updated successfully"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# --------------------------------------------------
# UPDATE VACCINATION
# --------------------------------------------------

@app.put("/report/{report_id}/vaccination")
def update_vaccination(report_id: int, data: dict):

    vaccination_status = data.get(
        "vaccination_status"
    )

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE animal_reports
            SET vaccination_status = %s
            WHERE id = %s
            """,
            (
                vaccination_status,
                report_id
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

        return {
            "message": "Vaccination status updated successfully"
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