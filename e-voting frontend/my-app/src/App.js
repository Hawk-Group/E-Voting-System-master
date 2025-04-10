import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignUpPage';
import AadharOtpPage from './components/AadharOtpPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('userToken', 'sample-token');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('userToken');
  };

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} logout={logout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage login={login} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/aadhar-login" element={<AadharOtpPage login={login} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;