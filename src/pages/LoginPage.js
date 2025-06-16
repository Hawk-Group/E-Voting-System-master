// pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Simulating API call - replace with actual blockchain authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      console.log('Logged in with:', { email });
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/voting');
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Login to BlockVote</h2>
              <p>Welcome back! Please enter your credentials to continue</p>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="form-control" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-extras">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-block" 
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <div className="auth-divider">
              <span>OR</span>
            </div>
            
            <Link to="/aadhar-verification" className="btn btn-outline btn-block">
              Login with Aadhar OTP
            </Link>
            
            <div className="auth-footer">
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
          
          <div className="auth-info">
            <div className="auth-info-content">
              <h2>Secure Voting Platform</h2>
              <p>BlockVote ensures that your vote is:</p>
              <ul>
                <li>Securely recorded on the blockchain</li>
                <li>Completely anonymous</li>
                <li>Tamper-proof and verifiable</li>
                <li>Protected with advanced cryptography</li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;