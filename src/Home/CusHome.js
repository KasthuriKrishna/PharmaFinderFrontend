import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CusHome.css';
import Navbar from '../Components/Navbar';
import { useState } from 'react';

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const buttons = [
    { id: 1, img: 'https://play-lh.googleusercontent.com/pkzH3h06Nt0hBPUIZYF5us26HRmdP4BKMrwuvy9y2e3HA34AKco42-JFKxniuaORT2RK', text: 'DISCOVER', desc: 'Explore new medicines and treatments.', route: '/home' },
    { id: 2, img: 'https://img.freepik.com/premium-vector/medical-prescription-drugs-therapist-writing-recipe-patient-top-view-doctor-workplace-pharmacy-control-healthcare-treatment-concept-vector-illustration-flat-cartoon-style_189033-2143.jpg', text: 'CREATE LIST', desc: 'Create and manage your medication list.', route: '/list' },
    { id: 3, img: 'https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-knowledge-diagnosis_516790-1277.jpg', text: 'DIAGNOSIS', desc: 'Get diagnosed based on your symptoms.', route: '/diagnosis' },
    { id: 4, img: 'https://videoigniter.com/wp-content/uploads/2023/03/Animated-Social-Media-Post-Length.png', text: 'POSTS', desc: 'View all the posts made by you.', route: '/history' },
  ];

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <body className='cus-page'>
      <Navbar menuOpen={sidebarOpen} toggleMenu={toggleMenu} />
      <div className="homepage-container">
        <div className="homepage-header">
          <h1>PharmaFinder</h1>
        </div>
        <div className="homepage-grid">
          {buttons.map((button) => (
            <div key={button.id} className="homepage-grid-item">
              <button className="homepage-button" onClick={() => handleButtonClick(button.route)}>
                <img src={button.img} alt={button.text} className="homepage-button-img" />
                <span className="homepage-button-text"><b>{button.text}</b></span>
                <span className="homepage-button-desc">{button.desc}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </body>
  );
};

export default HomePage;
