



// import React, { useState, useEffect } from 'react';
// import { Grid, Typography, TextField, Button, Box, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import axios from 'axios';
// import defaultProfilePic from '../images/logo.png'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const FindServicesDashboard = () => {
//   const [services] = useState([
//     { name: 'Plumber', icon: '🛠️' },
//     { name: 'Electrician', icon: '💡' },
//     { name: 'Mechanic', icon: '🔧' },
//     { name: 'Cleaning', icon: '🧽' },
//     { name: 'PestControl', icon: '🐛' },
//     { name: 'Spas', icon: '💆‍♀️' },
//   ]);
//   const [selectedService, setSelectedService] = useState(null);
//   const [serviceProviders, setServiceProviders] = useState([]);
//   const [filteredProviders, setFilteredProviders] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProvider, setSelectedProvider] = useState(null);
//   const [availableDateSlots, setAvailableDateSlots] = useState([]);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [userReason, setUserReason] = useState('');
//   const [address, setAddress] = useState('');
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     fetchAllProviders();
//     const token = localStorage.getItem('authToken');
//         setIsLoggedIn(!!token);
//   }, []);

//   const fetchAllProviders = () => {
//     axios.get('/bookServices/public/getAllService')
//       .then(response => {
//         if (Array.isArray(response.data)) {
//           setServiceProviders(response.data);
//           setFilteredProviders(response.data);
//         } else {
//           console.error("Invalid response format");
//         }
//       })
    
//       .catch(error => console.error("Error fetching service providers:", error));
    
//   };
//   console.log(selectedProvider)

//   const handleServiceSelect = (service) => {
//     setSelectedService(service);
//     setFilteredProviders(serviceProviders.filter(provider => provider.serviceName === service.name.toUpperCase()));
//   };

//   const handleRequestService = (provider) => {
    
//     if (!isLoggedIn) {
//       toast.error('Please log in to request this service.');
//       return;
//   }
//     setSelectedProvider(provider);
//     setAvailableDateSlots(provider.dateSlotList || []);
//     setSelectedTimeSlot(null);
//     setShowModal(true);
    
//   };

//   const handleTimeSlotSelect = (timeSlot) => {
//     setSelectedTimeSlot(timeSlot);
//   };

//   const handleSubmitRequest = () => {
//     setShowConfirmation(true);
//   };

//   const confirmSubmitRequest = () => {
//     const token = localStorage.getItem("authToken");
    
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
   
//     const serviceRequestDto = {
//       serviceId: selectedProvider.serviceId,
//       userReason,
//       localTimeId: selectedTimeSlot?.timeSlotId,
//       address,
//     };

//     axios.post('/bookServices/all/requestService', serviceRequestDto, config)
//       .then(response => {
//         toast.success("Service request submitted successfully!");
//         window.location.reload();
//         closeModal();
//       })
//       .catch(error => {
//         toast.error("Error submitting service request");
//         console.error("Error submitting service request:", error);
//         closeModal();
//       });
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedProvider(null);
//     setUserReason('');
//     setAddress('');
//     setSelectedTimeSlot(null);
//     setShowConfirmation(false);
//   };

//   return (
//     <Box p={4} bgcolor="#f7f7f7">
//       <Typography variant="h4" align="center" gutterBottom>
//         What are you looking for?
//       </Typography>

//       <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} my={4}>
//         {services.map((service, index) => (
//           <Button
//             key={index}
//             variant="outlined"
//             color="primary"
//             onClick={() => handleServiceSelect(service)}
//             sx={{
//               borderRadius: 3,
//               fontSize: 16,
//               fontWeight: 'bold',
//               padding: '12px 24px',
//               '&.MuiButton-outlinedPrimary': { borderColor: selectedService?.name === service.name ? 'primary.main' : '#333' },
//               '&:hover': { backgroundColor: 'primary.main', color: '#fff' },
//             }}
//           >
//             {service.icon} {service.name}
//           </Button>
//         ))}
//       </Box>

