import React, { useState, useEffect } from 'react';
import './FirstPage.css'; // Import the CSS file for styling
import NewNavBar from '../Components/NewNav';
import MedicineSearchResults from '../Components/MedicineSearchResults';
import AxiosService from '../Services/AxiosServices'; // Import the service

const FindMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  useEffect(() => {
    const fetchMedicinesData = async () => {
      try {
        const data = await AxiosService.fetchMedicines();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicinesData();
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setActiveSuggestionIndex(-1);
    if (value.length > 0) {
      const filteredSuggestions = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setSelectedMedicine(null);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSelectedMedicine(suggestion);
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (!selectedMedicine) {
      alert("Please select a medicine from the suggestions.");
      return;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSuggestionIndex(prevIndex => 
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSuggestionIndex(prevIndex => 
        Math.max(prevIndex - 1, 0)
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeSuggestionIndex]);
        setActiveSuggestionIndex(-1);
      } else {
        handleSearch();
      }
    }
  };

  return (
    <div className='find-medicine-page'>
      <NewNavBar />
      <div className='find-medicine-container'>
        <header className='find-medicine-header'>
          <h1>Find Medicine</h1>
        </header>
        <main className='find-medicine-main'>
          <div className="find-medicine-search-bar-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search medicine brand name"
              className="find-medicine-search-bar"
            />
            {searchTerm && (
              <button className="find-medicine-clear-button" onClick={handleClearSearch}>
                &times;
              </button>
            )}
          </div>
          {!searchTerm && !selectedMedicine && (
            <div className="find-medicine-placeholder">
              <img src="https://nordvpn.com/wp-content/uploads/blog-social-browser-vs-search-engine-1200x628-1.png" alt="Placeholder" className="placeholder-image" />
              <h3>Please enter a medicine name to start your search.</h3>
            </div>
          )}
          {searchTerm && (
            <>
              {suggestions.length > 0 && (
                <ul className="find-medicine-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={index === activeSuggestionIndex ? 'find-medicine-active-suggestion' : ''}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
              {selectedMedicine && (
                <div className="find-medicine-dosages">
                  <h3>Available Dosages:</h3>
                  <ul>
                    {selectedMedicine.dosages.map((dosage, index) => (
                      <li key={index} className="find-medicine-dosage-item">
                        {dosage.dosage} - ${dosage.cost}
                      </li>
                    ))}
                  </ul>
                  <MedicineSearchResults medicineId={selectedMedicine.id} />
                </div>
              )}
            </>
          )}
        </main>
        <footer className='find-medicine-footer'>
          <p>Here's to your health and happiness, today and always.</p>
        </footer>
      </div>
    </div>
  );
};

export default FindMedicine;
