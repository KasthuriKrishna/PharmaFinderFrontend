import React, { useState, useEffect } from 'react';
import './Diagnosis.css';
import NewNav from '../Components/NewNav';
import ListMedicineSearch from '../Components/ListMedicineSearch';
import { useNavigate } from 'react-router-dom';
import AxiosServices from '../Services/AxiosServices';

const SearchSymptoms = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const userPincode = user ? user.pincode : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await AxiosServices.fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchMedicines = async () => {
        try {
          const data = await AxiosServices.fetchMedicinesByCategory(selectedCategory);
          setMedicines(data);
        } catch (error) {
          console.error('Error fetching medicines:', error);
        }
      };

      fetchMedicines();
    }
  }, [selectedCategory]);

  const handleAddMedicine = (medicine, dosageId) => {
    setSelectedMedicines((prevSelectedMedicines) => {
      const existingMedicine = prevSelectedMedicines.find(m => m.id === medicine.id);
      if (existingMedicine) {
        return prevSelectedMedicines.map(m =>
          m.id === medicine.id ? { ...m, quantity: m.quantity + 1 } : m
        );
      } else {
        const selectedDosage = medicine.dosages.find(d => d.id === dosageId);
        return [...prevSelectedMedicines, { ...medicine, selectedDosage, quantity: 1 }];
      }
    });
  };

  const handleIncrement = (medicine) => {
    setSelectedMedicines((prevSelectedMedicines) =>
      prevSelectedMedicines.map(m =>
        m.id === medicine.id ? { ...m, quantity: m.quantity + 1 } : m
      )
    );
  };

  const handleDecrement = (medicine) => {
    setSelectedMedicines((prevSelectedMedicines) =>
      prevSelectedMedicines.map(m =>
        m.id === medicine.id && m.quantity > 1 ? { ...m, quantity: m.quantity - 1 } : m
      )
    );
  };

  const handleRemove = (medicine) => {
    setSelectedMedicines((prevSelectedMedicines) =>
      prevSelectedMedicines.filter(m => m.id !== medicine.id)
    );
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const handlePost = () => {
    if (selectedMedicines.length === 0) {
      alert('Please select at least one medicine.');
      return;
    }
    navigate('/post', { state: { selectedMedicines } });
  };

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <NewNav />
      <div className="search-symptoms-page">
        <div className="diagnosis-container">
          <div className="dg-search-bar">
            <select
              className="search-input"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory || ''}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <br/>
          {!selectedCategory && (
            
            <div className="sys-prefix-common-symptoms">
  <h2>Common Symptoms</h2>
  <div className="sys-prefix-grid">
    <div className="sys-prefix-symptom-card odd">
      <img src="https://5.imimg.com/data5/SELLER/Default/2023/6/319597573/MH/NE/SR/135658020/ibuprofen-400-mg-bp-tablets.jpg" alt="Body pain" />
      <div className="sys-prefix-symptom-info">
        <p>Body pain / Fever</p>
        <p className="sys-prefix-description">Often indicates an underlying infection or inflammation in the body.</p>
      </div>
    </div>
    <div className="sys-prefix-symptom-card even">
      <div className="sys-prefix-symptom-info">
        <p>Stomach Pain</p>
        <p className="sys-prefix-description">Can be caused by various digestive issues, including gastritis or ulcers.</p>
      </div>
      <img src="https://www.netmeds.com/images/product-v1/600x600/387780/vomistop_10mg_tablet_10_s_0.jpg" alt="Stomach Pain" />
    </div>
    <div className="sys-prefix-symptom-card odd">
      <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/DZ/WH/DE/138308991/antibiotic-tablets.jpg" alt="Allergy" />
      <div className="sys-prefix-symptom-info">
        <p>Allergy</p>
        <p className="sys-prefix-description">A reaction by the immune system to substances that are normally harmless.</p>
      </div>
    </div>
    <div className="sys-prefix-symptom-card even">
      <div className="sys-prefix-symptom-info">
        <p>Viral/Bacterial Infections</p>
        <p className="sys-prefix-description">These can cause a range of symptoms, from mild to severe, requiring medical attention.</p>
      </div>
      <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/DZ/WH/DE/138308991/antibiotic-tablets.jpg" alt="Viral/Bacterial Infections" />
    </div>
    <div className="sys-prefix-symptom-card odd">
      <img src="https://5.imimg.com/data5/SELLER/Default/2023/6/319597573/MH/NE/SR/135658020/ibuprofen-400-mg-bp-tablets.jpg" alt="Headache" />
      <div className="sys-prefix-symptom-info">
        <p>Headache</p>
        <p className="sys-prefix-description">A common condition that can be caused by stress, fatigue, or other factors.</p>
      </div>
    </div>
  </div>
</div>

          )}

          {selectedCategory && medicines.length > 0 && (
            <div className="medicine-list">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="dg-medicine-card">
                  <img src="https://as1.ftcdn.net/v2/jpg/01/85/92/06/1000_F_185920604_iOlmrlIMArPqApAxQgANl9kY4Ze38eah.jpg" alt={medicine.name} />
                  <h3>{medicine.name}</h3>
                  <p>Brand: {medicine.brand}</p>
                  <p>Category: {medicine.category}</p>
                  <p>Form: {medicine.form}</p>
    
                  <select
                    onChange={(e) => {
                      const selectedDosageId = parseInt(e.target.value, 10);
                      handleAddMedicine(medicine, selectedDosageId);
                    }}
                  >
                    <option value="">Select Dosage</option>
                    {medicine.dosages.map((dosage) => (
                      <option key={dosage.id} value={dosage.id}>
                        {dosage.dosage} - ₹ {dosage.cost}
                      </option>
                    ))}
                  </select>
                  <button className="search-btn" onClick={() => handleAddMedicine(medicine, medicine.dosages[0].id)}>Add to Cart</button>
                </div>
              ))}
            </div>
          )}

          {selectedMedicines.length > 0 && (
            <div className="selected-medicines">
              <h2>Selected Medicines</h2>
              <ul>
                {selectedMedicines.map((medicine) => (
                  <li key={medicine.id}>
                    <div className="dg-medicine-card">
                      <img src="https://as1.ftcdn.net/v2/jpg/01/85/92/06/1000_F_185920604_iOlmrlIMArPqApAxQgANl9kY4Ze38eah.jpg" alt={medicine.name} />
                      <h3>{medicine.name}</h3>
                      <p>Brand: {medicine.brand}</p>
                      <p>Category: {medicine.category}</p>
                      <p>Form: {medicine.form}</p>
                      <p>Cost: ${medicine.cost.toFixed(2)}</p>
                      <p>Dosage: {medicine.selectedDosage.strength}</p>
                      <div className="quantity-controls">
                        <button onClick={() => handleIncrement(medicine)}>+</button>
                        <span>{medicine.quantity}</span>
                        <button onClick={() => handleDecrement(medicine)}>-</button>
                        <button onClick={() => handleRemove(medicine)}>Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="search-btn" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchSymptoms;
