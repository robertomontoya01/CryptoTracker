// src/components/CryptoChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const CryptoChart = ({ cryptos }) => {
  const calculateDates = (length) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < length; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (length - 1 - i));
      dates.push(date.toLocaleDateString("es-MX", { day: "2-digit", month: "short" }));
    }
    return dates;
  };

  const data = {
    labels: cryptos[0]?.price_history
      ? calculateDates(cryptos[0].price_history.length) // Calcular las fechas para el eje X
      : [],
    datasets: cryptos.map((crypto) => ({
      label: crypto.name,
      data: crypto.price_history || [],
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.3)`,
    })),
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default CryptoChart;
