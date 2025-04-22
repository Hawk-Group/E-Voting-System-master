import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import AadharOtpPage from './pages/AadharOtpPage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VotingPage from './pages/VotingPage';
import ConnectWallet from './pages/ConnectWallet';
import AdminLogin from './pages/AdminLogin';
import AdminPage from './pages/AdminPage';
import ResultsPage from './pages/ResultsPage';
import SuccessPage from './pages/SuccessPage';

import './App.css';





function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/aadhar-verification" element={<AadharOtpPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/voting" element={<VotingPage />} />
            < Route path="/connect-wallet" element={<ConnectWallet />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/results" element={<ResultsPage />} />
            < Route path="/success" element={<SuccessPage />} />
            < Route path = "admin-page" element = {<AdminPage/>} />
          
          
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

