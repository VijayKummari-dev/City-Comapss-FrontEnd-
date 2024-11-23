// MainLayout.js
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <>
      {/* Navbar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          bgcolor: '#fff',
          boxShadow: 1,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Provider Dashboard
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ pt: 10, pb: 4 }}> {/* pt: 10 for space from fixed navbar */}
        <Container maxWidth="md">{children}</Container>
      </Box>
    </>
  );
};

export default MainLayout;
