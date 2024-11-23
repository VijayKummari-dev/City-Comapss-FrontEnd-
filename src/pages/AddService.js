import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddService = () => {
    const [serviceName, setServiceName] = useState('');
    const [experience, setExperience] = useState('');
    const [charge, setCharge] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const newService = { serviceName, experience, charge };
            await axios.post('/bookServices/provider/addService', newService, config);
            toast.success("Service added successfully!");
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Service</h3>
            <input type="text" placeholder="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required />
            <input type="text" placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} required />
            <input type="number" placeholder="Charge" value={charge} onChange={(e) => setCharge(e.target.value)} required />
            <button type="submit">Add Service</button>
        </form>
    );
};

export default AddService;
