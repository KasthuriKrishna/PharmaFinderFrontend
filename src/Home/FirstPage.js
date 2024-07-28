import React, { useState, useEffect } from 'react';
import './FirstPage.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const FindMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const userAddress = {
    street: "456 Elm St",
    town: "Springfield",
    district: "Springfield District",
    state: "Example State"
  };

  useEffect(() => {
    fetch('/Medicines.json')
      .then(response => response.json())
      .then(data => setMedicines(data));

    fetch('/pharmacies.json')
      .then(response => response.json())
      .then(data => setPharmacies(data));
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setActiveSuggestionIndex(-1);
    if (value.length > 0) {
      const filteredSuggestions = medicines.filter(medicine =>
        medicine.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setSearchResults({
      nearYou: [],
      inYourDistrict: []
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleSearch = () => {
    const filteredResults = pharmacies.filter(pharmacy =>
      pharmacy.medicines.some(medicine =>
        medicine.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    const categorizedResults = {
      nearYou: [],
      inYourDistrict: []
    };

    filteredResults.forEach(pharmacy => {
      if (pharmacy.location.town === userAddress.town && pharmacy.location.street === userAddress.street) {
        categorizedResults.nearYou.push(pharmacy);
      } else if (pharmacy.location.district === userAddress.district) {
        categorizedResults.inYourDistrict.push(pharmacy);
      }
    });

    setSearchResults(categorizedResults);
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
        handleSearch();
      }
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setActiveSuggestionIndex(-1);
    }
  }, [searchTerm]);

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='searchpage'>
      <Navbar menuOpen={sidebarOpen} toggleMenu={toggleMenu} />
      <body className='searchpage'>
      <div className="first-container">
        <header>
          <h1>Find Medicine</h1>
        </header>
        <main>
          <div className="search-bar-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search medicine brand name"
              className="search-bar"
            />
            {searchTerm && (
              <button className="clear-button" onClick={handleClearSearch}>
                &times;
              </button>
            )}
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={index === activeSuggestionIndex ? 'active' : ''}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          {searchResults.nearYou && searchResults.nearYou.length > 0 && (
            <div>
              <h2>Near You</h2>
              <ul className="search-results">
                {searchResults.nearYou.map((result, index) => (
                  <li key={index}>
                    <h3>{result.name}</h3>
                    <p>{`${result.location.street}, ${result.location.town}, ${result.location.district}, ${result.location.state}`}</p>
                    <p>Working Time: {result.workingTime}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {searchResults.inYourDistrict && searchResults.inYourDistrict.length > 0 && (
            <div>
              <h2>Near You</h2>
              <ul className="search-results">
                {searchResults.inYourDistrict.map((result, index) => (
                  <li key={index}>
                    <h3>{result.name}</h3>
                    <p>{`${result.location.street}, ${result.location.town}, ${result.location.district}, ${result.location.state}`}</p>
                    <p>Working Time: {result.workingTime}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
        <footer>
          <p>Here's to your health and happiness, today and always.</p>
        </footer>
      </div>
      </body>
    </div>
  );
};

export default FindMedicine;