//       <Grid container spacing={3} justifyContent="center">
//         {filteredProviders.length > 0 ? (
//           filteredProviders.map(provider => (
//             <Grid item xs={12} sm={6} md={4} key={provider.serviceId}>
//               <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, borderRadius: 2, boxShadow: 2 }}>
//                 <CardContent sx={{ textAlign: 'center' }}>
//               <img
//                 src={provider.profilePicture  || defaultProfilePic}
//                 alt="Profile"
//                 style={{
//                   width: '50px', // Adjust width as needed
//                   height: '50px', // Adjust height as needed
//                   borderRadius: '50%', // Make the image circular
//                   objectFit: 'cover', // Maintain aspect ratio and fit
//                 }}
//               />
//                   <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{provider.name}</Typography>
//                   <Typography variant="body2" color="textSecondary">Service: {provider.serviceName}</Typography>
//                   <Typography variant="body2" color="textSecondary">Experience: {provider.experience} years</Typography>
//                   <Typography variant="body2" color="textSecondary">Charge: ${provider.charge}</Typography>
//                   <Button variant="contained" color="primary" onClick={() => handleRequestService(provider)} sx={{ mt: 2 }}>
//                     Request Service
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Grid item xs={12}>
//             <Typography align="center" color="textSecondary" variant="h6">
//               No service providers available for this selection
//             </Typography>
//           </Grid>
//         )}
//       </Grid>

//       {/* Modal for Request Service */}
//       <Dialog open={showModal} onClose={closeModal} maxWidth="sm" fullWidth>

      
//         <DialogTitle>Request Service for {selectedProvider?.name}</DialogTitle>
        
//         <DialogContent>
//           <Typography variant="body1" gutterBottom>
//             Experience: {selectedProvider?.experience} years
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             Charge: ${selectedProvider?.charge}
//           </Typography>

//           <Typography variant="h6" sx={{ mt: 2 }}>Select Date and Time</Typography>
//           <Box my={2}>
//             {availableDateSlots.length > 0 ? (
//               availableDateSlots.map((slot) => (
//                 <Box key={slot.dateSlotId} mb={2}>
//                   <Typography color="primary" variant="subtitle2">{slot.localDate}</Typography>
//                   <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
//                     {slot.timeSlotsDtoList.map(timeSlot => (
//                       <Button
//                         key={timeSlot.timeSlotId}
//                         variant={selectedTimeSlot?.timeSlotId === timeSlot.timeSlotId ? 'contained' : 'outlined'}
//                         color={timeSlot.isAvailable ? 'primary' : 'default'}
//                         onClick={() => handleTimeSlotSelect(timeSlot)}
//                         disabled={!timeSlot.isAvailable}
//                         sx={{ borderRadius: 1, minWidth: '80px', textTransform: 'none' }}
//                       >
//                         {timeSlot.localTime}
//                       </Button>
//                     ))}
//                   </Box>
//                 </Box>
//               ))
//             ) : (
//               <Typography>No available date slots</Typography>
//             )}
//           </Box>

//           <TextField
//             label="Reason for requesting this service"
//             placeholder="Enter reason"
//             value={userReason}
//             onChange={e => setUserReason(e.target.value)}
//             multiline
//             rows={3}
//             fullWidth
//             variant="outlined"
//             sx={{ my: 2 }}
//           />

//           <TextField
//             label="Address"
//             placeholder="Enter address for service"
//             value={address}
//             onChange={e => setAddress(e.target.value)}
//             multiline
//             rows={2}
//             fullWidth
//             variant="outlined"
//             sx={{ my: 2 }}
//           />
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={closeModal} color="secondary">Close</Button>
//           <Button onClick={handleSubmitRequest} variant="contained" color="primary">Submit Request</Button>
//         </DialogActions>

//         {showConfirmation && (
//           <Box p={2} textAlign="center">
//             <Typography>Are you sure you want to submit the request?</Typography>
//             <Box mt={2} display="flex" justifyContent="center" gap={2}>
//               <Button variant="contained" color="success" onClick={confirmSubmitRequest}>Yes</Button>
//               <Button variant="contained" color="error" onClick={() => setShowConfirmation(false)}>No</Button>
//             </Box>
//           </Box>
//         )}
//       </Dialog>
//     </Box>
//   );
// };

// export default FindServicesDashboard;




