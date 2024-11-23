// src/components/ServiceProviderDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ServiceProviderDashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }
  
      try {
        // Decode the token to check user role
        const decoded = jwtDecode(token); 
        const userRole = decoded.UserType; // Ensure the role is correctly extracted
  
        if (userRole !== "SERVICE_PROVIDER") {
          navigate("/not-authorized"); // Redirect if user is not an admin
          return;
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        navigate("/login"); // Redirect if token decoding fails
        return;
      }

    const handleViewServices = () => {
        navigate('/view-services'); // Adjust path if needed
    };

    return (
        <div>
            <h2>Service Provider Dashboard</h2>
            <button onClick={handleViewServices}>View Services</button>
        </div>
    );
};

export default ServiceProviderDashboard;
