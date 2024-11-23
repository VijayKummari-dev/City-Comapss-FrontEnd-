// // src/components/AcceptedRequestCard.js

// import React from 'react';
// import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
// import {
//   Person, CalendarToday, AccessTime, AttachMoney, Description, LocationOn,
// } from '@mui/icons-material';

// // const AcceptedRequestCard = ({ request }) => {
// //   const formattedDate = request.localDate
// //     ? new Date(request.localDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
// //     : 'Date not specified';

// //   const formattedTime = request.localTime
// //     ? new Date(`1970-01-01T${request.localTime}Z`).toLocaleTimeString('en-US', {
// //         hour: '2-digit',
// //         minute: '2-digit',
// //         hour12: true,
// //         timeZone: 'UTC',
// //       })
// //     : 'Time not specified';
//   // Parse date in "YYYY-MM-DD" format
//   const AcceptedRequestCard = ({ request }) => {
//   const formattedDate = request.localDate
//     ? new Date(request.localDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
//     : 'Date not specified';

//   // Format time in 12-hour format with AM/PM
//   const formattedTime = request.localTime
//     ? new Date(`1970-01-01T${request.localTime}Z`).toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//         timeZone: 'UTC',
//       })
//     : 'Time not specified';
//   return (
//     <Card elevation={3} sx={{ maxWidth: 400, mx: 'auto', my: 2, p: 2 }}>
//       <CardContent>
//         <Box display="flex" alignItems="center" gap={1}>
//           <Person color="action" />
//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//             {request.requestedUserName || 'User'}
//           </Typography>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         <Box display="flex" alignItems="center" gap={1}>
//           <CalendarToday color="action" />
//           <Typography variant="body1">Service: {request.service || 'Service Name'}</Typography>
//         </Box>

//         <Box display="flex" alignItems="center" gap={1} mt={1}>
//           <CalendarToday color="action" />
//           <Typography variant="body1">Date: {formattedDate}</Typography>
//         </Box>

//         <Box display="flex" alignItems="center" gap={1} mt={1}>
//           <AccessTime color="action" />
//           <Typography variant="body1">Time: {formattedTime}</Typography>
//         </Box>

//         <Box display="flex" alignItems="center" gap={1} mt={1}>
//           <AttachMoney color="action" />
//           <Typography variant="body1">Charge: ${request.charge || 'N/A'}</Typography>
//         </Box>

//         <Box display="flex" alignItems="center" gap={1} mt={1}>
//           <LocationOn color="action" />
//           <Typography variant="body1">Address: {request.address || 'Not provided'}</Typography>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         <Box display="flex" alignItems="center" gap={1}>
//           <Description color="action" />
//           <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Problem Description:</Typography>
//         </Box>
//         <Typography variant="body2" color="textSecondary" sx={{ ml: 4 }}>
//           {request.requestedUserProblem || 'No description provided.'}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default AcceptedRequestCard;


