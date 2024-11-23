// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Tabs,
//   Tab,
//   AppBar,
//   Toolbar,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Drawer,
//   Divider,
// } from '@mui/material';
// import {
//   Work as WorkIcon,
//   People as PeopleIcon,
//   Assessment as AssessmentIcon,
//   Home as HomeIcon,
//   Add as AddIcon,
// } from '@mui/icons-material';
// import axios from 'axios';

// const drawerWidth = 240;

// const JobProviderDashboard = () => {
//   const [activeJobs, setActiveJobs] = useState(0);
//   const [underReview, setUnderReview] = useState(0);
//   const [totalApplications, setTotalApplications] = useState(0);
//   const [acceptedCandidates, setAcceptedCandidates] = useState(0);
//   const [selectedTab, setSelectedTab] = useState('dashboard');

//   useEffect(() => {
//     // Fetch data from backend and update state variables
//     // Adjust the URLs to match your backend API endpoints
//     axios.get('/api/jobs/active').then((response) => setActiveJobs(response.data.count));
//     axios.get('/api/jobs/underReview').then((response) => setUnderReview(response.data.count));
//     axios.get('/api/applications/total').then((response) => setTotalApplications(response.data.count));
//     axios.get('/api/applications/accepted').then((response) => setAcceptedCandidates(response.data.count));
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <Box display="flex" height="100vh">
//       {/* Sidebar */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1e293b', color: 'white' },
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div" color="white" sx={{ ml: 2 }}>
//             Job Dashboard
//           </Typography>
//         </Toolbar>
//         <Divider />
//         <List>
//           <ListItem button selected={selectedTab === 'dashboard'} onClick={(e) => handleTabChange(e, 'dashboard')}>
//             <ListItemIcon>
//               <HomeIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'jobPostings'} onClick={(e) => handleTabChange(e, 'jobPostings')}>
//             <ListItemIcon>
//               <WorkIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Job Postings" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'applications'} onClick={(e) => handleTabChange(e, 'applications')}>
//             <ListItemIcon>
//               <PeopleIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Applications" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'companyProfile'} onClick={(e) => handleTabChange(e, 'companyProfile')}>
//             <ListItemIcon>
//               <AssessmentIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Company Profile" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'createJob'} onClick={(e) => handleTabChange(e, 'createJob')}>
//             <ListItemIcon>
//               <AddIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Create Job" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f1f5f9', p: 3 }}>
//         <Toolbar />
//         <Container maxWidth="lg">
//           <Typography variant="h5" gutterBottom>
//             Dashboard Overview
//           </Typography>

//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ bgcolor: '#e0f2fe' }}>
//                 <CardContent>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Active Job Postings
//                   </Typography>
//                   <Typography variant="h4">{activeJobs}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ bgcolor: '#fff3e0' }}>
//                 <CardContent>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Under Review
//                   </Typography>
//                   <Typography variant="h4">{underReview}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ bgcolor: '#e8f5e9' }}>
//                 <CardContent>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Total Applications
//                   </Typography>
//                   <Typography variant="h4">{totalApplications}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ bgcolor: '#f3e5f5' }}>
//                 <CardContent>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Accepted Candidates
//                   </Typography>
//                   <Typography variant="h4">{acceptedCandidates}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           <Box mt={4}>
//             <Typography variant="h6" gutterBottom>
//               Recent Applications
//             </Typography>
//             {/* Recent Applications table or content can be added here */}
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default JobProviderDashboard;


// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Toolbar,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Drawer,
//   Divider,
// } from '@mui/material';
// import {
//   Work as WorkIcon,
//   People as PeopleIcon,
//   Assessment as AssessmentIcon,
//   Home as HomeIcon,
//   Add as AddIcon,
// } from '@mui/icons-material';

// const drawerWidth = 240;

// const JobProviderDashboard = () => {
//   const [selectedTab, setSelectedTab] = useState('dashboard');

