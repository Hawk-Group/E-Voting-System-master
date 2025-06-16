import React from 'react';
import '../styles/HomePage.css';
import '../styles/AboutPage.css';
import { PieChart, Shield, Users, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Navigation */}
      

      {/* Hero Section */}
      
      <section className="hero" id="about">
        <div className="container">
          <div className="hero-content">
            <h1>Revolutionizing Democracy with Blockchain</h1>
            <p>BlackVote combines blockchain technology with Aadhaar OTP verification to create the most secure, transparent, and accessible election system.</p>
          </div>
          <div className="hero-image">
           
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <Shield size={40} />
            <h2>Our Mission</h2>
            <p>
              BlackVote is dedicated to revolutionizing the electoral process by eliminating fraud, increasing voter participation, and ensuring every vote is counted with the highest level of integrity. We believe that democracy thrives when voting is accessible, secure, and transparent.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2>Why Choose BlackVote?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Shield size={32} />
              <h3>Decentralized & Secure</h3>
              <p>Powered by blockchain technology, ensuring transparency and immutability of votes across distributed nodes.</p>
            </div>
            <div className="feature-card">
              <Users size={32} />
              <h3>Aadhaar OTP Verification</h3>
              <p>Secure authentication system to prevent identity fraud and unauthorized voting attempts.</p>
            </div>
            <div className="feature-card">
              <Globe size={32} />
              <h3>Accessible Anywhere</h3>
              <p>Vote from anywhere securely, reducing logistical challenges and long queues at polling stations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision" id="vision">
        <div className="container">
          <h2>Our Vision</h2>
          <div className="vision-content">
            <p>
              We aim to build a future where elections are 100% transparent, fully secure, and easily accessible to every eligible voter. BlackVote is committed to enhancing democratic participation through cutting-edge technology that ensures trust and integrity in the electoral process.
            </p>
          </div>
        </div>
      </section>


      
          


      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <PieChart size={24} />
              <span>BlackVote</span>
            </div>
            <p>&copy; {new Date().getFullYear()} BlackVote. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;