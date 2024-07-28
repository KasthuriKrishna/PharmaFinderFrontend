import React, { useState, useEffect } from 'react';
import './Diagnosis.css';
import Navbar from '../Components/Navbar';
import MedicineSearchResults from '../Components/MedicineSearchResults';
import { useNavigate } from 'react-router-dom';

const SearchSymptoms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [symptomsData, setSymptomsData] = useState([]);
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedTablets, setSelectedTablets] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/Symptoms.json')
      .then((response) => response.json())
      .then((data) => setSymptomsData(data))
      .catch((error) => console.error('Error fetching symptoms data:', error));
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredSymptoms([]);
    } else {
      const filtered = symptomsData.filter(symptom =>
        symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSymptoms(filtered);
    }
  }, [searchTerm, symptomsData]);

  useEffect(() => {
    console.log('Selected Tablets:', selectedTablets);
  }, [selectedTablets]);

  const handleSymptomClick = (symptom) => {
    setSelectedSymptom(symptom);
    setSearchTerm('');
    setFilteredSymptoms([]);
    setShowSearchButton(false);
  };

  const formatDosage = (dosageString) => {
    const match = dosageString.match(/(\d+mg)/);
    return match ? match[0] : 'Dosage not available';
  };

  const handleAddTablet = (tablet) => {
    setSelectedTablets((prevSelectedTablets) => {
      const existingTablet = prevSelectedTablets.find(t => t.name === tablet.name);
      const formattedDosage = formatDosage(tablet.dosage);

      if (existingTablet) {
        return prevSelectedTablets.map(t =>
          t.name === tablet.name ? { ...t, quantity: t.quantity + 1 } : t
        );
      } else {
        setShowSearchButton(true); // Show the button after adding a tablet
        return [...prevSelectedTablets, { name: tablet.name, selectedDosage: formattedDosage, quantity: 1 }];
      }
    });
  };

  const handleIncrement = (tablet) => {
    setSelectedTablets((prevSelectedTablets) => 
      prevSelectedTablets.map(t =>
        t.name === tablet.name ? { ...t, quantity: t.quantity + 1 } : t
      )
    );
  };

  const handleDecrement = (tablet) => {
    setSelectedTablets((prevSelectedTablets) => 
      prevSelectedTablets.map(t =>
        t.name === tablet.name && t.quantity > 1 ? { ...t, quantity: t.quantity - 1 } : t
      )
    );
  };

  const handleRemove = (tablet) => {
    setSelectedTablets((prevSelectedTablets) =>
      prevSelectedTablets.filter(t => t.name !== tablet.name)
    );
  };

  const getTabletQuantity = (tablet) => {
    const selectedTablet = selectedTablets.find(t => t.name === tablet.name);
    return selectedTablet ? selectedTablet.quantity : 0;
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const handlePost = () => {
    if (selectedTablets.length === 0) {
      alert('Please select at least one tablet.');
      return;
    }
    navigate('/post', { state: { selectedMedicines: selectedTablets } });
  };

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="search-symptoms-page">
      <Navbar menuOpen={sidebarOpen} toggleMenu={toggleMenu} />
      <div className="diagnosis-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Symptoms"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredSymptoms.length > 0 && (
          <div className="suggestions">
            {filteredSymptoms.map((symptom) => (
              <div
                key={symptom.name}
                className="suggestion"
                onClick={() => handleSymptomClick(symptom)}
              >
                {symptom.name}
              </div>
            ))}
          </div>
        )}
        {selectedSymptom ? (
          <div className="symptom-details">
            <h2>{selectedSymptom.name}</h2>
            <div className="grid">
              {selectedSymptom.tablets.map((tablet, index) => (
                <div className="tablet-card" key={index}>
                  <h3>{tablet.name}</h3>
                  <p>{tablet.description}</p>
                  <p><strong>Dosage:</strong> {tablet.dosage}</p>
                  {getTabletQuantity(tablet) > 0 ? (
                    <div className="quantity-controls">
                      <button
                        className="decrement-btn"
                        onClick={() => handleDecrement(tablet)}
                        disabled={getTabletQuantity(tablet) === 1}
                      >
                        -
                      </button>
                      <span>{getTabletQuantity(tablet)}</span>
                      <button
                        className="increment-btn"
                        onClick={() => handleIncrement(tablet)}
                      >
                        +
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(tablet)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-btn"
                      onClick={() => handleAddTablet(tablet)}
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h2>Common Symptoms</h2>
            <div className="grid">
              <div className="symptom-card">
                <img src="https://5.imimg.com/data5/SELLER/Default/2023/6/319597573/MH/NE/SR/135658020/ibuprofen-400-mg-bp-tablets.jpg" alt="Body pain" />
                <p>Body pain</p>
              </div>
              <div className="symptom-card">
                <img src="https://www.netmeds.com/images/product-v1/600x600/387780/vomistop_10mg_tablet_10_s_0.jpg" alt="Vomiting" />
                <p>Vomiting</p>
              </div>
              <div className="symptom-card">
                <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/DZ/WH/DE/138308991/antibiotic-tablets.jpg" alt="Fever" />
                <p>Fever</p>
              </div>
            </div>
          </>
        )}
        {selectedTablets.length > 0 && (
          <div className="selected-tablets">
            <h2 style={{color:"white"}}>Selected Tablets</h2>
            <ul className="selected-tablets-list">
              {selectedTablets.map((tablet, index) => (
                <li key={index} className="selected-tablet-item">
                  <span className="tablet-name">{tablet.name} - Dosage: {tablet.selectedDosage}</span>
                  <div className="quantity-controls">
                    <button
                      className="decrement-btn"
                      onClick={() => handleDecrement(tablet)}
                      disabled={tablet.quantity === 1}
                    >
                      -
                    </button>
                    <span>{tablet.quantity}</span>
                    <button
                      className="increment-btn"
                      onClick={() => handleIncrement(tablet)}
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(tablet)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {showSearchButton && selectedSymptom && selectedTablets.length > 0 && (
          <button onClick={handleSearch} className="search-btn">Search the List</button>
        )}
        {showSearchButton && selectedSymptom && selectedTablets.length > 0 && (
          <button onClick={handlePost} className="search-btn">Post the List</button>
        )}
        {showResults && (
          <MedicineSearchResults
            selectedTablets={selectedTablets}
            street="123 Main St"
            town="Springfield"
            district="Springfield District"
          />
        )}
      </div>
    </div>
  );
};

export default SearchSymptoms;