import React, { useState, useEffect } from 'react';
import {
 Grid,
 Typography,
 TextField,
 Button,
 Box,
 Card,
 CardContent,
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
} from '@mui/material';
import {
 AccountCircle as AccountCircleIcon,
 Build as BuildIcon,
 WorkOutline as WorkOutlineIcon,
 AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import axios from 'axios';
import defaultProfilePic from '../images/pogo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FindServicesDashboard = () => {
 const [services] = useState([
   { name: 'Plumber', icon: '🛠️' },
   { name: 'Electrician', icon: '💡' },
   { name: 'Mechanic', icon: '🔧' },
   { name: 'Cleaning', icon: '🧽' },
   { name: 'PestControl', icon: '🐛' },
   { name: 'Spas', icon: '💆‍♀️' },
 ]);
 const [selectedService, setSelectedService] = useState(null);
 const [serviceProviders, setServiceProviders] = useState([]);
 const [filteredProviders, setFilteredProviders] = useState([]);
 const [showModal, setShowModal] = useState(false);
 const [selectedProvider, setSelectedProvider] = useState(null);
 const [availableDateSlots, setAvailableDateSlots] = useState([]);
 const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
 const [userReason, setUserReason] = useState('');
 const [address, setAddress] = useState('');
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [number, setNumber] = useState('');
 const [uploadedFiles, setUploadedFiles] = useState([]);
 const [showConfirmation, setShowConfirmation] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
   fetchAllProviders();
   const token = localStorage.getItem('authToken');
   setIsLoggedIn(!!token);
   if (token) {
     fetchUserDetails(token);
   }
 }, []);

 const fetchAllProviders = () => {
   axios
     .get('/bookServices/public/getAllService')
     .then((response) => {
       if (Array.isArray(response.data)) {
         setServiceProviders(response.data);
         setFilteredProviders(response.data);
       } else {
         console.error('Invalid response format');
       }
     })
     .catch((error) => console.error('Error fetching service providers:', error));
 };

 const fetchUserDetails = (token) => {
   const config = {
     headers: { Authorization: `Bearer ${token}` },
   };
   axios
     .get('/user/all/details', config)
     .then((response) => {
       const { name, email, number } = response.data;
       setName(name || '');
       setEmail(email || '');
       setNumber(number || '');
     })
     .catch((error) => console.error('Error fetching user details:', error));
 };

 const handleTimeSlotSelect = (timeSlot) => {
   setSelectedTimeSlot(timeSlot);
 };

 const handleServiceSelect = (service) => {
   setSelectedService(service);
   setFilteredProviders(
     serviceProviders.filter((provider) => provider.serviceName === service.name.toUpperCase())
   );
 };

 const handleRequestService = (provider) => {
   if (!isLoggedIn) {
     toast.error('Please log in to request this service.');
     return;
   }
   setSelectedProvider(provider);
   setAvailableDateSlots(provider.dateSlotList || []);
   setSelectedTimeSlot(null);
   setShowModal(true);
 };

 const handleFileUpload = (e) => {
   const files = Array.from(e.target.files);
   if (files.length > 3) {
     toast.error('You can upload a maximum of 3 files.');
     return;
   }
   setUploadedFiles(files);
 };

 const handleSubmitRequest = () => {
   setShowConfirmation(true);
 };

 const confirmSubmitRequest = () => {
   const token = localStorage.getItem('authToken');

   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
       'Content-Type': 'multipart/form-data',
     },
   };

   const formData = new FormData();
   formData.append('name', name);
   formData.append('email', email);
   formData.append('number', number);
   formData.append('serviceId', selectedProvider.serviceId);
   formData.append('userReason', userReason);
   formData.append('localTimeId', selectedTimeSlot?.timeSlotId);
   formData.append('address', address);
   uploadedFiles.forEach((file) => {
     formData.append('multipartFileList', file);
   });

   axios
     .post('/bookServices/all/requestService', formData, config)
     .then(() => {
       toast.success('Service request submitted successfully!');
       closeModal();
     })
     .catch((error) => {
       toast.error('Error submitting service request');
       console.error('Error submitting service request:', error);
       closeModal();
     });
 };

 const closeModal = () => {
   setShowModal(false);
   setSelectedProvider(null);
   setUserReason('');
   setAddress('');
   setSelectedTimeSlot(null);
   setUploadedFiles([]);
   setShowConfirmation(false);
 };

 return (
   <Box p={4} bgcolor="#f7f7f7">
     <Box
       sx={{
         background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
         color: '#fff',
         padding: '50px 20px',
         textAlign: 'center',
       }}
     >
       <Typography variant="h3" fontWeight="bold" gutterBottom>
         Find the Best Service Providers in Your City
       </Typography>
       <Typography variant="h6" gutterBottom>
         Select a service and connect with verified professionals
       </Typography>
       <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
         *All charges are hourly-based and may vary depending on the nature of the service.
       </Typography>

     </Box>

     {/* Service Selection Buttons */}
     <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} my={4}>
       {services.map((service, index) => (
         <Button
           key={index}
           variant={selectedService?.name === service.name ? 'contained' : 'outlined'}
           color="primary"
           onClick={() => handleServiceSelect(service)}
           sx={{
             borderRadius: 3,
             fontSize: 16,
             fontWeight: 'bold',
             padding: '12px 24px',
             backgroundColor: selectedService?.name === service.name ? '#1976d2' : 'transparent',
             color: selectedService?.name === service.name ? '#fff' : '#1976d2',
             border: selectedService?.name === service.name ? '2px solid #1976d2' : '1px solid #ddd',
             '&:hover': {
               backgroundColor: selectedService?.name === service.name ? '#115293' : '#e3f2fd',
               color: selectedService?.name === service.name ? '#fff' : '#1976d2',
             },
           }}
         >
           {service.icon} {service.name}
         </Button>
       ))}
     </Box>

     {/* Service Provider Cards */}
     <Grid container spacing={3} justifyContent="center">
       {filteredProviders.length > 0 ? (
         filteredProviders.map((provider) => (
           <Grid item xs={12} sm={6} md={4} key={provider.serviceId}>
             <Card
               variant="outlined"
               sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
                 padding: 2,
                 borderRadius: 2,
                 border: '2px solid #1976d2',
                 boxShadow: selectedProvider?.serviceId === provider.serviceId ? '0px 4px 15px rgba(25, 118, 210, 0.5)' : '2px 2px 10px rgba(0, 0, 0, 0.1)',
                 border: selectedProvider?.serviceId === provider.serviceId ? '2px solid #1976d2' : '1px solid #ddd',
                 transition: 'all 0.2s',
                 '&:hover': {
                   transform: 'scale(1.02)',
                   boxShadow: '0px 4px 12px rgba(25, 118, 210, 0.2)',
                 },
               }}
             >
               <CardContent sx={{ textAlign: 'center' }}>
                 {/* Profile Picture */}
                 <img
                   src={provider.profilePicture || defaultProfilePic}
                   alt="Profile"
                   style={{
                     width: '50px',
                     height: '50px',
                     borderRadius: '50%',
                     marginBottom: 10,

                   }}
                 />

                 {/* Name */}
                 <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                   <Typography
                     variant="h6"
                     fontWeight="bold"
                     sx={{ color: '#1976d2', textTransform: 'capitalize' }}
                   >
                     {provider.name}
                   </Typography>
                 </Box>

                 {/* Service Name */}
                 <Box display="flex" alignItems="center" gap={1} mt={1}>
                   <BuildIcon sx={{ color: '#757575' }} />
                   <Typography variant="body1" color="textSecondary">
                     <strong>Service:</strong> {provider.serviceName}
                   </Typography>
                 </Box>

                 {/* Experience */}
                 <Box display="flex" alignItems="center" gap={1} mt={1}>
                   <WorkOutlineIcon sx={{ color: '#757575' }} />
                   <Typography variant="body1" color="textSecondary">
                     <strong>Experience:</strong> {provider.experience} years
                   </Typography>
                 </Box>

                 {/* Charge */}
                 <Box display="flex" alignItems="center" gap={1} mt={1}>
                   <AttachMoneyIcon sx={{ color: '#757575' }} />
                   <Typography variant="body1" color="textSecondary">
                     <strong>Charge:</strong> ${provider.charge}
                   </Typography>
                 </Box>

                 {/* Request Service Button */}
                 <Button
                   variant="contained"
                   onClick={() => handleRequestService(provider)}
                   sx={{
                     mt: 2,
                     padding: '10px 20px',
                     borderRadius: 20,
                     backgroundColor: '#1976d2',
                     color: '#fff',
                     fontWeight: 'bold',
                     '&:hover': {
                       backgroundColor: '#115293',
                     },
                   }}
                 >
                   Request Service
                 </Button>
               </CardContent>

             </Card>
           </Grid>
         ))
       ) : (
         <Grid item xs={12}>
           <Typography align="center" color="textSecondary" variant="h6">
             No service providers available for this selection
           </Typography>
         </Grid>
       )}
     </Grid>

     <Dialog open={showModal} onClose={closeModal} maxWidth="sm" fullWidth>
       <DialogTitle>Request Service for {selectedProvider?.name}</DialogTitle>
       <DialogContent>
         <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
         <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
         <TextField label="Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} fullWidth margin="normal" />
         <Typography variant="h6" sx={{ mt: 2 }}>
           Select Date and Time
         </Typography>
         <Box my={2}>
           {availableDateSlots.length > 0 ? (
             availableDateSlots.map((slot) => (
               <Box key={slot.dateSlotId} mb={2}>
                 <Typography color="primary" variant="subtitle2">
                   {slot.localDate}
                 </Typography>
                 <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                   {slot.timeSlotsDtoList.map((timeSlot) => (
                     <Button
                       key={timeSlot.timeSlotId}
                       variant={selectedTimeSlot?.timeSlotId === timeSlot.timeSlotId ? 'contained' : 'outlined'}
                       color={timeSlot.isAvailable ? 'primary' : 'default'}
                       onClick={() => handleTimeSlotSelect(timeSlot)}
                       disabled={!timeSlot.isAvailable}
                       sx={{ borderRadius: 1, minWidth: '80px', textTransform: 'none' }}
                     >
                       {timeSlot.localTime}
                     </Button>
                   ))}
                 </Box>
               </Box>
             ))
           ) : (
             <Typography>No available date slots</Typography>
           )}
         </Box>
         <TextField
           label="Reason for requesting this service"
           placeholder="Enter reason"
           value={userReason}
           onChange={(e) => setUserReason(e.target.value)}
           multiline
           rows={3}
           fullWidth
           variant="outlined"
           sx={{ my: 2 }}
         />
         <TextField
           label="Address"
           placeholder="Enter address for service"
           value={address}
           onChange={(e) => setAddress(e.target.value)}
           multiline
           rows={2}
           fullWidth
           variant="outlined"
           sx={{ my: 2 }}
         />
         <Button variant="contained" component="label" sx={{ mt: 2 }}>
           Upload Files (Max: 3)
           <input type="file" hidden multiple accept="image/*,video/*" onChange={handleFileUpload} />
         </Button>
         {uploadedFiles.length > 0 && (
           <Box mt={2}>
             <Typography variant="body2" color="textSecondary">
               Selected Files:
             </Typography>
             <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
               {uploadedFiles.map((file, index) => (
                 <li key={index} style={{ fontSize: '14px' }}>
                   {file.name}
                 </li>
               ))}
             </ul>
           </Box>
         )}
       </DialogContent>
       <DialogActions>
         <Button onClick={closeModal} color="secondary">
           Close
         </Button>
         <Button onClick={handleSubmitRequest} variant="contained" color="primary">
           Submit Request
         </Button>
       </DialogActions>
       {showConfirmation && (
         <Box p={2} textAlign="center">
           <Typography>Are you sure you want to submit the request?</Typography>
           <Box mt={2} display="flex" justifyContent="center" gap={2}>
             <Button variant="contained" color="success" onClick={confirmSubmitRequest}>
               Yes
             </Button>
             <Button variant="contained" color="error" onClick={() => setShowConfirmation(false)}>
               No
             </Button>
           </Box>
         </Box>
       )}
     </Dialog>
   </Box>
 );
};

export default FindServicesDashboard;