//   // Static data for counts
//   const activeJobs = 12;
//   const underReview = 8;
//   const totalApplications = 48;
//   const acceptedCandidates = 5;

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//     if (tab === 'jobPostings') {
//       navigate('/job-postings');
//     } else if (tab === 'dashboard') {
//       navigate('/');
//     }
//   };

//   return (
//     <Box display="flex" height="100vh">
//       {/* Sidebar */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1e293b', color: 'white' },
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div" color="white" sx={{ ml: 2 }}>
//             Job Dashboard
//           </Typography>
//         </Toolbar>
//         <Divider />
//         <List>
//           <ListItem button selected={selectedTab === 'dashboard'} onClick={(e) => handleTabChange(e, 'dashboard')}>
//             <ListItemIcon>
//               <HomeIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'jobPostings'} onClick={(e) => handleTabChange(e, 'jobPostings')}>
//             <ListItemIcon>
//               <WorkIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Job Postings" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'applications'} onClick={(e) => handleTabChange(e, 'applications')}>
//             <ListItemIcon>
//               <PeopleIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Applications" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'companyProfile'} onClick={(e) => handleTabChange(e, 'companyProfile')}>
//             <ListItemIcon>
//               <AssessmentIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Company Profile" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'createJob'} onClick={(e) => handleTabChange(e, 'createJob')}>
//             <ListItemIcon>
//               <AddIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Create Job" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f1f5f9', p: 3 }}>
//         <Toolbar />
//         <Container maxWidth="lg">
//           <Typography variant="h5" gutterBottom>
//             Dashboard Overview
//           </Typography>

//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             <Grid item xs={12} sm={6}>
//               <Card sx={{ bgcolor: '#e0f2fe', minHeight: 120 }}>
//                 <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Active Job Postings
//                   </Typography>
//                   <Typography variant="h4">{activeJobs}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Card sx={{ bgcolor: '#fff3e0', minHeight: 120 }}>
//                 <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Under Review
//                   </Typography>
//                   <Typography variant="h4">{underReview}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Card sx={{ bgcolor: '#e8f5e9', minHeight: 120 }}>
//                 <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Total Applications
//                   </Typography>
//                   <Typography variant="h4">{totalApplications}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Card sx={{ bgcolor: '#f3e5f5', minHeight: 120 }}>
//                 <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Accepted Candidates
//                   </Typography>
//                   <Typography variant="h4">{acceptedCandidates}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           {/* <Box mt={4}>
//             <Typography variant="h6" gutterBottom>
//               Recent Applications
//             </Typography>
//           </Box> */}
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default JobProviderDashboard;

// JobProviderDashboard.js
// JobProviderDashboard.js




// import React, { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';

// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Toolbar,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Drawer,
//   Divider,
//   Tabs,
//   Tab,

// } from '@mui/material';
// import JobPostings from './JobPostings';
// import {
//   Work as WorkIcon,
//   People as PeopleIcon,
//   Assessment as AssessmentIcon,
//   Home as HomeIcon,
//   Add as AddIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const drawerWidth = 240;

// const JobProviderDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('services');
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       const userRole = decoded.UserType;

//       if (userRole !== "JOB_PROVIDER") {
//         navigate("/not-authorized");
//         return;
//       }
//     } catch (error) {
//       console.error("Failed to decode token:", error);
//       navigate("/login");
//       return;
//     }

  
//   }, [navigate]);
//   // Static data for counts
//   const activeJobs = 12;
//   const underReview = 8;
//   const totalApplications = 48;
//   const acceptedCandidates = 5;


