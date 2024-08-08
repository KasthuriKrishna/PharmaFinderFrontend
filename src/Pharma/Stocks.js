import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Stocks.css';
import Header from '../Components/Header';
import PharmaNav from '../Components/PharmaNav';
import SummaryCard from './StocksSummary';
import './PharmaHome.css';
import AxiosServices from '../Services/AxiosServices'

const StockPage = () => {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [pharmacyId, setPharmacyId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log('User from localStorage:', user); // Log user object to check its structure
      setPharmacyId(user.id);
    } else {
      console.log('No user found in localStorage');
    }
  }, []);
  
  

  useEffect(() => {
    if (pharmacyId) {
      const fetchData = async () => {
        try {
          const data = await AxiosServices.fetchStocksForPharmacy(pharmacyId);
          const medicineData = data[0]?.medicines || [];
          console.log('Medicine data:', medicineData); // Verify data here
          setProducts(medicineData);
        } catch (error) {
          console.error('Error fetching stock data:', error);
        }
      };

      fetchData();
    }
  }, [pharmacyId]);

  
  

  const handleChange = (newValue, path) => {
    setValue(newValue);
    navigate(path);
  };

  const outOfStock = [
    { name: 'Aspirin' },
    { name: 'Paracetamol' },
    { name: 'Ibuprofen' }
  ];
  
  const limitedStocks = [
    { name: 'Cefixime', quantity: 8 },
    { name: 'Pantaprazole', quantity: 5 },
    { name: 'Ebast', quantity: 3 }
  ];
  
  const recentlyAdded = [
    { name: 'Aspirin', quantity: 100, status: 'Active' },
    { name: 'Paracetamol', quantity: 200, status: 'Active' },
    { name: 'Vomidin', quantity: 150, status: 'Active' }
  ];
  
  const highestSelling = [
    { name: 'Dolo 650', quantity: 250, status: 'Active' },
    { name: 'Cefixime', quantity: 300, status: 'Active' },
    { name: 'Ibuprofen', quantity: 400, status: 'Active' }
  ];
  
  const summaryData = {
    totalMedicines: 50,
    totalTablets: 30,
    totalSyrups: 10,
    totalOthers: 10,
  };
  const handleAdd=()=>{
    navigate('/addmed');
  }
  return (
    <div className="stock-body">
      <Header />
      <PharmaNav value={value} handleChange={handleChange} />
      <div className="summary-cards">
        <SummaryCard title="Total Medicines" count={summaryData.totalMedicines} icon="💊" />
        <SummaryCard title="Total Tablets" count={summaryData.totalTablets} icon="💊" />
        <SummaryCard title="Total Syrups" count={summaryData.totalSyrups} icon="🍼" />
        <SummaryCard title="Total Others" count={summaryData.totalOthers} icon="🔬" />
      </div>
      <div className="stock-section">
        <div className="header">
          <h1>Manage Products</h1>
          <div className='manage-div'>
            <button className='manage-button' onClick={() => document.getElementById('recently-added').scrollIntoView({ behavior: 'smooth' })}>Recently Added</button>
            <button className='manage-button' onClick={() => document.getElementById('highest-selling').scrollIntoView({ behavior: 'smooth' })}>Highest Selling</button>
            <button className='manage-button' onClick={handleAdd}>Add New Product</button>
          </div>
        </div>
        <div className="filters">
          <input type="text" placeholder="Search products" />
          <select>
            <option>Category</option>
            <option>Price</option>
          </select>
        </div>
        <div className="stock-cards">
          <div className="stock-card">
            <h3>Out of Stock</h3>
            <ul>
              {outOfStock.map((product, index) => (
                <li key={index}>{product.name}</li>
              ))}
            </ul>
          </div>
          <div className="stock-card">
            <h3>Limited Stocks</h3>
            <ul>
              {limitedStocks.map((product, index) => (
                <li key={index}>{product.name} - {product.quantity} items left</li>
              ))}
            </ul>
          </div>
        </div>
        {/* All Medicines Table */}
        <div className="table-container">
  <h2>All Medicines</h2>
  {products.length > 0 ? (
    <table className="product-table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  {products.map((item, index) => (
    <tr key={index}>
      <td><input type="checkbox" /></td>
      <td>{item.medicine.name}</td>
      <td>{item.medicine.category}</td>
      <td>{item.quantity}</td>
      <td>
        <span
          className={item.quantity > 10 ? 'status-in-stock' : 'status-low-stock'}
        >
          {item.quantity > 10 ? 'In Stock' : 'Low Stock'}
        </span>
      </td>
      <td className="actions">
        <button style={{ color: "black" }}>Edit</button>
        <button style={{ color: "black" }}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

    </table>
  ) : (
    <p>No products available</p>
  )}
</div>

        {/* Recently Added Table */}
        <div className="table-container" id="recently-added">
          <h2>Recently Added Products</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentlyAdded.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td><span className="status-active">{product.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Highest Selling Table */}
        <div className="table-container" id="highest-selling">
          <h2>Highest Selling Products</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {highestSelling.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td><span className="status-active">{product.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
