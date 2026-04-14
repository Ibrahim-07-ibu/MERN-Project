import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import { LoginSidebar } from "../components/auth/AuthSidebar";

function Login() {
  return (
    <AuthLayout 
      backgroundImage="/login_bg.png"
      sidebarContent={<LoginSidebar />}
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;

