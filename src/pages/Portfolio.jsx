import React from "react";
import Box from "@mui/material/Box";
import SectorAllocation from "../components/portfolio/SectorAllocation";
import TopPerformer from "../components/portfolio/TopPerformer";
import WorstPerformer from "../components/portfolio/WorstPerformer";
import DiversificationScore from "../components/portfolio/DiversificationScore";
import HoldingsTable from "../components/portfolio/HoldingsTable";
import TotalPortfolioValue from "../components/portfolio/TotalPortfolioValue";

function Portfolio() {
  return (
    <Box className="p-10 bg-black text-white h-200">
      {/* TOTAL PORTFOLIO VALUE */}
      <TotalPortfolioValue />
      <Box className="p-6   text-white">
        {/* TOP GRID */}
        <Box className="grid grid-cols-3 grid-rows-[260px_160px] gap-6">
          <SectorAllocation />
          <TopPerformer />
          <WorstPerformer />
          <DiversificationScore />
        </Box>

        {/* HOLDINGS */}
        <Box className="mt-6">
          <HoldingsTable />
        </Box>
      </Box>
    </Box>
  );
}

export default Portfolio;
