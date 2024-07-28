import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import './Post.css';

const Post = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedMedicines } = location.state || { selectedMedicines: [] };
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orderTitle, setOrderTitle] = useState(''); // New state for order title

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handlePostRequirement = () => {
    if (!file) {
      alert('Please upload a file before posting.');
      return;
    }
    if (!orderTitle) {
      alert('Please enter an order title before posting.');
      return;
    }

    // Show alert and navigate on confirmation
    if (window.confirm('Post successful! You can check the replies on the history page.')) {
      navigate('/history');
    }
  };

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const totalQuantity = selectedMedicines.reduce((total, medicine) => total + medicine.quantity, 0);

  return (
    <div className="post-background">
      <Navbar menuOpen={sidebarOpen} toggleMenu={toggleMenu} />
      <div className="post-container">
        <h1>Selected Medicines</h1>
        <ul>
          {selectedMedicines.map((medicine, index) => (
            <li key={index} className="medicine-card">
              <strong>{medicine.name}</strong>: {medicine.selectedDosage}, Quantity: {medicine.quantity}
            </li>
          ))}
        </ul>
        <div className="total">Total: {totalQuantity}</div>
        <div className="order-title-section">
          <label htmlFor="order-title">Order Title:</label>
          <input
            type="text"
            id="order-title"
            value={orderTitle}
            onChange={(e) => setOrderTitle(e.target.value)}
            placeholder="Enter Order Title"
            required
          />
        </div>
        <div className="upload-section">
          <input type="file" onChange={handleFileChange} />
          {filePreview && (
            <div className="file-preview">
              <h3>File Preview:</h3>
              <img src={filePreview} alt="Prescription Preview" />
            </div>
          )}
        </div>
        <button className="post-btn" onClick={handlePostRequirement}>Post Requirement</button>
      </div>
    </div>
  );
};

export default Post;
