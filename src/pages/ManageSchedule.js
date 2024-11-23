import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageSchedule = () => {
    const [services, setServices] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get('/bookServices/provider/getAllProviderServices', config);
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

    const addTimeSlot = async () => {
        if (!selectedServiceId || !date || !timeSlot) {
            toast("Please select a service, date, and time slot.");
            return;
        }

        try {
            const token = localStorage.getItem("authToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // Logging the payload and config to inspect
            console.log("Adding time slot with payload:", { serviceId: selectedServiceId, date, timeSlot });
            console.log("Authorization config:", config);

            const response = await axios.post(
                '/bookServices/provider/addTimeSlot', 
                { serviceId: selectedServiceId, date, timeSlot }, 
                config
            );

            // Log the response data
            console.log("Response:", response);

            if (response.status === 200) {
                toast.success("Time slot added successfully!");
            } else {
                toast.error("Failed to add time slot.");
            }
        } catch (error) {
            // Log the error details for debugging
            console.error("Error adding time slot:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
            }
            toast.error("There was an error adding the time slot. Please try again.");
        }
    };

    return (
        <div>
            <h3>Manage Schedule</h3>
            <select value={selectedServiceId} onChange={(e) => setSelectedServiceId(e.target.value)} required>
                <option value="">Select Service</option>
                {services.map(service => (
                    <option key={service.serviceId} value={service.serviceId}>{service.serviceName}</option>
                ))}
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="time" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required />
            <button onClick={addTimeSlot}>Add Time Slot</button>
        </div>
    );
};

export default ManageSchedule;
