import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export const AuthLogo = () => (
  <Box className="flex items-center gap-2 mb-12">
    <Box className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
      <TrendingUpIcon sx={{ color: "white", fontSize: 20 }} />
    </Box>
    <Typography className="text-white font-bold text-xl tracking-tight">
      StockSight<span className="text-blue-500">.</span>
    </Typography>
  </Box>
);

export const RegisterSidebar = () => (
  <Box className="px-16 flex flex-col h-full justify-center">
    <Box className="bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold py-1 px-3 rounded-full w-fit mb-6 uppercase tracking-widest">
      New for 2026
    </Box>

    <Typography variant="h2" className="text-white font-bold leading-[1.1] mb-8 max-w-lg">
      Analyze the market <br />
      <span className="text-blue-500">like a professional.</span>
    </Typography>

    <Typography className="text-gray-400 text-lg mb-12 max-w-md font-medium leading-relaxed">
      Institutional-grade tools, now available for everyone. Build your portfolio with confidence.
    </Typography>

    <Box className="space-y-8 mb-16">
      {[
        { title: "Real-time Analytics", desc: "Track every movement with millisecond precision." },
        { title: "Smart Portfolio", desc: "AI-driven insights to optimize your asset allocation." },
        { title: "Global Markets", desc: "Access 50+ exchanges across the globe instantly." }
      ].map((feature, i) => (
        <Box key={i} className="flex gap-4">
          <Box className="mt-1">
            <CheckCircleOutlineIcon sx={{ color: "var(--color-accent-blue)", fontSize: 24 }} />
          </Box>
          <Box>
            <Typography className="text-white font-bold text-lg mb-1">{feature.title}</Typography>
            <Typography className="text-gray-500 text-sm">{feature.desc}</Typography>
          </Box>
        </Box>
      ))}
    </Box>

    {}
  </Box>
);

export const LoginSidebar = () => (
  <Box className="flex items-center justify-center h-full p-12">
    <Box className="glass-card p-8 max-w-sm border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl animate-in fade-in zoom-in duration-1000">
      <Box className="flex items-center gap-4 mb-6">
        <Box className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center">
          <VerifiedUserIcon sx={{ color: "#3b82f6" }} />
        </Box>
        <Box>
          <Typography className="text-white font-bold text-lg">Institutional Grade</Typography>
          <Typography className="text-gray-500 text-xs line-clamp-2">Access the same tools used by Wall Street pros.</Typography>
        </Box>
      </Box>

      <Box className="space-y-4 pt-4 border-t border-white/5">
        <Box className="flex justify-between items-center">
          <Box className="flex items-center gap-2">
            <SignalCellularAltIcon sx={{ color: "#10b981", fontSize: 16 }} />
            <Typography className="text-gray-400 text-xs font-bold uppercase tracking-wider">Real-time Global Feed</Typography>
          </Box>
          <Typography className="text-white font-bold text-xs">99.9% Uptime</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);
