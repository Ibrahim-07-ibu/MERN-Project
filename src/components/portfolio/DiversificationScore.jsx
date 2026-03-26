import React from "react";
import { Box, Typography } from "@mui/material";

function DiversificationScore() {
  return (
    <Box className="col-span-2 bg-[#0f172a] border border-gray-800 rounded-xl p-5 flex justify-between items-center">

      <Box>
        <Typography variant="body2" className="text-gray-400">
          Diversification Score
        </Typography>

        <Typography variant="body2" className="text-gray-500 mt-1">
          Your portfolio is highly concentrated in Tech.
        </Typography>
      </Box>

      <Typography className="text-2xl font-bold text-blue-400">
        78/100
      </Typography>

    </Box>
  );
}

export default DiversificationScore;