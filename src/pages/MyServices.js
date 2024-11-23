 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get('/bookServices/provider/getAllProviderServices', config);
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    return (
        <div>
            <h3>My Services</h3>
            {services.length > 0 ? (
                services.map(service => (
                    <div key={service.serviceId} className="service-card">
                        <h4>{service.serviceName}</h4>
                        <p>Experience: {service.experience}</p>
                        <p>Charge: ${service.charge}</p>
                        <button>Edit</button>
                        <button>Delete</button>
                        <button>Manage Time Slots</button>
                    </div>
                ))
            ) : (
                <p>No services available.</p>
            )}
        </div>
    );
};

export default MyServices;
