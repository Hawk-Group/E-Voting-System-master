import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomePage.css';

function HomePage() {
  useEffect(() => {
    document.title = 'Home | YourApp';
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Welcome to YourApp</h1>
            <p>Your modern solution for seamless digital experiences</p>
            <div className="cta-buttons">
              <Link to="/signup">
                <motion.button 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button 
                  className="btn btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Our Features</h2>
          <div className="features-grid">
            {[
              { title: 'Secure', icon: '🔒', desc: 'End-to-end encryption for all your data' },
              { title: 'Fast', icon: '⚡', desc: 'Lightning quick response times' },
              { title: 'Simple', icon: '✨', desc: 'Intuitive interface designed for everyone' }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;