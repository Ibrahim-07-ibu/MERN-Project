import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const MarketInsights = () => {
  const news = [
    {
      source: "REUTERS",
      time: "12m ago",
      title: "Tech stocks rally as inflation fears ease ahead of Fed meeting.",
      hot: true,
      color: "text-blue-400"
    },
    {
      source: "BLOOMBERG",
      time: "1h ago",
      title: "Energy sector sees unexpected dip despite crude oil price surge.",
      hot: false,
      color: "text-blue-500"
    },
    {
      source: "CNBC",
      time: "3h ago",
      title: "Crypto regulations tighten in EU: What investors need to know.",
      hot: false,
      color: "text-blue-600"
    },
  ];

  return (
    <Box className="glass-card p-6 h-full flex flex-col">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h6" className="font-bold">Market Insights</Typography>
      </Box>

      <Box className="space-y-6 flex-1">
        {news.map((item, index) => (
          <Box key={index} className="group cursor-pointer">
            <Box className="flex items-center gap-3 mb-2">
              {item.hot && (
                <Box className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold">
                  <LocalFireDepartmentIcon sx={{ fontSize: 12 }} />
                  HOT NOW
                </Box>
              )}
              <Typography variant="caption" className={`font-black tracking-tighter ${item.color}`}>
                {item.source}
              </Typography>
              <Typography variant="caption" className="text-gray-500 font-medium">
                • {item.time}
              </Typography>
            </Box>
            <Typography variant="body2" className="text-gray-200 font-semibold group-hover:text-blue-400 transition-colors leading-relaxed">
              {item.title}
            </Typography>
            {index !== news.length - 1 && <Box className="mt-6 border-b border-white/5" />}
          </Box>
        ))}
      </Box>

      <Button
        fullWidth
        variant="contained"
        endIcon={<ArrowOutwardIcon fontSize="small" />}
        sx={{
          mt: 4,
          bgcolor: "white/5",
          color: "white",
          borderRadius: "12px",
          py: 1.5,
          textTransform: "none",
          fontWeight: 700,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          "&:hover": {
            bgcolor: "white/10",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          },
        }}
      >
        View All Market News
      </Button>
    </Box>
  );
};

export default MarketInsights;