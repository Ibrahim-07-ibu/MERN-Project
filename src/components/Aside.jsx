import * as React from "react";
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

function Aside({ children }) {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0f172a" }}>
      <Box
        sx={{
          width: 240,
          bgcolor: "#000000",
          color: "white",
          p: 2,
          borderRight: "1px solid #1f2937",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={4} padding={1} ml={8}>
          name
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mb: 1,
                "&:hover": { bgcolor: "#1f2937" },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mb: 1,
                "&:hover": { bgcolor: "#1f2937" },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mb: 1,
                "&:hover": { bgcolor: "#1f2937" },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Watchlist" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mb: 1,
                "&:hover": { bgcolor: "#1f2937" },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </Box>
    </Box>
  );
}

export default Aside;
