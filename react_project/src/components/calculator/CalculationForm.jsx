import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CalculationForm = ({ inputs, handleInputChange, onCalculate, onReset }) => {
  const textFieldSx = {
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .MuiOutlinedInput-input": { color: "white", "-webkit-text-fill-color": "white", py: 1.5 },
    "& .MuiOutlinedInput-input::placeholder": { color: "white", opacity: 0.9, "-webkit-text-fill-color": "white" }
  };

  return (
    <Box>
      <Box className="glass-card p-5 mb-4">
        <Typography variant="subtitle1" className="font-bold mb-4 uppercase tracking-wider text-accent-blue">Trade Parameters</Typography>
        
        <Box className="space-y-4">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">Ticker</Typography>
              <TextField
                fullWidth
                name="symbol"
                value={inputs.symbol}
                onChange={handleInputChange}
                placeholder="AAPL"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon className="text-gray-500" sx={{ fontSize: 18 }} /></InputAdornment>,
                  className: "bg-white/5 border-white/10 rounded-lg text-white"
                }}
                sx={textFieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">Quantity</Typography>
              <TextField
                fullWidth
                type="number"
                name="quantity"
                value={inputs.quantity}
                onChange={handleInputChange}
                className="bg-white/5 rounded-lg"
                sx={textFieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">Entry Price ($)</Typography>
              <TextField
                fullWidth
                type="number"
                name="buyPrice"
                value={inputs.buyPrice}
                onChange={handleInputChange}
                className="bg-white/5 rounded-lg"
                sx={textFieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">Market Price ($)</Typography>
              <TextField
                fullWidth
                type="number"
                name="currentPrice"
                value={inputs.currentPrice}
                onChange={handleInputChange}
                className="bg-white/5 rounded-lg border border-accent-blue/30"
                sx={textFieldSx}
              />
            </Grid>
          </Grid>

          <Box className="pt-2 flex gap-3">
            <Button
              fullWidth
              variant="contained"
              onClick={onCalculate}
              startIcon={<PlayArrowIcon />}
              sx={{
                bgcolor: "var(--color-accent-blue)",
                py: 1.2,
                borderRadius: "10px",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: "#2563eb" }
              }}
            >
              Analyze
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={onReset}
              startIcon={<RestartAltIcon />}
              sx={{
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                py: 1.2,
                borderRadius: "10px",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { borderColor: "rgba(255, 255, 255, 0.3)", bgcolor: "white/5" }
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CalculationForm;
