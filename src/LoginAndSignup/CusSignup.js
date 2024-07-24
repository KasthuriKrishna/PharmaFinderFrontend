import React, { useState } from 'react';
import './CusSignup.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    street: '',
    townArea: '',
    district: '',
    state: '',
    dateOfBirth: '',
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
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
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
    if (!formData.street) newErrors.street = 'Street is required';
    if (!formData.townArea) newErrors.townArea = 'Town/Area is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.agree) newErrors.agree = 'You must agree to the license terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here
      console.log(formData);
    }
  };

  return (
    <div className="container">
      <div className="title">Create an Account</div>
      <div className="login-container">
        <div className="section image-section">
          <img src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iQ0iR4n21G28/v0/-999x-999.gif" alt="Login" />
        </div>
        <div className="section form-section">
          <h3>Personal Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p>{errors.firstName}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p>{errors.lastName}</p>}
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
          </form>
        </div>
        <div className="section form-section">
          <h3>Address</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
              />
              {errors.street && <p>{errors.street}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="townArea"
                placeholder="Town"
                value={formData.townArea}
                onChange={handleChange}
              />
              {errors.townArea && <p>{errors.townArea}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
              />
              {errors.district && <p>{errors.district}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && <p>{errors.state}</p>}
            </div>
            <div className="form-group">
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label htmlFor="agree">I agree to the license terms.</label>
              {errors.agree && <p>{errors.agree}</p>}
            </div>
          </form>
        </div>
      </div>
      <div className="submit-button-container">
        <button onClick={handleSubmit}>Sign Up</button>
        <p><a href="/forgot-password">Forgot password?</a></p>
      </div>
    </div>
  );
}

export default LoginForm;
