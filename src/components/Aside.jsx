import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalculateIcon from "@mui/icons-material/Calculate";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function Aside({ children }) {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/Dashboard" },
    { text: "Stock Calculator", icon: <CalculateIcon />, path: "/Calculator" },
    { text: "My Profile", icon: <PersonIcon />, path: "/Profile" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "var(--color-dashboard-bg)" }}>
      <Box className="w-64 sidebar-gradient text-white p-6 flex flex-col justify-between fixed left-0 top-0 h-screen border-r border-white/5">
        <div>
          {/* Logo */}
          <Box className="flex items-center gap-3 mb-10 px-2">
            <Box className="w-10 h-10 bg-accent-blue rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <TrendingUpIcon sx={{ color: "white" }} />
            </Box>
            <Typography variant="h6" className="font-bold tracking-tight">
              STOCK <span className="text-accent-blue">ANALYTIX</span>
            </Typography>
          </Box>

          {/* Navigation */}
          <List sx={{ px: 0 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      borderRadius: "12px",
                      py: 1.5,
                      px: 2,
                      bgcolor: isActive ? "rgba(59, 130, 246, 1)" : "transparent",
                      boxShadow: isActive ? "0 4px 15px rgba(59, 130, 246, 0.3)" : "none",
                      color: isActive ? "white" : "var(--color-text-muted)",
                      "&:hover": { 
                        bgcolor: isActive ? "rgba(59, 130, 246, 0.9)" : "rgba(255, 255, 255, 0.05)",
                        color: "white"
                      },
                    }}
                  >
                    <ListItemIcon sx={{ 
                      color: "inherit", 
                      minWidth: "40px",
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ 
                        fontSize: "0.95rem", 
                        fontWeight: isActive ? 600 : 500 
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </div>

        {/* Bottom User Profile */}
        <Box className="mt-auto">
          <Box className="glass-card p-4 flex items-center gap-3 mb-6 bg-white/5 border border-white/10 rounded-2xl">
            <Avatar 
              src="https://i.pravatar.cc/150?u=felix" 
              sx={{ width: 40, height: 40, border: "2px solid rgba(59, 130, 246, 0.5)" }}
            />
            <Box>
              <Typography variant="body2" className="font-bold text-white">Felix Investor</Typography>
              <Typography variant="caption" className="text-gray-400">Pro Member</Typography>
            </Box>
          </Box>

          <ListItemButton
            component={Link}
            to="/Login"
            sx={{
              borderRadius: "12px",
              py: 1.5,
              color: "#ef4444",
              "&:hover": { bgcolor: "rgba(239, 68, 68, 0.1)" },
            }}
          >
            <ListItemIcon sx={{ color: "#ef4444", minWidth: "40px" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box 
        component="main"
        sx={{ 
          flex: 1, 
          ml: "256px", 
          minHeight: "100vh",
          bgcolor: "var(--color-dashboard-bg)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Aside;
