import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const ActiveWatchlist = () => {
  const stocks = [
    { symbol: "META", name: "META", exchange: "NasdaqGS", price: "$334.22", change: "+2.4%", isPositive: true, color: "bg-blue-500/20 text-blue-500" },
    { symbol: "GOOGL", name: "GOOGL", exchange: "NasdaqGS", price: "$132.50", change: "-0.8%", isPositive: false, color: "bg-gray-500/20 text-gray-500" },
    { symbol: "NFLX", name: "NFLX", exchange: "NasdaqGS", price: "$478.10", change: "+1.1%", isPositive: true, color: "bg-red-500/20 text-red-500" },
    { symbol: "AMD", name: "AMD", exchange: "NasdaqGS", price: "$118.40", change: "+3.2%", isPositive: true, color: "bg-indigo-500/20 text-indigo-500" },
  ];

  return (
    <Box className="glass-card p-6 h-full flex flex-col">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h6" className="font-bold">Active Watchlist</Typography>
        <Button 
          startIcon={<AddIcon sx={{ fontSize: 16 }} />} 
          size="small"
          sx={{ 
            color: "var(--color-accent-blue)", 
            textTransform: "none", 
            fontWeight: 700,
            fontSize: "0.75rem",
            "&:hover": { bgcolor: "var(--color-accent-blue)/10" }
          }}
        >
          Add Stock
        </Button>
      </Box>

      <Box className="space-y-5 flex-1">
        <Typography variant="caption" className="text-gray-500 font-bold tracking-wider uppercase">
          Top Picks
        </Typography>

        {stocks.map((stock, index) => (
          <Box key={index} className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all">
            <Box className="flex items-center gap-3">
              <Box className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${stock.color}`}>
                {stock.symbol.substring(0, 2)}
              </Box>
              <Box>
                <Typography variant="body2" className="font-bold">{stock.name}</Typography>
                <Typography variant="caption" className="text-gray-500 font-medium">{stock.exchange}</Typography>
              </Box>
            </Box>
            <Box className="text-right">
              <Typography variant="body2" className="font-bold">{stock.price}</Typography>
              <Typography variant="caption" className={`font-bold ${stock.isPositive ? "text-positive" : "text-negative"}`}>
                {stock.change}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Pro Tip card */}
      <Box className="mt-8 p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex gap-3 items-start animate-pulse shadow-lg shadow-blue-500/5">
        <Box className="p-2 bg-blue-500 rounded-lg text-white">
          <LightbulbIcon sx={{ fontSize: 16 }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" className="text-white font-bold leading-tight mb-1">Pro Tip</Typography>
          <Typography variant="caption" className="text-blue-200 block leading-tight">
            Diversify your portfolio across 3+ sectors to reduce risk.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ActiveWatchlist;