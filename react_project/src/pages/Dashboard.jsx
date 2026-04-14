import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// Icons for the UI components
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import BarChartIcon from "@mui/icons-material/BarChart";

import { Link } from "react-router-dom";
import MetricCard from "../components/dashboard/MetricCard";
import StockChart from "../components/dashboard/StockChart";

/**
 * HELPER FUNCTION: Current Time
 * Formats the current date and time for the UI.
 */
const getCurrentFormattedTime = () => {
  const now = new Date();
  return now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * DASHBOARD PAGE
 * 
 * This is the main page of the application. It fetches the latest stock prices
 * from our Backend and calculates summary metrics (Top Gainer, Total Volume, etc.)
 */
const Dashboard = () => {
  
  /**
   * 1. STATE DEFINITION
   * We use state to keep track of data that might change over time.
   */
  const [stockList, setStockList] = useState([]); // Stores the array of stocks from the API
  const [isDataLoading, setIsDataLoading] = useState(true); // Shows if the page is still waiting for data
  const [displayTime, setDisplayTime] = useState(getCurrentFormattedTime()); // The "Last Updated" timestamp

  /**
   * 2. DATA FETCHING
   * This function downloads the latest prices from our Node.js Backend.
   */
  const fetchLatestStockPrices = async () => {
    try {
      console.log("Connect to Backend: http://localhost:5000/api/stocks");
      
      const apiResponse = await axios.get("http://localhost:5000/api/stocks");
      const receivedData = apiResponse.data;
      
      if (receivedData && receivedData.length > 0) {
        setStockList(receivedData);
        console.log("Stocks loaded successfully.");
      }
      
      setIsDataLoading(false);
    } catch (error) {
      console.error("Dashboard Fetch Error:", error.message);
      setIsDataLoading(false);
    }
  };

  /**
   * 3. LIFECYCLE HOOK (useEffect)
   * The 'useEffect' hook runs code automatically. 
   * [] at the end means "Run this only once, when the page first opens".
   */
  useEffect(() => {
    // A. Fetch prices immediately on load
    fetchLatestStockPrices();

    // B. Set up an interval to refresh prices every 60 seconds
    const priceRefreshInterval = setInterval(() => {
      fetchLatestStockPrices();
    }, 60000);
    
    // C. Set up an interval to update the clock on the screen every minute
    const timeRefreshInterval = setInterval(() => {
      setDisplayTime(getCurrentFormattedTime());
    }, 60000);

    // CLEANUP: If the user leaves this page, stop the timers to save memory
    return () => {
      clearInterval(priceRefreshInterval);
      clearInterval(timeRefreshInterval);
    };
  }, []);

  /**
   * 4. METRICS CALCULATIONS
   * Instead of using complex "reduce" functions, we use simple "for" loops.
   * This is much easier for beginners to follow step-by-step.
   */
  const calculateDashboardMetrics = () => {
    // Default values if no stocks are loaded yet
    const defaultMetrics = {
      marketTotalValue: "0.00",
      averageMarketTrend: "0%",
      topGainerStock: { symbol: "---", changePercent: 0 },
      topLoserStock: { symbol: "---", changePercent: 0 },
      totalMarketVolume: "0",
      isTrendPositive: true
    };

    if (stockList.length === 0) {
        return defaultMetrics;
    }

    // Step A: Calculate Total Market Value and Average Trend
    let totalValueSum = 0;
    let totalTrendSum = 0;
    let totalVolumeCount = 0;

    for (let i = 0; i < stockList.length; i++) {
        const currentStock = stockList[i];
        totalValueSum = totalValueSum + currentStock.price;
        totalTrendSum = totalTrendSum + currentStock.changePercent;
        totalVolumeCount = totalVolumeCount + currentStock.volume;
    }

    const averageChange = totalTrendSum / stockList.length;

    // Step B: Find Top Gainer and Top Loser
    // We sort the list by performance percentage
    const sortedStocks = [...stockList].sort((a, b) => b.changePercent - a.changePercent);
    const topGainer = sortedStocks[0];
    const topLoser = sortedStocks[sortedStocks.length - 1];

    // Step C: Format Volume for Readability (Example: 1,000,000 -> 1M)
    let formattedVolume = totalVolumeCount.toLocaleString();
    if (totalVolumeCount >= 1000000000) {
        formattedVolume = (totalVolumeCount / 1000000000).toFixed(1) + "B";
    } else if (totalVolumeCount >= 1000000) {
        formattedVolume = (totalVolumeCount / 1000000).toFixed(1) + "M";
    }

    return {
      marketTotalValue: totalValueSum.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      averageMarketTrend: `${averageChange >= 0 ? "+" : ""}${averageChange.toFixed(2)}%`,
      topGainerStock: topGainer,
      topLoserStock: topLoser,
      totalMarketVolume: formattedVolume,
      isTrendPositive: averageChange >= 0
    };
  };

  const dashboardMetrics = calculateDashboardMetrics();

  return (
    <Box className="p-8 pb-12 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <Box className="flex justify-between items-end mb-10">
        <Box>
          <Typography variant="h3" className="font-bold tracking-tight mb-2 uppercase">
            Market Pulse
          </Typography>
          <Typography variant="body1" className="text-gray-500 font-medium max-w-lg">
            Monitor real-time market data, identify trends, and analyze your favorite tickers.
          </Typography>
        </Box>
        
        {/* Navigation Button */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            component={Link}
            to="/Calculator"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "var(--color-accent-blue)",
              color: "white",
              textTransform: "none",
              fontWeight: 800,
              borderRadius: "14px",
              px: 4,
              py: 1.5,
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            New Analysis
          </Button>
        </Stack>
      </Box>

      {/* METRICS GRID (4 Large Cards) */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Market Overview */}
        <MetricCard
          title="Market Overview"
          value={dashboardMetrics.marketTotalValue}
          trend={dashboardMetrics.averageMarketTrend}
          trendType={dashboardMetrics.isTrendPositive ? "up" : "down"}
          icon={TrendingUpIcon}
          subtitle={`Updated: ${displayTime}`}
        />

        {/* Card 2: Top Performing Stock */}
        <MetricCard
          title="Top Gainer"
          value={dashboardMetrics.topGainerStock.symbol}
          symbol={dashboardMetrics.topGainerStock.symbol}
          trend={`+${dashboardMetrics.topGainerStock.changePercent?.toFixed(2)}%`}
          trendType="up"
          icon={ElectricBoltIcon}
          subtitle={`Updated: ${displayTime}`}
        />

        {/* Card 3: Least Performing Stock */}
        <MetricCard
          title="Top Loser"
          value={dashboardMetrics.topLoserStock.symbol}
          symbol={dashboardMetrics.topLoserStock.symbol}
          trend={`${dashboardMetrics.topLoserStock.changePercent?.toFixed(2)}%`}
          trendType="down"
          icon={TrendingDownIcon}
          subtitle={`Updated: ${displayTime}`}
        />

        {/* Card 4: Total Trading Volume */}
        <MetricCard
          title="Total Volume"
          value={dashboardMetrics.totalMarketVolume}
          trend="+5.2%" // Static placeholder for UI consistency
          trendType="up"
          icon={BarChartIcon}
          subtitle={`Updated: ${displayTime}`}
        />
      </Box>

      {/* CHART SECTION: Displays the historical line graph */}
      <Box className="mb-8">
        <StockChart />
      </Box>

      {/* FOOTER */}
      <Box className="mt-12 pt-8 border-t border-white/5 text-center">
        <Typography variant="caption" className="text-gray-600 font-medium tracking-widest uppercase">
          © 2024 StockSight Analysis Lab. Data delayed by 15 mins.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
