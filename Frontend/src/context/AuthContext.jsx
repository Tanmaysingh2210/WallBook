import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/api.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get('/auth/me');//check
                setUser(res.data.user || null);

            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    async function login(payload) {
        try {
            const res = await api.post('/auth/login', payload);
            if (res.data.user) {
                setUser(res.data.user);
            } else {
                const me = await api.get('/auth/me');
                setUser(me.data.user);
            }
            return res.data.message;
        } catch (err) {
            throw err.response?.data || { message: "Login Failed" };
        }
    }

    async function register(payload) {
        try {
            const res = await api.post('/auth/register', payload);
            const newUser = res.data.user;
            setUser(newUser);
            return newUser;
        } catch (err) {
          console.log("register error" , err.message);
            throw err;
            
        }
    }

    async function resendOtp(email) {
        try{
            const res = await api.post('/auth/resend_otp',{email});
            return res || {message: "Otp resended sucessfully"};
        }catch(err){
            throw err.response?.data || {message : "Error resending otp"};
        }
    }

    async function verifyOtp(payload) {
        try {
            const res = await api.post('/auth/verify_otp', payload, { withCredentials: true });
            const verifiedUser = res.data.user;

            // ✅ Update your context state
            setUser(verifiedUser);

            return res.data.message; // "OTP verified successfully"
        } catch (err) {
            console.error("OTP verification failed:", err.response?.data || err.message);
            throw err.response?.data || { message: "OTP verification failed" };
        }
    }

    async function logout() {
        await api.post('/auth/logout');
        setUser(null);
    }

  const updateSubscription = (subscriptionData) => {
    setUser(prev => ({
      ...prev,
      subscription: subscriptionData
    }));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, loading, login, logout, register, verifyOtp,resendOtp,
        updateSubscription 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
    return useContext(AuthContext);
}