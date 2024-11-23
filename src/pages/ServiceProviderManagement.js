// src/pages/ServiceProviderManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ServiceProviderManagement = () => {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/admin/getAllPendingServiceProvided', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
        .then(response => setServiceProviders(response.data))
        .catch(err => {
            console.error("Network error:", err);
            toast.error("Failed to fetch service providers.");
        });
    }, []);

    // Define the handleApproval function here
    const handleApproval = (id, decision) => {
        axios.patch(`http://localhost:8080/admin/updatePermission/${id}/${decision}`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
        .then(() => {
            // Filter out the approved/denied provider from the list
            setServiceProviders(prev => prev.filter(provider => provider.id !== id));
        })
        .catch(err => {
            console.error("Approval error:", err);
            toast.error("Failed to update service provider status.");
        });
    };

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Service Provider Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Experience</th>
                        <th>Charge</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceProviders.map(provider => (
                        <tr key={provider.id}>
                            <td>{provider.user.name}</td>
                            <td>{provider.service}</td>
                            <td>{provider.experience}</td>
                            <td>{provider.charge}</td>
                            <td>
                                <button onClick={() => handleApproval(provider.id, 'approve')}>Approve</button>
                                <button onClick={() => handleApproval(provider.id, 'deny')}>Deny</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceProviderManagement;
