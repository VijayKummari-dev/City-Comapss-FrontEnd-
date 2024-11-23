



// // ProviderDashboard.js
// import React, { useEffect, useState } from 'react';
// import { Box, Button, Container, Typography, Tab, Tabs } from '@mui/material';
// import { Briefcase } from 'lucide-react';
// import TimeSlotModal from './TimeSlotModal';
// import ServiceCard from './ServiceCard';
// import RequestCard from './RequestCard';
// import AcceptedRequestCard from './AcceptedRequestCard';  // Import AcceptedRequestCard component
// import ProfileUpdate from './ProfileUpdate';  // Import ProfileUpdate component
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// const ProviderDashboard = () => {
//   const [services, setServices] = useState([]);
//   const [serviceRequests, setServiceRequests] = useState([]);
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const [selectedServiceId, setSelectedServiceId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('services');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       const userRole = decoded.UserType;

//       if (userRole !== "SERVICE_PROVIDER") {
//         navigate("/not-authorized");
//         return;
//       }
//     } catch (error) {
//       console.error("Failed to decode token:", error);
//       navigate("/login");
//       return;
//     }

//     fetchServices();
//   }, [navigate]);

//   useEffect(() => {
//     if (activeTab === 'requests') {
//       fetchServiceRequests();
//     } else if (activeTab === 'accepted') {
//       fetchAcceptedRequests();
//     }
//   }, [activeTab]);

//   const fetchServices = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllProviderServices', config);
//       setServices(Array.isArray(response.data) ? response.data : []);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       setError("Failed to load services. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const fetchServiceRequests = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllProviderRequests', config);
//       setServiceRequests(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error('Error fetching service requests:', error);
//       setError("Failed to load service requests.");
//     }
//   };

//   const fetchAcceptedRequests = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllAcceptedServiceRequests', config);
//       setAcceptedRequests(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error('Error fetching accepted requests:', error);
//       setError("Failed to load accepted requests.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   if (loading) {
//     return <Typography variant="h6" align="center">Loading...</Typography>;
//   }

//   if (error) {
//     return <Typography variant="h6" align="center" color="error">{error}</Typography>;
//   }

//   return (
//     <Container maxWidth="md">
//       <Box display="flex" justifyContent="space-between" alignItems="center" py={2} bgcolor="white" boxShadow={1}>
//         <Box display="flex" alignItems="center">
//           <Briefcase style={{ marginRight: 8 }} />
//           <Typography variant="h6">Provider Dashboard</Typography>
//         </Box>
//         <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
//       </Box>
//       <Tabs
//         value={activeTab}
//         onChange={(e, newValue) => setActiveTab(newValue)}
//         centered
//       >
//         <Tab label="My Services" value="services" />
//         <Tab label="Service Requests" value="requests" />
//         <Tab label="Accepted Requests" value="accepted" />
//         <Tab label="Update Profile" value="profile" /> {/* New tab for profile update */}
//       </Tabs>

//       {activeTab === 'services' && (
//         <Box mt={3} display="flex" justifyContent="center">
//           {services.length > 0 ? (
//             <ServiceCard
//               service={services[0]}
//               onAddTimeSlots={() => setSelectedServiceId(services[0].serviceId)}
//               onRefresh={fetchServices}
//             />
//           ) : (
//             <Typography variant="h6" align="center">No services available.</Typography>
//           )}
//         </Box>
//       )}

//       {activeTab === 'requests' && (
//         <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
//           {serviceRequests.length > 0 ? (
//             serviceRequests.map(request => (
//               <RequestCard
//                 key={request.serviceRequestedId}
//                 request={request}
//                 onResponse={() => fetchServiceRequests()}
//               />
//             ))
//           ) : (
//             <Typography variant="h6" align="center">No service requests available.</Typography>
//           )}
//         </Box>
//       )}

//       {activeTab === 'accepted' && (
//         <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
//           {acceptedRequests.length > 0 ? (
//             acceptedRequests.map(request => (
//               <AcceptedRequestCard
//                 key={request.serviceRequestedId}
//                 request={request}
//               />
//             ))
//           ) : (
//             <Typography variant="h6" align="center">No accepted requests available.</Typography>
//           )}
//         </Box>
//       )}

//       {activeTab === 'profile' && <ProfileUpdate />} {/* Render ProfileUpdate on profile tab */}

//       {selectedServiceId && (
//         <TimeSlotModal
//           serviceId={selectedServiceId}
//           onClose={() => setSelectedServiceId(null)}
//           onSuccess={fetchServices}
//         />
//       )}
//     </Container>
//   );
// };

// export default ProviderDashboard;


// // ProviderDashboard.js
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Tab, Tabs } from '@mui/material';
// import TimeSlotModal from './TimeSlotModal';
// import ServiceCard from './ServiceCard';
// import RequestCard from './RequestCard';
// import AcceptedRequestCard from './AcceptedRequestCard';
// import ProfileUpdate from './ProfileUpdate';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
// import MainLayout from './MainLayout';

// const ProviderDashboard = () => {
//   const [services, setServices] = useState([]);
//   const [serviceRequests, setServiceRequests] = useState([]);
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const [activeTab, setActiveTab] = useState('services');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
// const [selectedServiceId, setSelectedServiceId] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       if (decoded.UserType !== "SERVICE_PROVIDER") {
//         navigate("/not-authorized");
//       }
//     } catch (error) {
//       navigate("/login");
//     }

//     fetchServices();
//   }, [navigate]);

//   useEffect(() => {
//     if (activeTab === 'requests') fetchServiceRequests();
//     else if (activeTab === 'accepted') fetchAcceptedRequests();
//   }, [activeTab]);

//   const fetchServices = async () => {
//     try {
//               const token = localStorage.getItem('authToken');
//               const config = { headers: { Authorization: `Bearer ${token}` } };

//               const response = await axios.get('/bookServices/provider/getAllProviderServices', config);
//               setServices(Array.isArray(response.data) ? response.data : []);
//               setLoading(false);
//             } catch (error) {
//               console.error('Error fetching services:', error);
//               setError("Failed to load services. Please try again later.");
//               setLoading(false);
//             }
//   };

//   const fetchServiceRequests = async () => {
//     try {
//               const token = localStorage.getItem('authToken');
//               const config = { headers: { Authorization: `Bearer ${token}` } };

