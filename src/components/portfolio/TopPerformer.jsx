import React from "react";
import { Box, Typography } from "@mui/material";

function TopPerformer() {
  return (
    <Box className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
      
      <Typography variant="body2" className="text-gray-400">
        Top Performer
      </Typography>

      <Typography variant="h6" className="mt-2">
        NVDA
      </Typography>

      <Typography className="text-green-400 text-sm mt-1">
        +83.35% Overall
      </Typography>

    </Box>
  );
}

export default TopPerformer;