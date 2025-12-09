// src/components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Left: Brand */}
        <div className="footer-brand">
          <div className="footer-logo">WallBook</div>
          <p className="footer-tagline">
            Premium live wallpapers for your home screen.
          </p>
        </div>

        {/* Middle: Links */}
        <nav className="footer-links">
          <Link to="/contact-us" className="footer-link">
            Contact Us
          </Link>
          <Link to="/privacy-policy" className="footer-link">
            Privacy Policy
          </Link>
          <Link to="/refund-policy" className="footer-link">
            Refund Policy
          </Link>
          <Link to="/terms" className="footer-link">
            Terms &amp; Conditions
          </Link>
        </nav>

        {/* Right: Copyright */}
        <div className="footer-meta">
          <p>© {new Date().getFullYear()} WallBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
