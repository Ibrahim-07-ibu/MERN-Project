import React, { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";

/**
 * CHART RANGE SETTINGS
 * Defines the time periods users can select (1 Day, 1 Week, 1 Month).
 */
const TIME_RANGES = {
  "1D": { label: "1 Day", apiValue: "1d" },
  "1W": { label: "1 Week", apiValue: "1w" },
  "1M": { label: "1 Month", apiValue: "1m" },
};

/**
 * STOCK CHART COMPONENT
 * 
 * This component uses the 'Lightweight Charts' library to draw a professional
 * financial candlestick graph.
 */
const StockChart = ({ symbol = "AAPL" }) => {
  
  /**
   * 1. REFS (REFERENCES)
   * Why use refs? Refs allow us to access the actual HTML elements (DOM) directly.
   * This is necessary for charting libraries that need to "draw" inside an element.
   */
  const chartContainerElement = useRef(null); // The <div> where the chart will live
  const chartInstance = useRef(null);  // The actual chart object created by the library
  const seriesInstance = useRef(null); // The "line" or "candles" inside the chart

  /**
   * 2. STATE
   */
  const [selectedRange, setSelectedRange] = useState("1M");
  const [tickerStats, setTickerStats] = useState({ 
    lastPrice: 0, 
    priceChange: 0 
  });

  /**
   * 3. CHART INITIALIZATION (Run Once)
   * This useEffect creates the chart when the page first loads.
   */
  useEffect(() => {
    // If our HTML element isn't ready yet, don't do anything
    if (chartContainerElement.current === null) {
        return;
    }

    // Step A: Create and configure the basic chart looks
    const chart = createChart(chartContainerElement.current, {
      layout: { background: { color: "transparent" }, textColor: "#64748b" },
      attributionLogo: false,
      grid: { 
        vertLines: { color: "rgba(255,255,255,0.04)" }, 
        horzLines: { color: "rgba(255,255,255,0.04)" } 
      },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.06)", textColor: "#64748b" },
      timeScale: { borderColor: "rgba(255,255,255,0.06)", timeVisible: true }
    });

    // Step B: Add the "Candlestick" style series to the chart
    const candles = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e", 
      downColor: "#ef4444",
      borderUpColor: "#22c55e", 
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e", 
      wickDownColor: "#ef4444",
    });

    // Save these permanently in our Refs so other functions can use them later
    chartInstance.current = chart;
    seriesInstance.current = candles;

    /**
     * Step C: Handle Window Resize
     * Financial charts need to resize themselves manually if the window grows or shrinks.
     */
    const onWindowResize = () => {
      if (chartContainerElement.current) {
        chart.applyOptions({ 
            width: chartContainerElement.current.clientWidth, 
            height: chartContainerElement.current.clientHeight 
        });
      }
    };
    window.addEventListener("resize", onWindowResize);

    // CLEANUP: If the user closes this page, remove the chart to save memory
    return () => {
      window.removeEventListener("resize", onWindowResize);
      chart.remove();
    };
  }, []);

  /**
   * 4. DATA FETCHING (Run when range or symbol changes)
   * This function gets the price history from our Backend.
   */
  useEffect(() => {
    // We can't fetch data if the chart hasn't been created yet
    if (seriesInstance.current === null) {
        return;
    }

    const downloadHistoryData = async () => {
      try {
        const rangeCode = TIME_RANGES[selectedRange].apiValue;
        
        // Fetch raw history from our Node.js Backend
        const apiResponse = await fetch(`http://localhost:5000/api/stocks/${symbol}/history?range=${rangeCode}`);
        const historicalData = await apiResponse.json();
        
        // If we got valid data, tell the chart library to show it
        if (Array.isArray(historicalData) && historicalData.length > 0) {
            seriesInstance.current.setData(historicalData);
          
          // Step D: Manage the "Zoom" 
          // If viewing only 1 day, zoom in on the last few hours for detail
          if (selectedRange === "1D" && historicalData.length > 61) {
            chartInstance.current.timeScale().setVisibleLogicalRange({
              from: historicalData.length - 60,
              to: historicalData.length + 2,
            });
          } else {
            // Otherwise, zoom out to show the whole month/week
            chartInstance.current.timeScale().fitContent();
          }
          
          // Update the stats at the top of the chart
          const newestPricePoint = historicalData[historicalData.length - 1];
          const oldestPricePoint = historicalData[0];
          
          setTickerStats({ 
            lastPrice: newestPricePoint.close, 
            priceChange: newestPricePoint.close - oldestPricePoint.close
          });
        }
      } catch (error) {
        console.error("❌ Failed to fetch chart history:", error.message);
      }
    };

    downloadHistoryData();
  }, [symbol, selectedRange]);

  return (
    <Box className="glass-card p-6 flex flex-col" sx={{ height: "480px" }}>
      
      {/* CHART HEADER: Title and Stats */}
      <Box className="flex justify-between items-start mb-6">
        <Box>
          <Box className="flex items-center gap-2 mb-4">
            <Typography variant="h6" className="font-bold text-white uppercase tracking-tight">
              Market Performance
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => window.location.reload()} 
              sx={{ color: "rgba(255,255,255,0.1)", "&:hover": { color: "white" } }}
            >
              <RefreshIcon fontSize="inherit" />
            </IconButton>
          </Box>
          
          {/* Live Values */}
          <Box className="flex gap-12">
            <Box>
              <Typography variant="caption" className="text-gray-500 font-black tracking-widest uppercase block mb-1">
                Last Closed Price
              </Typography>
              <Typography variant="h4" className="font-black tracking-tighter text-white">
                ${tickerStats.lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" className="text-gray-500 font-black tracking-widest uppercase block mb-1">
                Accumulated Trend
              </Typography>
              <Typography variant="h4" className={`font-black tracking-tighter ${tickerStats.priceChange >= 0 ? "text-positive" : "text-negative"}`}>
                {tickerStats.priceChange >= 0 ? "+" : ""}${tickerStats.priceChange.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* TIME RANGE TOGGLE: Buttons for 1D, 1W, 1M */}
        <Box className="flex bg-white/5 p-1 rounded-2xl border border-white/5 h-fit">
          {Object.keys(TIME_RANGES).map((rangeKey) => (
            <Button
              key={rangeKey}
              onClick={() => setSelectedRange(rangeKey)}
              sx={{
                minWidth: 44,
                px: 2,
                py: 0.5,
                borderRadius: "12px",
                fontSize: "0.75rem",
                fontWeight: 900,
                color: selectedRange === rangeKey ? "white" : "#64748b",
                bgcolor: selectedRange === rangeKey ? "var(--color-accent-blue)" : "transparent",
                boxShadow: selectedRange === rangeKey ? "0 4px 15px rgba(59,130,246,0.3)" : "none",
                "&:hover": { bgcolor: selectedRange === rangeKey ? "var(--color-accent-blue)" : "white/5" }
              }}
            >
              {rangeKey}
            </Button>
          ))}
        </Box>
      </Box>

      {/* CHART CONTAINER: The actual graph is drawn inside this div */}
      <Box ref={chartContainerElement} className="flex-1 w-full rounded-2xl overflow-hidden" />
      
    </Box>
  );
};

export default StockChart;