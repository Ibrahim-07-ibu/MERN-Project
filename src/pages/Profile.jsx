import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Icons for activity feed (passed as props)
import CalculateIcon from "@mui/icons-material/Calculate";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// Modular Components
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStatsCards from "../components/profile/ProfileStatsCards";
import ActivityFeed from "../components/profile/ActivityFeed";

const Profile = () => {
  const userData = {
    name: "Felix Investor",
    email: "felix.investor@stockanalytix.com",
    avatar: "https://i.pravatar.cc/150?u=felix",
    joinedDate: "January 12, 2024",
    stats: {
      calculations: "142",
      watchlistSize: "28",
      lastActivity: "2 mins ago"
    }
  };

  const activities = [
    {
      icon: <CalculateIcon sx={{ fontSize: 18, color: "var(--color-text-muted)" }} />,
      title: "Calculated Profit for NVDA @ $920.00",
      type: "Calculation Update",
      time: "2 mins ago"
    },
    {
      icon: <FormatListBulletedIcon sx={{ fontSize: 18, color: "var(--color-accent-blue)" }} />,
      title: 'Added AAPL to "Tech Giants" Watchlist',
      type: "Watchlist Update",
      time: "1 hour ago"
    },
    {
      icon: <LockOutlinedIcon sx={{ fontSize: 18, color: "var(--color-text-muted)" }} />,
      title: "Changed account password",
      type: "Security Update",
      time: "Yesterday"
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 18, color: "var(--color-text-muted)" }} />,
      title: "Updated profile bio and avatar",
      type: "Profile Update",
      time: "2 days ago"
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 18, color: "var(--color-text-muted)" }} />,
      title: "Saved Analysis: Q1 Portfolio Rebalance",
      type: "Calculation Update",
      time: "3 days ago"
    },
  ];

  return (
    <Box className="p-8 pb-12 animate-in fade-in duration-700">
      {/* Page Header */}
      <Box className="mb-10 text-center lg:text-left">
        <Typography variant="h3" className="font-bold tracking-tight mb-2 uppercase">
          My Profile
        </Typography>
        <Typography variant="body1" className="text-gray-500 font-medium">
          Manage your account settings, track your recent activity, and secure your trading data.
        </Typography>
      </Box>

      {/* Profile Header & Identity */}
      <ProfileHeader user={userData} />

      {/* User Stats Grid */}
      <ProfileStatsCards stats={userData.stats} />

      {/* Recent Activity Section */}
      <ActivityFeed activities={activities} />

      {/* Security Status Box */}
      {/* Footer Copy */}
      <Box className="pt-8 border-t border-white/5 text-center">
        <Typography variant="caption" className="text-gray-600 font-medium">
          © 2024 Stock Market Analysis Platform. All market data is delayed by 15 minutes. Terms of Service | Privacy Policy
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
