import React, { useState, useEffect } from 'react';
import './ListMedicineSearch.css'; // Import the CSS file for styling
import AxiosService from '../Services/AxiosServices'; // Import the service

const MedicineSearchResults = ({ selectedMedicines, userPincode }) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const defaultImageUrl = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirUFlrtgja7F8uYssWXMYPEeM-282RKBWy4hFUbC_S2JpQE5jW4RS0hCKaAo87tCpFFPy9e8KEPUoV8nDTQzDZEWw9YzDIQ0DGohGvrBzT6l_cj2HWCjp7z4RV_q58wHTo5-mUQ2t5eD_LWC6ZQZfBmsdkm60Gbl8SAUlTi8lieTKmbUdO5IfUQtOA/s1000/Definition%20of%20Hospital%20Pharmacy.jpeg'; // Replace with the actual path to your default image
  const noResultsImageUrl = 'https://via.placeholder.com/800x400?text=No+Results+Found'; // Placeholder image URL for no results

  useEffect(() => {
    const fetchPharmacies = async () => {
      setLoading(true);
      setError(null);

      try {
        const resultPharmacies = await AxiosService.searchListInPharmacies(selectedMedicines, userPincode);
        setPharmacies(resultPharmacies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedMedicines.length > 0 && userPincode) {
      fetchPharmacies();
    }
  }, [selectedMedicines, userPincode]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="listsearch-medicine-search-results">
      <h2>Available Pharmacies</h2>
      <div className="listsearch-pharmacy-list">
        {pharmacies.length > 0 ? (
          pharmacies.map((pharmacy) => (
            <div className="listsearch-pharmacy-card" key={pharmacy.id}>
              <div className="listsearch-pharmacy-details">
                <h2>{pharmacy.pharmacyName}</h2>
                <p><strong>Address:</strong> {pharmacy.address}</p>
                <p><strong>Contact:</strong> {pharmacy.contact}</p>
              </div>
              <div className="listsearch-pharmacy-image">
                <img src={defaultImageUrl} alt="Pharmacy" />
              </div>
            </div>
          ))
        ) : (
          <div className="listsearch-no-results">
            <img src="https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6665.jpg" alt="No Results" className='noresults' />
            <h3 style={{color:"black"}}>No pharmacies found with all the selected medicines.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineSearchResults;
