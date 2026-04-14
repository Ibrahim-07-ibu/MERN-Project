import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CalculationStats = ({ results, symbol }) => {
  const isGain = results.profitLoss >= 0;

  const stats = [
    {
      label: "Total Investment",
      value: `$${results.investmentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />,
      tag: "Capital Outlay",
      tagColor: "blue-500/10 text-blue-400",
      valueColor: "text-white"
    },
    {
      label: "Unrealized P/L",
      value: `${isGain ? "+" : ""}$${results.profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: isGain ? <TrendingUpIcon sx={{ fontSize: 20 }} /> : <TrendingDownIcon sx={{ fontSize: 20 }} />,
      tag: isGain ? "Current Gains" : "Current Losses",
      tagColor: isGain ? "emerald-500/10 text-emerald-400" : "rose-500/10 text-rose-400",
      valueColor: isGain ? "text-positive" : "text-negative"
    }
  ];

  return (
    <Box className="flex flex-col gap-4 h-full">
      <Box className="grid grid-cols-1 gap-4">
        {stats.map((stat, i) => (
          <Box key={i} className="glass-card p-5 flex flex-col items-center text-center border-l-4" style={{ borderLeftColor: i === 1 ? (isGain ? "var(--color-positive)" : "var(--color-negative)") : "rgba(255,255,255,0.05)" }}>
            <Box className={`p-2 ${stat.tagColor.split(' ')[0]} rounded-xl mb-3`}>
               {stat.icon}
            </Box>
            <Box className={`px-2 py-0.5 rounded-full ${stat.tagColor} text-[9px] font-black uppercase tracking-widest mb-2 border border-white/5`}>
              {stat.tag}
            </Box>
            <Typography variant="h4" className={`font-black mb-0.5 tracking-tighter ${stat.valueColor}`}>
              {stat.value}
            </Typography>
            <Typography variant="caption" className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

    </Box>
  );
};

export default CalculationStats;
