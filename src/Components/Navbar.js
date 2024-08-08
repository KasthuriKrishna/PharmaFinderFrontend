import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ menuOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Clear the local storage
    localStorage.removeItem('user');

    // Redirect to the home page
    navigate('/');
  };
  return (
    <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <ul className='navul'>
        <li onClick={() => navigate('/cus-home')} className='navli'>🏠 Home</li>
        <li onClick={() => navigate('/home')} className='navli'>🔍 Discover</li>
        <li onClick={() => navigate('/list')} className='navli'>📃 Create List</li>
        <li onClick={() => navigate('/diagnosis')} className='navli'>🏥 Diagnosis</li>
        <li onClick={() => navigate('/history')} className='navli'>🛒 Posts</li>
        <li className="navli" onClick={handleSignOut}>🏃 Sign Out</li>
      </ul>
    </div>
  );
};

export default Navbar;
