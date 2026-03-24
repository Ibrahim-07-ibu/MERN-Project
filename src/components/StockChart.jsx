import React from "react";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

function StockChart() {
  const data = {
    labels: ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00"],
    datasets: [
      {
        label: "Stock Price",
        data: [100, 120, 115, 140, 135, 150],
        borderColor: "#197ce6ff",
      },
      {
        label: "Stock Demand",
        data: [50, 100, 80, 200, 150, 300],
        borderColor: "lightblue",
      },
    ],
  };

  return <Line data={data} style={{ width: "100%", height: "100%" }} />;
}

export default StockChart;
