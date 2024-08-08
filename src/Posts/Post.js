import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import './Post.css';
import axios from 'axios';

const Post = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedMedicines } = location.state || { selectedMedicines: [] };
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orderTitle, setOrderTitle] = useState('');
  const [userPincode, setUserPincode] = useState('');
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    // Fetch user data from local storage and parse it
    const storedUserData = localStorage.getItem('user');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;

    if (userData) {
      setUserPincode(userData.pincode || '');
      
      // Fetch pharmacies with the same pincode
      axios.get(`http://localhost:8080/api/pharmacies/by-pincode?pincode=${userData.pincode}`)
        .then(response => {
          setPharmacies(response.data);
        })
        .catch(error => {
          console.error('Error fetching pharmacies:', error);
        });
    }
  }, []);

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

    const currentDate = new Date().toISOString();
    const storedUserData = localStorage.getItem('user');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;

    if (userData && userData.id && pharmacies.length > 0) {
      selectedMedicines.forEach(medicine => {
        pharmacies.forEach(pharmacy => {
          const orderData = {
            user: { id: userData.id },
            pharmacy: { id: pharmacy.id },
            medicine: { id: medicine.id },
            quantity: medicine.quantity,
            orderDate: currentDate
          };

          axios.post('http://localhost:8080/api/order-histories', orderData)
            .then(response => {
              console.log('Order placed successfully:', response.data);
            })
            .catch(error => {
              console.error('Error placing order:', error);
            });
        });
      });

      // Show alert and navigate on confirmation
      if (window.confirm('Post successful! You can check the replies on the history page.')) {
        navigate('/history');
      }
    } else {
      alert('User ID or pharmacies data not found.');
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
              <strong>{medicine.name}</strong>: {medicine.selectedDosage ? medicine.selectedDosage.dosage : 'N/A'}, Quantity: {medicine.quantity}
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
