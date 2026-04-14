import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import BarChartIcon from "@mui/icons-material/BarChart";

import { Link } from "react-router-dom";
import MetricCard from "../components/dashboard/MetricCard";
import StockChart from "../components/dashboard/StockChart";

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

const Dashboard = () => {

  const [stockList, setStockList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [displayTime, setDisplayTime] = useState(getCurrentFormattedTime());

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

  useEffect(() => {

    fetchLatestStockPrices();

    const priceRefreshInterval = setInterval(() => {
      fetchLatestStockPrices();
    }, 60000);

    const timeRefreshInterval = setInterval(() => {
      setDisplayTime(getCurrentFormattedTime());
    }, 60000);

    return () => {
      clearInterval(priceRefreshInterval);
      clearInterval(timeRefreshInterval);
    };
  }, []);

  const calculateDashboardMetrics = () => {

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

    const sortedStocks = [...stockList].sort((a, b) => b.changePercent - a.changePercent);
    const topGainer = sortedStocks[0];
    const topLoser = sortedStocks[sortedStocks.length - 1];

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
      
      {}
      <Box className="flex justify-between items-end mb-10">
        <Box>
          <Typography variant="h3" className="font-bold tracking-tight mb-2 uppercase">
            Market Pulse
          </Typography>
          <Typography variant="body1" className="text-gray-500 font-medium max-w-lg">
            Monitor real-time market data, identify trends, and analyze your favorite tickers.
          </Typography>
        </Box>
        
        {}
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

      {}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {}
        <MetricCard
          title="Market Overview"
          value={dashboardMetrics.marketTotalValue}
          trend={dashboardMetrics.averageMarketTrend}
          trendType={dashboardMetrics.isTrendPositive ? "up" : "down"}
          icon={TrendingUpIcon}
          subtitle={`Updated: ${displayTime}`}
        />

        {}
        <MetricCard
          title="Top Gainer"
          value={dashboardMetrics.topGainerStock.symbol}
          symbol={dashboardMetrics.topGainerStock.symbol}
          trend={`+${dashboardMetrics.topGainerStock.changePercent?.toFixed(2)}%`}
          trendType="up"
          icon={ElectricBoltIcon}
          subtitle={`Updated: ${displayTime}`}
        />

        {}
        <MetricCard
          title="Top Loser"
          value={dashboardMetrics.topLoserStock.symbol}
          symbol={dashboardMetrics.topLoserStock.symbol}
          trend={`${dashboardMetrics.topLoserStock.changePercent?.toFixed(2)}%`}
          trendType="down"
          icon={TrendingDownIcon}
          subtitle={`Updated: ${displayTime}`}
        />

        {}
        <MetricCard
          title="Total Volume"
          value={dashboardMetrics.totalMarketVolume}
          trend="+5.2%"
          trendType="up"
          icon={BarChartIcon}
          subtitle={`Updated: ${displayTime}`}
        />
      </Box>

      {}
      <Box className="mb-8">
        <StockChart />
      </Box>

      {}
      <Box className="mt-12 pt-8 border-t border-white/5 text-center">
        <Typography variant="caption" className="text-gray-600 font-medium tracking-widest uppercase">
          © 2024 StockSight Analysis Lab. Data delayed by 15 mins.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
