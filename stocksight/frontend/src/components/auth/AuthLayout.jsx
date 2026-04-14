import React from "react";
import Box from "@mui/material/Box";

const AuthLayout = ({ children, backgroundImage, sidebarContent, reverse = false }) => {
  return (
    <Box className={`min-h-screen flex flex-col lg:flex-row bg-[#08080c] ${reverse ? "lg:flex-row-reverse" : ""}`}>
      
      {}
      <Box className="flex-1 flex flex-col items-center justify-center p-8 lg:p-20 relative overflow-y-auto">
        <Box className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {children}
        </Box>
      </Box>

      {}
      <Box 
        className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden"
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {}
        <Box className="absolute inset-0 bg-[#08080c]/30 backdrop-blur-[2px]" />
        
        <Box className="relative z-10 w-full flex flex-col justify-center h-full">
          {sidebarContent}
        </Box>
      </Box>

    </Box>
  );
};

export default AuthLayout;
