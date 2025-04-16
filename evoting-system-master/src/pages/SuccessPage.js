// src/pages/SuccessPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/"); // Change this to your homepage route if needed
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <h1>✅ Vote Cast Successfully!</h1>
        <p>Thank you for participating in the democratic process.</p>
        <button onClick={handleBackHome}>Go Back Home</button>
      </div>
    </div>
  );
};

export default SuccessPage;
