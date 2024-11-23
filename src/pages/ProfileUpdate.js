import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProfileUpdate = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    number: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  // Fetch user details on component mount
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/user/all/details', config);
      setUserDetails({
        name: response.data.name,
        email: response.data.email,
        number: response.data.number,
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Failed to load user details');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Use URLSearchParams to format query parameters
      const params = new URLSearchParams();
      if (userDetails.name) params.append("name", userDetails.name);
      if (userDetails.email) params.append("email", userDetails.email);
      if (userDetails.number) params.append("number", userDetails.number);

      // Perform the PATCH request with query parameters
      const response = await axios.patch(`/user/all/updateProfile?${params.toString()}`, {}, config);
      toast.success(response.data);  // Show success message from backend
      setError(null);  // Clear any previous error messages
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Update Profile</Typography>

        <TextField
          label="Name"
          name="name"
          value={userDetails.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Number"
          name="number"
          value={userDetails.number}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProfile}
          sx={{ mt: 3 }}
        >
          Update Profile
        </Button>

        {message && <Typography color="success" sx={{ mt: 2 }}>{message}</Typography>}
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Box>
    </Container>
  );
};

export default ProfileUpdate;
