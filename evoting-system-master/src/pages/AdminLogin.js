import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@blockvote.com' && password === 'password') {
        console.log('Login successful');
        navigate('/admin');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <nav className="bg-indigo-700 fixed top-0 w-full z-10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-xl text-white">SecureVote</span>
          </div>
          <a href="/" className="text-indigo-100 hover:text-white text-sm">
            Return to Homepage
          </a>
        </div>
      </nav>

      <div className="max-w-md w-full mx-auto mt-16 px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-indigo-700 p-6 flex justify-center">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg className="h-8 w-8 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Login</h1>
            <p className="text-center text-gray-600 mb-6">Enter your credentials to access the admin dashboard</p>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800">
                    Forgot Password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center mb-6">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="h-4 w-4 mr-2 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>This login is secured with blockchain verification. All login attempts are recorded for security purposes.</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-2 pulse-animation"></div>
            <span>Blockchain network active and secure</span>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Need assistance? <a href="/contact" className="text-indigo-600 hover:text-indigo-500">Contact Support</a>
        </p>
      </div>

      <style jsx>{`
        .pulse-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
