// src/utils/auth.js

export const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
        return payload.role === 'ADMIN'; // Adjust based on your JWT structure
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
};
