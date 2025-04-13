import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load the dataset
data = pd.read_csv("../data/heart_disease_uci.csv")

# Select features (thalach as heart rate) and target (num: heart disease presence)
features = ["thalach"]
target = "num"  # 0 = no disease, 1-4 = disease (we'll treat 1-4 as a threat)

X = data[features]
y = data[target].apply(lambda x: 1 if x > 0 else 0)  # Binary classification: 0 (no threat), 1 (threat)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "threat_model.pkl")

# Evaluate the model
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy}")