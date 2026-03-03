import React from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Register = () => {
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          marginTop: 8,
          borderRadius: 3,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
            <PersonAddIcon />
          </Avatar>

          <Typography variant="h5" fontWeight="bold" >
            Register
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            Create your account 
          </Typography>

          <Box component="form" sx={{ width: "100%" }}>
            <TextField fullWidth label="Full Name" margin="normal" />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"  
              type="password"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, borderRadius: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
