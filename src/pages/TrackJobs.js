import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
   Box,
   Typography,
   Card,
   CardContent,
   Avatar,
   Grid,
   Button,
   Divider,
} from '@mui/material';
import { Business, WorkOutline, Description, LocationOn, Event } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrackJobs = () => {
   const [jobApplications, setJobApplications] = useState([]);
   const [error, setError] = useState('');

   // Fetch job applications
   const fetchJobApplications = async () => {
       try {
           const token = localStorage.getItem('authToken');
           const config = {
               headers: {
                   Authorization: `Bearer ${token}`,
               },
           };

           const response = await axios.get('/jobApplications/users/applicant', config);
           setJobApplications(response.data || []);
       } catch (err) {
           console.error('Error fetching job applications:', err);
           toast.error('Failed to load job applications.');
       }
   };

   // Fetch the job applications on component mount
   useEffect(() => {
       fetchJobApplications();
   }, []);

   return (
       <Box p={4}>
           <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold">
               Track Your Job Applications
           </Typography>
           {error && (
               <Typography color="error" textAlign="center">
                   {error}
               </Typography>
           )}
           <Grid container spacing={3} justifyContent="center">
               {jobApplications.length > 0 ? (
                   jobApplications.map((application) => (
                       <Grid item xs={12} sm={6} md={4} key={application.applicationId}>
                           <Card
                               variant="outlined"
                               sx={{
                                   p: 2,
                                   borderRadius: 3,
                                   border: '1px solid #ddd',
                                   transition: 'all 0.3s',
                                   '&:hover': {
                                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                   },
                               }}
                           >
                               <CardContent>
                                   {/* Profile and Company Name */}
                                   <Box display="flex" alignItems="center" gap={2} mb={2}>
                                       <Avatar
                                           src={application.profilePicture || '/placeholder.png'}
                                           alt="Profile"
                                           sx={{
                                               width: 50,
                                               height: 50,
                                               // border: '2px solid #1976d2',
                                           }}
                                       />
                                       <Typography
                                           variant="h6"
                                           fontWeight="bold"
                                           color="primary"
                                       >
                                           {application.jobPosting.company.companyName}
                                       </Typography>
                                   </Box>
                                   <Divider sx={{ mb: 2 }} />

                                   {/* Job Title */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <WorkOutline color="action" />
                                       <Typography variant="body1">
                                           <strong>Job Posting:</strong>{' '}
                                           {application.jobPosting.jobTitle}
                                       </Typography>
                                   </Box>

                                   {/* Job Description */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <Description color="action" />
                                       <Typography variant="body2">
                                           <strong>Description:</strong>{' '}
                                           {application.jobPosting.jobDescription}
                                       </Typography>
                                   </Box>

                                   {/* Status */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <Business color="action" />
                                       <Typography variant="body1">
                                           <strong>Status:</strong> {application.status}
                                       </Typography>
                                   </Box>

                                   {/* Applied On */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <Event color="action" />
                                       <Typography variant="body1">
                                           <strong>Applied On:</strong>{' '}
                                           {new Date(application.appliedOn).toLocaleDateString()}
                                       </Typography>
                                   </Box>

                                   {/* Location */}
                                   <Box display="flex" alignItems="center" gap={1} mb={1}>
                                       <LocationOn color="action" />
                                       <Typography variant="body1">
                                           <strong>Location:</strong> {application.jobPosting.location}
                                       </Typography>
                                   </Box>

                                   
                               </CardContent>
                           </Card>
                       </Grid>
                   ))
               ) : (
                   <Typography variant="h6" textAlign="center" mt={3}>
                       No job applications found.
                   </Typography>
               )}
           </Grid>
       </Box>
   );
};

export default TrackJobs;
