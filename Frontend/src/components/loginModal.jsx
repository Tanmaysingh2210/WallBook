import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import "./Modal.css";

const LoginModal = ({ open, onClose, onRegisterSuccess }) => {
  const { login, register, authError, forgotPasswordCall,verifyOtpCall, resetPasswordCall, verifyResetOtpCall } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "", otp: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    if (mode === "login") {
      const res = await login(form.email, form.password);
      if (res) onClose();
    } else if (mode === "register") {
      const res = await register(form.name, form.email, form.password);
      setMsg(res.message);
      if (res) {
        setMode("verifyOTP");
        // onRegisterSuccess(form.email);
      } else {
        setMsg(res.message || "Registration failed");
      }
    } else if (mode === "verifyOTP") {
      const res = await verifyOtpCall(form.email, form.otp);
      if (res) {
        setMsg(res.message || "OTP verified successfully");
        setMode("login");
      } else {
        setMsg(res.message || "Invalid OTP");
      }
    } else if (mode === "forgotPassword") {
      const res = await forgotPasswordCall(form.email);
      if (res) {
        setMsg(res.message || "OTP sent to your email");
        setMode("verifyResetOTP");
      } else {
        setMsg(res.message || "Failed to send OTP");
      }
    } else if (mode === "verifyResetOTP") {
      const res = await verifyResetOtpCall(form.email, form.otp);
      if (res) {
        setMsg(res.message || "OTP verified successfully");
        setMode("resetPassword");
      } else {
        setMsg(res.message || "Invalid OTP");
      }
    } else if (mode === "resetPassword") {
      const res = await resetPasswordCall(form.email, form.newPassword);
      if (res) {
        setMsg(res.message || "Password reset successful! Please login");
        setTimeout(() => {
          setMode("login");
          setForm({ name: "", email: form.email, password: "", otp: "", newPassword: "" });
          setMsg("");
        }, 2000);
      } else {
        setMsg(res.message || "Failed to reset password");
      }
    }

    setLoading(false);
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setMsg("");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">
          {mode === "login" ? "Login" : ""}
          {mode === "register" && "Create account"}
          {mode === "forgotPassword" && "Forgot Password"}
          {mode === "verifyResetOTP" && "Verify OTP"}
          {mode === "verifyOTP" && "Verify OTP"}
          {mode === "resetPassword" && "Reset Password"}
        </h2>

        {msg && <div className="modal-info">{msg}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          {mode === "register" && (
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {(mode === "register" || mode === "login" || mode === "forgotPassword") && (
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {(mode === "register" || mode === "login") && (
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {(mode === "verifyResetOTP" || mode === "verifyOTP") && (
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                name="otp"
                type="text"
                value={form.otp}
                onChange={handleChange}
                required
                placeholder="Enter 6-digit OTP"
              />
            </div>
          )}

          {mode === "resetPassword" && (
            <div className="form-group">
              <label>New Password</label>
              <input
                name="newPassword"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
                required
                placeholder="Enter new password"
              />
            </div>
          )}

          <Button full type="submit" disabled={loading}>
            {loading ? "Please wait..." :
              mode === "login" ? "Login" :
                mode === "register" ? "Register" :
                  mode === "forgotPassword" ? "Send Otp" :
                    mode === "verifyResetOTP" ? "Verify OTP" :
                    mode === "verifyOTP" ? "Verify OTP" :
                      "Reset Password"}
          </Button>
        </form>

        {/* <p className="modal-switch">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Register" : "Login"}
          </span>
        </p> */}


        {mode === "login" && (
          <>
            <p className="modal-switch">
              Don't have an account?{" "}
              <span onClick={() => handleModeSwitch("register")}>
                Register
              </span>
            </p>
            <p className="modal-switch">
              <span onClick={() => handleModeSwitch("forgotPassword")}>
                Forgot Password?
              </span>
            </p>
          </>
        )}

        {mode === "register" && (
          <p className="modal-switch">
            Already have an account?{" "}
            <span onClick={() => handleModeSwitch("login")}>
              Login
            </span>
          </p>
        )}

        {(mode === "forgotPassword" || mode === "verifyResetOTP" || mode === "resetPassword") && (
          <p className="modal-switch">
            Remember your password?{" "}
            <span onClick={() => handleModeSwitch("login")}>
              Back to Login
            </span>
          </p>
        )}

      </div>
    </div>
  );
};

export default LoginModal;
