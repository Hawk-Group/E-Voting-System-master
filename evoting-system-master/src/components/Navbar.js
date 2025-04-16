// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <i className="fas fa-vote-yea"></i>
          </div>
          <span className="logo-text">BlockVote</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        
        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/login" className="nav-link btn-nav" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/signup" className="nav-link btn-nav btn-signup" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
            </li>

            <li className="nav-item">
            <Link to="/results" className="nav-link btn-nav btn-signup" onClick={() => setMenuOpen(false)}>
              View Live Results
            </Link>
            </li>

            

            <li className="nav-item">
            <Link to="/admin-login" className="nav-link btn-nav btn-signup" onClick={() => setMenuOpen(false)}>
              Admin Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;