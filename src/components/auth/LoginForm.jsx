import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const LoginForm = () => {
  return (
    <Box className="max-w-sm w-full mx-auto lg:mx-0 my-12">
      <Typography variant="h3" className="font-bold mb-4 tracking-tight leading-tight uppercase">Welcome Back</Typography>
      <Typography variant="body2" className="text-gray-500 font-medium mb-12">
        Enter your credentials to access your professional trading portfolio.
      </Typography>

      <Box component="form" className="space-y-8">
        <Box>
          <Typography variant="caption" className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-2 block">Email Address</Typography>
          <TextField
            fullWidth
            placeholder="investor@stockanalytix.pro"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255, 255, 255, 0.03)",
                borderRadius: "8px",
                color: "white",
                fontSize: "0.9rem",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.08)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                "&.Mui-focused fieldset": { borderColor: "var(--color-accent-blue)" },
              }
            }}
          />
        </Box>

        <Box>
          <Box className="flex justify-between items-center mb-2">
            <Typography variant="caption" className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Password</Typography>
            <Link to="#" className="text-accent-blue text-[10px] font-bold hover:underline opacity-80">Forgot password?</Link>
          </Box>
          <TextField
            fullWidth
            type="password"
            placeholder="••••••••"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255, 255, 255, 0.03)",
                borderRadius: "8px",
                color: "white",
                fontSize: "0.9rem",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.08)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                "&.Mui-focused fieldset": { borderColor: "var(--color-accent-blue)" },
              }
            }}
          />
        </Box>

        <FormControlLabel
          control={<Checkbox size="small" sx={{ color: "rgba(255, 255, 255, 0.2)", "&.Mui-checked": { color: "var(--color-accent-blue)" } }} />}
          label={<Typography variant="caption" className="text-gray-500 font-medium">Remember this device for 30 days</Typography>}
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          component={Link}
          to="/Dashboard"
          variant="contained"
          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: "var(--color-accent-blue)",
            py: 1.8,
            borderRadius: "10px",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "0.95rem",
            letterSpacing: "0.5px",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
            "&:hover": { bgcolor: "#2563eb", boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)" }
          }}
        >
          Sign In to Dashboard
        </Button>
      </Box>

      <Typography variant="caption" className="mt-12 text-center text-gray-500 font-medium block">
        New to the platform? <Link to="/Register" className="text-accent-blue font-bold hover:underline">Create a Free Account</Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
