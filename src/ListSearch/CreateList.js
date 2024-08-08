import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateList.css';
import NewNav from '../Components/NewNav';
import ListMedicineSearch from '../Components/ListMedicineSearch';
import AxiosService from '../Services/AxiosServices'; // Import the service

const CreateList = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userPincode = user ? user.pincode : null;

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await AxiosService.fetchMedicines();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filteredSuggestions = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm('');
    setSuggestions([]);
    if (!selectedMedicines.some(med => med.name === suggestion.name)) {
      setSelectedMedicines([...selectedMedicines, { ...suggestion, quantity: 1, selectedDosage: suggestion.dosages[0].id }]);
    }
  };

  const handleQuantityChange = (index, delta) => {
    const updatedMedicines = [...selectedMedicines];
    updatedMedicines[index].quantity += delta;
    if (updatedMedicines[index].quantity <= 0) {
      updatedMedicines.splice(index, 1);
    }
    setSelectedMedicines(updatedMedicines);
  };

  const handleDosageChange = (index, event) => {
    const updatedMedicines = [...selectedMedicines];
    updatedMedicines[index].selectedDosage = parseInt(event.target.value, 10);
    setSelectedMedicines(updatedMedicines);
  };

  const handlePost = () => {
    if (selectedMedicines.length === 0) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    navigate('/post', { state: { selectedMedicines } });
  };

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div >
      <NewNav/>
      <div className="create-list-container">
        <header>
          <h1>Create List</h1>
        </header>
        <main>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search Medicine"
            className="list-search-bar"
          />
          {suggestions.length > 0 && (
            <ul className="list-suggestions">
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
          <div className="selected-medicines">
            {selectedMedicines.map((medicine, index) => (
              <div key={index} className="medicine-item">
                <span>{medicine.name}</span>
                <select
                  value={medicine.selectedDosage}
                  onChange={(event) => handleDosageChange(index, event)}
                >
                  {medicine.dosages.map((dosage) => (
                    <option key={dosage.id} value={dosage.id}>
                      {dosage.dosage}
                    </option>
                  ))}
                </select>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                  <span>{medicine.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                </div>
                <button onClick={() => handleQuantityChange(index, -medicine.quantity)}>X</button>
              </div>
            ))}
          </div>
          {showWarning && (
            <div className="warning-message">
              <img src="https://img.freepik.com/premium-vector/warning-icon-vector-isolated-white-background_162100-446.jpg" alt="Warning" width="100px" height="100px"/>
              <p>Please select at least one medicine.</p>
            </div>
          )}
          <div className="action-buttons">
            <button className="search-button">
              Search
            </button>
            <button className="post-button" onClick={handlePost}>
              Post
            </button>
          </div>
          {userPincode ? (
            <ListMedicineSearch selectedMedicines={selectedMedicines} userPincode={userPincode} />
          ) : (
            <p>Please set your pincode in local storage.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default CreateList;
