import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const data = [
  { name: "AAPL", qty: 150, avgPrice: 150, currentPrice: 165.2 },
  { name: "TSLA", qty: 45, avgPrice: 260, currentPrice: 242 },
  { name: "MSFT", qty: 80, avgPrice: 300, currentPrice: 310.15 },
];

function HoldingsTable() {
  return (
    <Box className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
      <Typography variant="h6" className="mb-4">
        Current Holdings
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="!text-gray-400">Asset</TableCell>
            <TableCell className="!text-gray-400">Qty</TableCell>
            <TableCell className="!text-gray-400">Avg Price</TableCell>
            <TableCell className="!text-gray-400">Market Value</TableCell>
            <TableCell className="!text-gray-400">Gain/Loss</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, i) => {
            const marketValue = row.qty * row.currentPrice;

            const profitLoss =
              ((row.currentPrice - row.avgPrice) / row.avgPrice) * 100;

            return (
              <TableRow key={i}>
                <TableCell className="!text-white">{row.name}</TableCell>

                <TableCell className="!text-white">{row.qty}</TableCell>

                <TableCell className="!text-white">
                  ${row.avgPrice}
                </TableCell>

                <TableCell className="!text-white">
                  ${marketValue.toLocaleString()}
                </TableCell>

                <TableCell
                  className={
                    profitLoss < 0 ? "!text-red-400" : "!text-green-400"
                  }
                >
                  {profitLoss.toFixed(2)}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}

export default HoldingsTable;
