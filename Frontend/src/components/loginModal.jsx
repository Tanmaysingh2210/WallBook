import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import "./Modal.css";

const LoginModal = ({ open, onClose , onRegisterSuccess}) => {
  const { login, register, authError } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
    } else {
      const res = await register(form.name, form.email, form.password);
      setMsg(res.message);

      if(res){
        onClose()
        onRegisterSuccess(form.email);
      } else {
          setMsg(res.message || "Registration failed");
        }
    }

    setLoading(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">
          {mode === "login" ? "Login" : "Create account"}
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

          <Button full type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </Button>
        </form>

        <p className="modal-switch">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
