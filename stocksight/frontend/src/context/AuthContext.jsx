import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("stocksight_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
            const userData = response.data.user;
            
            setUser(userData);
            localStorage.setItem("stocksight_user", JSON.stringify(userData));
            
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || "Invalid credentials. Please try again." 
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, { name, email, password });
            const userData = response.data.user;

            setUser(userData);
            localStorage.setItem("stocksight_user", JSON.stringify(userData));

            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || "Registration failed." 
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("stocksight_user");
    };

    const contextData = {
        user,
        isLoading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={contextData}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
