import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// Icons for the UI
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

/**
 * CALCULATOR PAGE
 * 
 * This component allows users to input their trade details (Buy Price, Quantity, etc.)
 * and see their potential Profit or Loss instantly.
 */
const Calculator = () => {
  
  /**
   * 1. STATE MANAGEMENT
   * state stores information that can change. When state changes, the page updates.
   */

  // 'formInputs' stores what the user types into the boxes
  const [formInputs, setFormInputs] = useState({
    symbol: "AAPL",
    buyPrice: "185.50",
    quantity: "50",
    currentPrice: "190.00",
  });

  // 'calculationResults' stores the math results after we click "Analyze"
  const [calculationResults, setCalculationResults] = useState({
    totalInvestment: 0,
    totalProfitOrLoss: 0,
    timeOfCalculation: null
  });

  // 'isAnalysisVisible' tells React whether to show the result cards on the right
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);

  /**
   * 2. CALCULATION LOGIC
   * This function runs only when you click the "Analyze" button.
   */
  const handleCalculate = () => {
    // Step A: Convert the text inputs into real Numbers
    const priceAtBuy = parseFloat(formInputs.buyPrice) || 0;
    const shareQuantity = parseFloat(formInputs.quantity) || 0;
    const priceNow = parseFloat(formInputs.currentPrice) || 0;

    // Step B: Do the basic Math
    // Total Investment = Price per share * Number of shares
    const investmentTotal = priceAtBuy * shareQuantity;
    
    // Profit/Loss = (Current Price - Buy Price) * Number of shares
    const profitOrLossTotal = (priceNow - priceAtBuy) * shareQuantity;

    // Step C: Save the results into state so React can display them
    setCalculationResults({
      totalInvestment: investmentTotal,
      totalProfitOrLoss: profitOrLossTotal,
      timeOfCalculation: new Date().toLocaleTimeString()
    });
    
    // Step D: Show the results panel
    setIsAnalysisVisible(true);
  };

  /**
   * 3. INPUT HANDLING
   * This function runs every time you type a character in any input box.
   */
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    
    // Update the specific field (like 'buyPrice') while keeping the others the same
    setFormInputs((previousState) => {
      return {
        ...previousState,
        [name]: name === "symbol" ? value.toUpperCase() : value
      };
    });
    
    // Hide the old results while the user is still typing
    setIsAnalysisVisible(false);
  };

  // Resets the whole form to empty values
  const handleClearAll = () => {
    setFormInputs({ symbol: "", buyPrice: "", quantity: "", currentPrice: "" });
    setIsAnalysisVisible(false);
    setCalculationResults({ totalInvestment: 0, totalProfitOrLoss: 0, timeOfCalculation: null });
  };

  /**
   * 4. STYLE CONFIGURATION
   * Custom styles for the Material UI text fields
   */
  const inputStyles = {
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .MuiOutlinedInput-input": { color: "white", "-webkit-text-fill-color": "white", py: 1.5 },
    "& .MuiOutlinedInput-input::placeholder": { color: "white", opacity: 0.9 }
  };

  return (
    <Box className="px-6 py-4 animate-in fade-in duration-700 bg-dashboard-bg min-h-[90vh]">
      
      {/* Page Header Area */}
      <Box className="mb-6">
        <Typography variant="h5" className="font-bold tracking-tight mb-1 uppercase text-white">
          Investment Dashboard
        </Typography>
        <Typography variant="caption" className="text-gray-500 font-medium">
          Calculate your trade performance instantly. All calculations are done locally in your browser.
        </Typography>
      </Box>

      {/* Main Container: Flexbox used to put Form and Results side-by-side */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
        
        {/* LEFT SECTION: Input Form */}
        <Box sx={{ flex: 1, minWidth: '400px' }}>
          <Box className="glass-card p-6">
            <Typography variant="subtitle2" className="font-bold mb-4 uppercase tracking-widest text-accent-blue">Setup Your Trade</Typography>
            
            <Box className="space-y-5">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">Stock Ticker</Typography>
                  <TextField fullWidth name="symbol" value={formInputs.symbol} onChange={handleTextChange} 
                    InputProps={{ startAdornment: <SearchIcon sx={{ color: "gray", fontSize: 18, mr: 1 }} />, className: "bg-white/5 rounded-xl" }} sx={inputStyles} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">Number of Shares</Typography>
                  <TextField fullWidth name="quantity" type="number" value={formInputs.quantity} onChange={handleTextChange} className="bg-white/5 rounded-xl" sx={inputStyles} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">Entry Price ($)</Typography>
                  <TextField fullWidth name="buyPrice" type="number" value={formInputs.buyPrice} onChange={handleTextChange} className="bg-white/5 rounded-xl" sx={inputStyles} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">Current Price ($)</Typography>
                  <TextField fullWidth name="currentPrice" type="number" value={formInputs.currentPrice} onChange={handleTextChange} className="bg-white/5 rounded-xl border border-accent-blue/20" sx={inputStyles} />
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box className="pt-2 flex gap-4">
                <Button fullWidth variant="contained" onClick={handleCalculate} startIcon={<PlayArrowIcon />} 
                  sx={{ bgcolor: "var(--color-accent-blue)", borderRadius: "14px", py: 1.5, fontWeight: 800 }}>Analyze Performance</Button>
                <Button fullWidth variant="outlined" onClick={handleClearAll} startIcon={<RestartAltIcon />} 
                  sx={{ borderColor: "white/10", color: "white", borderRadius: "14px", py: 1.5 }}>Reset Form</Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* RIGHT SECTION: Output Results */}
        <Box sx={{ flex: 1, minWidth: '400px' }}>
          {isAnalysisVisible ? (
            <Box className="flex flex-col gap-5 h-full">
              
              {/* Card 1: Total Investment Result */}
              <Box className="glass-card p-6 flex flex-col items-center text-center border-l-4 border-white/5">
                <Box className="p-3 bg-white/5 rounded-2xl mb-4"><AccountBalanceWalletIcon sx={{ color: "white" }} /></Box>
                <Typography variant="h4" className="font-black mb-1 p-0 text-white">
                  ${calculationResults.totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Typography>
                <Typography variant="caption" className="text-gray-500 font-black uppercase text-[11px] tracking-widest">Total Investment</Typography>
              </Box>

              {/* Card 2: Profit/Loss Result */}
              <Box className="glass-card p-6 flex flex-col items-center text-center border-l-4 border-white/5">
                <Box className={`p-3 bg-white/5 rounded-2xl mb-4`}>
                    {calculationResults.totalProfitOrLoss >= 0 ? <TrendingUpIcon className="text-positive" /> : <TrendingDownIcon className="text-negative" />}
                </Box>
                <Typography variant="h4" className={`font-black mb-1 p-0 ${calculationResults.totalProfitOrLoss >= 0 ? "text-positive" : "text-negative"}`}>
                  ${calculationResults.totalProfitOrLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Typography>
                <Typography variant="caption" className="text-gray-500 font-black uppercase text-[11px] tracking-widest">Calculated P/L</Typography>
              </Box>

              <Typography variant="caption" className="text-gray-700 text-center mt-2 lowercase italic tracking-wide">
                Analysis generated at {calculationResults.timeOfCalculation} (Local Machine)
              </Typography>
            </Box>
          ) : (
            <Box className="glass-card p-12 h-[380px] flex flex-col items-center justify-center border-dashed border-white/5 opacity-40">
              <Typography variant="body2" className="text-gray-500 font-black uppercase tracking-widest mb-2 font-mono">Ready to Analyze</Typography>
              <Typography variant="caption" className="text-gray-600">Enter trade data to see results here.</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Calculator;
