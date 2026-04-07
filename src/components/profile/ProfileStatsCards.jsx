import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CalculateIcon from "@mui/icons-material/Calculate";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ProfileStatsCards = ({ stats }) => {
  const items = [
    { icon: <CalculateIcon />, label: "Calculations", value: stats.calculations, sub: "Lifetime tool usage" },
    { icon: <FormatListBulletedIcon />, label: "Watchlist Size", value: stats.watchlistSize, sub: "Active tracked stocks" },
    { icon: <AccessTimeIcon />, label: stats.lastActivity, value: "Last Activity", sub: "Recent platform sync" },
  ];

  return (
    <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mb-10">
      {items.map((stat, i) => (
        <Box key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center group hover:border-blue-500/30 transition-all duration-300">
          <Box className="flex justify-center mb-4">
            <Box className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
              {stat.icon}
            </Box>
          </Box>
          <Typography variant="h5" className="font-black mb-1">{stat.value}</Typography>
          <Typography variant="body2" className="text-gray-200 font-bold mb-1">{stat.label}</Typography>
          <Typography variant="caption" className="text-gray-500 block">{stat.sub}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProfileStatsCards;
