import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [accountType, setAccountType] = useState('');
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    if (accountType === 'doctor') {
      navigate('/pharmacist-signup');
    } else if (accountType === 'patient') {
      navigate('/customer-signup');
    }
  };
  const Handlelogin=()=>{
    navigate('/home');
  }
  return (
    <div className="Login">
      <header className="Login-header">
        <h1>Choose Account Type</h1>
      </header>
      <div className="account-selection">
        <div 
          className={`account-box ${accountType === 'doctor' ? 'selected' : ''}`}
          onClick={() => setAccountType('doctor')}
        >
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVf-tJFOHCA-uuL9C_TYZ9ycreAHbRQZXQw&s" 
            alt="Doctor" 
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
      <form className="login-form">
        <p>Hello {accountType}</p>
        <label>Email</label>
        <input type="email" placeholder="Email" />
        <label>Password</label>
        <input type="password" placeholder="Password" />
        <div className="form-footer">
          <a href="#">Forgot?</a>
          <button type="submit" onClick={Handlelogin}>Login</button>
        </div>
      </form>
      <footer className="App-footer">
        <p>No account? 
          <a href="#" onClick={handleSignupRedirect}>Signup</a>
        </p>
      </footer>
    </div>
  );
}

export default Login;
