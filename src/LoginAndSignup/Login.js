// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../Services/AxiosServices';
import './Login.css';
import TitleBar from '../Components/Titlebar';

function Login() {
  const [accountType, setAccountType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    if (accountType === 'pharmacist') {
      navigate('/pharmacist-signup');
    } else if (accountType === 'patient') {
      navigate('/customer-signup');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the form from submitting

    if (!accountType) {
      alert('Please select an account type');
      return;
    }

    try {
      const userData = await AxiosService.authenticateUser(accountType, email, password);

      if (userData && userData.id) {
        // Successful login
        localStorage.setItem('user', JSON.stringify(userData));
        if (accountType === 'pharmacist') {
          navigate('/pharmahome');
        } else if (accountType === 'patient') {
          navigate('/cus-home');
        }
      } else if (userData === 'Invalid email or password') {
        // Handle invalid credentials
        alert('Invalid email or password');
      } else {
        // Handle other cases if necessary
        alert('An unexpected error occurred');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <TitleBar />
      <div className="Login">
        <header className="Login-header">
          <h1>Choose Account Type</h1>
        </header>
        <div className="account-selection">
          <div 
            className={`account-box ${accountType === 'pharmacist' ? 'selected' : ''}`}
            onClick={() => setAccountType('pharmacist')}
          >
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVf-tJFOHCA-uuL9C_TYZ9ycreAHbRQZXQw&s" 
              alt="Pharmacist" 
            />
            <p>Pharmacist</p>
          </div>
          <div 
            className={`account-box ${accountType === 'patient' ? 'selected' : ''}`}
            onClick={() => setAccountType('patient')}
          >
            <img 
              src="https://png.pngtree.com/png-vector/20200211/ourmid/pngtree-illustration-of-two-person-talking-with-bubble-chat-png-image_2143687.jpg" 
              alt="Patient" 
            />
            <p>Customer</p>
          </div>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <p>Hello {accountType}</p>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="form-footer">
            <a href="#">Forgot?</a>
            <button type="submit">Login</button>
          </div>
        </form>
        <footer className="App-footer">
          <p>No account? 
            <a href="#" onClick={handleSignupRedirect}>Signup</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Login;
