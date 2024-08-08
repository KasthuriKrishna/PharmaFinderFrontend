import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Options.css'; // Add your CSS file here

const Options = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="homepage">
      <div className="homepage-card-container">
        <div className="homepage-card" onClick={() => handleNavigation('/pharma')}>
          <p className="homepage-card-title">Pharmacy Near Me</p>
          <span className="homepage-card-subtitle">Find Store</span>
        </div>
        <div className="homepage-card" onClick={() => handleNavigation('/home')}>
          <p className="homepage-card-title">Find Medicine</p>
          <span className="homepage-card-subtitle">Find Now</span>
        </div>
        <div className="homepage-card" onClick={() => handleNavigation('/list')}>
          <p className="homepage-card-title">Search a list of medicines</p>
          <span className="homepage-card-subtitle">Search Now</span>
        </div>
        <div className="homepage-card" onClick={() => handleNavigation('/diagnosis')}>
          <p className="homepage-card-title">Find medicine by symptoms</p>
          <span className="homepage-card-subtitle">Explore Now</span>
        </div>
        <div className="homepage-card" onClick={() => handleNavigation('/history')}>
          <p className="homepage-card-title">Posts</p>
          <span className="homepage-card-subtitle">View Now</span>
        </div>
      </div>
      
    </div>
  );
};

export default Options;
