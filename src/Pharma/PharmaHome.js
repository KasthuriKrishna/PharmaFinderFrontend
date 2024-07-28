import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import PharmaNav from '../Components/PharmaNav';
import './PharmaHome.css';

const PharmaHome = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (newValue, path) => {
    setValue(newValue);
    navigate(path);
  };

  const cardData = [
    {
      image: 'https://previews.123rf.com/images/wisaanu99/wisaanu991711/wisaanu99171100022/89060121-worker-warehouse-checking-boxes-with-tablet-product-on-stock-vector-illustration.jpg',
      title: 'Stock Management',
      description: 'Manage and track stock levels',
      path: '/stocks',
    },
    {
      image: 'https://img.freepik.com/free-vector/taking-orders-by-phone-store-contact-center-customers-support-easy-order-fast-delivery-trade-service-call-center-operator-cartoon-character_335657-2564.jpg?w=360',
      title: 'Requests',
      description: 'Overview of consumer requests',
      path: '/orders',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpMJ-FIVg0553NA2acaUAQn0B_ofHwcmx4hEeD29QCOkFHjWnwltvAlDr3o07nvGnHLqk&usqp=CAU',
      title: 'Analytics',
      description: 'Overall analysis',
      path: '/analysis',
    },
  ];

  return (
    <div className="root">
      <Header />
      <PharmaNav value={value} handleChange={handleChange} />
      <main className="tabContent">
        <div className="container">
          <div className="grid">
            {cardData.map((card, index) => (
              <button className="card" key={index} onClick={() => navigate(card.path)}>
                <img className="media" src={card.image} alt={card.title} />
                <div className="cardContent">
                  <h2 style={{color:"black"}}>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PharmaHome;
