import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const MetricCard = ({ title, value, trend, icon: Icon, trendType = "up", trendLabel = "" }) => {
  const isUp = trendType === "up";
  
  return (
    <Box
      sx={{
        background: "rgba(255,255,255,0.08)",
        borderRadius: "16px",
        p: 2,
        border: "1px solid rgba(255,255,255,0.15)",
        minWidth: "220px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        transition: "transform 0.2s, border-color 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "#444",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            width: 20, 
            height: 20, 
            bgcolor: "#1a1a1a", 
            borderRadius: "8px",
            color: "#888"
          }}
        >
          {Icon && <Icon fontSize="small" />}
        </Box>
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 0.5,
            color: isUp ? "#4ade80" : "#f43f5e",
            fontSize: "0.875rem",
            fontWeight: "bold"
          }}
        >
          {isUp ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : <TrendingDownIcon sx={{ fontSize: 16 }} />}
          {trend}
          {trendLabel && (
            <Typography component="span" sx={{ ml: 0.5, color: "#888", fontWeight: "normal" }}>
              {trendLabel}
            </Typography>
          )}
        </Box>
      </Box>

      <Box>
        <Typography sx={{ color: "#888", fontSize: "0.875rem", mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default MetricCard;
