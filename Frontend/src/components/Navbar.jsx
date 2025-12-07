// src/components/Navbar/Navbar.jsx
import React from "react";
import Button from "../components/common/Button.jsx";
import "./Navbar.css";

const Navbar = ({user , onLoginClick, onProClick , onLogoutClick , searchValue, onSearchChange }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
       
        <div className="nav-left">
          <div className="logo">
            <span>📷</span>
            <span className="logo-text">WallBook</span>
          </div>
          <Button variant="outline" onClick={onProClick}>
            ⭐ Pro
          </Button>
        </div>

        
        <div className="nav-right">
          <input
            type="text"
            className="nav-search"
            placeholder="Search wallpapers..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            
          />
          <Button variant="primary" onClick={user ? onLogoutClick : onLoginClick}>
            {user? 'Logout' : 'Login'}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
