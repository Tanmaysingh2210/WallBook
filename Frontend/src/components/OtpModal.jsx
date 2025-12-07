import React, { useState } from "react";
import axios from "axios";
import "./OtpModal.css"; 

const API_BASE = "http://localhost:3000"; // tumhara server port

const OtpModal = ({ open, email, onClose, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE}/auth/verify-otp`,
        { email, otp },
        { withCredentials: true } // session ke liye IMPORTANT
      );

      alert(res.data.message || "OTP verified");
      onVerified?.(res.data.user); // parent ko batao
      onClose();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "OTP verification failed, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="otp-backdrop">
      <div className="otp-modal">
        <button className="otp-close" onClick={onClose}>
          &times;
        </button>

        <h2 className="otp-title">Verify OTP</h2>

        <p className="otp-subtext">
          We sent a 6-digit OTP to
          <br />
          <b>{email}</b>
        </p>

        {error && <div className="otp-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="otp-input"
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter OTP"
            required
          />

          <button
            type="submit"
            className="otp-btn"
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;
