import React, { useEffect, useState } from 'react';
import AxiosServices from '../Services/AxiosServices'; // Import the AxiosService
import './Reply.css';

const Replies = () => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      fetchReplies(user.id);
    }
  }, []);

  const fetchReplies = async (userId) => {
    try {
      const data = await AxiosServices.fetchRepliesForUser(userId);
      setReplies(data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const copyToClipboard = (mobile) => {
    navigator.clipboard.writeText(mobile)
      .then(() => {
        alert('Mobile number copied to clipboard!');
      })
      .catch(err => {
        alert('Failed to copy mobile number to clipboard.');
      });
  };

  return (
    <div className="replies-container">
      <h2>Replies from Pharmacies</h2>
      <ul>
        {replies.map((reply) => (
          <li key={reply.id} className="reply-card">
            <strong>{reply.pharmacy.pharmacyName}</strong>
            <p>{reply.pharmacy.address}</p>
            <p>{reply.replyMessage}</p>
            <p>{new Date(reply.replyDate).toLocaleString()}</p>
            <button onClick={() => copyToClipboard(reply.pharmacy.contact)} className="contact-button">
              Contact
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Replies;
