import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MetricCard from "../components/MetricCard";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PaidIcon from "@mui/icons-material/Paid";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import StockChart from "../components/StockChart";


function Dashboard() {
  return (
    <Box
      sx={{
        p: 6,
        bgcolor: "#000000",
        color: "white",
      }}
    >
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
          Welcome, User !!
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          The market is up +1.2% today. Your portfolio is looking healthy.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 3}}>
        <MetricCard
          title="Total Portfolio Value"
          value="$124,592.40"
          trend="12.5%"
          icon={WorkOutlineIcon}
          trendType="up"
        />
        <MetricCard
          title="Today's Profit/Loss"
          value="+$2,410.15"
          trend="1.8%"
          icon={PaidIcon}
          trendType="up"
        />
        <MetricCard
          title="Top Gainer (NVDA)"
          value="+4.52%"
          trend="High"
          icon={ShowChartIcon}
          trendType="up"
        />
        <MetricCard
          title="Top Loser (TSLA)"
          value="-2.15%"
          trend="Moderate"
          icon={TrendingDownIcon}
          trendType="down"
        />
      </Box>
      <Box
        sx={{
          mt: 5,
          p: 3,
          bgcolor: "#111",
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.6)",
          border: "1px solid #222"
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: "white"
          }}
        >
          Stock Market Overview
        </Typography>

        <Box sx={{ height: 350, width: "80%" ,display:"flex",justifyContent:"center",alignItems:"center",margin:"auto"}}>
          <StockChart />
        </Box>
      </Box>  
    </Box>
  );
}

export default Dashboard;
