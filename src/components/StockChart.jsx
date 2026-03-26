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
    ],
  };

  return <Line data={data} sx={{ width: "100%", height: "100%" }} />;
}

export default StockChart;
