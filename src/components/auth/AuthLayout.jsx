import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const AuthLayout = ({ children, sidebarContent, backgroundImage }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "var(--color-dashboard-bg)", color: "white", overflow: "hidden" }}>
      {/* Left Side: Form Content */}
      <Box className="w-full lg:w-[45%] flex flex-col justify-between px-12 md:px-24 py-16 bg-[#050509] overflow-y-auto">
        {/* Logo */}
        <Box className="flex items-center gap-3">
          <Box className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <TrendingUpIcon sx={{ color: "white", fontSize: 18 }} />
          </Box>
          <Typography variant="subtitle1" className="font-bold tracking-tight text-white uppercase italic">
            Stock <span className="text-accent-blue">Analytix</span>
          </Typography>
        </Box>

        {children}

        {/* Footer Links */}
        <Box className="flex gap-8 justify-center lg:justify-start opacity-40 hover:opacity-100 transition-opacity mt-auto">
          <Typography variant="caption" className="text-[9px] font-bold uppercase tracking-widest cursor-pointer">Privacy Policy</Typography>
          <Typography variant="caption" className="text-[9px] font-bold uppercase tracking-widest cursor-pointer">Terms of Service</Typography>
          <Typography variant="caption" className="text-[9px] font-bold uppercase tracking-widest cursor-pointer">Help Center</Typography>
        </Box>
      </Box>

      {/* Right Side: Visual Sidebar */}
      <Box 
        className="hidden lg:flex flex-1 relative flex-col justify-center p-20 overflow-hidden"
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(5, 5, 9, 0.95), rgba(5, 5, 9, 0.4)), url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {sidebarContent}
        
        {/* Abstract Glow */}
        <Box className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full" />
      </Box>
    </Box>
  );
};

export default AuthLayout;
