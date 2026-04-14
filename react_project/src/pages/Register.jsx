import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";
import { RegisterSidebar } from "../components/auth/AuthSidebar";
import BoltIcon from "@mui/icons-material/Bolt";
import PieChartIcon from "@mui/icons-material/PieChart";
import LanguageIcon from "@mui/icons-material/Language";

function Register() {
  const features = [
    {
      icon: <BoltIcon fontSize="small" />,
      title: "Real-time Analytics",
      desc: "Track every movement with millisecond precision."
    },
    {
      icon: <PieChartIcon fontSize="small" />,
      title: "Smart Portfolio",
      desc: "AI-driven insights to optimize your asset allocation."
    },
    {
      icon: <LanguageIcon fontSize="small" />,
      title: "Global Markets",
      desc: "Access 50+ exchanges across the globe instantly."
    }
  ];

  return (
    <AuthLayout 
      backgroundImage="/register_bg.png"
      sidebarContent={<RegisterSidebar features={features} />}
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;
