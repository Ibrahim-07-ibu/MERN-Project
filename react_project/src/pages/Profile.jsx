import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProfileHeader from "../components/profile/ProfileHeader";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Loading...",
    email: "",
    avatar: "https://i.pravatar.cc/150?u=felix",
    joinedDate: "",
    stats: {
      calculations: "0",
      watchlistSize: "0",
      lastActivity: "Never"
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.email) return;

        const response = await axios.get(`http://localhost:5000/api/users/profile?email=${storedUser.email}`);
        const data = response.data;

        setUserData(prev => ({
          ...prev,
          name: data.name,
          email: data.email,
          joinedDate: data.createdAt
            ? new Date(data.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
            : "",
          stats: {
            calculations: "142",
            watchlistSize: "28",
            lastActivity: "Just now"
          }
        }));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchUser();
  }, []);

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

      {/* Profile Card */}
      <ProfileHeader user={userData} />

      <Box className="pt-8 border-t border-white/5 text-center">
        <Typography variant="caption" className="text-gray-600 font-medium">
          © 2024 StockSight. All market data is delayed by 15 minutes. Terms of Service | Privacy Policy
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
