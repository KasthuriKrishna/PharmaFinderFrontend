import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PharmaNav.css';

const PharmaNav = ({ value, handleChange }) => {
  return (
    <nav className="tabs">
      <button className={`tab ${value === 3 ? 'active' : ''}`} onClick={() => handleChange(3, '/Pharmahome')}>
        <span className="icon">🏠</span>
        HOME
      </button>
      <button className={`tab ${value === 0 ? 'active' : ''}`} onClick={() => handleChange(0, '/stocks')}>
        <span className="icon">📊</span>
        STOCKS
      </button>
      <button className={`tab ${value === 1 ? 'active' : ''}`} onClick={() => handleChange(1, '/orders')}>
        <span className="icon">📋</span>
        REQUESTS
      </button>
      <button className={`tab ${value === 2 ? 'active' : ''}`} onClick={() => handleChange(2, '/analysis')}>
        <span className="icon">👤</span>
        ANALYTICS
      </button>
    </nav>
  );
};

export default PharmaNav;
