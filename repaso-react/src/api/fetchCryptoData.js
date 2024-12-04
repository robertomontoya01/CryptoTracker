import axios from "axios";

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/cryptos");
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};