import React, { useState } from 'react';
import {
 Card,
 CardContent,
 Typography,
 Box,
 Divider,
 Grid,
 Dialog,
 DialogContent,
 DialogTitle,
 IconButton,
 Button,
} from '@mui/material';
import {
 Person,
 CalendarToday,
 AccessTime,
 AttachMoney,
 Description,
 LocationOn,
 Image as ImageIcon,
 Close as CloseIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AcceptedRequestCard = ({ request, onResponse }) => {
 const [selectedMedia, setSelectedMedia] = useState(null);
 const [selectedDescription, setSelectedDescription] = useState(false);

 const getAuthHeaders = () => {
   const token = localStorage.getItem('authToken');
   return {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
 };

 const handleResponse = async (requestId, decision) => {
   try {
     await axios.patch(
       `/bookServices/provider/updateResponse/${requestId}/${decision}`,
       {},
       getAuthHeaders()
     );
     toast.success(
       `Request has been marked as ${
         decision === 'completed' ? 'completed' : 'not completed'
       } successfully.`
     );
     window.location.reload();
     onResponse(requestId, decision);
   } catch (error) {
   
     toast.error("Failed to update request response. Please try again.");
   }
 };

 const formattedDate = request.localDate
   ? new Date(request.localDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
   : 'Date not specified';

 const formattedTime = request.localTime
   ? new Date(`1970-01-01T${request.localTime}Z`).toLocaleTimeString('en-US', {
       hour: '2-digit',
       minute: '2-digit',
       hour12: true,
       timeZone: 'UTC',
     })
   : 'Time not specified';

 const serviceName = request.service || 'Service Name';

 return (
   <>
     <Card elevation={3} sx={{ maxWidth: 400, mx: 'auto', my: 2, p: 2 }}>
       <CardContent>
         <Box display="flex" alignItems="center" gap={1}>
           <Person color="action" />
           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
             {request.requestedUserName || 'User'}
           </Typography>
         </Box>

         <Divider sx={{ my: 2 }} />

         <Box display="flex" alignItems="center" gap={1}>
           <CalendarToday color="action" />
           <Typography variant="body1">Service: {serviceName}</Typography>
         </Box>

         <Box display="flex" alignItems="center" gap={1} mt={1}>
           <CalendarToday color="action" />
           <Typography variant="body1">Date: {formattedDate}</Typography>
         </Box>

         <Box display="flex" alignItems="center" gap={1} mt={1}>
           <AccessTime color="action" />
           <Typography variant="body1">Time: {formattedTime}</Typography>
         </Box>

         <Box display="flex" alignItems="center" gap={1} mt={1}>
           <AttachMoney color="action" />
           <Typography variant="body1">Charge: ${request.charge || 'N/A'}</Typography>
         </Box>

         <Box display="flex" alignItems="center" gap={1} mt={1}>
           <LocationOn color="action" />
           <Typography variant="body1">Address: {request.address || 'Not provided'}</Typography>
         </Box>

         <Divider sx={{ my: 2 }} />

         <Box display="flex" alignItems="center" gap={1}>
           <Description color="action" />
           <Typography
             variant="body2"
             sx={{ fontWeight: 'bold', cursor: 'pointer', color: 'primary.main' }}
             onClick={() => setSelectedDescription(true)}
           >
             Problem Description:
           </Typography>
         </Box>

         {request.imageUrlList && request.imageUrlList.length > 0 && (
           <>
             <Divider sx={{ my: 2 }} />
             <Box display="flex" alignItems="center" gap={1}>
               <ImageIcon color="action" />
               <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Uploaded Media:</Typography>
             </Box>
             <Grid container spacing={1} sx={{ mt: 1 }}>
               {request.imageUrlList.map((url, index) => (
                 <Grid item xs={4} key={index}>
                   <img
                     src={url}
                     alt={`Uploaded ${index + 1}`}
                     style={{
                       width: '100%',
                       height: 'auto',
                       borderRadius: 4,
                       border: '1px solid #ddd',
                       cursor: 'pointer',
                     }}
                     onClick={() => setSelectedMedia({ type: 'image', url })}
                   />
                 </Grid>
               ))}
             </Grid>
           </>
         )}
       </CardContent>

       <Box sx={{ justifyContent: 'space-around', display: 'flex', mt: 2 }}>
         <Button
           variant="contained"
           color="success"
           onClick={() => handleResponse(request.serviceRequestedId, 'completed')}
           sx={{ textTransform: 'none' }}
         >
           Completed
         </Button>
         <Button
           variant="outlined"
           color="error"
           onClick={() => handleResponse(request.serviceRequestedId, 'not_completed')}
           sx={{ textTransform: 'none' }}
         >
           Not Completed
         </Button>
       </Box>
     </Card>

     {/* Modal for Media Preview */}
     {selectedMedia && (
       <Dialog open={Boolean(selectedMedia)} onClose={() => setSelectedMedia(null)} maxWidth="lg" fullWidth>
         <DialogTitle>
           Uploaded Media
           <IconButton
             aria-label="close"
             onClick={() => setSelectedMedia(null)}
             sx={{
               position: 'absolute',
               right: 8,
               top: 8,
             }}
           >
             <CloseIcon />
           </IconButton>
         </DialogTitle>
         <DialogContent>
           <img
             src={selectedMedia.url}
             alt="Selected"
             style={{
               width: '100%',
               height: 'auto',
               borderRadius: 4,
             }}
           />
         </DialogContent>
       </Dialog>
     )}

     {/* Modal for Problem Description */}
     {selectedDescription && (
       <Dialog open={selectedDescription} onClose={() => setSelectedDescription(false)} maxWidth="sm" fullWidth>
         <DialogTitle>
           Problem Description
           <IconButton
             aria-label="close"
             onClick={() => setSelectedDescription(false)}
             sx={{
               position: 'absolute',
               right: 8,
               top: 8,
             }}
           >
             <CloseIcon />
           </IconButton>
         </DialogTitle>
         <DialogContent>
           <Typography variant="body1">{request.requestedUserProblem || 'No description provided.'}</Typography>
         </DialogContent>
       </Dialog>
     )}
   </>
 );
};

export default AcceptedRequestCard;