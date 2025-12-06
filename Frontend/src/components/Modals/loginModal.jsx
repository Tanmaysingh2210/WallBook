// /src/components/Modals/LoginModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import './Modal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        let payload = {
          email: formData.email,
          password: formData.password
        }
        result = await login(payload);
      } else {
        let payload = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
        result = await register(payload);
      }
      if (result) {
        onClose();

      } else {
        console.log(result);
        setError(result?.message);
      }
    } catch (err) {
      setError(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">

        {/* CLOSE BUTTON (matches .close-modal) */}
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>

        {/* TITLE (matches .modal-title) */}
        <h2 className="modal-title">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>

        {/* ERROR BOX - styled manually */}
        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--primary)',
              padding: '1rem',
              borderRadius: '10px',
              marginBottom: '1rem',
            }}
          >
            {error}
          </div>
        )}

        {/* FORM START */}
        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* BUTTON (uses your custom Button component) */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : isLogin
                ? 'Login'
                : 'Sign Up'}
          </Button>
        </form>
        {/* FORM END */}

        <p
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'var(--text-gray)',
          }}
        >
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: 'var(--primary)',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
