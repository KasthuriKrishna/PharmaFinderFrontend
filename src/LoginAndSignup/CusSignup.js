// src/components/LoginForm.js

import React, { useState } from 'react';
import './CusSignup.css';
import TitleBar from '../Components/Titlebar';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../Services/AxiosServices';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    mobileNumber: '',
    address: '',
    pincode: '',
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile Number must be 10 digits';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.agree) newErrors.agree = 'You must agree to the license terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await AxiosService.registerUser(formData);
        alert('Signup successful');
        navigate('/login'); // Navigate to login page
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className='cus-sign'>
      <TitleBar />
      <div className="container">
        <div className="title">Create an Account</div>
        <div className="login-container">
          <div className="section image-section">
            <img src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iQ0iR4n21G28/v0/-999x-999.gif" alt="Login" className='form-image' />
          </div>
          <div className="section form-section">
            <h3>Personal Details</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p>{errors.username}</p>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Password (repeat)"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
                {errors.mobileNumber && <p>{errors.mobileNumber}</p>}
              </div>
              <div className="form-group">
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p>{errors.dob}</p>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <p>{errors.address}</p>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
                {errors.pincode && <p>{errors.pincode}</p>}
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                <label htmlFor="agree">I agree to the license terms</label>
                {errors.agree && <p>{errors.agree}</p>}
              </div>
              <div className="submit-button-container">
                <button type="submit">Sign Up</button>
                <p><a href="/forgot-password">Forgot password?</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default LoginForm;
