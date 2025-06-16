import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EnterOtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const aadhaarNumber = location.state?.aadhaarNumber;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  if (!aadhaarNumber) {
    // No Aadhaar provided, redirect to login
    navigate('/');
    return null;
  }

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) setOtp(value);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhaarNumber, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ OTP verified successfully!');
        localStorage.setItem('aadhaarNumber', aadhaarNumber);
        setTimeout(() => {
          navigate('/voting', { state: { aadhaarNumber } });
        }, 1000);
      } else {
        setError(data.error || 'OTP verification failed.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhaarNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('🔁 OTP resent successfully. Check your email.');
      } else {
        setError(data.error || 'Failed to resend OTP.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Enter OTP</h2>
        <p style={styles.subtitle}>An OTP has been sent to the email linked to your Aadhaar.</p>

        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.message}>{message}</div>}

        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          style={styles.input}
        />

        <button
          onClick={handleVerifyOtp}
          disabled={loading || otp.length !== 6}
          style={styles.button}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <button
          onClick={handleResendOtp}
          disabled={resendLoading}
          style={styles.resendButton}
        >
          {resendLoading ? 'Resending...' : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

// Inline styling — replace with your own CSS if needed
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '14px',
    marginBottom: '20px',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  resendButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#6c757d',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    color: '#b91c1c',
    backgroundColor: '#fee2e2',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  message: {
    color: '#065f46',
    backgroundColor: '#d1fae5',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
};

export default EnterOtpPage;
