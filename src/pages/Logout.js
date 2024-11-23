import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user'); // Assuming user data is stored under 'user'

    // Clear session storage if you used it
    sessionStorage.clear(); // Clears all data in session storage

    // If you're using cookies, clear them as well (this depends on how you've set them up)

    // Optionally, reset global state (if using Redux, for example)
    // dispatch(logoutAction()); // Implement a logout action in your Redux setup

    // Redirect to the login page
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
