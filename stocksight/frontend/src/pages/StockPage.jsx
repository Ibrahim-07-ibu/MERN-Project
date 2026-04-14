import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

// Import our shared chart component
import StockChart from "../components/dashboard/StockChart";

/**
 * STOCK DETAIL PAGE
 * 
 * This page shows deep insights for a specific stock (like AAPL or TSLA).
 * It uses the 'symbol' from the URL to know which stock to fetch.
 */
const StockPage = () => {
  
  /**
   * 1. URL PARAMETERS
   * 'useParams' is a special React hook that grabs variables from the URL.
   * Example: If the URL is /stocks/AAPL, then 'symbol' will be "AAPL".
   */
  const { symbol } = useParams();

  /**
   * 2. STATE MANAGEMENT
   */
  const [stockDetails, setStockDetails] = useState(null); // Stores the full stock object
  const [isPageLoading, setIsPageLoading] = useState(true); // Loading spinner state
  const [errorMessage, setErrorMessage] = useState(null); // Stores error text if something fails

  /**
   * 3. DATA FETCHING (LIFECYCLE)
   * This effect runs every time the 'symbol' in the URL changes.
   */
  useEffect(() => {
    
    // Internal function to handle the API call
    const downloadStockData = async () => {
      // Reset state for the new stock
      setIsPageLoading(true);
      setErrorMessage(null);

      try {
        // Fetch data from our Backend API using the symbol from the URL
        const apiResponse = await axios.get(`http://localhost:5000/api/stocks/${symbol}`);
        
        // Save the successful result
        setStockDetails(apiResponse.data);
      } catch (error) {
        console.error("❌ Stock Page Error:", error.message);
        setErrorMessage(`The symbol "${symbol}" could not be found in our database.`);
      } finally {
        // Whether it succeeded or failed, we are no longer "loading"
        setIsPageLoading(false);
      }
    };

    downloadStockData();
  }, [symbol]);

  /**
   * 4. CONDITIONAL RENDERING (Loading State)
   * If we are still waiting for the API, show a loading spinner.
   */
  if (isPageLoading === true && stockDetails === null) {
    return (
      <Box className="flex items-center justify-center h-[80vh]">
        <CircularProgress sx={{ color: "var(--color-accent-blue)" }} />
        <Typography variant="body1" className="ml-4 text-gray-500 font-bold uppercase tracking-widest">
            Loading {symbol}...
        </Typography>
      </Box>
    );
  }

  /**
   * 5. CONDITIONAL RENDERING (Error State)
   * If the stock symbol doesn't exist, show a helpful error message.
   */
  if (errorMessage !== null || stockDetails === null) {
    return (
      <Box className="p-12 text-center max-w-2xl mx-auto glass-card mt-20">
        <Typography variant="h4" className="text-white font-black mb-4 uppercase">
          Ticker Not Found
        </Typography>
        <Typography variant="body1" className="text-gray-500 mb-8 font-medium">
          {errorMessage || "We encountered an error while retrieving the market data."}
        </Typography>
        
        {/* Helper buttons to get user back on track */}
        <Box className="flex justify-center gap-4">
          {["AAPL", "TSLA", "NVDA"].map((exampleSymbol) => (
            <Box 
                key={exampleSymbol} 
                className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-accent-blue font-black text-xs cursor-pointer hover:bg-white/10" 
                onClick={() => window.location.href=`/stocks/${exampleSymbol}`}
            >
              TRY {exampleSymbol}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  // Helper boolean to see if the price is up or down
  const isPricePositive = stockDetails.change >= 0;

  return (
    <Box className="p-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 6. HERO SECTION: Big Name and Price */}
      <Box className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
        <Box>
          <Box className="flex items-center gap-3 mb-4">
             <Box className="px-3 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                <Typography variant="caption" className="font-black text-accent-blue tracking-widest uppercase text-[10px]">
                  Real-time Intelligence
                </Typography>
             </Box>
             <Box className="w-2 h-2 rounded-full bg-positive animate-pulse" />
          </Box>
          
          <Box className="flex items-center gap-4 mb-4">
            <Typography variant="h2" className="font-black tracking-tighter text-white leading-none">
              {stockDetails.company}
            </Typography>
            <Box className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
              <Typography variant="h5" className="font-black text-gray-600 tracking-tight">
                {stockDetails.symbol}
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body1" className="text-gray-500 font-medium max-w-xl leading-relaxed">
             Viewing detailed technical analysis for {stockDetails.company}. 
             Our system aggregates data from institutional providers to give you a clear market edge.
          </Typography>
        </Box>

        {/* 7. PRICE HIGHLIGHT CARD */}
        <Box className="glass-card p-10 min-w-[340px] border-l-8" style={{ borderColor: isPricePositive ? 'var(--color-positive)' : 'var(--color-negative)' }}>
          <Typography variant="caption" className="text-gray-500 font-black tracking-widest uppercase mb-3 block">
            Market Value ({stockDetails.currency || 'USD'})
          </Typography>
          
          <Box className="flex items-center gap-5">
            <Typography variant="h2" className="font-black text-white tracking-tighter leading-none">
              ${stockDetails.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
            
            <Box className={`flex items-center gap-1 font-black ${isPricePositive ? "text-positive" : "text-negative"}`}>
              {isPricePositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
              <Typography variant="h5" className="font-black">
                {isPricePositive ? "+" : ""}{stockDetails.changePercent?.toFixed(2)}%
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="caption" className="text-gray-600 font-black mt-3 block uppercase tracking-wider">
            Today's Movement: {isPricePositive ? "+" : ""}${stockDetails.change?.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {/* 8. CHART AREA */}
      <Box className="grid grid-cols-1 gap-8 mb-8">
        <Box>
            {/* We pass the 'symbol' prop into our StockChart component */}
            <StockChart symbol={symbol} />
        </Box>
      </Box>

      {/* FOOTER */}
      <Box className="mt-12 pt-8 border-t border-white/5 text-center">
        <Typography variant="caption" className="text-gray-700 font-black uppercase tracking-widest text-[10px]">
          © 2024 StockSight Analysis Platform. All information is for educational purposes.
        </Typography>
      </Box>
      
    </Box>
  );
};

export default StockPage;
