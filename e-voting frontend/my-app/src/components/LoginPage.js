import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LoginPage.css';

function LoginPage({ login }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Login | YourApp';
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login();
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="container">
        <motion.div 
          className="form-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Log in to continue to your account</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                autoComplete="email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/" className="forgot-password">Forgot password?</Link>
            </div>
            
            <motion.button 
              type="submit" 
              className="btn btn-primary full-width"
              disabled={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </motion.button>
          </form>
          
          <div className="alternative-login">
            <p>Or log in with</p>
            <div className="social-buttons">
              <motion.button 
                className="btn btn-social google"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Google
              </motion.button>
              <motion.button 
                className="btn btn-social facebook"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Facebook
              </motion.button>
            </div>
          </div>
          
          <div className="alternative-action">
            <span>Don't have an account?</span>
            <Link to="/signup">Sign up</Link>
          </div>
          
          <div className="alternative-action">
            <span>Use Aadhar to login</span>
            <Link to="/aadhar-login">Aadhar OTP Login</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;