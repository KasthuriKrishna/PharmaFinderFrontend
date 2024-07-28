import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handlePharma = () => {
    navigate('/pharmacist-signup');
  };

  const handlePro = () => {
    navigate('/customer-signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <body className='landing'>
      <header className="landing-header">
        <div className="app-name">PHARMAFINDER</div>
        <button className="login-button" onClick={handleLogin}>Login</button>
      </header>
      <div className="landing-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1>PHARMAFINDER</h1>
            <p>Explore our comprehensive app for easy prescription refills, medication tracking, and expert health resources.</p>
            <p>Get Started as,</p>
            <div className="buttons">
              <button className="learn-more" onClick={handlePharma}>Pharmacist</button>
              <button className="purchase" onClick={handlePro}>Customer</button>
              
            </div>
            <br/>
          </div>
        </div>
      </div>
    </body>
  );
}

export default LandingPage;
