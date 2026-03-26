import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from '@mui/icons-material/Logout';
function Aside({ children }) {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/Dashboard" },
    { text: "Portfolio", icon: <AccountBalanceWalletIcon />, path: "/Portfolio" },
    { text: "Watchlist", icon: <StarIcon />, path: "/Watchlist" },
    { text: "Profile", icon: <PersonIcon />, path: "/Profile" },
    { text: "Logout", icon: <LogoutIcon />, path: "/Login" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0f172a" }}>
      <Box
        // sx={{
        //   width: 240,
        //   bgcolor: "#000000",
        //   color: "white",
        //   p: 2,
        //   display: "flex",
        //   flexDirection: "column",
        // }}
        className="w-60 bg-[#000] text-white p-2 "
      >
        <Typography variant="h6" fontWeight="bold" mb={4} textAlign="center">
        stock market
        </Typography>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: location.pathname === item.path ? "#1f2937" : "transparent",
                  "&:hover": { bgcolor: "#1f2937" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column"}}>
        {children}
      </Box>
    </Box>
  );
}

export default Aside;
