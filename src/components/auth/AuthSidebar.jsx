import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export const LoginSidebar = () => (
  <Box 
    className="glass-card p-6 w-full max-w-sm border border-white/10 shadow-2xl relative z-10 animate-in slide-in-from-right duration-1000"
    sx={{ background: "rgba(16, 16, 24, 0.5)" }}
  >
    <Box className="flex items-center gap-4">
      <Box className="w-10 h-10 bg-accent-blue/20 rounded-xl flex items-center justify-center text-accent-blue border border-accent-blue/20">
        <VerifiedUserIcon fontSize="small" />
      </Box>
      <Box className="flex-1">
        <Typography variant="subtitle2" className="font-bold tracking-tight mb-0.5 text-white">Institutional Grade</Typography>
        <Typography variant="caption" className="text-gray-400 font-medium leading-relaxed block">
          Professional-grade execution and analysis tools.
        </Typography>
      </Box>
    </Box>
    <Box className="flex justify-between items-center mt-6 pt-6 border-t border-white/5 opacity-80">
      <Typography variant="caption" className="text-gray-500 font-bold flex items-center gap-2 text-[9px] uppercase tracking-tighter">
        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span> Real-time Global Feed
      </Typography>
      <Typography variant="caption" className="text-gray-500 font-black text-[9px] uppercase tracking-tighter text-white">99.9% Uptime</Typography>
    </Box>
  </Box>
);

export const RegisterSidebar = ({ features }) => (
  <Box className="relative z-10 max-w-lg">
    <Box className="px-3 py-1 rounded bg-blue-500/10 text-accent-blue text-[9px] font-black tracking-widest uppercase mb-8 inline-block border border-accent-blue/20">
      NEW FOR 2024
    </Box>
    <Typography variant="h2" className="font-bold mb-6 tracking-tighter leading-tight text-white">
      Analyze the market <span className="text-accent-blue">like a professional.</span>
    </Typography>
    <Typography variant="body2" className="text-gray-400 font-medium mb-16 max-w-sm leading-relaxed">
      Institutional-grade tools, now available for everyone. Build your portfolio with confidence.
    </Typography>

    <Box className="space-y-10 mb-20">
      {features.map((f, i) => (
        <Box key={i} className="flex gap-5 group items-center">
          <Box className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all duration-300">
            {f.icon}
          </Box>
          <Box>
            <Typography variant="subtitle2" className="font-bold text-white mb-0.5 tracking-tight">{f.title}</Typography>
            <Typography variant="caption" className="text-gray-500 font-medium tracking-tight block max-w-[200px] leading-tight">{f.desc}</Typography>
          </Box>
        </Box>
      ))}
    </Box>

    <Box className="grid grid-cols-3 gap-12 border-t border-white/5 pt-12">
      <Box>
        <Typography variant="h5" className="font-bold mb-1 tracking-tighter text-white">500k+</Typography>
        <Typography variant="caption" className="text-gray-600 font-bold uppercase tracking-widest text-[8px]">Active Users</Typography>
      </Box>
      <Box>
        <Typography variant="h5" className="font-bold mb-1 tracking-tighter text-white">$2.4B</Typography>
        <Typography variant="caption" className="text-gray-600 font-bold uppercase tracking-widest text-[8px]">Assets Managed</Typography>
      </Box>
      <Box>
        <Typography variant="h5" className="font-bold mb-1 tracking-tighter text-white">4.9/5</Typography>
        <Typography variant="caption" className="text-gray-600 font-bold uppercase tracking-widest text-[8px]">App Rating</Typography>
      </Box>
    </Box>
  </Box>
);
