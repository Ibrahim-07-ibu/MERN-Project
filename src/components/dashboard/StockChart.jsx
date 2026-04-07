import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const StockChart = () => {
  const [activeRange, setActiveRange] = useState("1M");
  const ranges = ["1D", "1W", "1M", "1Y", "ALL"];

  const data = {
    labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    datasets: [
      {
        data: [4200, 4250, 4230, 4300, 4280, 4350, 4400],
        borderColor: "#3b82f6",
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#3b82f6",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
          return gradient;
        },
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(16, 16, 24, 0.9)",
        titleColor: "#94a3b8",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 10 } },
      },
      y: {
        border: { dash: [5, 5], display: false },
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#64748b", font: { size: 10 }, stepSize: 1500 },
      },
    },
  };

  return (
    <Box className="glass-card p-6 h-[480px] flex flex-col">
      <Box className="flex justify-between items-start mb-8">
        <Box>
          <Typography variant="h6" className="font-bold text-white mb-6">
            Market Performance
          </Typography>
          
          <Box className="flex gap-10">
            <Box>
              <Typography variant="caption" className="text-gray-500 font-bold tracking-wider uppercase">
                Current Value
              </Typography>
              <Typography variant="h4" className="font-bold tracking-tight">
                $142,509.32
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" className="text-gray-500 font-bold tracking-wider uppercase">
                Total Profit
              </Typography>
              <Typography variant="h4" className="font-bold text-positive tracking-tight">
                +$12,403.11
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="flex bg-white/5 p-1 rounded-xl border border-white/5 shadow-inner">
          {ranges.map((range) => (
            <Button
              key={range}
              onClick={() => setActiveRange(range)}
              sx={{
                minWidth: 40,
                px: 2,
                py: 0.5,
                borderRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: activeRange === range ? "white" : "#64748b",
                bgcolor: activeRange === range ? "var(--color-accent-blue)" : "transparent",
                boxShadow: activeRange === range ? "0 4px 12px rgba(59, 130, 246, 0.4)" : "none",
                "&:hover": {
                  bgcolor: activeRange === range ? "var(--color-accent-blue)" : "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              {range}
            </Button>
          ))}
        </Box>
      </Box>

      <Box className="flex-1 mt-4">
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default StockChart;