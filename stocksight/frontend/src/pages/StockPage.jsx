import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import StockChart from "../components/dashboard/StockChart";

const StockPage = () => {

  const { symbol } = useParams();

  const [stockDetails, setStockDetails] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {

    const downloadStockData = async () => {

      setIsPageLoading(true);
      setErrorMessage(null);

      try {

        const apiResponse = await axios.get(`http://localhost:5000/api/stocks/${symbol}`);

        setStockDetails(apiResponse.data);
      } catch (error) {
        console.error(" Stock Page Error:", error.message);
        setErrorMessage(`The symbol "${symbol}" could not be found in our database.`);
      } finally {

        setIsPageLoading(false);
      }
    };

    downloadStockData();
  }, [symbol]);

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

  if (errorMessage !== null || stockDetails === null) {
    return (
      <Box className="p-12 text-center max-w-2xl mx-auto glass-card mt-20">
        <Typography variant="h4" className="text-white font-black mb-4 uppercase">
          Ticker Not Found
        </Typography>
        <Typography variant="body1" className="text-gray-500 mb-8 font-medium">
          {errorMessage || "We encountered an error while retrieving the market data."}
        </Typography>
        
        {}
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

  const isPricePositive = stockDetails.change >= 0;

  return (
    <Box className="p-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {}
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

        {}
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

      {}
      <Box className="grid grid-cols-1 gap-8 mb-8">
        <Box>
            {}
            <StockChart symbol={symbol} />
        </Box>
      </Box>

      {}
      <Box className="mt-12 pt-8 border-t border-white/5 text-center">
        <Typography variant="caption" className="text-gray-700 font-black uppercase tracking-widest text-[10px]">
          © 2024 StockSight Analysis Platform. All information is for educational purposes.
        </Typography>
      </Box>
      
    </Box>
  );
};

export default StockPage;
