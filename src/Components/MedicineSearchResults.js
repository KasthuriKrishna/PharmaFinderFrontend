import React, { useEffect, useState } from 'react';
import './MedicineSearch.css'; // Import the CSS file for styling

const MedicineSearchResults = ({ selectedTablets, street, town, district }) => {
  const [pharmaciesData, setPharmaciesData] = useState([]);
  const [matchingPharmacies, setMatchingPharmacies] = useState([]);

  useEffect(() => {
    fetch('/Pharmacies.json')
      .then((response) => response.json())
      .then((data) => setPharmaciesData(data))
      .catch((error) => console.error('Error fetching pharmacies data:', error));
  }, []);

  useEffect(() => {
    const findMatchingPharmacies = () => {
      const results = pharmaciesData.filter(pharmacy => {
        return selectedTablets.every(tablet => pharmacy.medicines.includes(tablet.name));
      });
      setMatchingPharmacies(results);
    };

    if (pharmaciesData.length > 0 && selectedTablets.length > 0) {
      findMatchingPharmacies();
    }
  }, [pharmaciesData, selectedTablets]);

  return (
    <div className="medicine-search-results">
      <h2>Matching Pharmacies</h2>
      {matchingPharmacies.map((pharmacy, index) => (
        <div className="pharmacy-card" key={index}>
          <div className="pharmacy-name">{pharmacy.name}</div>
          <div className="pharmacy-details">
            <p>{`${pharmacy.location.street}, ${pharmacy.location.town}, ${pharmacy.location.district}, ${pharmacy.location.state}`}</p>
            <p>Working Time: {pharmacy.workingTime}</p>
            <p className="pharmacy-contact">Contact: {pharmacy.contact}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicineSearchResults;