//   return (
//     <Box display="flex" height="100vh">
//       {/* Sidebar */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1e293b', color: 'white' },
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div" color="white" sx={{ ml: 2 }}>
//             Job Dashboard
//           </Typography>
//         </Toolbar>
//         <Divider />
//         {/* <List>
//           <ListItem button selected={selectedTab === 'dashboard'} onClick={() => handleTabChange('dashboard')}>
//             <ListItemIcon>
//               <HomeIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'jobPostings'} onClick={() => handleTabChange('jobPostings')}>
//             <ListItemIcon>
//               <WorkIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Job Postings" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'applications'} onClick={() => handleTabChange('applications')}>
//             <ListItemIcon>
//               <PeopleIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Applications" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'companyProfile'} onClick={() => handleTabChange('companyProfile')}>
//             <ListItemIcon>
//               <AssessmentIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Company Profile" />
//           </ListItem>
//           <ListItem button selected={selectedTab === 'createJob'} onClick={() => handleTabChange('createJob')}>
//             <ListItemIcon>
//               <AddIcon style={{ color: 'white' }} />
//             </ListItemIcon>
//             <ListItemText primary="Create Job" />
//           </ListItem>
//         </List> */}
// <Tabs
//             orientation="vertical"
//             value={activeTab}
//             onChange={(e, newValue) => setActiveTab(newValue)}
//             sx={{
//               '& .MuiTab-root': {
//                 alignItems: 'flex-start',
//                 textAlign: 'left',
//                 paddingLeft: 2,
//                 justifyContent: 'flex-start',
//               },
//             }}
//           >
//             <Tab label="Dashboard" value="dashboard" />
//             <Tab label="Job Postings" value="jobPostings" />
//             <Tab label="Applications" value="applications" />
//             <Tab label="Company Profile" value="companyProfile" />
//             <Tab label="Create Job" value="createJob" />

//           </Tabs>

//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f1f5f9', p: 3 }}>
//         <Toolbar />
//         <Container maxWidth="lg">
//           <Typography variant="h5" gutterBottom>
//             Dashboard Overview
//           </Typography>

//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             <Grid item xs={12} sm={6}>
//               <Card sx={{ bgcolor: '#e0f2fe', minHeight: 120 }}>
//                 <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Active Job Postings
//                   </Typography>
//                   <Typography variant="h4">{activeJobs}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Card sx={{ bgcolor: '#fff3e0', minHeight: 120 }}>
//                 <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Under Review
//                   </Typography>
//                   <Typography variant="h4">{underReview}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Card sx={{ bgcolor: '#e8f5e9', minHeight: 120 }}>
//                 <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Total Applications
//                   </Typography>
//                   <Typography variant="h4">{totalApplications}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Card sx={{ bgcolor: '#f3e5f5', minHeight: 120 }}>
//                 <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                   <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Accepted Candidates
//                   </Typography>
//                   <Typography variant="h4">{acceptedCandidates}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default JobProviderDashboard;






// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   Typography,
//   Tab,
//   Tabs,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from '@mui/material';
// import { Briefcase } from 'lucide-react';
// import {
//   Home as HomeIcon,
//   Work as WorkIcon,
//   People as PeopleIcon,
//   Assessment as AssessmentIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
// } from '@mui/icons-material';
// import axios from 'axios';

// const drawerWidth = 240;

// const JobProviderDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [jobPostings, setJobPostings] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (activeTab === 'jobPostings') {
//       fetchJobPostings();
//     }
//   }, [activeTab]);

