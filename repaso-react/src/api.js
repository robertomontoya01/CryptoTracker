// Ejemplo de `fetchCryptoData` que obtiene precios históricos
export const fetchCryptoData = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=mxn&order=market_cap_desc&per_page=10&page=1&sparkline=true");
    const data = await response.json();
    return data.map(crypto => ({
      ...crypto,
      price_history: crypto.sparkline_in_7d.price, // Datos de precios históricos de los últimos 7 días
    }));
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};


const BASE_URL = "http://localhost:5000";
export const fetchHistoricalData = async (cryptoId) => {
  const response = await fetch(`${BASE_URL}/historical?crypto_id=${cryptoId}`);
  return response.json();
};

export const fetchProjections = async (historicalPrices) => {
  const response = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ historicalPrices }),
  });
  return response.json();
};
