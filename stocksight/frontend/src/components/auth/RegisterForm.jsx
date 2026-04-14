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

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (!agree) {
      return setError("Please agree to the Terms & Conditions.");
    }

    setIsLoading(true);
    setError("");

    const result = await register(formData.name, formData.email, formData.password);

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
    <Box className="flex flex-col">
      <AuthLogo />

      <Typography variant="h3" className="text-white font-bold mb-3 tracking-tight">Join StockSight</Typography>
      <Typography variant="body1" className="text-gray-500 font-medium mb-12">
        Start your journey to financial freedom today.
      </Typography>

      {error && (
        <Box className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <Typography className="text-red-500 text-xs font-bold">{error}</Typography>
        </Box>
      )}

      <Box component="form" onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <Box>
          <Typography className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Full Name</Typography>
          <TextField
            fullWidth
            placeholder="John Doe"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={fieldSx}
          />
        </Box>

        <Box>
          <Typography className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Email Address</Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={fieldSx}
          />
        </Box>

        <Box>
          <Typography className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Password</Typography>
          <TextField
            fullWidth
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            sx={fieldSx}
          />
        </Box>

        <Box>
          <Typography className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Confirm Password</Typography>
          <TextField
            fullWidth
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            sx={fieldSx}
          />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              sx={{ color: "rgba(255, 255, 255, 0.2)", "&.Mui-checked": { color: "#3b82f6" } }}
            />
          }
          label={
            <Typography variant="caption" className="text-gray-500 font-medium">
              I agree to the <span className="text-white hover:underline cursor-pointer">Terms of Service</span> and <span className="text-white hover:underline cursor-pointer">Privacy Policy</span>.
            </Typography>
          }
          sx={{ mb: 2, ml: 0, alignItems: "flex-start" }}
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
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </Box>

      <Typography variant="body2" className="mt-8 text-center text-gray-500 font-medium tracking-tight max-w-md">
        Already have an account? <Link to="/Login" className="text-blue-500 font-bold hover:underline">Log in</Link>
      </Typography>

      {}
      <Box className="mt-auto pt-16 flex gap-6">
        {["Privacy", "Terms", "Contact Support"].map(link => (
          <Typography key={link} variant="caption" className="text-gray-600 font-bold hover:text-gray-400 cursor-pointer transition-colors">
            {link}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default RegisterForm;
