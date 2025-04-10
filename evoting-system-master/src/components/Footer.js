import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="copyright">&copy; {new Date().getFullYear()} BlockVote. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;