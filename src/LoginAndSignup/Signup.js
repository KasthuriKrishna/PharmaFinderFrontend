// src/components/PharmacySignup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../Services/AxiosServices';
import './Signup.css';
import TitleBar from '../Components/Titlebar';

const PharmacySignup = () => {
  const [formData, setFormData] = useState({
    pharmacyName: '',
    address: '',
    contact: '',
    license: '',
    inCharge: '',
    businessRegistrationNumber: '',
    operatingHoursFrom: '',
    operatingHoursTo: '',
    email: '',
    password: '',
    pincode: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation here
    try {
      // Send data to backend using the service function
      await AxiosService.registerPharmacy(formData);
      alert('Registration successful!');
      navigate('/login'); // Navigate to the login page after alert is accepted
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='pharma-signup'>
      <TitleBar />
      <div className="signup-container">
        <h2>Pharmacy Registration</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Pharmacy Name</label>
            <input
              type="text"
              name="pharmacyName"
              value={formData.pharmacyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Operating Hours</label>
            <div className="operating-hours">
              <input
                type="time"
                name="operatingHoursFrom"
                value={formData.operatingHoursFrom}
                onChange={handleChange}
                required
              />
              <span>to</span>
              <input
                type="time"
                name="operatingHoursTo"
                value={formData.operatingHoursTo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Pharmacy License</label>
            <input
              type="text"
              name="license"
              value={formData.license}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pharmacist-in-Charge</label>
            <input
              type="text"
              name="inCharge"
              value={formData.inCharge}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Business Registration Number</label>
            <input
              type="text"
              name="businessRegistrationNumber"
              value={formData.businessRegistrationNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default PharmacySignup;
