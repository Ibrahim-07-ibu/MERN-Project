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

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/stocks/${search.trim().toUpperCase()}`);
      setSearch("");
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
      {/* Breadcrumbs */}
      <Box className="flex items-center gap-2">
        <Typography variant="body1" className="font-bold text-white text-lg">
          {getTitle()}
        </Typography>
        <ChevronRightIcon sx={{ color: "var(--color-text-muted)", fontSize: 20 }} />
        <Typography variant="body2" className="text-gray-500 font-medium">
          Platform
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box className="flex-1 max-w-xl mx-8">
        <Box className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus-within:border-blue-500/50 transition-all">
          <SearchIcon sx={{ color: "var(--color-text-muted)", mr: 1, fontSize: 20 }} />
          <InputBase
            placeholder="Search stock (e.g. AAPL, TSLA)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
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
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <IconButton sx={{ color: "var(--color-text-muted)", bgcolor: "white/5", "&:hover": { bgcolor: "white/10" } }}>
          <NotificationsNoneIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ color: "var(--color-text-muted)", bgcolor: "white/5", "&:hover": { bgcolor: "white/10" } }}>
          <DarkModeOutlinedIcon fontSize="small" />
        </IconButton>
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
