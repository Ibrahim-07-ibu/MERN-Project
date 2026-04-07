import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import BarChartIcon from "@mui/icons-material/BarChart";

import MetricCard from "../components/dashboard/MetricCard";
import StockChart from "../components/dashboard/StockChart";
import MarketInsights from "../components/dashboard/MarketInsights";
import RecentActivity from "../components/dashboard/RecentActivity";
import ActiveWatchlist from "../components/dashboard/ActiveWatchlist";

const Dashboard = () => {
  return (
    <Box className="p-8 pb-12 animate-in fade-in duration-700">
      {/* Market Pulse Header */}
      <Box className="flex justify-between items-end mb-10">
        <Box>
          <Typography variant="h3" className="font-bold tracking-tight mb-2">
            Market Pulse
          </Typography>
          <Typography variant="body1" className="text-gray-500 font-medium max-w-lg">
            Your centralized command center for high-performance stock market tracking and analysis.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              borderColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "12px",
              px: 3,
              "&:hover": { borderColor: "rgba(255, 255, 255, 0.3)", bgcolor: "white/5" },
            }}
          >
            Export Data
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "var(--color-accent-blue)",
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "12px",
              px: 3,
              boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            New Calculation
          </Button>
        </Stack>
      </Box>

      {/* Summary Metrics */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Market Overview"
          value="4,529.12"
          trend="+2.4%"
          trendType="up"
          icon={TrendingUpIcon}
        />
        <MetricCard
          title="Top Gainer"
          value="NVDA"
          trend="+4.58%"
          trendType="up"
          icon={ElectricBoltIcon}
        />
        <MetricCard
          title="Top Loser"
          value="TSLA"
          trend="-2.15%"
          trendType="down"
          icon={TrendingDownIcon}
        />
        <MetricCard
          title="Total Volume"
          value="1.2B"
          trend="+12%"
          trendType="up"
          icon={BarChartIcon}
        />
      </Box>

      {/* Main Content Grid */}
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Box className="lg:col-span-2">
          <StockChart />
        </Box>
        <Box className="lg:col-span-1">
          <MarketInsights />
        </Box>
      </Box>

      {/* Bottom Grid */}
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Box className="lg:col-span-2">
          <RecentActivity />
        </Box>
        <Box className="lg:col-span-1">
          <ActiveWatchlist />
        </Box>
      </Box>

      {/* Footer */}
      <Box className="mt-12 pt-8 border-t border-white/5 text-center">
        <Typography variant="caption" className="text-gray-600 font-medium">
          © 2024 Stock Market Analysis Platform. All market data is delayed by 15 minutes. Terms of Service | Privacy Policy
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
