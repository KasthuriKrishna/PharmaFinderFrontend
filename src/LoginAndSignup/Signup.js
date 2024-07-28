import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import TitleBar from '../Components/Titlebar';
const PharmacySignup = () => {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
    name: '',
    address: '',
    contact: '',
    operatingHoursFrom: '',
    operatingHoursTo: '',
    operatingDays: 'allDays',
    pharmacyLicense: '',
    pharmacistInCharge: '',
    owner: '',
    businessRegistrationNumber: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')) {
      setFormData((prevData) => ({ ...prevData, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert('Please upload an image file (jpeg, jpg, png)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation here
    console.log('Form submitted', formData);
    // Add your form submission logic here (e.g., send data to backend)
    alert('Registration successful!');
    navigate('/login'); // Navigate to the login page after alert is accepted
  };

  return (
    <div>
    <TitleBar/>
    <body className='Pharma-signup'>
    <div className="signup-container">
      <h2>Pharmacy Registration</h2>
      <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
          <label>Email</label>
          <input type="text" name="name" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="text" name="name" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Pharmacy Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Operating Hours</label>
          <div className="operating-hours">
            <input type="time" name="operatingHoursFrom" value={formData.operatingHoursFrom} onChange={handleChange} required />
            <span>to</span>
            <input type="time" name="operatingHoursTo" value={formData.operatingHoursTo} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group">
          <label>Operating Days</label>
          <div className="operating-days">
            <label>
              <input type="radio" name="operatingDays" value="allDays" checked={formData.operatingDays === 'allDays'} onChange={handleChange} />
              All Days
            </label>
            <label>
              <input type="radio" name="operatingDays" value="closedOnSunday" checked={formData.operatingDays === 'closedOnSunday'} onChange={handleChange} />
              Closed on Sunday
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Pharmacy License</label>
          <input type="text" name="pharmacyLicense" value={formData.pharmacyLicense} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Pharmacist-in-Charge</label>
          <input type="text" name="pharmacistInCharge" value={formData.pharmacistInCharge} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Owner</label>
          <input type="text" name="owner" value={formData.owner} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Business Registration Number</label>
          <input type="text" name="businessRegistrationNumber" value={formData.businessRegistrationNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Upload Pharmacy Image</label>
          <input type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleImageChange} required />
          {imagePreview && <img src={imagePreview} alt="Pharmacy Preview" className="image-preview" />}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    </body>
    </div>
  );
};

export default PharmacySignup;
