import './Orders.css';
import Header from '../Components/Header';
import PharmaNav from '../Components/PharmaNav';
import './PharmaHome.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosServices from '../Services/AxiosServices'; // Import OrderService

const OrderPage = () => {
    const [orders, setOrders] = useState({});
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [replyUserId, setReplyUserId] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [pharmacyId, setPharmacyId] = useState(null);
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const handleChange = (newValue, path) => {
        setValue(newValue);
        navigate(path);
    };

    // Retrieve pharmacyId from local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setPharmacyId(user.id);
        }
    }, []);

    // Fetch orders when pharmacyId is available
    useEffect(() => {
        if (pharmacyId) {
            AxiosServices.fetchOrdersForPharmacy(pharmacyId)
                .then(data => {
                    console.log('Orders data:', data);
                    setOrders(data);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
        }
    }, [pharmacyId]);

    // Toggle the expanded state of user details
    const handleToggleUserDetails = (userId) => {
        setExpandedUserId(expandedUserId === userId ? null : userId);
    };

    // Handle reply action
    const handleReply = (userId) => {
        setReplyUserId(userId);
    };

    // Handle submit reply
    const handleSubmitReply = (event) => {
        event.preventDefault();

        if (!pharmacyId || !replyUserId || !replyMessage.trim()) {
            alert('Please fill in the reply message.');
            return;
        }

        const replyData = {
            user: {
                id: replyUserId
            },
            pharmacy: {
                id: pharmacyId
            },
            replyMessage: replyMessage,
            replyDate: new Date().toISOString()
        };

        AxiosServices.postReply(replyData)
            .then(response => {
                alert('Replied successfully!');
                setReplyUserId(null);
                setReplyMessage('');
            })
            .catch(error => {
                console.error('Error sending reply:', error);
                alert('Failed to send reply.');
            });
    };

    return (
        <div className='orders-body'>
            <Header />
            <div>
                <PharmaNav value={value} handleChange={handleChange} />
            </div>
            <div className='app-order'>
                <div className="order-section">
                    <div className="order-header">
                        <h1>Orders</h1>
                        <a href="#" className="export-link">Export</a>
                    </div>
                    {Object.keys(orders).map(date => (
                        <div key={date} className="order-date-section">
                            <h2>{date}</h2>
                            {Object.keys(orders[date]).map(userKey => {
                                const userOrders = orders[date][userKey];
                                const user = userOrders.user;
                                const medicines = userOrders.medicines;

                                return (
                                    <div key={user.id} className="user-orders">
                                        <button
                                            onClick={() => handleToggleUserDetails(user.id)}
                                            className="toggle-details-button"
                                        >
                                            {expandedUserId === user.id ? 'Hide Details' : 'Show Details'}
                                        </button>

                                        {expandedUserId === user.id && (
                                            <div className="user-details">
                                                <p><strong>Username:</strong> {user.username}</p>
                                                <p><strong>Email:</strong> {user.email}</p>
                                                <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
                                                <p><strong>Address:</strong> {user.address}</p>
                                                <p><strong>Pincode:</strong> {user.pincode}</p>
                                            </div>
                                        )}

                                        <table className="order-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Purpose</th>
                                                    <th>Category</th>
                                                    <th>Brand</th>
                                                    <th>Cost</th>
                                                    <th>Form</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {medicines.map(medicine => (
                                                    <tr key={medicine.id}>
                                                        <td>{medicine.id}</td>
                                                        <td>{medicine.name}</td>
                                                        <td>{medicine.purpose}</td>
                                                        <td>{medicine.category}</td>
                                                        <td>{medicine.brand}</td>
                                                        <td>{medicine.cost}</td>
                                                        <td>{medicine.form}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <button
                                            onClick={() => handleReply(user.id)}
                                            className="reply-button"
                                        >
                                            Reply
                                        </button>

                                        {replyUserId === user.id && (
                                            <form onSubmit={handleSubmitReply} className="reply-form">
                                                <textarea
                                                    value={replyMessage}
                                                    onChange={(e) => setReplyMessage(e.target.value)}
                                                    placeholder="Type your reply here..."
                                                    className="reply-textarea"
                                                />
                                                <button type="submit" className="submit-reply-button">Submit</button>
                                            </form>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
