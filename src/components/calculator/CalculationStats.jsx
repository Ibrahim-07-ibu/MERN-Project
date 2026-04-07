import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PercentIcon from "@mui/icons-material/Percent";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

const CalculationStats = ({ results, symbol }) => {
  const stats = [
    {
      label: "Investment Amount",
      value: `$${results.investmentAmount.toLocaleString()}`,
      sub: `Total capital deployed for ${symbol || "Asset"}`,
      icon: <AccountBalanceWalletIcon fontSize="small" />,
      tag: "Neutral",
      tagColor: "gray-500/10 text-gray-500"
    },
    {
      label: "Expected Profit",
      value: `$${results.expectedProfit.toLocaleString()}`,
      sub: "Net gain at target price",
      icon: <TrendingUpIcon fontSize="small" />,
      tag: "Bullish",
      tagColor: "emerald-500/10 text-emerald-500",
      valueColor: "text-positive"
    },
    {
      label: "Profit Percentage",
      value: `${results.profitPercentage.toFixed(2)}%`,
      sub: "ROI relative to entry",
      icon: <PercentIcon fontSize="small" />,
      tag: "Bullish",
      tagColor: "emerald-500/10 text-emerald-500"
    },
    {
      label: "Risk/Reward Ratio",
      value: `${results.riskRewardRatio}:1`,
      sub: "Return for every $1 risked",
      icon: <ShieldOutlinedIcon fontSize="small" />,
      tag: "Bullish",
      tagColor: "emerald-500/10 text-emerald-500"
    }
  ];

  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {stats.map((stat, i) => (
        <Box key={i} className="glass-card p-6 flex flex-col justify-between">
          <Box className="flex justify-between items-start mb-4">
            <Box className="flex items-center gap-2">
              <Box className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                {stat.icon}
              </Box>
              <Typography variant="caption" className="text-gray-500 font-bold uppercase">{stat.label}</Typography>
            </Box>
            <Box className={`px-2 py-0.5 rounded ${stat.tagColor} text-[10px] font-black uppercase`}>{stat.tag}</Box>
          </Box>
          <Typography variant="h4" className={`font-bold mb-1 ${stat.valueColor || ""}`}>{stat.value}</Typography>
          <Typography variant="caption" className="text-gray-500 font-medium">{stat.sub}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CalculationStats;
