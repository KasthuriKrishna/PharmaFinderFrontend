import React from 'react';
import './Reply.css';

const Replies = () => {
  const defaultReplies = [
    { pharmacy: 'Pharmacy A', message: 'We have all the medicines you need in stock.', mobile: '1234567890' },
    { pharmacy: 'Pharmacy B', message: 'We have Ibuprofen and Paracetamol in stock. Please visit us.', mobile: '2345678901' },
    { pharmacy: 'Pharmacy C', message: 'We have limited stock of Amoxicillin. Hurry up!', mobile: '3456789012' },
  ];

  const copyToClipboard = (mobile) => {
    navigator.clipboard.writeText(mobile).then(() => {
      alert('Mobile number copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy mobile number to clipboard.');
    });
  };

  return (
    <div className="replies-container">
      <h2>Replies from Pharmacies</h2>
      <ul>
        {defaultReplies.map((reply, index) => (
          <li key={index} className="reply-card">
            <strong>{reply.pharmacy}</strong>: {reply.message}
            <button onClick={() => copyToClipboard(reply.mobile)} className="contact-button">Contact</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Replies;
