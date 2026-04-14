import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";
import { RegisterSidebar } from "../components/auth/AuthSidebar";

function Register() {
  return (
    <AuthLayout 
      backgroundImage="/register_bg.png"
      sidebarContent={<RegisterSidebar />}
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;
