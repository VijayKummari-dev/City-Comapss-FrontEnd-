
import React, { useState } from 'react';
import {
 Card,
 CardContent,
 CardActions,
 Typography,
 Box,
 Button,
 Divider,
 Grid,
 Dialog,
 DialogContent,
 DialogTitle,
 IconButton,
} from '@mui/material';
import {
 Person,
 WorkOutline,
 CalendarToday,
 AccessTime,
 AttachMoney,
 Check,
 Close,
 Description,
 LocationOn,
 Image as ImageIcon,
 Close as CloseIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestCard = ({ request, onResponse }) => {
 const [selectedMedia, setSelectedMedia] = useState(null);
 const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

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
     toast.success(`Request has been ${decision === 'accepted' ? 'accepted' : 'declined'} successfully.`);
     onResponse(requestId, decision);
   } catch (error) {
     console.error(`Error updating request response for ${requestId}:`, error);
     toast.error('Failed to update request response. Please try again.');
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
             {request.requestedUserName || 'Unknown User'}
           </Typography>
         </Box>

         <Divider sx={{ my: 2 }} />

         <Box display="flex" alignItems="center" gap={1}>
           <WorkOutline color="action" />
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
             sx={{ fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
             onClick={() => setIsDescriptionOpen(true)}
           >
             View Problem Description
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

       <CardActions sx={{ justifyContent: 'space-around' }}>
         {request.userRequestStatus === 'REQUESTED' && (
           <>
             <Button
               variant="contained"
               color="primary"
               startIcon={<Check />}
               onClick={() => handleResponse(request.serviceRequestedId, 'accepted')}
               sx={{ textTransform: 'none' }}
             >
               Accept
             </Button>
             <Button
               variant="outlined"
               color="error"
               startIcon={<Close />}
               onClick={() => handleResponse(request.serviceRequestedId, 'declined')}
               sx={{ textTransform: 'none' }}
             >
               Decline
             </Button>
           </>
         )}
       </CardActions>
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
         <Box display="flex" justifyContent="center" alignItems="center">
           {selectedMedia.type === 'video' ? (
             <video
               src={selectedMedia.url}
               controls
               style={{
                 maxWidth: '80%', // Limit the maximum width to 80% of the dialog width
                 maxHeight: '80vh', // Limit the maximum height to 80% of the viewport height
                 borderRadius: 4,
               }}
             />
           ) : (
             <img
               src={selectedMedia.url}
               alt="Selected"
               style={{
                 maxWidth: '80%', // Limit the maximum width to 80% of the dialog width
                 maxHeight: '80vh', // Limit the maximum height to 80% of the viewport height
                 borderRadius: 4,
                 objectFit: 'contain', // Ensure the image fits neatly within the dimensions
               }}
             />
           )}
         </Box>
       </DialogContent>
     </Dialog>
     
     )}

     {/* Modal for Problem Description */}
     <Dialog open={isDescriptionOpen} onClose={() => setIsDescriptionOpen(false)} maxWidth="sm" fullWidth>
       <DialogTitle>
         Problem Description
         <IconButton
           aria-label="close"
           onClick={() => setIsDescriptionOpen(false)}
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
         <Typography variant="body1" color="textPrimary">
           {request.requestedUserProblem || 'No description provided.'}
         </Typography>
       </DialogContent>
     </Dialog>
   </>
 );
};

export default RequestCard;