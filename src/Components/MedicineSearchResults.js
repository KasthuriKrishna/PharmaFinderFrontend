import React, { useState, useEffect } from 'react';
import './MedicineSearch.css'; // Import the CSS file for styling
import AxiosService from '../Services/AxiosServices'; // Import the service

const MedicineSearchResults = ({ medicineId }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultImageUrl = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirUFlrtgja7F8uYssWXMYPEeM-282RKBWy4hFUbC_S2JpQE5jW4RS0hCKaAo87tCpFFPy9e8KEPUoV8nDTQzDZEWw9YzDIQ0DGohGvrBzT6l_cj2HWCjp7z4RV_q58wHTo5-mUQ2t5eD_LWC6ZQZfBmsdkm60Gbl8SAUlTi8lieTKmbUdO5IfUQtOA/s1000/Definition%20of%20Hospital%20Pharmacy.jpeg'; // Replace with the actual path to your default image

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userPincode = user ? user.pincode : '';
        const data = await AxiosService.searchMedicineInPharmacies(medicineId, userPincode);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (medicineId) {
      fetchResults();
    }
  }, [medicineId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="medicine-search-results">
      <h2>Matching Pharmacies</h2>
      <div className="pharmacy-list">
        {searchResults.length > 0 ? (
          searchResults.map((pharmacy, index) => (
            <div key={index} className="pharmacy-card">
              <div className="pharmacy-details">
                <h2>{pharmacy.pharmacyName}</h2>
                <p><strong>Address:</strong> {pharmacy.address}</p>
                <p><strong>Contact:</strong> {pharmacy.contact}</p>
              </div>
              <div className="pharmacy-image">
                <img src={defaultImageUrl} alt="Pharmacy" />
              </div>
            </div>
          ))
        ) : (
          <p>No matching pharmacies found.</p>
        )}
      </div>
    </div>
  );
};

export default MedicineSearchResults;
