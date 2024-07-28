import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Stocks.css';
import Header from '../Components/Header';
import PharmaNav from '../Components/PharmaNav';
import SummaryCard from './StocksSummary';
import './PharmaHome.css';

const products = [
  { 
    name: 'Aspirin', 
    category: 'Pain Relief', 
    sku: 'AS-101', 
    quantity: 100, 
    cost: '₹10.00', 
    price: '₹15.00', 
    status: 'Active', 
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/7/330506870/UM/GZ/QO/135658020/aspirin-dispersible-tablets.jpg'
  },
  { 
    name: 'Paracetamol', 
    category: 'Pain Relief', 
    sku: 'PA-202', 
    quantity: 200, 
    cost: '₹12.00', 
    price: '₹18.00', 
    status: 'Active', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPRZ7OJLFc6xnOAtowHLTSPtSTxsz3zP8lHw&s'
  },
  { 
    name: 'Vomidin', 
    category: 'Anti-Emetic', 
    sku: 'VO-303', 
    quantity: 150, 
    cost: '₹15.00', 
    price: '₹20.00', 
    status: 'Active', 
    image: 'https://www.pharmahopers.com/assets/images/products/ca633-VOMIDIN-TAB..jpg'
  },
  { 
    name: 'Dolo 650', 
    category: 'Pain Relief', 
    sku: 'DO-404', 
    quantity: 250, 
    cost: '₹20.00', 
    price: '₹25.00', 
    status: 'Active', 
    image: 'https://images.apollo247.in/pub/media/catalog/product/d/o/dol0026_1-.jpg'
  },
  { 
    name: 'Cefixime', 
    category: 'Antibiotic', 
    sku: 'CE-505', 
    quantity: 300, 
    cost: '₹30.00', 
    price: '₹35.00', 
    status: 'Active', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF4dxR-DR7jcA4oyAoscs6ocjvtbxBkAeSWw&s'
  },
  { 
    name: 'Ibuprofen', 
    category: 'Pain Relief', 
    sku: 'IB-606', 
    quantity: 400, 
    cost: '₹25.00', 
    price: '₹30.00', 
    status: 'Active', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSNokF_9UB7yrXhB1ICZwC9ilwAUrYReDdA&s'
  },
  { 
    name: 'Ebast', 
    category: 'Antihistamine', 
    sku: 'EB-707', 
    quantity: 500, 
    cost: '₹18.00', 
    price: '₹23.00', 
    status: 'Active', 
    image: 'https://m.media-amazon.com/images/I/717IcTsyiTL.AC_UF1000,1000_QL80.jpg'
  },
  { 
    name: 'Pantaprazole', 
    category: 'Acid Reducer', 
    sku: 'PA-808', 
    quantity: 600, 
    cost: '₹22.00', 
    price: '₹28.00', 
    status: 'Active', 
    image: 'https://m.media-amazon.com/images/I/717IcTsyiTL.AC_UF1000,1000_QL80.jpg'
  },
  { 
    name: 'Albendazole', 
    category: 'Anthelmintic', 
    sku: 'AL-909', 
    quantity: 700, 
    cost: '₹35.00', 
    price: '₹40.00', 
    status: 'Active', 
    image: 'https://onemg.gumlet.io/l_watermark_346,w_480,h_480,c_fit,q_auto,f_auto/e3757c6edba44bbebabe1279ade6ab9d.jpg'
  }
];
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

const StockPage = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const handleChange = (newValue, path) => {
    setValue(newValue);
    navigate(path);
  };

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
            <button className='manage-button'>Create Category</button>
            <button className='manage-button'>Add New Product</button>
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
          <table className="product-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Product Name</th>
                <th>Category</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Cost</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td className="product-name">
                    <img src={product.image} alt={product.name} />
                    {product.name}
                  </td>
                  <td>{product.category}</td>
                  <td>{product.sku}</td>
                  <td>{product.quantity}</td>
                  <td>{product.cost}</td>
                  <td>{product.price}</td>
                  <td><span className="status-active">{product.status}</span></td>
                  <td className="actions">
                    <button style={{color:"black"}}>Edit</button>
                    <button style={{color:"black"}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
