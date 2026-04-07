import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Modular Components
import CalculationForm from "../components/calculator/CalculationForm";
import CalculationStats from "../components/calculator/CalculationStats";
import ProfitAnalysis from "../components/calculator/ProfitAnalysis";

const Calculator = () => {
  const [inputs, setInputs] = useState({
    symbol: "AAPL",
    buyPrice: 185.50,
    quantity: 50,
    targetPrice: 220.00,
    stopLoss: 175.00,
  });

  const [results, setResults] = useState({
    investmentAmount: 0,
    expectedProfit: 0,
    profitPercentage: 0,
    riskRewardRatio: 0,
    maxRisk: 0,
    maxYield: 0,
  });

  const calculate = () => {
    const { buyPrice, quantity, targetPrice, stopLoss } = inputs;
    const investmentAmount = buyPrice * quantity;
    const expectedProfit = (targetPrice - buyPrice) * quantity;
    const profitPercentage = ((targetPrice - buyPrice) / buyPrice) * 100 || 0;
    const riskAmount = (buyPrice - stopLoss) * quantity;
    const rrRatio = (targetPrice - buyPrice) / (buyPrice - stopLoss) || 0;

    setResults({
      investmentAmount,
      expectedProfit,
      profitPercentage,
      riskRewardRatio: rrRatio.toFixed(2),
      maxRisk: riskAmount,
      maxYield: expectedProfit,
    });
  };

  useEffect(() => {
    calculate();
  }, [inputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === "symbol" ? value.toUpperCase() : parseFloat(value) || 0
    }));
  };

  const handleReset = () => {
    setInputs({
      symbol: "",
      buyPrice: 0,
      quantity: 0,
      targetPrice: 0,
      stopLoss: 0,
    });
  };

  return (
    <Box className="p-8 pb-12 animate-in fade-in duration-700">
      {/* Page Header */}
      <Box className="mb-10">
        <Typography variant="h3" className="font-bold tracking-tight mb-2 uppercase">
          Profit Projection
        </Typography>
        <Typography variant="body1" className="text-gray-500 font-medium max-w-2xl">
          Simulate your investment outcomes by entering your entry price, target exit, and risk threshold. Our tool calculates the potential ROI and Risk-Reward ratio instantly.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column: Form & Insight */}
        <Grid item xs={12} lg={5}>
          <CalculationForm 
            inputs={inputs} 
            handleInputChange={handleInputChange} 
            onCalculate={calculate} 
            onReset={handleReset} 
            riskRewardRatio={results.riskRewardRatio}
          />
        </Grid>

        {/* Right Column: Results & Summary */}
        <Grid item xs={12} lg={7}>
          <CalculationStats results={results} symbol={inputs.symbol} />
          <ProfitAnalysis inputs={inputs} results={results} />
        </Grid>
      </Grid>

      {/* Footer Copy */}
      <Box className="mt-12 pt-8 border-t border-white/5 text-center">
        <Typography variant="caption" className="text-gray-600 font-medium">
          © 2024 Stock Market Analysis Platform. All market data is delayed by 15 minutes. Terms of Service | Privacy Policy
        </Typography>
      </Box>
    </Box>
  );
};

export default Calculator;
