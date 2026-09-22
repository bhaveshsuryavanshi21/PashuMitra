import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

data = pd.read_csv("../dataset/disease_data.csv")

X = data[
    [
        "animal_type",
        "animal_age",
        "fever",
        "salivation",
        "difficulty_walking",
        "coughing"
    ]
]

y = data["risk"]

encoder = LabelEncoder()
X["animal_type"] = encoder.fit_transform(X["animal_type"])

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

joblib.dump(model, "risk_model.pkl")
joblib.dump(encoder, "animal_encoder.pkl")

print("Model trained successfully!")