import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TimelineIcon from "@mui/icons-material/Timeline";

const MetricCard = ({
  title,
  value,
  trend,
  trendType = "up",
  icon: Icon = TimelineIcon,
}) => {
  const isUp = trendType === "up";

  return (
    <Box className="glass-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
      <Box className="flex justify-between items-start mb-4">
        <Typography variant="overline" className="text-gray-500 font-bold tracking-wider">
          {title}
        </Typography>
        <Box className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
          <Icon fontSize="small" />
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" className="font-bold mb-2 tracking-tight">
          {value}
        </Typography>
        <Box className="flex items-center gap-2">
          <Box className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[0.7rem] font-bold ${
            isUp ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
          }`}>
            {isUp ? <TrendingUpIcon sx={{ fontSize: 12 }} /> : <TrendingDownIcon sx={{ fontSize: 12 }} />}
            {trend}
          </Box>
          <Typography variant="caption" className="text-gray-500 font-medium whitespace-nowrap">
            vs last week
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MetricCard;
