import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CalculationForm = ({ inputs, handleInputChange, onCalculate, onReset, riskRewardRatio }) => {
  return (
    <Box>
      <Box className="glass-card p-8 mb-6">
        <Typography variant="h6" className="font-bold mb-6">Calculation Parameters</Typography>
        
        <Box className="space-y-6">
          <Box>
            <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-2 block">Stock Symbol</Typography>
            <TextField
              fullWidth
              name="symbol"
              value={inputs.symbol}
              onChange={handleInputChange}
              placeholder="e.g. AAPL"
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon className="text-gray-500" /></InputAdornment>,
                className: "bg-white/5 border-white/10 rounded-xl text-white"
              }}
              sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            />
          </Box>

          <Box className="flex gap-4">
            <Box className="flex-1">
              <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-2 block">Buy Price ($)</Typography>
              <TextField
                fullWidth
                type="number"
                name="buyPrice"
                value={inputs.buyPrice}
                onChange={handleInputChange}
                className="bg-white/5 rounded-xl"
                InputProps={{ className: "text-white" }}
                sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
              />
            </Box>
            <Box className="flex-1">
              <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-2 block">Quantity</Typography>
              <TextField
                fullWidth
                type="number"
                name="quantity"
                value={inputs.quantity}
                onChange={handleInputChange}
                className="bg-white/5 rounded-xl"
                InputProps={{ className: "text-white" }}
                sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
              />
            </Box>
          </Box>

          <Box className="flex gap-4">
            <Box className="flex-1">
              <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-2 block">Target Price ($)</Typography>
              <TextField
                fullWidth
                type="number"
                name="targetPrice"
                value={inputs.targetPrice}
                onChange={handleInputChange}
                className="bg-white/5 rounded-xl"
                InputProps={{ className: "text-white" }}
                sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
              />
            </Box>
            <Box className="flex-1">
              <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-2 block">Stop Loss ($)</Typography>
              <TextField
                fullWidth
                type="number"
                name="stopLoss"
                value={inputs.stopLoss}
                onChange={handleInputChange}
                className="bg-white/5 rounded-xl"
                InputProps={{ className: "text-red-400" }}
                sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
              />
            </Box>
          </Box>

          <Box className="pt-4 space-y-3">
            <Button
              fullWidth
              variant="contained"
              onClick={onCalculate}
              startIcon={<PlayArrowIcon />}
              sx={{
                bgcolor: "var(--color-accent-blue)",
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
                "&:hover": { bgcolor: "#2563eb" }
              }}
            >
              Run Analysis
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={onReset}
              startIcon={<RestartAltIcon />}
              sx={{
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { borderColor: "rgba(255, 255, 255, 0.3)", bgcolor: "white/5" }
              }}
            >
              Reset All Fields
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex gap-4 items-start shadow-lg shadow-blue-500/5">
        <Box className="p-2 bg-blue-500/20 rounded-full text-blue-400">
          <InfoOutlinedIcon sx={{ fontSize: 20 }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" className="text-white font-bold mb-1">Smart Trading Insight</Typography>
          <Typography variant="caption" className="text-blue-200 block leading-relaxed">
            Professional traders typically aim for a Risk-Reward ratio of at least 1:3. Your current configuration provides a ratio of <span className="font-bold">{riskRewardRatio}:1</span>.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CalculationForm;
