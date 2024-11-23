
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Button, Avatar, Grid, Chip } from '@mui/material';
import { CalendarToday, AccessTime, LocationOn, Description, Person, Cancel, Done, HourglassEmpty } from '@mui/icons-material';
import photo from '../images/pogo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrackServices = () => {
   const [serviceRequests, setServiceRequests] = useState([]);
   const [error, setError] = useState('');

   // Fetch service requests
   const fetchServiceRequests = async () => {
       try {
           const token = localStorage.getItem('authToken');
           console.log(token);
           const config = {
               headers: {
                   Authorization: `Bearer ${token}`,
               },
           };
           const response = await axios.get('/bookServices/all/getAllServiceRequestsByUser', config);
           console.log(response.data);
           setServiceRequests(response.data || []);
       } catch (err) {
           console.error('Error fetching service requests:', err);
           toast.error('Failed to load service requests.');
       }
   };

   // Handle service cancellation
   const handleCancelService = async (serviceId) => {
       try {
          

           const token = localStorage.getItem('authToken');
           if (!token) {
               toast.error("User is not logged in. Please login again.");
               return;
           }

           const config = {
               headers: {
                   Authorization: `Bearer ${token}`,
               },
           };

           await axios.patch(`/bookServices/all/cancelService/${serviceId}`, {}, config);
           toast.success('Service request cancelled successfully!');
           fetchServiceRequests(); // Refresh the list after cancellation
       } catch (err) {
           console.error('Error cancelling service request:', err);
           toast.error('Failed to cancel service request. Please try again.');
       }
   };

   // Fetch the service requests on component mount
   useEffect(() => {
       fetchServiceRequests();
   }, []);

   return (
       <Box p={4}>
           <Typography variant="h4" align="center" gutterBottom>
               Track Your Service Requests
           </Typography>
           {error && <Typography color="error" align="center">{error}</Typography>}
           <Grid container spacing={3}>
               {serviceRequests.length > 0 ? (
                   serviceRequests.map((service) => (
                       <Grid item xs={12} sm={6} md={4} key={service.serviceId}>
                           <Card elevation={3} sx={{ borderRadius: 2 }}>
                               <CardContent>
                                   {/* Profile Section */}
                                   <Box display="flex" alignItems="center" gap={2} mb={2}>
                                       <Avatar
                                           src={service.profilePicture || photo}
                                           alt="Profile"
                                           sx={{ width: 56, height: 56 }}
                                       />
                                       <Typography variant="h6" fontWeight="bold">
                                           {service.service}
                                       </Typography>
                                   </Box>

                                   {/* Service Provider */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <Person color="action" />
                                       <Typography variant="body1">
                                           <strong>Provider:</strong> {service.providerUserName}
                                       </Typography>
                                   </Box>

                                   {/* Description */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <Description color="action" />
                                       <Typography variant="body1">
                                           <strong>Description:</strong> {service.requestedUserProblem}
                                       </Typography>
                                   </Box>

                                   {/* Status */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <HourglassEmpty color="action" />
                                       <Typography variant="body1">
                                           <strong>Status:</strong>{' '}
                                           <Chip
                                               label={service.permission}
                                               color={
                                                   service.permission === 'Completed'
                                                       ? 'success'
                                                       : service.permission === 'Rejected'
                                                       ? 'error'
                                                       : 'warning'
                                               }
                                               variant="outlined"
                                           />
                                       </Typography>
                                   </Box>

                                   {/* Requested Date */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <CalendarToday color="action" />
                                       <Typography variant="body1">
                                           <strong>Date:</strong> {service.localDate}
                                       </Typography>
                                   </Box>

                                   {/* Requested Time */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <AccessTime color="action" />
                                       <Typography variant="body1">
                                           <strong>Time:</strong> {service.localTime}
                                       </Typography>
                                   </Box>

                                   {/* Address */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <LocationOn color="action" />
                                       <Typography variant="body1">
                                           <strong>Address:</strong> {service.address}
                                       </Typography>
                                   </Box>

                                   {/* Cancel Button */}
                                   <Button
   variant="outlined"
   color="error"
   startIcon={<Cancel />}
   onClick={() => handleCancelService(service.serviceRequestedId)}
   disabled={
       service.permission === 'Rejected' ||
       service.userRequestedStatus === 'CANCELLED' ||
       service.permission === 'Completed'
   }
   fullWidth
   sx={{
       borderColor: 'error.main',
       color: 'error.main',
       '&:hover': {
           borderColor: 'primary.main',
           color: 'primary.main',
           backgroundColor: 'rgba(25, 118, 210, 0.1)', // Light blue background
       },
   }}
>
   Cancel Service
</Button>

                               </CardContent>
                           </Card>
                       </Grid>
                   ))
               ) : (
                   <Grid item xs={12}>
                       <Typography variant="h6" align="center">
                           No service requests found.
                       </Typography>
                   </Grid>
               )}
           </Grid>
       </Box>
   );
};

export default TrackServices;