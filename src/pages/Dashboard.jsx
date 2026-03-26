import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MetricCard from "../components/MetricCard";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PaidIcon from "@mui/icons-material/Paid";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StockChart from "../components/StockChart";

function Dashboard() {
  return (
    <Box className="p-6 bg-black h-200 text-white">
      <Box className="mb-10">
        <Typography variant="h4">Welcome, User !!</Typography>
        <Typography variant="body3" className="text-gray-400">
          The market is up +1.2% today. Your portfolio is looking healthy.
        </Typography>
      </Box>

      <Box className=" flex gap-10">
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
          icon={TrendingUpIcon}
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
      <Box className="mt-7 p-5 bg-[#111] rounded-xl border border-[#5c5959]  w-150">
        <Typography variant="h6">Portfolio Performance</Typography>

        <Box>
          <StockChart />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
