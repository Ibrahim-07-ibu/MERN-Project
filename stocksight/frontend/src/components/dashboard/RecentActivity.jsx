import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const RecentActivity = () => {
  const stocks = [
    { name: "AAPL", full: "Apple Inc.", price: "$189.43", change: "+1.24%", vol: "52.4M", color: "bg-blue-500/20 text-blue-500" },
    { name: "TSLA", full: "Tesla, Inc.", price: "$242.65", change: "-2.15%", vol: "110.2M", color: "bg-indigo-500/20 text-indigo-500" },
    { name: "NVDA", full: "NVIDIA Corp.", price: "$485.20", change: "+4.58%", vol: "45.1M", color: "bg-emerald-500/20 text-emerald-500" },
    { name: "MSFT", full: "Microsoft", price: "$374.12", change: "+0.85%", vol: "22.9M", color: "bg-blue-600/20 text-blue-600" },
    { name: "AMZN", full: "Amazon.com", price: "$145.18", change: "-0.32%", vol: "38.5M", color: "bg-orange-500/20 text-orange-500" },
  ];

  return (
    <Box className="glass-card p-6">
      <Typography variant="h6" className="font-bold mb-6">Recent Activity</Typography>
      
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-white/5">
            <th className="pb-4">Stock Asset</th>
            <th className="pb-4">Current Price</th>
            <th className="pb-4">24H Change</th>
            <th className="pb-4 text-right">Market Vol</th>
            <th className="pb-4 text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {stocks.map((stock, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors group">
              <td className="py-4 flex items-center gap-3">
                <Box className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${stock.color}`}>
                  {stock.name[0]}
                </Box>
                <Box>
                  <Typography variant="body2" className="font-bold">{stock.name}</Typography>
                  <Typography variant="caption" className="text-gray-500">{stock.full}</Typography>
                </Box>
              </td>
              <td className="py-4">
                <Typography variant="body2" className="font-bold">{stock.price}</Typography>
              </td>
              <td className="py-4">
                <Typography variant="body2" className={`font-bold ${stock.change.startsWith("+") ? "text-positive" : "text-negative"}`}>
                  {stock.change}
                </Typography>
              </td>
              <td className="py-4 text-right">
                <Typography variant="body2" className="text-gray-300">{stock.vol}</Typography>
              </td>
              <td className="py-4 text-right">
                <MoreHorizIcon className="text-gray-500 cursor-pointer hover:text-white" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Box className="mt-6 flex justify-center">
        <Typography className="text-accent-blue font-bold text-sm cursor-pointer hover:underline">
          Explore All Market Assets
        </Typography>
      </Box>
    </Box>
  );
};

export default RecentActivity;