//   const fetchJobPostings = async () => {
//     try {
//       const response = await axios.get('/company/getAllJobsBYCompany'); // Adjust API endpoint as needed
//       setJobPostings(response.data);
//     } catch (err) {
//       console.error('Error fetching job postings:', err);
//       setError("Failed to load job postings.");
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const handleLogout = () => {
//     // Logic for logout (remove token, navigate to login page)
//   };

//   return (
//     <Box display="flex" height="100vh">
//       {/* Sidebar */}
//       <Box
//         sx={{
//           width: drawerWidth,
//           bgcolor: '#f7f7f7',
//           boxShadow: 1,
//           p: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         }}
//       >
//         <Box>
//           {/* <Box display="flex" alignItems="center" mb={3}>
//             <Briefcase style={{ marginRight: 8 }} />
//             <Typography variant="h6">Job Dashboard</Typography>
//           </Box> */}
//           <Box display="flex" alignItems="center" mb={3}>
//   <Briefcase style={{ marginRight: 8 }} />
//   <Typography variant="h6">Job Dashboard</Typography>
// </Box>

//           <Tabs
//             orientation="vertical"
//             value={activeTab}
//             onChange={handleTabChange}
//             sx={{
//               '& .MuiTab-root': {
//                 alignItems: 'flex-start',
//                 textAlign: 'left',
//                 paddingLeft: 2,
//                 justifyContent: 'flex-start',
//               },
//             }}
//           >
//             <Tab icon={<HomeIcon />} label="Dashboard" value="dashboard" />
//             <Tab icon={<WorkIcon />} label="Job Postings" value="jobPostings" />
//             <Tab icon={<PeopleIcon />} label="Applications" value="applications" />
//             <Tab icon={<AssessmentIcon />} label="Company Profile" value="companyProfile" />
//             <Tab icon={<AddIcon />} label="Create Job" value="createJob" />
//           </Tabs>
//         </Box>
//         <Button variant="contained" color="secondary" onClick={handleLogout}>
//           Logout
//         </Button>
//       </Box>

//       {/* Main Content */}
//       <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
//         {activeTab === 'dashboard' && (
//           <Typography variant="h5" gutterBottom>
//             Dashboard Overview
//           </Typography>
//           // Add dashboard overview components here
//         )}

//         {activeTab === 'jobPostings' && (
//           <Container>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//               <Typography variant="h5">Job Postings</Typography>
//               <Button variant="contained" color="primary">
//                 Create New Job
//               </Button>
//             </Box>

//             {error && (
//               <Typography variant="h6" color="error" align="center">
//                 {error}
//               </Typography>
//             )}

//             <TableContainer component={Paper}>
//               <Table aria-label="job postings table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Job Title</TableCell>
//                     <TableCell>Department</TableCell>
//                     <TableCell>Location</TableCell>
//                     <TableCell>Type</TableCell>
//                     <TableCell>Applicants</TableCell>
//                     <TableCell>Posted Date</TableCell>
//                     <TableCell>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {jobPostings.map((job) => (
//                     <TableRow key={job.jobId}>
//                       <TableCell>{job.jobTitle}</TableCell>
//                       <TableCell>{job.company?.department || "Engineering"}</TableCell>
//                       <TableCell>{job.location}</TableCell>
//                       <TableCell>
//                         <Box
//                           component="span"
//                           sx={{
//                             backgroundColor: job.employmentType === 'Full-time' ? '#d1fae5' : '#fef3c7',
//                             color: job.employmentType === 'Full-time' ? '#10b981' : '#f59e0b',
//                             px: 1,
//                             py: 0.5,
//                             borderRadius: 1,
//                             fontWeight: 'bold',
//                           }}
//                         >
//                           {job.employmentType}
//                         </Box>
//                       </TableCell>
//                       <TableCell>{job.applicants || 0}</TableCell>
//                       <TableCell>{new Date(job.postedOn).toISOString().split('T')[0]}</TableCell>
//                       <TableCell>
//                         <IconButton color="primary" size="small">
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton color="error" size="small">
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Container>
//         )}

//         {activeTab === 'applications' && (
//           <Typography variant="h5">Applications</Typography>
//           // Add applications content here
//         )}

//         {activeTab === 'companyProfile' && (
//           <Typography variant="h5">Company Profile</Typography>
//           // Add company profile content here
//         )}

//         {activeTab === 'createJob' && (
//           <Typography variant="h5">Create Job</Typography>
//           // Add job creation form here
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default JobProviderDashboard;
 // DashboardOverview.js
import React from 'react';
import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material';

const Dashboard = () => {
  const metrics = [
    { label: 'Active Job Postings', count: 12, color: '#e0f2fe' },
    { label: 'Under Review', count: 8, color: '#fff3e0' },
    { label: 'Total Applications', count: 48, color: '#e8f5e9' },
    { label: 'Accepted Candidates', count: 5, color: '#f3e5f5' },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>Dashboard Overview</Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ bgcolor: metric.color, minHeight: 120 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" color="textSecondary" gutterBottom>{metric.label}</Typography>
                <Typography variant="h4">{metric.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
