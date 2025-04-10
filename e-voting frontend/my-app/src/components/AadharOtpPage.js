import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AadharOtpPage.css';

function AadharOtpPage({ login }) {
  const [step, setStep] = useState(1);
  const [aadharNumber, setAadharNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Aadhar OTP Login | YourApp';
  }, []);

  const handleAadharChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) {
      setAadharNumber(value);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const requestOtp = () => {
    if (aadharNumber.length !== 12) {
      setError('Please enter a valid 12-digit Aadhar number');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const verifyOtp = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login();
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="aadhar-otp-page">
      <div className="container">
        <motion.div 
          className="form-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-header">
            <h2>Aadhar OTP Login</h2>
            <p>Secure login with your Aadhar details</p>
          </div>
          
          {step === 1 ? (
            <div className="aadhar-form">
              <div className="form-group">
                <label htmlFor="aadhar">Aadhar Number</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="aadhar"
                  value={aadharNumber}
                  onChange={handleAadharChange}
                  placeholder="XXXX XXXX XXXX"
                  className={error ? 'error' : ''}
                  maxLength="12"
                />
                {error && <span className="error-message">{error}</span>}
              </div>
              
              <motion.button 
                className="btn btn-primary full-width"
                onClick={requestOtp}
                disabled={isLoading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isLoading ? 'Requesting OTP...' : 'Request OTP'}
              </motion.button>
            </div>
          ) : (
            <div className="otp-form">
              <p className="otp-info">
                OTP has been sent to the mobile number linked with your Aadhar
                <span className="masked-number">XXXXXXXX{aadharNumber.slice(-4)}</span>
              </p>
              
              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength="1"
                    className={error ? 'error' : ''}
                    whileFocus={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
              
              {error && <span className="error-message">{error}</span>}
              
              <div className="otp-actions">
                <motion.button 
                  className="btn btn-primary full-width"
                  onClick={verifyOtp}
                  disabled={isLoading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </motion.button>
                
                <motion.button 
                  className="btn btn-link"
                  onClick={() => setStep(1)}
                  whileHover={{ scale: 1.03 }}
                >
                  Back to Aadhar Entry
                </motion.button>
                
                <motion.button 
                  className="btn btn-link"
                  disabled={isLoading}
                  whileHover={{ scale: 1.03 }}
                >
                  Resend OTP
                </motion.button>
              </div>
            </div>
          )}
          
          <div className="alternative-action">
            <span>Want to login with password?</span>
            <Link to="/login">Regular Login</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AadharOtpPage;