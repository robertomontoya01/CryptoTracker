from flask import Flask, request, jsonify
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

# Función de predicción para el modelo de Machine Learning
def predict_price(historical_prices, days_to_project):
    # Convertir los precios históricos a un formato adecuado para el modelo
    X = np.array(range(len(historical_prices))).reshape(-1, 1)  # Días anteriores
    y = np.array(historical_prices).reshape(-1, 1)  # Precios históricos

    # Entrenamiento del modelo de regresión lineal
    model = LinearRegression()
    model.fit(X, y)

    # Proyección de precios para los siguientes días
    future_days = np.array(range(len(historical_prices), len(historical_prices) + days_to_project)).reshape(-1, 1)
    predicted_prices = model.predict(future_days)
    
    return predicted_prices.flatten().tolist()

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    historical_prices = data["historicalPrices"]
    days_to_project = data["daysToProject"]

    # Obtener la proyección de precios
    projected_prices = predict_price(historical_prices, days_to_project)

    return jsonify({"projectedPrices": projected_prices})

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
