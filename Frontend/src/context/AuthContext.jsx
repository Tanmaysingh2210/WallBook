// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  resendOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  verifyOtp,
} from "../api/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data.user);
      } catch (err) {
        console.error("auth /me error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const login = async (email, password) => {

    try {
      const res = await loginUser({ email, password });
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      console.error(err?.response?.data?.message || "Login failed")

      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password) => {

    try {
      const res = await registerUser({ name, email, password });

      return { success: true, message: res.data.message };
    } catch (err) {
      const msg = err?.response?.data?.message || "Register failed";

      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("logout error")

    } finally {
      setUser(null);
    }
  };

  const verifyOtpCall = async (email, otp) => {
    try {
      const res = await verifyOtp({ email, otp });
      return { success: true, message: res.data.message };
    } catch (err) {
      const msg = err?.response?.data?.message || "Otp send failed";
      return { message: msg }
    }
  };

  const resendOtpCall = async (email) => {
    try {
      const res = await resendOtp({ email });
      return { success: true, message: res.data.message };
    } catch (err) {
      const msg = err?.response?.data?.message || "Otp send failed";
      return { message: msg }
    }
  };

  const forgotPasswordCall = async (email) => {
    try {
      const res = await forgotPassword({ email });
      return { success: true, message: res.data.message };

    } catch (error) {
      const msg = err?.response?.data?.message || "Otp send failed";
      return { message: msg }
    }
  };

  const verifyResetOtpCall = async (email, otp) => {
    try {
      const res = await verifyResetOtp({ email, otp })
      return { success: true, message: res.data.message };
    } catch (error) {
      const msg = err?.response?.data?.message || "Otp send failed";
      return { message: msg }
    }
  };

  const resetPasswordCall = async (email, newPassword) => {
    try {
      const res = await resetPassword({ email, newPassword })
      return { success: true, message: res.data.message };
    } catch (error) {
      const msg = err?.response?.data?.message || "Otp send failed";
      return { message: msg }
    }
  };

  //payment verify ke baad updated user ko set krne ke liye
  const updateUser = (nextUser) => setUser(nextUser);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        resendOtpCall,
        forgotPasswordCall,
        verifyResetOtpCall,
        resetPasswordCall,
        verifyOtpCall

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
