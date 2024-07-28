import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Titlebar.css'; // Create a CSS file for styling the title bar

const TitleBar = () => {
  const navigate = useNavigate();

  const handleReturnClick = () => {
    navigate('/');
  };

  return (
    <div className="title-bar">
      
      <div className="title-bar-content">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULs1wBW9nMiS7WlEf_jsMpvhVGh0gGfdgvQ&s" alt="Logo" className="logo" />
        <h1 className="app-name">PharmaFinder</h1>
      </div>
      <button className="return-button" onClick={handleReturnClick}>Return</button>
    </div>
  );
};

export default TitleBar;
