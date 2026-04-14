import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../../context/AuthContext";
import { AuthLogo } from "./AuthSidebar";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate("/Dashboard");
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "rgba(255, 255, 255, 0.02)",
      borderRadius: "12px",
      color: "white",
      fontSize: "0.9rem",
      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.08)", transition: "all 0.2s" },
      "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
      "&.Mui-focused fieldset": { borderColor: "#3b82f6", borderWidth: "1.5px" },
    },
    "& .MuiInputBase-input": { py: 1.8 }
  };

  return (
    <Box className="flex flex-col items-center">
      <Box className="w-full max-w-md bg-white/[0.02] border border-white/[0.05] p-10 lg:p-12 rounded-[32px] backdrop-blur-sm">
        <Box className="flex flex-col items-center mb-10">
          <AuthLogo />
          <Typography variant="h4" className="text-white font-bold mb-2 tracking-tight">Welcome Back</Typography>
          <Typography variant="body2" className="text-gray-500 font-medium text-center">
            Enter your credentials to access your portfolio
          </Typography>
        </Box>

        {error && (
          <Box className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <Typography className="text-red-500 text-xs font-bold text-center">{error}</Typography>
          </Box>
        )}

        <Box component="form" onSubmit={handleSubmit} className="space-y-6">
          <Box>
            <Typography className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Email Address</Typography>
            <TextField
              fullWidth
              placeholder="investor@stocksight.pro"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              required
              sx={fieldSx}
            />
          </Box>

          <Box>
            <Box className="flex justify-between items-center mb-2 px-1">
              <Typography className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Password</Typography>
              <Link to="#" className="text-blue-500 text-[10px] font-bold hover:underline opacity-80">Forgot password?</Link>
            </Box>
            <TextField
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              variant="outlined"
              required
              sx={fieldSx}
            />
          </Box>

          <FormControlLabel
            control={<Checkbox size="small" sx={{ color: "rgba(255, 255, 255, 0.2)", "&.Mui-checked": { color: "#3b82f6" } }} />}
            label={<Typography variant="caption" className="text-gray-500 font-medium">Remember this device for 30 days</Typography>}
            sx={{ mb: 2, ml: 0 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isLoading}
            endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
            sx={{
              bgcolor: "#3b82f6",
              py: 2,
              borderRadius: "14px",
              fontWeight: 800,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
              "&:hover": { bgcolor: "#2563eb", boxShadow: "0 8px 30px rgba(59, 130, 246, 0.5)" },
              "&.Mui-disabled": { bgcolor: "rgba(59, 130, 246, 0.3)", color: "rgba(255, 255, 255, 0.3)" }
            }}
          >
            {isLoading ? "Signing In..." : "Sign In to Dashboard"}
          </Button>
        </Box>
      </Box>

      <Typography variant="body2" className="mt-8 text-gray-500 font-medium tracking-tight">
        Now to the platform? <Link to="/Register" className="text-white font-bold hover:underline">Create a Free Account</Link>
      </Typography>

      {}
      <Box className="mt-12 flex gap-6">
        {["Privacy Policy", "Terms of Service", "Help Center"].map(link => (
          <Typography key={link} variant="caption" className="text-gray-600 font-bold hover:text-gray-400 cursor-pointer transition-colors">
            {link}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default LoginForm;
