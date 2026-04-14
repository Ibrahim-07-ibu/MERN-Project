import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HistoryIcon from "@mui/icons-material/History";

const ActivityFeed = ({ activities }) => {
  return (
    <Box className="mb-10">
      <Box className="flex justify-between items-center mb-6">
        <Box className="flex items-center gap-3">
          <HistoryIcon className="text-white" />
          <Typography variant="h5" className="font-bold">Recent Activity</Typography>
        </Box>
        <Typography className="text-accent-blue font-bold text-sm cursor-pointer hover:underline">
          View Full History
        </Typography>
      </Box>

      <Box className="glass-card overflow-hidden">
        {activities.map((activity, i) => (
          <Box 
            key={i} 
            className={`p-5 flex items-center justify-between group hover:bg-white/5 transition-colors duration-200 ${i !== activities.length - 1 ? 'border-b border-white/5' : ''}`}
          >
            <Box className="flex items-center gap-5">
              <Box className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:bg-white/10 transition-colors duration-200">
                {activity.icon}
              </Box>
              <Box>
                <Typography variant="body1" className="text-gray-100 font-semibold mb-0.5 group-hover:text-white transition-colors duration-200">
                  {activity.title}
                </Typography>
                <Typography variant="caption" className="text-gray-500 font-medium">{activity.type}</Typography>
              </Box>
            </Box>
            <Typography variant="caption" className="text-gray-500 font-bold whitespace-nowrap">{activity.time}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ActivityFeed;
