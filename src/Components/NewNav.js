import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NewNav.css';
import pharmacyLogo from '../Assets/Screenshot 2024-08-05 135441.png'; // Replace with the path to your logo

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={pharmacyLogo} alt="Pharmacy Logo" className="logo" />
        <span className="pharmacy-name">Pharmacy Name</span>
        <ul>
          <li onClick={() => handleNavigation('/cus-home')}>Home</li>
          <li onClick={() => handleNavigation('/home')}>Medicines</li>
          <li onClick={() => handleNavigation('/list')}>Create List</li>
          <li onClick={() => handleNavigation('/diagnosis')}>Category</li>
          <li onClick={() => handleNavigation('/pharma')}>Pharmacies</li>
          <li onClick={() => handleNavigation('/history')}>History</li>
        </ul>
      </div>
      <div className="nav-right">
        <ul>
          <li onClick={() => handleNavigation('/')}>Signout</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
