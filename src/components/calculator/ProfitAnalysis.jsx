import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ProfitAnalysis = ({ inputs, results }) => {
  const getSpectrumPosition = () => {
    const { buyPrice, targetPrice, stopLoss } = inputs;
    const range = targetPrice - stopLoss;
    if (range === 0) return 50;
    const position = ((buyPrice - stopLoss) / range) * 100;
    return Math.min(Math.max(position, 0), 100);
  };

  return (
    <Box className="glass-card p-8">
      <Box className="flex items-center gap-3 mb-8">
        <Box className="p-2 bg-white/5 rounded-full text-gray-400">
          <CheckCircleOutlineIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle1" className="font-bold">Profit Analysis Summary</Typography>
          <Typography variant="caption" className="text-gray-500">Detailed visual breakdown of your trade setup</Typography>
        </Box>
      </Box>

      <Box className="mb-10">
        <Box className="flex justify-between mb-2">
          <Typography variant="caption" className="font-bold flex items-center gap-1 text-negative">
            <span className="w-2 h-2 rounded-full bg-negative"></span> RISK
          </Typography>
          <Typography variant="caption" className="font-bold text-gray-500">REWARD</Typography>
        </Box>
        <Box className="h-2 w-full bg-white/5 rounded-full relative overflow-hidden">
          <Box 
            className="h-full bg-negative" 
            style={{ width: `${getSpectrumPosition()}%` }}
          />
          <Box 
            className="h-full bg-positive absolute top-0" 
            style={{ left: `${getSpectrumPosition()}%`, width: `${100 - getSpectrumPosition()}%` }}
          />
          <Box 
            className="w-1 h-6 bg-white absolute top-1/2 -translate-y-1/2 rounded-full border-2 border-dashboard-bg" 
            style={{ left: `${getSpectrumPosition()}%` }}
          />
        </Box>
        <Box className="flex justify-between mt-4">
          <Box>
            <Typography variant="caption" className="text-gray-500 block">Stop Loss</Typography>
            <Typography variant="body2" className="font-bold">${inputs.stopLoss}</Typography>
          </Box>
          <Box className="text-center">
            <Typography variant="caption" className="text-gray-500 block">Entry</Typography>
            <Typography variant="body2" className="font-bold">${inputs.buyPrice}</Typography>
          </Box>
          <Box className="text-right">
            <Typography variant="caption" className="text-gray-500 block">Target</Typography>
            <Typography variant="body2" className="font-bold">${inputs.targetPrice}</Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={4} className="border-t border-white/5 pt-8">
        <Grid item xs={4} className="text-center">
          <Typography variant="caption" className="text-gray-500 font-bold uppercase block mb-1">Max Risk</Typography>
          <Typography variant="h6" className="text-negative font-bold">${results.maxRisk.toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={4} className="text-center border-x border-white/5">
          <Typography variant="caption" className="text-gray-500 font-bold uppercase block mb-1">Break Even</Typography>
          <Typography variant="h6" className="font-bold">${inputs.buyPrice}</Typography>
        </Grid>
        <Grid item xs={4} className="text-center">
          <Typography variant="caption" className="text-gray-500 font-bold uppercase block mb-1">Max Yield</Typography>
          <Typography variant="h6" className="text-positive font-bold">${results.maxYield.toLocaleString()}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfitAnalysis;
