import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    if (e.key === "Enter" && search.trim()) {
      const symbol = search.trim().toUpperCase();
      setLoading(true);
      setError("");

      try {

        await axios.get(`http://localhost:5000/api/stocks/${symbol}`);

        navigate(`/stocks/${symbol}`);
        setSearch("");
      } catch (err) {

        setError(err.response?.data?.message || "Stock not found or we don't provide data for this company.");
      } finally {
        setLoading(false);
      }
    }
  };

  const getTitle = () => {
    if (location.pathname.startsWith("/stocks/")) {
      return "Stock Analysis";
    }
    switch (location.pathname) {
      case "/Calculator": return "Stock Profit Calculator";
      case "/Profile": return "My Profile";
      case "/Dashboard":
      default: return "Dashboard Overview";
    }
  };

  return (
    <Box
      sx={{
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        bgcolor: "transparent",
      }}
    >
      {}
      <Box className="flex items-center gap-2">
        <Typography variant="body1" className="font-bold text-white text-lg">
          {getTitle()}
        </Typography>
        <ChevronRightIcon sx={{ color: "var(--color-text-muted)", fontSize: 20 }} />
        <Typography variant="body2" className="text-gray-500 font-medium">
          Platform
        </Typography>
      </Box>

      {}
      <Box className="flex-1 max-w-xl mx-8 relative">
        <Box 
          className={`flex items-center bg-white/5 border rounded-xl px-4 py-2 transition-all ${
            error ? "border-red-500/50" : "border-white/10"
          } focus-within:border-blue-500/50`}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "var(--color-accent-blue)", mr: 1 }} />
          ) : (
            <SearchIcon sx={{ color: error ? "#ef4444" : "var(--color-text-muted)", mr: 1, fontSize: 20 }} />
          )}
          <InputBase
            placeholder="Search stock (e.g. AAPL, TSLA)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={handleSearch}
            disabled={loading}
            sx={{ 
              color: "white", 
              width: "100%",
              fontSize: "0.9rem",
              "& .MuiInputBase-input::placeholder": {
                color: "var(--color-text-muted)",
                opacity: 0.8,
              }
            }}
          />
        </Box>
        {error && (
          <Typography 
            variant="caption" 
            className="absolute -bottom-6 left-1 text-red-500 font-medium animate-in slide-in-from-top-1 fade-in duration-300"
          >
            {error}
          </Typography>
        )}
      </Box>

      {}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar 
          src="https://i.pravatar.cc/150?u=felix" 
          sx={{ 
            width: 38, 
            height: 38, 
            ml: 1,
            cursor: "pointer",
            border: "2px solid transparent",
            "&:hover": { borderColor: "var(--color-accent-blue)" }
          }} 
        />
      </Box>
    </Box>
  );
}

export default Nav;
