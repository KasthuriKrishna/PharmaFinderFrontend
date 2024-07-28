import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';
import Navbar from '../Components/Navbar';
import Replies from '../Posts/Reply';

const History = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeOrderIndex, setActiveOrderIndex] = useState(null);

  const recentItems = [
    { title: 'Brother Medicine', reply: '1 out of 2 Reply', date: '11-01-2024 10:00AM' },
    { title: 'Mother Head Medicine', reply: '2 out of 3 Reply', date: '11-01-2024 09:15AM' },
    { title: 'Son Waist Medicine', reply: '0 out of 4 Reply', date: '11-01-2024 07:00AM' },
  ];

  const previousItems = [
    { title: 'Father Chest Medicine', reply: '3 out of 5 Reply', date: '10-25-2024 04:00PM' },
    { title: 'Sister Arm Medicine', reply: '1 out of 2 Reply', date: '10-23-2024 03:00PM' },
    { title: 'Aunt Leg Medicine', reply: '2 out of 3 Reply', date: '10-20-2024 11:00AM' },
  ];

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOrderClick = (index) => {
    setActiveOrderIndex(index === activeOrderIndex ? null : index);
  };

  return (
    <div className='history-div'>
      <Navbar menuOpen={sidebarOpen} toggleMenu={toggleMenu} />
      <div className="history-container">
      <h2>My Posts</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search Title" />
        </div>
        <h2>Recent</h2>
        <div className="recent-list">
          {recentItems.map((item, index) => (
            <div
              key={index}
              className="recent-item"
              onClick={() => handleOrderClick(index)}
            >
              <div className="recent-item-content">
                <h3>{item.title}</h3>
                <div className="recent-item-meta">
                  <span>{item.reply}</span>
                  <span>{item.date}</span>
                </div>
              </div>
              <div className="recent-item-arrow">
                <span>🔽</span>
              </div>
              {activeOrderIndex === index && <Replies />} {/* Show Replies component conditionally */}
            </div>
          ))}
        </div>
        <h2>Previous</h2>
        <div className="previous-list">
          {previousItems.map((item, index) => (
            <div
              key={index}
              className="previous-item"
              onClick={() => handleOrderClick(index + recentItems.length)}
            >
              <div className="previous-item-content">
                <h3>{item.title}</h3>
                <div className="previous-item-meta">
                  <span>{item.reply}</span>
                  <span>{item.date}</span>
                </div>
              </div>
              <div className="previous-item-arrow">
                <span>🔽</span>
              </div>
              {activeOrderIndex === index + recentItems.length && <Replies />} {/* Show Replies component conditionally */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
