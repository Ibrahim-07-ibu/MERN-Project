import React from "react";
import { Box, Typography } from "@mui/material";

function WorstPerformer() {
  return (
    <Box className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
      
      <Typography variant="body2" className="text-gray-400">
        Worst Performer
      </Typography>

      <Typography variant="h6" className="mt-2">
        TSLA
      </Typography>

      <Typography className="text-red-400 text-sm mt-1">
        -12.15% Overall
      </Typography>

    </Box>
  );
}

export default WorstPerformer;