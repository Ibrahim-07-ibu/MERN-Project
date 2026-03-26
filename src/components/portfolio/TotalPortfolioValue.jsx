import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddIcon from "@mui/icons-material/Add";

function TotalPortfolioValue() {
  return (
    <Box className="bg-[#060e4f] m-5 h-40 flex rounded !flex-row justify-between ">
      <Box className="mt-5 ml-9 ">
        <Typography variant="body2" className="text-gray-300 ">
          TOTAL PORTFOLIO VALUE
        </Typography>
        <Typography variant="h3" className="!font-bold !mt-1">
          $124,592.84
        </Typography>
        <Box className=" flex  items-center gap-3 mt-2 ">
          <TrendingUpIcon />
          <Typography variant="body1" className="!font-bold">
            +$2,140.5 (1.75%)
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Today's Profit
          </Typography>
        </Box>
      </Box>
      <Box className="flex mr-10 items-center gap-10">
        <Box>
          <Typography className="text-gray-400 text-sm">
            Cash Balance
          </Typography>
          <Typography className="text-xl font-semibold">$12,400</Typography>
        </Box>
        <Box>
          <Typography className="text-gray-400 text-sm">
            Total Invested
          </Typography>
          <Typography className="text-xl font-semibold">$112,192.84</Typography>
        </Box>
        <button className="flex items-center gap-2 bg-black px-4 py-2 rounded hover:bg-gray-900">
          <AddIcon />
          Deposit
        </button>
      </Box>
    </Box>
  );
}

export default TotalPortfolioValue;
