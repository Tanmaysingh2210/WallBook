import React from 'react';
import SearchBar from '../common/SearchBar';
import Button from '../common/Button';
import './Navbar.css';

const Navbar = ({ onLogin, onSubscribe, user, searchQuery, onSearchChange }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => window.location.reload()}>
          <div>
          <span>📸</span>
          <span className="logo-text">WallBook</span>
          </div>
          <div>
              <Button 
            variant="outline" 
            onClick={onSubscribe}
          >
            {user?.subscription ? '⭐ Pro Member' : '⭐ Pro'}
          </Button>
          </div>
          
        </div>
        
       

        <div className="nav-buttons">

           <SearchBar 
          value={searchQuery}
          onChange={onSearchChange}
        />
          
          <Button 
            variant="primary" 
            onClick={onLogin}
          >
            {user ? 'Profile' : 'Login'}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;