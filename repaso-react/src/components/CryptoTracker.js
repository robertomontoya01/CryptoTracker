import React, { useEffect, useState } from "react";
import { fetchCryptoData } from "../api";
import CryptoChart from "./CryptoChart";


const CryptoTracker = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCryptos, setSelectedCryptos] = useState([]);


  // Uso de la API
  useEffect(() => {
    const getCryptoData = async () => {
      const data = await fetchCryptoData();
      setCryptos(data);
      setSelectedCryptos(data);
    };

    getCryptoData();
  }, []);

  const toggleCryptoSelection = (crypto) => {
    setSelectedCryptos((prevSelected) => {
      if (prevSelected.includes(crypto)) {
        return prevSelected.filter((selected) => selected !== crypto);
      } else {
        return [...prevSelected, crypto];
      }
    });
  };

  // Conversor de DLS a MXN
  const convertToMXN = (crypto) => {
    return {
      ...crypto,
      current_price: crypto.current_price * 20.33, //aprox 20 al cambio
      price_history: crypto.price_history?.map((price) => price * 20.33) || [], // Conversión de los precios históricos
    };
  };

  return (
    <div  class="CryptoTable">
      <h1>Crypto Tracker (MXN)</h1>
      {/* Tabla de precios de criptomonedas */}
      <table class="Table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio (MXN)</th>
            <th>Cambio (24h)</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.name}</td>
              <td>
                ${crypto.current_price.toFixed(2)} MXN
              </td>
              <td
                style={{color: crypto.price_change_percentage_24h >= 0 ? "green" : "red",}}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Gráfica de precios de criptomonedas seleccionadas */}
      <div class="CryptoGraphics">
        <h1>Gráfica de Precios historica</h1>
         {/* Botones para seleccionar criptomonedas para la gráfica */}
      <div>
        {cryptos.map((crypto) => (
          <button class ="btnGraph"
            key={crypto.id}
            onClick={() => toggleCryptoSelection(crypto)}
            style={{
              backgroundColor: selectedCryptos.includes(crypto) ? "#98b4b2" : "#f1f1f1",
              color: selectedCryptos.includes(crypto) ? "white" : "black",
            }}
          >
            {crypto.name}
          </button>
        ))}
      </div>
        {selectedCryptos.length > 0 ? (
          <CryptoChart
            cryptos={selectedCryptos.map(convertToMXN)} // Solo convertimos los datos para la gráfica
          />
        ) : (
          <p>Por favor, selecciona al menos una criptomoneda para ver la gráfica.</p>
        )}
      </div>


    </div>
  );
};

export default CryptoTracker;
