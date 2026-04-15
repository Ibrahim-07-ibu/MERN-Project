import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment"
import axios from "axios";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const Calculator = () => {

  const [symbol, setSymbol] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stocks")
      .then(res => setStockList(res.data))
      .catch(err => console.error("Failed to load stocks:", err));
  }, []);

  const handleStockSelect = (e) => {
    const selectedSymbol = e.target.value;
    const stock = stockList.find(s => s.symbol === selectedSymbol);
    setSymbol(selectedSymbol);
    if (stock) {
      setCurrentPrice(stock.price.toFixed(2));
    }
  };

  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const buy = parseFloat(buyPrice) || 0;
    const qty = parseFloat(quantity) || 0;
    const current = parseFloat(currentPrice) || 0;

    const totalInvestment = buy * qty;
    const profitOrLoss = (current - buy) * qty;
    const returnPercent = buy > 0 ? ((current - buy) / buy) * 100 : 0;

    setResults({
      totalInvestment,
      profitOrLoss,
      returnPercent,
      time: new Date().toLocaleTimeString(),
    });
  };

  const handleReset = () => {
    setSymbol("");
    setBuyPrice("");
    setQuantity("");
    setCurrentPrice("");
    setResults(null);
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "rgba(255,255,255,0.05)",
      borderRadius: "10px",
      color: "white",
      "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
      "&.Mui-focused fieldset": { borderColor: "var(--color-accent-blue)" },
    },
    "& input": { color: "white" },
    "& input[type=number]": { MozAppearance: "textfield" },
  };

  const isProfit = results && results.profitOrLoss >= 0;

  return (
    <Box className="px-6 py-6 animate-in fade-in duration-700 min-h-screen">

      {}
      <Box className="mb-8">
        <Typography variant="h5" className="font-bold tracking-tight uppercase text-white mb-1">
          Investment Calculator
        </Typography>
        <Typography variant="caption" className="text-gray-500 font-medium">
          Enter your trade details and click Analyze to instantly calculate your profit or loss.
        </Typography>
      </Box>

      {}
      <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start", flexWrap: "wrap" }}>

        {}
        <Box sx={{ flex: 1, minWidth: 340 }}>
          <Box className="glass-card p-6">
            <Typography
              variant="subtitle2"
              className="font-bold mb-5 uppercase tracking-widest"
              sx={{ color: "var(--color-accent-blue)" }}
            >
              Setup Your Trade
            </Typography>

            <Grid container spacing={2}>

              {}
              <Grid item xs={6}>
                <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">
                  Stock Ticker
                </Typography>
                <Select
                  fullWidth
                  displayEmpty
                  value={symbol}
                  onChange={handleStockSelect}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderRadius: "10px",
                    color: symbol ? "white" : "rgba(255,255,255,0.35)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--color-accent-blue)" },
                    "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.4)" },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: "#0f0f1a",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                        mt: 0.5,
                        "& .MuiMenuItem-root": {
                          color: "white",
                          fontSize: "0.9rem",
                          py: 1.2,
                          "&:hover": { bgcolor: "rgba(59,130,246,0.12)" },
                          "&.Mui-selected": { bgcolor: "rgba(59,130,246,0.2)", color: "var(--color-accent-blue)" },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled sx={{ color: "rgba(255,255,255,0.3)" }}>
                    Select a stock...
                  </MenuItem>
                  {stockList.map(s => (
                    <MenuItem key={s.symbol} value={s.symbol}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", gap: 2 }}>
                        <Box>
                          <span style={{ fontWeight: 800 }}>{s.symbol}</span>
                          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", marginLeft: 8 }}>{s.company}</span>
                        </Box>
                        <span style={{ color: s.changePercent >= 0 ? "#10b981" : "#ef4444", fontWeight: 700, fontSize: "0.82rem" }}>
                          {s.changePercent >= 0 ? "+" : ""}{s.changePercent?.toFixed(2)}%
                        </span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {}
              <Grid item xs={6}>
                <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">
                  Number of Shares
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 50"
                  sx={fieldSx}
                />
              </Grid>

              {}
              <Grid item xs={6}>
                <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">
                  Entry Price ($)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  placeholder="e.g. 185.50"
                  sx={fieldSx}
                />
              </Grid>

              {}
              <Grid item xs={6}>
                <Typography variant="caption" className="text-gray-500 font-bold uppercase mb-1 block">
                  Current Price ($)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  placeholder="e.g. 190.00"
                  sx={fieldSx}
                />
              </Grid>

            </Grid>

            {}
            <Box className="flex gap-3 mt-6">
              <Button
                fullWidth
                variant="contained"
                onClick={handleCalculate}
                startIcon={<PlayArrowIcon />}
                sx={{
                  bgcolor: "var(--color-accent-blue)",
                  borderRadius: "12px",
                  py: 1.5,
                  fontWeight: 800,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  "&:hover": { bgcolor: "#2563eb" },
                }}
              >
                Analyze Performance
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleReset}
                startIcon={<RestartAltIcon />}
                sx={{
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "white",
                  borderRadius: "12px",
                  py: 1.5,
                  textTransform: "none",
                  "&:hover": { borderColor: "rgba(255,255,255,0.3)", bgcolor: "rgba(255,255,255,0.05)" },
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Box>

        {}
        <Box sx={{ flex: 1, minWidth: 340 }}>
          {results === null ? (
            
            <Box
              className="glass-card p-12 flex flex-col items-center justify-center text-center"
              sx={{ height: 340, opacity: 0.45, border: "1px dashed rgba(255,255,255,0.1)" }}
            >
              <AccountBalanceWalletIcon sx={{ color: "gray", fontSize: 52, mb: 2 }} />
              <Typography variant="body2" className="font-black uppercase tracking-widest text-gray-500 mb-1">
                Ready to Analyze
              </Typography>
              <Typography variant="caption" className="text-gray-600">
                Fill in your trade details and click Analyze Performance.
              </Typography>
            </Box>
          ) : (
            
            <Box className="flex flex-col gap-4">

              {}
              <Box className="glass-card p-6 flex items-center gap-5">
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "rgba(59,130,246,0.12)",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccountBalanceWalletIcon sx={{ color: "var(--color-accent-blue)", fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="caption" className="text-gray-500 font-bold uppercase tracking-widest block mb-0.5">
                    Total Investment
                  </Typography>
                  <Typography variant="h5" className="font-black text-white">
                    ${results.totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Typography>
                </Box>
              </Box>

              {}
              <Box className="glass-card p-6 flex items-center gap-5">
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: isProfit ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {isProfit
                    ? <TrendingUpIcon sx={{ color: "var(--color-positive)", fontSize: 32 }} />
                    : <TrendingDownIcon sx={{ color: "var(--color-negative)", fontSize: 32 }} />
                  }
                </Box>
                <Box>
                  <Typography variant="caption" className="text-gray-500 font-bold uppercase tracking-widest block mb-0.5">
                    Profit / Loss
                  </Typography>
                  <Typography
                    variant="h5"
                    className="font-black"
                    sx={{ color: isProfit ? "var(--color-positive)" : "var(--color-negative)" }}
                  >
                    {isProfit ? "+" : ""}${results.profitOrLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Typography>
                </Box>
              </Box>

              {}
              <Box className="glass-card p-6 flex items-center gap-5">
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: isProfit ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  <span style={{ fontSize: 28 }}>{isProfit ? "" : ""}</span>
                </Box>
                <Box>
                  <Typography variant="caption" className="text-gray-500 font-bold uppercase tracking-widest block mb-0.5">
                    Return on Investment
                  </Typography>
                  <Typography
                    variant="h5"
                    className="font-black"
                    sx={{ color: isProfit ? "var(--color-positive)" : "var(--color-negative)" }}
                  >
                    {isProfit ? "+" : ""}{results.returnPercent.toFixed(2)}%
                  </Typography>
                </Box>
              </Box>

              <Typography variant="caption" className="text-gray-700 text-center italic tracking-wide">
                Analyzed at {results.time} — click Analyze again to refresh
              </Typography>

            </Box>
          )}
        </Box>

      </Box>
    </Box>
  );
};

export default Calculator;
