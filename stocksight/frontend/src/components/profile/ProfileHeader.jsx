import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";  

const ProfileHeader = ({ user }) => {
  return (
    <Box className="glass-card p-10 mb-8 border border-white/5 shadow-2xl">
      <Box className="flex flex-col items-center">
        <Box className="relative mb-6">
          <Avatar 
            src={user.avatar} 
            sx={{ width: 120, height: 120, border: "4px solid var(--color-accent-blue)", boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
          />
        </Box>

        <Typography variant="h4" className="font-bold mb-2 tracking-tight text-white text-center">
          {user.name}
        </Typography>

        <Box className="flex flex-wrap justify-center gap-4 mb-4">
          <Box className="flex items-center gap-1.5 text-gray-500">
            <MailOutlineIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption" className="font-medium">{user.email}</Typography>
          </Box>
          <Box className="flex items-center gap-1.5 text-gray-500 border-l border-white/10 pl-4">
            <CalendarTodayIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption" className="font-medium">Joined {user.joinedDate}</Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default ProfileHeader;
