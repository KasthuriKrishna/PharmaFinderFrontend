// src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const authenticateUser = async (accountType, email, password) => {
  try {
    const endpoint = accountType === 'pharmacist'
      ? `${API_URL}/pharmacies/authenticate`
      : `${API_URL}/users/authenticate`;

    const response = await axios.get(endpoint, {
      params: { email, password },
    });

    return response.data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};
const registerPharmacy = async (pharmacyData) => {
    try {
      const response = await axios.post(`${API_URL}/pharmacies`, pharmacyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error registering pharmacy:', error);
      throw error;
    }
  };
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users/create`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`${API_URL}/medicines`);
      return response.data;
    } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error;
    }
  };
  const searchMedicineInPharmacies = async (medicineId, userPincode) => {
    try {
      const response = await axios.get(`${API_URL}/medicines/search`, {
        params: { id: medicineId, userPincode }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error;
    }
  };
  const searchListInPharmacies = async (selectedMedicines, userPincode) => {
    let pharmacyMap = new Map();
  
    for (let medicine of selectedMedicines) {
      const response = await fetch(`${API_URL}/medicines/search?id=${medicine.id}&userPincode=${userPincode}`);
      if (!response.ok) {
        throw new Error('No results found');
      }
      const data = await response.json();
      data.forEach(pharmacy => {
        if (!pharmacyMap.has(pharmacy.id)) {
          pharmacyMap.set(pharmacy.id, { ...pharmacy, medicineIds: new Set() });
        }
        pharmacyMap.get(pharmacy.id).medicineIds.add(medicine.id);
      });
    }
  
    const resultPharmacies = Array.from(pharmacyMap.values())
      .filter(pharmacy => pharmacy.medicineIds.size === selectedMedicines.length);
  
    return resultPharmacies;
  };
  export const fetchPharmaciesByPincode = async (pincode) => {
    try {
      const response = await axios.get(`${API_URL}/pharmacies/by-pincode?pincode=${pincode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
      throw error; // Rethrow the error to be handled in the component
    }
  };
  export const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/medicines/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  
  // Fetch medicines by category
  export const fetchMedicinesByCategory = async (category) => {
    try {
      const response = await axios.get(`${API_URL}/medicines/by-category?category=${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error;
    }
  };
  export const fetchRepliesForUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/replies/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching replies:', error);
      throw error;
    }
  };
  export const fetchStocksForPharmacy = async (pharmacyId) => {
    try {
      const response = await axios.get(`${API_URL}/stocks/groups/${pharmacyId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  };
  export const fetchOrdersForPharmacy = async (pharmacyId) => {
    try {
      const response = await axios.get(`${API_URL}/order-histories/grouped-by-date-and-user/${pharmacyId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };
  
  // Post a reply to an order
  export const postReply = async (replyData) => {
    try {
      const response = await axios.post(`${API_URL}/replies`, replyData);
      return response.data;
    } catch (error) {
      console.error('Error sending reply:', error);
      throw error;
    }
  };
  
export default {
  authenticateUser,
  registerPharmacy,
  registerUser,
  fetchMedicines,
  searchMedicineInPharmacies,
  searchListInPharmacies,
  fetchPharmaciesByPincode,
  fetchRepliesForUser,
  fetchStocksForPharmacy,
  fetchOrdersForPharmacy,
  postReply,
  fetchCategories,
  fetchMedicinesByCategory,
};
