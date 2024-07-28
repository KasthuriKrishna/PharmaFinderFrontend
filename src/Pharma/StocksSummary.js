import React from 'react';
import './StocksSummary.css';

const SummaryCard = ({ title, count, icon }) => {
  return (
    <div className="summary-card">
      <div className="card-icon">{icon}</div>
      <div className="card-details">
        <h3>{title}</h3>
        <h1>{count}</h1>
      </div>
    </div>
  );
};

export default SummaryCard;
