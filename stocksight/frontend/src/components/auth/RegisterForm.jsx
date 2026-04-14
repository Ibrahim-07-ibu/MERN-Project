import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      console.log("Registration successful:", response.data);
      navigate("/Login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <Box className="max-w-sm w-full mx-auto lg:mx-0 my-12">
      <Typography variant="h3" className="font-bold mb-2 tracking-tight leading-tight uppercase">Join StockSight</Typography>
      <Typography variant="body2" className="text-gray-500 font-medium mb-10">
        Start your journey to financial freedom today.
      </Typography>

      {error && <Typography color="error" variant="caption" sx={{ mb: 2, display: "block" }}>{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} className="space-y-6">
        <Box>
          <Typography variant="caption" className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-2 block">Full Name</Typography>
          <TextField
            fullWidth
            placeholder="John Doe"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255, 255, 255, 0.03)",
                borderRadius: "8px",
                color: "white",
                fontSize: "0.85rem",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.08)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                "&.Mui-focused fieldset": { borderColor: "var(--color-accent-blue)" },
              },
              "& input": { py: 1.2 }
            }}
          />
        </Box>

        <Box>
          <Typography variant="caption" className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-2 block">Email Address</Typography>
          <TextField
            fullWidth
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255, 255, 255, 0.03)",
                borderRadius: "8px",
                color: "white",
                fontSize: "0.85rem",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.08)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                "&.Mui-focused fieldset": { borderColor: "var(--color-accent-blue)" },
              },
              "& input": { py: 1.2 }
            }}
          />
        </Box>

        <Box className="grid grid-cols-2 gap-4">
          <Box>
            <Typography variant="caption" className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-2 block">Password</Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.08)" },
                  "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                  "&.Mui-focused fieldset": { borderColor: "var(--color-accent-blue)" },
                },
                "& input": { py: 1.2 }
              }}
            />
          </Box>
          <Box>
            <Typography variant="caption" className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-2 block">Confirm</Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="••••••••"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.08)" },
                  "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                  "&.Mui-focused fieldset": { borderColor: "var(--color-accent-blue)" },
                },
                "& input": { py: 1.2 }
              }}
            />
          </Box>
        </Box>

        <FormControlLabel
          control={<Checkbox size="small" sx={{ color: "rgba(255, 255, 255, 0.2)", "&.Mui-checked": { color: "var(--color-accent-blue)" } }} />}
          label={<Typography variant="caption" className="text-gray-500 font-medium leading-none">I agree to the <span className="text-accent-blue cursor-pointer font-bold">Terms</span> and <span className="text-accent-blue cursor-pointer font-bold">Privacy</span>.</Typography>}
        />

        <Button
          fullWidth
          type="submit"
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
          Create Account
        </Button>
      </Box>

      <Typography variant="caption" className="mt-10 text-center text-gray-500 font-medium block">
        Already have an account? <Link to="/Login" className="text-accent-blue font-bold hover:underline">Log in</Link>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
