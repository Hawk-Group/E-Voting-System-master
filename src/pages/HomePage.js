// pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Secure E-Voting with Blockchain Technology</h1>
            <p>
              BlockVote offers a transparent, tamper-proof voting experience
              with end-to-end verification for elections of any scale.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">Register to Vote</Link>
              <Link to="/how-it-works" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose BlockVote?</h2>
            <p>Our decentralized voting platform provides multiple advantages over traditional voting systems.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-lock"></i>
              </div>
              <h3>Secure & Immutable</h3>
              <p>Votes are securely recorded on the blockchain, making them immutable and tamper-proof.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>Transparent</h3>
              <p>The entire voting process is transparent while maintaining voter privacy.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-check-double"></i>
              </div>
              <h3>Verifiable</h3>
              <p>Voters can verify that their vote was correctly recorded and counted.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Accessible</h3>
              <p>Vote from anywhere with internet access while ensuring identity verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How BlockVote Works</h2>
            <p>Simple, secure, and transparent voting in just a few steps</p>
          </div>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Register</h3>
              <p>Create an account and verify your identity using Aadhar-based authentication.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Authenticate</h3>
              <p>Login securely with two-factor authentication on election day.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Cast Your Vote</h3>
              <p>Make your selection in a private, secure environment.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Verify</h3>
              <p>Receive confirmation and track your anonymized vote on the blockchain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Elections Section */}
      

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to experience transparent and secure voting?</h2>
          <p>Join thousands of citizens using BlockVote to make their voices heard</p>
          <Link to="/signup" className="btn btn-primary">Get Started Now</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;