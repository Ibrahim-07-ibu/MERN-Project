import React from "react";
import { Box, Typography } from "@mui/material";

function SectorAllocation() {
  return (
    <Box className="col-span-1 row-span-2 bg-[#0f172a] border border-gray-800 rounded-xl p-5">
      
      <Typography variant="h6">
        Sector Allocation
      </Typography>

      <Typography variant="body2" className="text-gray-400 mt-1">
        Visual breakdown by market sector
      </Typography>

      <Box className="flex items-center justify-center h-full text-gray-500">
        Chart here
      </Box>

    </Box>
  );
}

export default SectorAllocation;