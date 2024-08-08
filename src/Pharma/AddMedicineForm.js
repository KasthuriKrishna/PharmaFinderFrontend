import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddMedicineForm.css';
import PharmaNav from '../Components/PharmaNav';
import Header from '../Components/Header';

const AddMedicineForm = () => {
  const [medicine, setMedicine] = useState({
    name: '',
    purpose: '',
    category: '',
    brand: '',
    cost: '',
    quantity: '',
    dosages: [{ id: '', dosage: '', cost: '' }],
    form: ''
  });
  const [pharmacyId, setPharmacyId] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
    const handleChanges = (newValue, path) => {
        setValue(newValue);
        navigate(path);
      };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setPharmacyId(user.id);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDosageChange = (index, e) => {
    const { name, value } = e.target;
    const newDosages = [...medicine.dosages];
    newDosages[index][name] = value;
    setMedicine(prevState => ({ ...prevState, dosages: newDosages }));
  };

  const addDosage = () => {
    setMedicine(prevState => ({
      ...prevState,
      dosages: [...prevState.dosages, { id: '', dosage: '', cost: '' }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...medicine, pharmacyId };

    axios.post('http://localhost:8080/api/medicines', data)
      .then(response => {
        alert('Medicine added successfully!');
        navigate('/stocks');
      })
      .catch(error => {
        console.error('Error adding medicine:', error);
      });
  };

  return (
    <div className='addmeddiv'>
    <Header />
            <div>
            <PharmaNav value={value} handleChange={handleChanges} />
            </div>
    
    <div className="add-medicine-form">
      <h1 className="form-title">Add New Medicine</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label className="form-label">
          Name:
          <input type="text" name="name" value={medicine.name} onChange={handleChange} className="form-input" required />
        </label>
        <label className="form-label">
          Purpose:
          <input type="text" name="purpose" value={medicine.purpose} onChange={handleChange} className="form-input" required />
        </label>
        <label className="form-label">
          Category:
          <input type="text" name="category" value={medicine.category} onChange={handleChange} className="form-input" required />
        </label>
        <label className="form-label">
          Brand:
          <input type="text" name="brand" value={medicine.brand} onChange={handleChange} className="form-input" required />
        </label>
        <label className="form-label">
          Cost:
          <input type="number" step="0.01" name="cost" value={medicine.cost} onChange={handleChange} className="form-input" required />
        </label>
        <label className="form-label">
          Quantity:
          <input type="number" name="quantity" value={medicine.quantity} onChange={handleChange} className="form-input" required />
        </label>
        {medicine.dosages.map((dosage, index) => (
          <div key={index} className="dosage-container">
            <label className="dosage-label">
              Dosage:
              <input type="text" name="dosage" value={dosage.dosage} onChange={e => handleDosageChange(index, e)} className="dosage-input" required />
            </label>
            <label className="dosage-label">
              Cost:
              <input type="number" step="0.01" name="cost" value={dosage.cost} onChange={e => handleDosageChange(index, e)} className="dosage-input" required />
            </label>
          </div>
        ))}
        <button type="button" onClick={addDosage} className="add-dosage-button">Add Dosage</button>
        <label className="form-label">
          Form:
          <input type="text" name="form" value={medicine.form} onChange={handleChange} className="form-input" required />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default AddMedicineForm;
