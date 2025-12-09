import axios from "axios";

export const api = axios.create({
  // baseURL: "https://wallbook-dr97.onrender.com", 
  baseURL:"http://localhost:3000",
  withCredentials: true,            
});


export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const logoutUser = ()=> api.post("/auth/logout");
export const getCurrentUser = ()=> api.get("/auth/me");

export const verifyOtp  = (data) => api.post("/auth/verify-otp", data );
export const resendOtp  = (data) => api.post("/auth/resend-otp", data);
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);
export const verifyResetOtp = (data) => api.post("/auth/verify-reset-otp", data);
export const resetPassword= (data) => api.post("/auth/reset-password", data);


export const createOrderApi   = (data) => api.post("/payment/create-order", data);
export const verifyPaymentApi = (data) => api.post("/payment/verify-payment", data);
export const getPaymentHistoryApi = () => api.get("/payment/history");
