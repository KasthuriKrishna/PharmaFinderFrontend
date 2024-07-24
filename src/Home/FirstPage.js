import React, { useState, useEffect } from 'react';
import './FirstPage.css';
import { useNavigate } from 'react-router-dom';

const FindMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);

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
    if (value.length > 0) {
      const filteredSuggestions = medicines.filter(medicine =>
        medicine.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const navigate = useNavigate();
  const HandleList = () => {
    navigate('/list');
  }

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <body className='searchpage'>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/about')}>About</li>
          <li onClick={() => navigate('/contact')}>Contact</li>
          <li onClick={() => navigate('/help')}>Help</li>
        </ul>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        Menu
      </button>
      <div className="container">
        <header>
          <h1>Find Medicine</h1>
        </header>
        <main>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search medicine brand name"
            className="search-bar"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
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
              <h2>In Your District</h2>
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
          <div className="broadcast">
            <button className="create-list" onClick={HandleList}>Create List</button>
          </div>
        </main>
        <footer>
          <p>Here's to your health and happiness, today and always.</p>
        </footer>
      </div>
    </body>
  );
};

export default FindMedicine;
