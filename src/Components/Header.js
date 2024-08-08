import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        navigate('/');
    };

    return (
        <header className="headerappBar">
            <div className="toolbar">
                <h1 style={{color:"white"}}>Pharmacy</h1>
                <button className="signOutButton" onClick={handleSignOut}>Sign out</button>
            </div>
        </header>
    );
};

export default Header;
