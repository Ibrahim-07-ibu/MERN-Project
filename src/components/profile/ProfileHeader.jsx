import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EditIcon from "@mui/icons-material/Edit";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfileHeader = ({ user }) => {
  return (
    <Box className="glass-card p-10 mb-8 border border-white/5 shadow-2xl">
      <Box className="flex flex-col items-center">
        <Box className="relative mb-6">
          <Avatar 
            src={user.avatar} 
            sx={{ width: 120, height: 120, border: "4px solid var(--color-accent-blue)", boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
          />
          <IconButton 
            className="absolute bottom-0 right-0 bg-accent-blue hover:bg-blue-600 transition-colors"
            sx={{ color: "white", width: 36, height: 36, border: "3px solid var(--color-dashboard-bg)" }}
          >
            <CameraAltIcon sx={{ fontSize: 16 }} />
          </IconButton>
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

        <Box className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-10 flex items-center gap-1.5 border border-blue-500/20 shadow-lg shadow-blue-500/5">
          <VerifiedUserIcon sx={{ fontSize: 13 }} />
          PRO MEMBER
        </Box>

        <Stack direction="row" spacing={3} className="flex-wrap justify-center">
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              bgcolor: "var(--color-accent-blue)",
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "14px",
              px: 4,
              py: 1.5,
              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
              "&:hover": { bgcolor: "#2563eb" }
            }}
          >
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            startIcon={<LockOutlinedIcon />}
            sx={{
              borderColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "14px",
              px: 4,
              py: 1.5,
              "&:hover": { borderColor: "rgba(255, 255, 255, 0.3)", bgcolor: "white/5" }
            }}
          >
            Security Settings
          </Button>
          <Button
            startIcon={<LogoutIcon />}
            sx={{
              color: "#ff4d4d",
              textTransform: "none",
              fontWeight: 700,
              px: 2,
              "&:hover": { bgcolor: "rgba(255, 77, 77, 0.1)" }
            }}
          >
            Logout Account
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
