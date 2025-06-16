import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AadharOtpPage.css';

const AadharOtpPage = () => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAadharChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) {
      setAadharNumber(value);
    }
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (aadharNumber.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhaarNumber: aadharNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/enter-otp', { state: { aadhaarNumber: aadharNumber } });
        setAadharNumber(''); // Optional: clear input after successful request
      } else {
        setError(data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aadhar-otp-page">
      <div className="container">
        <div className="auth-container aadhar-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Aadhaar Verification</h2>
              <p>An OTP will be sent to the email linked with your Aadhaar number.</p>
            </div>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleRequestOTP} className="auth-form" noValidate>
              <div className="form-group">
                <label htmlFor="aadharNumber">Aadhaar Number</label>
                <input
                  type="text"
                  id="aadharNumber"
                  className="form-control"
                  placeholder="Enter your 12-digit Aadhaar"
                  value={aadharNumber}
                  onChange={handleAadharChange}
                  maxLength={12}
                  required
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="btn btn-block" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Request OTP'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadharOtpPage;
