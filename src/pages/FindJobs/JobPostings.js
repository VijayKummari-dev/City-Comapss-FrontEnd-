// // import React, { useEffect, useState } from 'react';
// // import {
// //   Box,
// //   Container,
// //   Typography,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   IconButton,
// // } from '@mui/material';
// // import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// // import { green } from '@mui/material/colors';

// // const JobPostings = () => {
// //   const [jobPostings, setJobPostings] = useState([]);

// //   // Fetch job postings from the backend
// //   useEffect(() => {
// //     // Replace with your API endpoint and set up the fetch logic accordingly.
// //     // Example of API call:
// //     /*
// //     fetch('/company/getAllJobsBYCompany', {
// //       method: 'GET',
// //       headers: {
// //         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
// //       },
// //     })
// //       .then(response => response.json())
// //       .then(data => setJobPostings(data))
// //       .catch(error => console.error('Error fetching job postings:', error));
// //     */
    
// //     // For now, using static data
// //     setJobPostings([
// //       {
// //         jobId: 1,
// //         jobTitle: 'Senior Frontend Developer',
// //         department: 'Engineering',
// //         location: 'Remote',
// //         employmentType: 'Full-time',
// //         applicants: 12,
// //         postedOn: '2024-03-10',
// //       },
// //     ]);
// //   }, []);

// //   return (
// //     <Box display="flex" height="100vh">
// //       {/* Sidebar - Mocked for demonstration */}
// //       <Box
// //         sx={{
// //           width: 240,
// //           bgcolor: '#1e293b',
// //           color: 'white',
// //           p: 2,
// //           display: 'flex',
// //           flexDirection: 'column',
// //         }}
// //       >
// //         <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
// //           Job Dashboard
// //         </Typography>
// //         <Button sx={{ color: 'white', justifyContent: 'start' }}>Dashboard</Button>
// //         <Button sx={{ color: 'white', justifyContent: 'start' }}>Job Postings</Button>
// //         <Button sx={{ color: 'white', justifyContent: 'start' }}>Applications</Button>
// //         <Button sx={{ color: 'white', justifyContent: 'start' }}>Company Profile</Button>
// //         <Button sx={{ color: 'white', justifyContent: 'start' }}>Create Job</Button>
// //       </Box>

// //       {/* Main Content */}
// //       <Container sx={{ flexGrow: 1, p: 3, bgcolor: '#f8f9fa' }}>
// //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
// //           <Typography variant="h5">Job Postings</Typography>
// //           <Button variant="contained" color="primary">
// //             Create New Job
// //           </Button>
// //         </Box>

// //         <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 1 }}>
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Applicants</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Posted Date</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {jobPostings.map((job) => (
// //                 <TableRow key={job.jobId}>
// //                   <TableCell>{job.jobTitle}</TableCell>
// //                   <TableCell>{job.department || 'Engineering'}</TableCell>
// //                   <TableCell>{job.location}</TableCell>
// //                   <TableCell>
// //                     <Box
// //                       component="span"
// //                       sx={{
// //                         display: 'inline-block',
// //                         padding: '2px 8px',
// //                         borderRadius: '12px',
// //                         bgcolor: green[100],
// //                         color: green[800],
// //                         fontWeight: 'bold',
// //                         textTransform: 'capitalize',
// //                       }}
// //                     >
// //                       {job.employmentType}
// //                     </Box>
// //                   </TableCell>
// //                   <TableCell>{job.applicants}</TableCell>
// //                   <TableCell>{job.postedOn}</TableCell>
// //                   <TableCell>
// //                     <IconButton color="primary" aria-label="edit">
// //                       <EditIcon />
// //                     </IconButton>
// //                     <IconButton color="error" aria-label="delete">
// //                       <DeleteIcon />
// //                     </IconButton>
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default JobPostings;
// // JobPostings.js
// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Paper,
//   CircularProgress,
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import axios from 'axios';

// const JobPostings = ({ setActiveTab }) => {
//   const [jobPostings, setJobPostings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchJobPostings = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('authToken');  // assuming you are storing the token in localStorage
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const response = await axios.get('/jobPostings/company/getAllJobsBysCompany', config);
//         setJobPostings(response.data);
//       } catch (error) {
//         console.error('Error fetching job postings:', error);
//         setError('Failed to load job postings. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobPostings();
//   }, []);

//   if (loading) {
//     return (
//       <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
//         <CircularProgress />
//         <Typography variant="h6" mt={2}>
//           Loading Job Postings...
//         </Typography>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h5" gutterBottom>Job Postings</Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ mb: 2 }}
//         onClick={() => setActiveTab('createJob')}
//       >
//         Create New Job
//       </Button>
//       <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Job Title</TableCell>
//               <TableCell>Department</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Applicants</TableCell>
//               <TableCell>Posted Date</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {jobPostings.length > 0 ? (
//               jobPostings.map((job) => (
//                 <TableRow key={job.jobId}>
//                   <TableCell>{job.jobTitle}</TableCell>
//                   <TableCell>{job.department || 'N/A'}</TableCell>
//                   <TableCell>{job.location}</TableCell>
//                   <TableCell>
//                     <Button variant="contained" color="success" size="small">
//                       {job.employmentType}
//                     </Button>
//                   </TableCell>
//                   <TableCell>{job.applicants || 'N/A'}</TableCell>
//                   <TableCell>{new Date(job.postedOn).toLocaleDateString()}</TableCell>
//                   <TableCell>
//                     <EditIcon sx={{ cursor: 'pointer', color: 'primary.main', mr: 1 }} />
//                     <DeleteIcon sx={{ cursor: 'pointer', color: 'error.main' }} />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center">
//                   <Typography variant="body1">No job postings available.</Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default JobPostings;
