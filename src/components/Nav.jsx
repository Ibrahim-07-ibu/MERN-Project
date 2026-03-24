import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

function Nav() {
  return (
    <Box
      sx={{
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        bgcolor: "#000000",
        borderBottom: "1px solid #1f2937",
      }}
    >
      <TextField
        placeholder="Search stocks, news, or sectors..."
        size="small"
        sx={{
          width: "40%",
          bgcolor: "#1f2937",
          borderRadius: 2,
          input: { color: "white" },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography color="white">User</Typography>
        <Avatar />
      </Box>
    </Box>
  );
}

export default Nav;
