import React, { useState, useEffect } from 'react';
import AxiosServices from '../Services/AxiosServices'; // Import the AxiosService
import './PharmacyFinder.css';
import NewNavBar from '../Components/NewNav';

const PharmacyFinder = () => {
  const [pincode, setPincode] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [searchPincode, setSearchPincode] = useState('');
  const defaultImageUrl = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirUFlrtgja7F8uYssWXMYPEeM-282RKBWy4hFUbC_S2JpQE5jW4RS0hCKaAo87tCpFFPy9e8KEPUoV8nDTQzDZEWw9YzDIQ0DGohGvrBzT6l_cj2HWCjp7z4RV_q58wHTo5-mUQ2t5eD_LWC6ZQZfBmsdkm60Gbl8SAUlTi8lieTKmbUdO5IfUQtOA/s1000/Definition%20of%20Hospital%20Pharmacy.jpeg';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userPincode = user ? user.pincode : '';
    setPincode(userPincode);
    setSearchPincode(userPincode);
    if (userPincode) {
      fetchPharmacies(userPincode);
    }
  }, []);

  const fetchPharmacies = async (pincode) => {
    try {
      const data = await AxiosServices.fetchPharmaciesByPincode(pincode);
      setPharmacies(data);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    }
  };

  const handleSearch = () => {
    fetchPharmacies(searchPincode);
    setPincode(searchPincode);
  };

  return (
    <div className='pharma-find'>
      <NewNavBar />
      <div className="pharmacy-finder-container">
        <h1>Find Pharmacies</h1>
        <div className="pharmacy-finder-search-bar">
          <input
            type="text"
            value={searchPincode}
            onChange={(e) => setSearchPincode(e.target.value)}
            placeholder="Enter pincode"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="pharmacy-finder-list">
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="pharmacy-finder-card">
              <div className="pharmacy-finder-details">
                <h2>{pharmacy.pharmacyName}</h2>
                <p><strong>Address:</strong> {pharmacy.address}</p>
                <p><strong>Contact:</strong> {pharmacy.contact}</p>
                <p><strong>Operating Hours:</strong> {pharmacy.operatingHoursFrom} - {pharmacy.operatingHoursTo}</p>
                <p><strong>Email:</strong> {pharmacy.email}</p>
              </div>
              <div className="pharmacy-finder-image">
                <img src={defaultImageUrl} alt="Pharmacy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PharmacyFinder;
