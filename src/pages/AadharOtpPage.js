import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AadharOtpPage.css';

const AadharOtpPage = () => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const otpInputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setError('');
  }, [aadharNumber, otp]);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtpSent(false);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleAadharChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 12) {
      const formattedValue = value
        .replace(/\s/g, '')
        .match(/.{1,4}/g)?.join(' ') || value;
      setAadharNumber(formattedValue);
    }
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    const cleanAadhar = aadharNumber.replace(/\s/g, '');
    if (cleanAadhar.length !== 12) {
      setError('Please enter a valid 12-digit Aadhar number');
      return;
    }
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadhaarNumber: cleanAadhar }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setTimer(30);
        setTimeout(() => {
          if (otpInputRefs.current[0]) {
            otpInputRefs.current[0].focus();
          }
        }, 100);
      } else {
        setError(data.error || 'Failed to send OTP. Please try again.');
        console.error('OTP request error:', data);
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      console.error('OTP request error:', err);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        otpInputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.some((digit) => digit === '')) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    setError('');
    try {
      const enteredOtp = otp.join('');
      const cleanAadhar = aadharNumber.replace(/\s/g, '');
      const response = await fetch('http://127.0.0.1:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadhaarNumber: cleanAadhar, otp: enteredOtp }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(`OTP verification: ${enteredOtp} for Aadhar: ${cleanAadhar}`);
        const redirectPath = location.state?.from || '/dashboard';
        navigate(redirectPath);
      } else {
        setError(data.error || 'Invalid OTP. Please try again.');
        console.error('OTP verification error:', data);
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      console.error('OTP verification error:', err);
    }
  };

  const handleResendOTP = async () => {
    setTimer(30);
    setOtpSent(true);
    setOtp(['', '', '', '', '', '']);
    try {
      const cleanAadhar = aadharNumber.replace(/\s/g, '');
      const response = await fetch('http://127.0.0.1:5000/api/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadhaarNumber: cleanAadhar }),
      });
      const data = await response.json();
      if(response.ok){
        console.log(`OTP resent for Aadhar: ${cleanAadhar}`);
        setTimeout(() => {
          if (otpInputRefs.current[0]) {
            otpInputRefs.current[0].focus();
          }
        }, 100);
      } else {
        setError(data.error || 'Failed to resend OTP. Please try again.');
        console.error('Resend OTP error:', data);
      }

    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
      console.error('Resend OTP error:', err);
    }
  };

  return (
    <div className="aadhar-otp-page">
      <div className="container">
        <div className="auth-container aadhar-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Aadhar Verification</h2>
              <p>Verify your identity using your Aadhar details</p>
            </div>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={otpSent ? handleVerifyOTP : handleRequestOTP} className="auth-form">
              <div className="form-group">
                <label htmlFor="aadharNumber">Aadhar Number</label>
                <input
                  type="text"
                  id="aadharNumber"
                  className="form-control"
                  placeholder="XXXX XXXX XXXX"
                  value={aadharNumber}
                  onChange={handleAadharChange}
                  maxLength={14}
                  required
                  disabled={otpSent}
                />
              </div>

              {otpSent && (
                <div className="form-group">
                  <label htmlFor="otp">Enter OTP</label>
                  <div className="otp-container">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="text"
                        className="otp-input"
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        maxLength={1}
                        ref={(ref) => (otpInputRefs.current[index] = ref)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="form-note">
                <i className="fas fa-info-circle"></i>
                <span>
                  {otpSent
                    ? timer > 0
                      ? `OTP will expire in ${timer} seconds`
                      : 'OTP has expired'
                    : 'An OTP will be sent to the mobile number linked with your Aadhar'}
                </span>
              </div>

              <button type="submit" className="btn btn-block" disabled={timer === 0}>
                {otpSent ? 'Verify OTP' : 'Request OTP'}
              </button>

              {otpSent && timer === 0 && (
                <div className="resend-otp">
                  <button type="button" className="btn-link" onClick={handleResendOTP}>
                    Resend OTP
                  </button>
                </div>
              )}

              {otpSent && (
                <button type="button" className="btn-link go-back" onClick={() => { setOtpSent(false); setOtp(['', '', '', '', '', '']);}}>
                  <i className="fas fa-arrow-left"></i> Back to Aadhar Input
                </button>
              )}
            </form>

            <div className="auth-footer">
              <p>
                <a href="/help">Need help?</a>
              </p>
            </div>
          </div>

          <div className="auth-info">
            <div className="auth-info-content">
              <h2>Secure Identity Verification</h2>
              <p>We use Aadhar verification to:</p>
              <ul>
                <li>Confirm your identity securely</li>
                <li>Prevent multiple voting</li>
                <li>Ensure only eligible citizens can vote</li>
                <li>Protect the integrity of the electoral process</li>
              </ul>
              
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default AadharOtpPage;