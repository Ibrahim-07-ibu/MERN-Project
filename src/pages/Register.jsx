import React from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import LightRays from "../components/LightRays";
function Register() {
  return (
    <div>
      <div>
        <LightRays />
      </div>
      <div className="login-center">
        <Container maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              color="white"
            >
              Register
            </Typography>

            <Typography
              variant="body2"
              color="white"
              align="center"
              gutterBottom
            >
              Create your account
            </Typography>

            <Box component="form">
              <TextField
                fullWidth
                label="Email Address"
                margin="normal"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                  "& input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                  "& input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                  "& input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                }}
                
              ><IconButton><Visibility/></IconButton></TextField>

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                  "& input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  background: "linear-gradient(90deg,#4f46e5,#6366f1)",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Register
              </Button>
            </Box>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default Register;