//               const response = await axios.get('/bookServices/provider/getAllProviderRequests', config);
//               setServiceRequests(Array.isArray(response.data) ? response.data : []);
//             } catch (error) {
//               console.error('Error fetching service requests:', error);
//               setError("Failed to load service requests.");
//             }
//           };


//   const fetchAcceptedRequests = async () => {
//         try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllAcceptedServiceRequests', config);
//       setAcceptedRequests(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error('Error fetching accepted requests:', error);
//       setError("Failed to load accepted requests.");
//     }
//   };
//   if (loading) {
//         return <Typography variant="h6" align="center">Loading...</Typography>;
//       }

//       if (error) {
//         return <Typography variant="h6" align="center" color="error">{error}</Typography>;
//       }
//   return (
//     <MainLayout>
//       <Tabs
//         value={activeTab}
//         onChange={(e, newValue) => setActiveTab(newValue)}
//         centered
//         sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
//       >
//         <Tab label="My Services" value="services" />
//         <Tab label="Service Requests" value="requests" />
//         <Tab label="Accepted Requests" value="accepted" />
//         <Tab label="Update Profile" value="profile" />
//       </Tabs>

//       <Box>
//         {activeTab === 'services' && (
//           services.length > 0 ? (
//             <ServiceCard service={services[0]} onRefresh={fetchServices} />
//           ) : (
//             <Typography align="center">No services available.</Typography>
//           )
//         )}
//         {activeTab === 'requests' && (
//           serviceRequests.length > 0 ? (
//             serviceRequests.map(req => (
//               <RequestCard key={req.serviceRequestedId} request={req} />
//             ))
//           ) : (
//             <Typography align="center">No service requests available.</Typography>
//           )
//         )}
//         {activeTab === 'accepted' && (
//           acceptedRequests.length > 0 ? (
//             acceptedRequests.map(req => (
//               <AcceptedRequestCard key={req.serviceRequestedId} request={req} />
//             ))
//           ) : (
//             <Typography align="center">No accepted requests available.</Typography>
//           )
//         )}
//         {activeTab === 'profile' && <ProfileUpdate />}
//         {selectedServiceId && (
//         <TimeSlotModal
//           serviceId={selectedServiceId}
//           onClose={() => setSelectedServiceId(null)}
//           onSuccess={fetchServices}
//         />
//       )}
//       </Box>
//     </MainLayout>
//   );

// };

// export default ProviderDashboard;

// ProviderDashboard.js
// import React, { useEffect, useState } from 'react';
// import { Box, Button, Container, Typography, Tab, Tabs } from '@mui/material';
// import { Briefcase } from 'lucide-react';
// import TimeSlotModal from './TimeSlotModal';
// import ServiceCard from './ServiceCard';
// import RequestCard from './RequestCard';
// import AcceptedRequestCard from './AcceptedRequestCard';
// import ProfileUpdate from './ProfileUpdate';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
// // import MainLayout from './MainLayout';
// const ProviderDashboard = () => {
//   const [services, setServices] = useState([]);
//   const [serviceRequests, setServiceRequests] = useState([]);
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const [selectedServiceId, setSelectedServiceId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('services');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       const userRole = decoded.UserType;

//       if (userRole !== "SERVICE_PROVIDER") {
//         navigate("/not-authorized");
//         return;
//       }
//     } catch (error) {
//       console.error("Failed to decode token:", error);
//       navigate("/login");
//       return;
//     }

//     fetchServices();
//   }, [navigate]);

//   useEffect(() => {
//     if (activeTab === 'requests') {
//       fetchServiceRequests();
//     } else if (activeTab === 'accepted') {
//       fetchAcceptedRequests();
//     }
//   }, [activeTab]);

//   const fetchServices = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllProviderServices', config);
//       setServices(Array.isArray(response.data) ? response.data : []);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       setError("Failed to load services. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const fetchServiceRequests = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllProviderRequests', config);
//       setServiceRequests(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error('Error fetching service requests:', error);
//       setError("Failed to load service requests.");
//     }
//   };

//   const fetchAcceptedRequests = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllAcceptedServiceRequests', config);
//       setAcceptedRequests(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error('Error fetching accepted requests:', error);
//       setError("Failed to load accepted requests.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   if (loading) {
//     return <Typography variant="h6" align="center">Loading...</Typography>;
//   }

//   if (error) {
//     return <Typography variant="h6" align="center" color="error">{error}</Typography>;
//   }

//   return (

//     <Container maxWidth="md">
//       <Box display="flex" justifyContent="space-between" alignItems="center" py={2} bgcolor="white" boxShadow={1}>
//         <Box display="flex" alignItems="center">
//           <Briefcase style={{ marginRight: 8 }} />
//           <Typography variant="h6">Provider Dashboard</Typography>
//         </Box>
//         <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
//       </Box>

//       {/* Sticky Tabs */}
//       <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, bgcolor: 'white', boxShadow: 2 }}>
//         <Tabs
//           value={activeTab}
//           onChange={(e, newValue) => setActiveTab(newValue)}
//           centered
//         >
//           <Tab label="My Services" value="services" />
//           <Tab label="Service Requests" value="requests" />
//           <Tab label="Accepted Requests" value="accepted" />
//           <Tab label="Update Profile" value="profile" />
//         </Tabs>
//       </Box>

//       {activeTab === 'services' && (
//         <Box mt={3} display="flex" justifyContent="center">
//           {services.length > 0 ? (
//             <ServiceCard
//               service={services[0]}
//               onAddTimeSlots={() => setSelectedServiceId(services[0].serviceId)}
//               onRefresh={fetchServices}
//             />
//           ) : (
//             <Typography variant="h6" align="center">No services available.</Typography>
//           )}
//         </Box>
//       )}

//       {activeTab === 'requests' && (
//         <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
//           {serviceRequests.length > 0 ? (
//             serviceRequests.map(request => (
//               <RequestCard
//                 key={request.serviceRequestedId}
//                 request={request}
//                 onResponse={() => fetchServiceRequests()}
//               />
//             ))
//           ) : (
//             <Typography variant="h6" align="center">No service requests available.</Typography>
//           )}
//         </Box>
//       )}

//       {activeTab === 'accepted' && (
//         <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
//           {acceptedRequests.length > 0 ? (
//             acceptedRequests.map(request => (
//               <AcceptedRequestCard
//                 key={request.serviceRequestedId}
//                 request={request}
//               />
//             ))
//           ) : (
//             <Typography variant="h6" align="center">No accepted requests available.</Typography>
//           )}
//         </Box>
//       )}

//       {activeTab === 'profile' && <ProfileUpdate />}

//       {selectedServiceId && (
//         <TimeSlotModal
//           serviceId={selectedServiceId}
//           onClose={() => setSelectedServiceId(null)}
//           onSuccess={fetchServices}
//         />
//       )}
//     </Container>

//   );
// };

// export default ProviderDashboard;

// import React, { useEffect, useState } from 'react';
// import { Box, Button, Container, Typography, Tab, Tabs } from '@mui/material';
// import { Briefcase } from 'lucide-react';
// import TimeSlotModal from './TimeSlotModal';
// import ServiceCard from './ServiceCard';
// import RequestCard from './RequestCard';
// import AcceptedRequestCard from './AcceptedRequestCard';
// import ProfileUpdate from './ProfileUpdate';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// const ProviderDashboard = () => {
//   const [services, setServices] = useState([]);
//   const [serviceRequests, setServiceRequests] = useState([]);
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const [selectedServiceId, setSelectedServiceId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('services');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       const userRole = decoded.UserType;

//       if (userRole !== "SERVICE_PROVIDER") {
//         navigate("/not-authorized");
//         return;
//       }
//     } catch (error) {
//       console.error("Failed to decode token:", error);
//       navigate("/login");
//       return;
//     }

//     fetchServices();
//   }, [navigate]);

//   useEffect(() => {
//     if (activeTab === 'requests') {
//       fetchServiceRequests();
//     } else if (activeTab === 'accepted') {
//       fetchAcceptedRequests();
//     }
//   }, [activeTab]);

//   const fetchServices = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllProviderServices', config);
//       setServices(Array.isArray(response.data) ? response.data : []);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       setError("Failed to load services. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const fetchServiceRequests = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllProviderRequests', config);
//       setServiceRequests(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error('Error fetching service requests:', error);
//       setError("Failed to load service requests.");
//     }
//   };

//   const fetchAcceptedRequests = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllAcceptedServiceRequests', config);
//       setAcceptedRequests(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error('Error fetching accepted requests:', error);
//       setError("Failed to load accepted requests.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   if (loading) {
//     return <Typography variant="h6" align="center">Loading...</Typography>;
//   }

//   if (error) {
//     return <Typography variant="h6" align="center" color="error">{error}</Typography>;
//   }

//   return (
//     <Container maxWidth="lg" disableGutters>
//       {/* Navbar Section */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         px={3}
//         py={2}
//         bgcolor="white"
//         boxShadow={1}
//         position="sticky"
//         top={0}
//         zIndex={1000}
//       >
//         <Box display="flex" alignItems="center">
//           <Briefcase style={{ marginRight: 8 }} />
//           <Typography variant="h6">Provider Dashboard</Typography>
//         </Box>
//         <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
//       </Box>

//       {/* Tabs Section */}
//       <Box
//         bgcolor="#f7f7f7"
//         boxShadow={1}
//         borderBottom="1px solid #ddd"
//         position="sticky"
//         top="56px" // Adjust this to the height of your navbar if it's taller
//         zIndex={999}
//       >
//         <Tabs
//           value={activeTab}
//           onChange={(e, newValue) => setActiveTab(newValue)}
//           centered
//           indicatorColor="primary"
//           textColor="primary"
//         >
//           <Tab label="My Services" value="services" />
//           <Tab label="Service Requests" value="requests" />
//           <Tab label="Accepted Requests" value="accepted" />
//           <Tab label="Update Profile" value="profile" />
//         </Tabs>
//       </Box>

//       {/* Content Section */}
//       <Container maxWidth="md" sx={{ py: 4 }}>
//         {activeTab === 'services' && (
//           <Box mt={3} display="flex" justifyContent="center">
//             {services.length > 0 ? (
//               <ServiceCard
//                 service={services[0]}
//                 onAddTimeSlots={() => setSelectedServiceId(services[0].serviceId)}
//                 onRefresh={fetchServices}
//               />
//             ) : (
//               <Typography variant="h6" align="center">No services available.</Typography>
//             )}
//           </Box>
//         )}

//         {activeTab === 'requests' && (
//           <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
//             {serviceRequests.length > 0 ? (
//               serviceRequests.map(request => (
//                 <RequestCard
//                   key={request.serviceRequestedId}
//                   request={request}
//                   onResponse={() => fetchServiceRequests()}
//                 />
//               ))
//             ) : (
//               <Typography variant="h6" align="center">No service requests available.</Typography>
//             )}
//           </Box>
//         )}

//         {activeTab === 'accepted' && (
//           <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
//             {acceptedRequests.length > 0 ? (
//               acceptedRequests.map(request => (
//                 <AcceptedRequestCard
//                   key={request.serviceRequestedId}
//                   request={request}
//                 />
//               ))
//             ) : (
//               <Typography variant="h6" align="center">No accepted requests available.</Typography>
//             )}
//           </Box>
//         )}

//         {activeTab === 'profile' && <ProfileUpdate />} {/* Render ProfileUpdate on profile tab */}

//         {selectedServiceId && (
//           <TimeSlotModal
//             serviceId={selectedServiceId}
//             onClose={() => setSelectedServiceId(null)}
//             onSuccess={fetchServices}
//           />
//         )}
//       </Container>
//     </Container>
//   );
// };

// export default ProviderDashboard;

// wroking version 1.









// import React, { useEffect, useState } from 'react';
// import { Box, Button, Container, Typography, Tab, Tabs } from '@mui/material';
// import { Briefcase } from 'lucide-react';
// import TimeSlotModal from './TimeSlotModal';
// import ServiceCard from './ServiceCard';
// import RequestCard from './RequestCard';
// import AcceptedRequestCard from './AcceptedRequestCard';
// import ProfileUpdate from './ProfileUpdate';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// const ProviderDashboard = () => {
//   const [services, setServices] = useState([]);
//   const [serviceRequests, setServiceRequests] = useState([]);
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const [selectedServiceId, setSelectedServiceId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('services');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       const userRole = decoded.UserType;

//       if (userRole !== "SERVICE_PROVIDER") {
//         navigate("/not-authorized");
//         return;
//       }
//     } catch (error) {
//       console.error("Failed to decode token:", error);
//       navigate("/login");
//       return;
//     }

//     fetchServices();
//   }, [navigate]);

//   useEffect(() => {
//     if (activeTab === 'requests') {
//       fetchServiceRequests();
//     } else if (activeTab === 'accepted') {
//       fetchAcceptedRequests();
//     }
//   }, [activeTab]);

//   const fetchServices = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllProviderServices', config);
//       setServices(Array.isArray(response.data) ? response.data : []);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       setError("Failed to load services. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const fetchServiceRequests = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllProviderRequests', config);
//       setServiceRequests(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error('Error fetching service requests:', error);
//       setError("Failed to load service requests.");
//     }
//   };

//   const fetchAcceptedRequests = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.get('/bookServices/provider/getAllAcceptedServiceRequests', config);
//       setAcceptedRequests(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error('Error fetching accepted requests:', error);
//       setError("Failed to load accepted requests.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   if (loading) {
//     return <Typography variant="h6" align="center">Loading...</Typography>;
//   }

//   if (error) {
//     return <Typography variant="h6" align="center" color="error">{error}</Typography>;
//   }

//   return (
//     <Box display="flex" height="100vh">
//       {/* Sidebar Section */}
//       <Box
//         sx={{
//           width: 250,
//           bgcolor: '#f7f7f7',
//           boxShadow: 1,
//           p: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         }}
//       >
//         <Box>
//           <Box display="flex" alignItems="center" mb={3}>
//             <Briefcase style={{ marginRight: 8 }} />
//             <Typography variant="h6">Provider Dashboard</Typography>
//           </Box>
//           <Tabs
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
//             <Tab label="My Services" value="services" />
//             <Tab label="Service Requests" value="requests" />
//             <Tab label="Accepted Requests" value="accepted" />
//             <Tab label="Update Info" value="profile" />
//             <Tab label="Profile" value="password" />
//           </Tabs>
//         </Box>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleLogout}
//           sx={{ mt: 3 }}
//         >
//           Logout
//         </Button>
//       </Box>

//       {/* Main Content Section */}
//       <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
//         {activeTab === 'services' && (
//           <Box mt={3} display="flex" justifyContent="center">
//             {services.length > 0 ? (
//               <ServiceCard
//                 service={services[0]}
//                 onAddTimeSlots={() => setSelectedServiceId(services[0].serviceId)}
//                 onRefresh={fetchServices}
//               />
//             ) : (
//               <Typography variant="h6" align="center">No services available.</Typography>
//             )}
//           </Box>
//         )}

//         {activeTab === 'requests' && (
//           <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
//             {serviceRequests.length > 0 ? (
//               serviceRequests.map(request => (
//                 <RequestCard
//                   key={request.serviceRequestedId}
//                   request={request}
//                   onResponse={() => fetchServiceRequests()}
//                 />
//               ))
//             ) : (
//               <Typography variant="h6" align="center">No service requests available.</Typography>
//             )}
//           </Box>
//         )}

//         {activeTab === 'accepted' && (
//           <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
//             {acceptedRequests.length > 0 ? (
//               acceptedRequests.map(request => (
//                 <AcceptedRequestCard
//                   key={request.serviceRequestedId}
//                   request={request}
//                 />
//               ))
//             ) : (
//               <Typography variant="h6" align="center">No accepted requests available.</Typography>
//             )}
//           </Box>
//         )}

//         {activeTab === 'profile' && <ProfileUpdate />} {/* Render ProfileUpdate on profile tab */}

//         {selectedServiceId && (
//           <TimeSlotModal
//             serviceId={selectedServiceId}
//             onClose={() => setSelectedServiceId(null)}
//             onSuccess={fetchServices}
//           />
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default ProviderDashboard;













// import React, { useEffect, useState, useRef } from "react";
// import {
//  Box,
//  Button,
//  Container,
//  Typography,
//  Tab,
//  Tabs,
//  TextField,
//  Avatar,
//  IconButton,
//  Modal,
// } from "@mui/material";
// import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Briefcase } from "lucide-react";
// import { PhotoCamera } from "@mui/icons-material";
// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
// import axios from "axios";
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from "react-router-dom";
// import TimeSlotModal from "./TimeSlotModal";
// import ServiceCard from "./ServiceCard";
// import RequestCard from "./RequestCard";
// import AcceptedRequestCard from "./AcceptedRequestCard";


// const ProviderDashboard = () => {
//  const [services, setServices] = useState([]);
//  const [serviceRequests, setServiceRequests] = useState([]);
//  const [acceptedRequests, setAcceptedRequests] = useState([]);
//  const [selectedServiceId, setSelectedServiceId] = useState(null);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);
//  const [activeTab, setActiveTab] = useState("services");
//  const [profilePhoto, setProfilePhoto] = useState(null);
//  const [isCropping, setIsCropping] = useState(false);
//  const [passwordDetails, setPasswordDetails] = useState({
//    currentPassword: "",
//    newPassword: "",
//    confirmPassword: "",
//  });
//  const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 1 });
//  const [completedCrop, setCompletedCrop] = useState(null);
//  const [selectedFile, setSelectedFile] = useState(null);
//  const imgRef = useRef(null);
//  const canvasRef = useRef(null);

//  const navigate = useNavigate();

//  useEffect(() => {
//    const token = localStorage.getItem("authToken");

//    if (!token) {
//      navigate("/login");
//      return;
//    }

//    try {
//      const decoded = jwtDecode(token);
//      const userRole = decoded.UserType;

//      if (userRole !== "SERVICE_PROVIDER") {
//        navigate("/not-authorized");
//        return;
//      }
//    } catch (error) {
//      console.error("Failed to decode token:", error);
//      navigate("/login");
//      return;
//    }

//    fetchServices();
//    if (activeTab === "profile") fetchProfileDetails();
//  }, [navigate, activeTab]);

//  useEffect(() => {
//    if (activeTab === "requests") fetchServiceRequests();
//    else if (activeTab === "accepted") fetchAcceptedRequests();
//  }, [activeTab]);

//  const fetchProfileDetails = async () => {
//    const token = localStorage.getItem("authToken");
//    const config = { headers: { Authorization: `Bearer ${token}` } };

//    try {
//      const response = await axios.get("/user/all/details", config);
//      setProfilePhoto(response.data.profilePicture); // Profile picture URL
//    } catch (error) {
//      console.error("Failed to fetch profile details:", error);
//    }
//  };

//  const handleImageSelect = (e) => {
//    const file = e.target.files?.[0];
//    if (file) {
//      const reader = new FileReader();
//      reader.onloadend = () => {
//        setSelectedFile(reader.result);
//        setIsCropping(true);
//      };
//      reader.readAsDataURL(file);
//    }
//  };

//  const handleImageLoad = (image) => {
//    imgRef.current = image;
//  };

//  const handleCropChange = (newCrop) => {
//    setCrop(newCrop);
//  };

//  const handleCropComplete = (newCrop) => {
//    setCompletedCrop(newCrop);
//  };

//  const getCroppedImage = () => {
//    const image = imgRef.current;
//    const crop = completedCrop;

//    if (!image || !crop?.width || !crop?.height) return null;

//    const canvas = canvasRef.current;
//    const scaleX = image.naturalWidth / image.width;
//    const scaleY = image.naturalHeight / image.height;
//    const ctx = canvas.getContext("2d");

//    canvas.width = crop.width;
//    canvas.height = crop.height;

//    ctx.drawImage(
//      image,
//      crop.x * scaleX,
//      crop.y * scaleY,
//      crop.width * scaleX,
//      crop.height * scaleY,
//      0,
//      0,
//      crop.width,
//      crop.height
//    );

//    return new Promise((resolve) => {
//      canvas.toBlob((blob) => {
//        if (!blob) return;
//        blob.name = "profile.jpg";
//        resolve(blob);
//      }, "image/jpeg");
//    });
//  };

//  const handleSaveCroppedImage = async () => {
//    const croppedBlob = await getCroppedImage();
//    if (!croppedBlob) return;

//    const formData = new FormData();
//    formData.append("file", croppedBlob);

//    const token = localStorage.getItem("authToken");
//    const config = { headers: { Authorization: `Bearer ${token}` } };

//    try {
//     await axios.post("/user/all/updateProfilePicture", formData, config);
     
//       toast.success("Profile picture updated successfully!");
//      setProfilePhoto(URL.createObjectURL(croppedBlob)); // Update the photo preview
//      setIsCropping(false);
//    } catch (error) {
//      console.error("Failed to upload profile picture:", error);
//       toast.error("Failed to upload profile picture.");
//    }
//  };

//  const handlePasswordChange = (e) => {
//    const { name, value } = e.target;
//    setPasswordDetails((prev) => ({ ...prev, [name]: value }));
//  };

//  const handleSavePassword = async () => {
//    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
//      toast.error("New Password and Confirm Password do not match.");
//      return;
//    }

//    const token = localStorage.getItem("authToken");
//    const config = { headers: { Authorization: `Bearer ${token}` } };

//    const requestBody = {
//      oldPassword: passwordDetails.currentPassword,
//      newPassword: passwordDetails.newPassword,
//    };

//    try {
//      await axios.patch("/user/all/updatePassword", requestBody, config);
//      toast.success("Password updated successfully.");
//      setPasswordDetails({
//        currentPassword: "",
//        newPassword: "",
//        confirmPassword: "",
//      });
//    } catch (error) {
//      console.error("Failed to update password:", error);
//      toast.error("Failed to update password.");
//    }
//  };

//  const fetchServices = async () => {
//    try {
//      const token = localStorage.getItem('authToken');
//      const config = { headers: { Authorization: `Bearer ${token}` } };

//      const response = await axios.get('/bookServices/provider/getAllProviderServices', config);
//      setServices(Array.isArray(response.data) ? response.data : []);
//      setLoading(false);
//    } catch (error) {
//      console.error('Error fetching services:', error);
//      toast.error("Failed to load services. Please try again later.");
//      setLoading(false);
//    }
//  };

//  const fetchServiceRequests = async () => {
//    try {
//      const token = localStorage.getItem('authToken');
//      const config = { headers: { Authorization: `Bearer ${token}` } };

//      const response = await axios.get('/bookServices/provider/getAllProviderRequests', config);
//      setServiceRequests(Array.isArray(response.data) ? response.data : []);
//    } catch (error) {
//      console.error('Error fetching service requests:', error);
//      toast.error("Failed to load service requests.");
//    }
//  };

//  const fetchAcceptedRequests = async () => {
//    try {
//      const token = localStorage.getItem('authToken');
//      const config = { headers: { Authorization: `Bearer ${token}` } };

//      const response = await axios.get('/bookServices/provider/getAllAcceptedServiceRequests', config);
//      setAcceptedRequests(Array.isArray(response.data) ? response.data : []);
//    } catch (error) {
//      console.error('Error fetching accepted requests:', error);
//      toast.error("Failed to load accepted requests.");
//    }
//  };

//  const handleLogout = () => {
//    localStorage.removeItem('authToken');
//    navigate('/login');
//  };

//  if (loading) {
//    return <Typography variant="h6" align="center">Loading...</Typography>;
//  }

//  if (error) {
//    return <Typography variant="h6" align="center" color="error">{error}</Typography>;
//  }

//  return (
  
//    <Box display="flex" height="100vh">
      
//      <Box
//        sx={{
//          width: 250,
//          bgcolor: "#f7f7f7",
//          p: 2,
//          display: "flex",
//          flexDirection: "column",
//          justifyContent: "space-between",
//        }}
//      >
//        <Box>
//          <Box display="flex" alignItems="center" mb={3}>
//            <Briefcase style={{ marginRight: 8 }} />
//            <Typography variant="h6">Provider Dashboard</Typography>
//          </Box>
//          <Tabs
//            orientation="vertical"
//            value={activeTab}
//            onChange={(e, newValue) => setActiveTab(newValue)}
//          >
//            <Tab label="My Services" value="services" />
//            <Tab label="Service Requests" value="requests" />
//            <Tab label="Accepted Requests" value="accepted" />
//            <Tab label="Profile" value="profile" />
//          </Tabs>
//        </Box>
//        <Button
//          variant="contained"
//          color="secondary"
//          onClick={handleLogout}
//          sx={{ mt: 3 }}
//        >
//          Logout
//        </Button>
//      </Box>
//      <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
//      {activeTab === 'services' && (
//          <Box mt={3} display="flex" justifyContent="center">
//            {services.length > 0 ? (
//              <ServiceCard
//                service={services[0]}
//                onAddTimeSlots={() => setSelectedServiceId(services[0].serviceId)}
//                onRefresh={fetchServices}
//              />
//            ) : (
//              <Typography variant="h6" align="center">No services available.</Typography>
//            )}
//          </Box>
//        )}

//        {activeTab === 'requests' && (
//          <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
//            {serviceRequests.length > 0 ? (
//              serviceRequests.map(request => (
//                <RequestCard
//                  key={request.serviceRequestedId}
//                  request={request}
//                  onResponse={() => fetchServiceRequests()}
//                />
//              ))
//            ) : (
//              <Typography variant="h6" align="center">No service requests available.</Typography>
//            )}
//          </Box>
//        )}

//        {activeTab === 'accepted' && (
//          <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
//            {acceptedRequests.length > 0 ? (
//              acceptedRequests.map(request => (
//                <AcceptedRequestCard
//                  key={request.serviceRequestedId}
//                  request={request}
//                />
//              ))
//            ) : (
//              <Typography variant="h6" align="center">No accepted requests available.</Typography>
//            )}
//          </Box>
//        )}
//        {activeTab === "profile" && (
//          <Box>
//            <Typography variant="h6" mb={2}>
//              Update Profile
//            </Typography>
//            <Box textAlign="center" mb={3}>
//              <Avatar
//                src={profilePhoto}
//                sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
//              />
//              <input
//                accept="image/*"
//                id="profile-photo-upload"
//                type="file"
//                style={{ display: "none" }}
//                onChange={handleImageSelect}
//              />
//              <label htmlFor="profile-photo-upload">
//                <IconButton component="span" color="primary">
//                  <PhotoCamera />
//                </IconButton>
//              </label>
//              <Typography>Upload a new profile picture</Typography>
//            </Box>
//            {isCropping && (
//              <Modal
//                open={isCropping}
//                onClose={() => setIsCropping(false)}
//                aria-labelledby="crop-image-modal"
//              >
//                <Box
//                  sx={{
//                    position: "absolute",
//                    top: "50%",
//                    left: "50%",
//                    transform: "translate(-50%, -50%)",
//                    width: "90%",
//                    maxWidth: 500,
//                    bgcolor: "background.paper",
//                    p: 4,
//                    boxShadow: 24,
//                    borderRadius: 1,
//                  }}
//                >
//                  <ReactCrop
//                    crop={crop}
//                    onChange={handleCropChange}
//                    onComplete={handleCropComplete}
//                    aspect={1}
//                  >
//                    <img
//                      ref={imgRef}
//                      src={selectedFile}
//                      alt="Crop"
//                      style={{ maxWidth: "100%" }}
//                      onLoad={(e) => handleImageLoad(e.target)}
//                    />
//                  </ReactCrop>
//                  <Box textAlign="center" mt={3}>
//                    <Button
//                      onClick={handleSaveCroppedImage}
//                      variant="contained"
//                      color="primary"
//                      sx={{ mr: 2 }}
//                    >
//                      Save
//                    </Button>
                   
//                    <Button
//                      onClick={() => setIsCropping(false)}
//                      variant="outlined"
//                      color="secondary"
//                    >
//                      Cancel
//                    </Button>
                   
//                  </Box>
//                </Box>
//              </Modal>
//            )}
//            <canvas ref={canvasRef} style={{ display: "none" }} />
//            <Typography variant="h6" mb={2}>
//              Change Password
//            </Typography>
//            <TextField
//              label="Current Password"
//              name="currentPassword"
//              value={passwordDetails.currentPassword}
//              onChange={handlePasswordChange}
//              type="password"
//              fullWidth
//              margin="normal"
//            />
//            <TextField
//              label="New Password"
//              name="newPassword"
//              value={passwordDetails.newPassword}
//              onChange={handlePasswordChange}
//              type="password"
//              fullWidth
//              margin="normal"
//            />
//            <TextField
//              label="Confirm New Password"
//              name="confirmPassword"
//              value={passwordDetails.confirmPassword}
//              onChange={handlePasswordChange}
//              type="password"
//              fullWidth
//              margin="normal"
//            />
//            <Button
//              variant="contained"
//              color="primary"
//              onClick={handleSavePassword}
//              sx={{ mt: 2 }}
//            >
//              Save Changes
//            </Button>
//          </Box>
//        )}

// {selectedServiceId && (
//           <TimeSlotModal
//             serviceId={selectedServiceId}
//             onClose={() => setSelectedServiceId(null)}
//             onSuccess={fetchServices}
//           />
//         )}
//      </Container>
//    </Box>
//  );
// };

// export default ProviderDashboard;







import React, { useEffect, useState, useRef } from "react";
import {
 Box,
 Button,
 Container,
 Typography,
 Tab,
 Grid,
 Card,
 CardContent,
 Tabs,
 TextField,
 Avatar,
 IconButton,
 Modal,
} from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Briefcase } from "lucide-react";
import { PhotoCamera } from "@mui/icons-material";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import TimeSlotModal from "./TimeSlotModal";
import ServiceCard from "./ServiceCard";
import RequestCard from "./RequestCard";
import AcceptedRequestCard from "./AcceptedRequestCard";


const ProviderDashboard = () => {
 const [services, setServices] = useState([]);
 const [serviceRequests, setServiceRequests] = useState([]);
 const [acceptedRequests, setAcceptedRequests] = useState([]);
 const [selectedServiceId, setSelectedServiceId] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [activeTab, setActiveTab] = useState("dashboard");
 const [profilePhoto, setProfilePhoto] = useState(null);
 const [isCropping, setIsCropping] = useState(false);
 const [passwordDetails, setPasswordDetails] = useState({
   currentPassword: "",
   newPassword: "",
   confirmPassword: "",
 });
 const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 1 });
 const [completedCrop, setCompletedCrop] = useState(null);
 const [selectedFile, setSelectedFile] = useState(null);
 const [username, setUsername] = useState("")
 const imgRef = useRef(null);
 const canvasRef = useRef(null);

 const [stats, setStats] = useState({
   PendingRequests: 0,
   AcceptedRequets: 0,
   CompletedRequets: 0,
 });
 const navigate = useNavigate();

 useEffect(() => {
   const token = localStorage.getItem("authToken");

   if (!token) {
     navigate("/login");
     return;
   }

   try {
     const decoded = jwtDecode(token);
     const userRole = decoded.UserType;
     const extractedUsername = decoded.sub; // Extract username
     setUsername(extractedUsername);

     if (userRole !== "SERVICE_PROVIDER") {
       navigate("/not-authorized");
       return;
     }
   } catch (error) {
     console.error("Failed to decode token:", error);
     navigate("/login");
     return;
   }
   fetchServices();
   if (activeTab === 'dashboard') {
     fetchDashboardStats();
   }
   if (activeTab === "profile") fetchProfileDetails();
 }, [navigate, activeTab]);

 useEffect(() => {
   if (activeTab === "requests") fetchServiceRequests();
   else if (activeTab === "accepted") fetchAcceptedRequests();
 }, [activeTab]);

 const fetchProfileDetails = async () => {
   const token = localStorage.getItem("authToken");
   const config = { headers: { Authorization: `Bearer ${token}` } };

   try {
     const response = await axios.get("/user/all/details", config);
     setProfilePhoto(response.data.profilePicture); // Profile picture URL
   } catch (error) {
     console.error("Failed to fetch profile details:", error);
   }
 };



 const fetchDashboardStats = async () => {
   const token = localStorage.getItem('authToken');
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };

   try {
     const statuses = ['Pending', 'Accepted', 'Completed']; // Define the statuses
     const requests = statuses.map((status) =>
       axios.get('/bookServices/provider/getRequestsCountByStatus', {
         params: { status }, // Pass each status as a query param
         ...config,
       })
     );

     const responses = await Promise.all(requests);

     // Map each response to its corresponding status
     const newStats = {
       PendingRequests: responses[0].data,
       AcceptedRequests: responses[1].data,
       CompletedRequests: responses[2].data,
     };

     setStats(newStats); // Update the state with the new stats
   } catch (error) {
     console.error('Failed to fetch dashboard stats:', error);
     toast.error('Failed to fetch dashboard stats. Please try again later.');
   }
 };


 const handleImageSelect = (e) => {
   const file = e.target.files?.[0];
   if (file) {
     const reader = new FileReader();
     reader.onloadend = () => {
       setSelectedFile(reader.result);
       setIsCropping(true);
     };
     reader.readAsDataURL(file);
   }
 };

 const handleImageLoad = (image) => {
   imgRef.current = image;
 };

 const handleCropChange = (newCrop) => {
   setCrop(newCrop);
 };

 const handleCropComplete = (newCrop) => {
   setCompletedCrop(newCrop);
 };

 const getCroppedImage = () => {
   const image = imgRef.current;
   const crop = completedCrop;

   if (!image || !crop?.width || !crop?.height) return null;

   const canvas = canvasRef.current;
   const scaleX = image.naturalWidth / image.width;
   const scaleY = image.naturalHeight / image.height;
   const ctx = canvas.getContext("2d");

   canvas.width = crop.width;
   canvas.height = crop.height;

   ctx.drawImage(
     image,
     crop.x * scaleX,
     crop.y * scaleY,
     crop.width * scaleX,
     crop.height * scaleY,
     0,
     0,
     crop.width,
     crop.height
   );

   return new Promise((resolve) => {
     canvas.toBlob((blob) => {
       if (!blob) return;
       blob.name = "profile.jpg";
       resolve(blob);
     }, "image/jpeg");
   });
 };


 const handleSaveCroppedImage = async () => {
   const croppedBlob = await getCroppedImage();
   if (!croppedBlob) return;

   const formData = new FormData();
   formData.append("file", croppedBlob);

   const token = localStorage.getItem("authToken");
   const config = { headers: { Authorization: `Bearer ${token}` } };

   try {
     await axios.post("/user/all/updateProfilePicture", formData, config);

     toast.success("Profile picture updated successfully!");
     setProfilePhoto(URL.createObjectURL(croppedBlob)); // Update the photo preview
     setIsCropping(false);
   } catch (error) {
     console.error("Failed to upload profile picture:", error);
     toast.error("Failed to upload profile picture.");
   }
 };

 const handlePasswordChange = (e) => {
   const { name, value } = e.target;
   setPasswordDetails((prev) => ({ ...prev, [name]: value }));
 };

 const handleSavePassword = async () => {
   if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
     toast.error("New Password and Confirm Password do not match.");
     return;
   }

   const token = localStorage.getItem("authToken");
   const config = { headers: { Authorization: `Bearer ${token}` } };

   const requestBody = {
     oldPassword: passwordDetails.currentPassword,
     newPassword: passwordDetails.newPassword,
   };

   try {
     await axios.patch("/user/all/updatePassword", requestBody, config);
     toast.success("Password updated successfully.");
     setPasswordDetails({
       currentPassword: "",
       newPassword: "",
       confirmPassword: "",
     });
   } catch (error) {
     console.error("Failed to update password:", error);
     toast.error("Failed to update password.");
   }
 };

 const fetchServices = async () => {
   try {
     const token = localStorage.getItem('authToken');
     const config = { headers: { Authorization: `Bearer ${token}` } };

     const response = await axios.get('/bookServices/provider/getAllProviderServices', config);
     setServices(Array.isArray(response.data) ? response.data : []);
     setLoading(false);
   } catch (error) {
     console.error('Error fetching services:', error);
     toast.error("Failed to load services. Please try again later.");
     setLoading(false);
   }
 };

 const fetchServiceRequests = async () => {
   try {
     const token = localStorage.getItem('authToken');
     const config = { headers: { Authorization: `Bearer ${token}` } };

     const response = await axios.get('/bookServices/provider/getAllProviderRequests', config);
     setServiceRequests(Array.isArray(response.data) ? response.data : []);
   } catch (error) {
     console.error('Error fetching service requests:', error);
     toast.error("Failed to load service requests.");
   }
 };

 const fetchAcceptedRequests = async () => {
   try {
     const token = localStorage.getItem('authToken');
     const config = { headers: { Authorization: `Bearer ${token}` } };

     const response = await axios.get('/bookServices/provider/getAllAcceptedServiceRequests', config);
     setAcceptedRequests(Array.isArray(response.data) ? response.data : []);
   } catch (error) {
     console.error('Error fetching accepted requests:', error);
     toast.error("Failed to load accepted requests.");
   }
 };

 const handleLogout = () => {
   localStorage.removeItem('authToken');
   navigate('/login');
 };

 if (loading) {
   return <Typography variant="h6" align="center">Loading...</Typography>;
 }

 if (error) {
   return <Typography variant="h6" align="center" color="error">{error}</Typography>;
 }

 return (


   <Box display="flex" height="100vh">

     <Box
       sx={{
         width: 250,
         bgcolor: "#f7f7f7",
         p: 2,
         display: "flex",
         flexDirection: "column",
         justifyContent: "space-between",
       }}
     >
       <Box>
         <Box display="flex" alignItems="center" mb={3}>
           <Briefcase style={{ marginRight: 8 }} />
           <Typography variant="h6">Provider Dashboard</Typography>
         </Box>
         <Tabs
           orientation="vertical"
           value={activeTab}
           onChange={(e, newValue) => setActiveTab(newValue)}
         >
           <Tab label="Dashboard" value="dashboard" />
           <Tab label="My Services" value="services" />
           <Tab label="Service Requests" value="requests" />
           <Tab label="Accepted Requests" value="accepted" />
           <Tab label="Profile" value="profile" />
         </Tabs>
       </Box>
       <Button
         variant="contained"
         color="primary"
         onClick={handleLogout}
         sx={{ mt: 3 }}
       >
         Logout
       </Button>
     </Box>
     <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
       {activeTab === 'dashboard' && (
         <>
          <Typography variant="h5" gutterBottom>
          Welcome, {username}!
        </Typography>
         <Grid container spacing={3} sx={{ mt: 2 }}>
           {Object.entries(stats).map(([label, value], idx) => (
             <Grid item xs={12} sm={6} md={3} key={idx}>
               <Card sx={{ bgcolor: ['#e0f2fe', '#fff3e0', '#e8f5e9', '#f3e5f5'][idx] }}>
                 <CardContent sx={{ textAlign: 'center' }}>
                   <Typography variant="h6">{label.replace(/([A-Z])/g, ' $1')}</Typography>
                   <Typography variant="h4">{value}</Typography>
                 </CardContent>
               </Card>
             </Grid>
           ))}
         </Grid>
         </>
       )}
       {activeTab === 'services' && (
         <Box mt={3} display="flex" justifyContent="center">
           {services.length > 0 ? (
             <ServiceCard
               service={services[0]}
               onAddTimeSlots={() => setSelectedServiceId(services[0].serviceId)}
               onRefresh={fetchServices}
             />
           ) : (
             <Typography variant="h6" align="center">No services available.</Typography>
           )}
         </Box>
       )}

       {activeTab === 'requests' && (
         <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
           {serviceRequests.length > 0 ? (
             serviceRequests.map(request => (
               <RequestCard
                 key={request.serviceRequestedId}
                 request={request}
                 onResponse={() => fetchServiceRequests()}
               />
             ))
           ) : (
             <Typography variant="h6" align="center">No service requests available.</Typography>
           )}
         </Box>
       )}

       {activeTab === 'accepted' && (
         <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2} my={3}>
           {acceptedRequests.length > 0 ? (
             acceptedRequests.map(request => (
               <AcceptedRequestCard
                 key={request.serviceRequestedId}
                 request={request}
               />
             ))
           ) : (
             <Typography variant="h6" align="center">No accepted requests available.</Typography>
           )}
         </Box>
       )}
       {activeTab === "profile" && (
         <Box>
           <Typography variant="h6" mb={2}>
             Update Profile
           </Typography>
           <Box textAlign="center" mb={3}>
             <Avatar
               src={profilePhoto}
               sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
             />
             <input
               accept="image/*"
               id="profile-photo-upload"
               type="file"
               style={{ display: "none" }}
               onChange={handleImageSelect}
             />
             <label htmlFor="profile-photo-upload">
               <IconButton component="span" color="primary">
                 <PhotoCamera />
               </IconButton>
             </label>
             <Typography>Upload a new profile picture</Typography>
           </Box>
           {isCropping && (
             <Modal
               open={isCropping}
               onClose={() => setIsCropping(false)}
               aria-labelledby="crop-image-modal"
             >
               <Box
                 sx={{
                   position: "absolute",
                   top: "50%",
                   left: "50%",
                   transform: "translate(-50%, -50%)",
                   width: "90%",
                   maxWidth: 500,
                   bgcolor: "background.paper",
                   p: 4,
                   boxShadow: 24,
                   borderRadius: 1,
                 }}
               >
                 <ReactCrop
                   crop={crop}
                   onChange={handleCropChange}
                   onComplete={handleCropComplete}
                   aspect={1}
                 >
                   <img
                     ref={imgRef}
                     src={selectedFile}
                     alt="Crop"
                     style={{ maxWidth: "100%" }}
                     onLoad={(e) => handleImageLoad(e.target)}
                   />
                 </ReactCrop>
                 <Box textAlign="center" mt={3}>
                   <Button
                     onClick={handleSaveCroppedImage}
                     variant="contained"
                     color="primary"
                     sx={{ mr: 2 }}
                   >
                     Save
                   </Button>

                   <Button
                     onClick={() => setIsCropping(false)}
                     variant="outlined"
                     color="secondary"
                   >
                     Cancel
                   </Button>

                 </Box>
               </Box>
             </Modal>
           )}
           <canvas ref={canvasRef} style={{ display: "none" }} />
           <Typography variant="h6" mb={2}>
             Change Password
           </Typography>
           <TextField
             label="Current Password"
             name="currentPassword"
             value={passwordDetails.currentPassword}
             onChange={handlePasswordChange}
             type="password"
             fullWidth
             margin="normal"
           />
           <TextField
             label="New Password"
             name="newPassword"
             value={passwordDetails.newPassword}
             onChange={handlePasswordChange}
             type="password"
             fullWidth
             margin="normal"
           />
           <TextField
             label="Confirm New Password"
             name="confirmPassword"
             value={passwordDetails.confirmPassword}
             onChange={handlePasswordChange}
             type="password"
             fullWidth
             margin="normal"
           />
           <Button
             variant="contained"
             color="primary"
             onClick={handleSavePassword}
             sx={{ mt: 2 }}
           >
             Save Changes
           </Button>
         </Box>
       )}

       {selectedServiceId && (
         <TimeSlotModal
           serviceId={selectedServiceId}
           onClose={() => setSelectedServiceId(null)}
           onSuccess={fetchServices}
         />
       )}
     </Container>
   </Box>
 );
};

export default ProviderDashboard;