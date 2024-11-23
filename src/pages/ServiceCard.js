
// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Box,
//   IconButton,
//   TextField,
//   MenuItem,
//   Button,
//   Grid,
//   Divider
// } from '@mui/material';
// import { CalendarToday, AttachMoney, AccessTime, Edit, Delete, Add } from '@mui/icons-material';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ServiceCard = ({ service, onAddTimeSlots, onRefresh }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState({
//     experience: service.experience,
//     charge: service.charge,
//     status: service.status,
//   });
//   const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('authToken');
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   const handleEditSubmit = async () => {
//     try {
//       await axios.patch('/bookServices/provider/updateServiceProvidedDetails', {
//         serviceId: service.serviceId,
//         ...editData
//       }, getAuthHeaders());
//       setEditMode(false);
//       onRefresh();
//     } catch (error) {
//       console.error("Error updating service details:", error);
//       toast.error("Failed to update service details. Please try again.");
//     }
//   };

//   const deleteSelectedTimeSlots = async () => {
//     if (selectedTimeSlots.length === 0) {
//       toast("Please select at least one time slot to delete.");
//       return;
//     }

//     try {
//       await axios.delete('/bookServices/provider/deleteSlot', {
//         data: {
//           serviceId: service.serviceId,
//           localTimeSlotIdList: selectedTimeSlots,
//         },
//         ...getAuthHeaders()
//       });
//       setSelectedTimeSlots([]);
//       onRefresh();
//     } catch (error) {
//       console.error("Error deleting time slots:", error);
//       toast.error("Failed to delete time slots. Please try again.");
//     }
//   };

//   // Utility function to format date in UTC
//   const formatDateInUTC = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
//   };

//   return (
//     <Card elevation={3} sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 3, p: 2 }}>
//       <CardContent>
//         <Box display="flex" alignItems="center" justifyContent="space-between">
//           <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
//             {service.serviceName}
//           </Typography>
//           <IconButton onClick={() => setEditMode(!editMode)}>
//             <Edit color="primary" />
//           </IconButton>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         {editMode ? (
//           <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             <TextField
//               label="Experience"
//               type="number"
//               value={editData.experience}
//               onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
//               fullWidth
//             />
//             <TextField
//               label="Charge"
//               type="number"
//               value={editData.charge}
//               onChange={(e) => setEditData({ ...editData, charge: e.target.value })}
//               fullWidth
//             />
//             <TextField
//               label="Status"
//               select
//               value={editData.status}
//               onChange={(e) => setEditData({ ...editData, status: e.target.value })}
//               fullWidth
//             >
//               <MenuItem value="ACTIVE">Active</MenuItem>
//               <MenuItem value="INACTIVE">Inactive</MenuItem>
//             </TextField>
//             <Box display="flex" justifyContent="space-between">
//               <Button variant="contained" color="primary" onClick={handleEditSubmit}>
//                 Save Changes
//               </Button>
//               <Button variant="outlined" onClick={() => setEditMode(false)}>
//                 Cancel
//               </Button>
//             </Box>
//           </Box>
//         ) : (
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//             <Box display="flex" alignItems="center" gap={1}>
//               <CalendarToday color="action" />
//               <Typography variant="body1">Experience: {service.experience} years</Typography>
//             </Box>
//             <Box display="flex" alignItems="center" gap={1}>
//               <AttachMoney color="action" />
//               <Typography variant="body1">Charge: ${service.charge}</Typography>
//             </Box>
//             <Box display="flex" alignItems="center" gap={1}>
//               <AccessTime color="action" />
//               <Typography variant="body1">Status: {service.status}</Typography>
//             </Box>
//           </Box>
//         )}

//         <Divider sx={{ my: 2 }} />

//         <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
//           Available Time Slots:
//         </Typography>
//         <Grid container spacing={1}>
//           {service.dateSlotList.map((dateSlot) => (
//             <Grid item xs={12} key={dateSlot.dateSlotId}>
//               <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
//                 {formatDateInUTC(dateSlot.localDate)}
//               </Typography>
//               <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
//                 {dateSlot.timeSlotsDtoList.map((timeSlot) => (
//                   <Button
//                     key={timeSlot.timeSlotId}
//                     variant="outlined"
//                     color={selectedTimeSlots.includes(timeSlot.timeSlotId) ? 'primary' : 'default'}
//                     onClick={() => {
//                       setSelectedTimeSlots(prev =>
//                         prev.includes(timeSlot.timeSlotId)
//                           ? prev.filter(id => id !== timeSlot.timeSlotId)
//                           : [...prev, timeSlot.timeSlotId]
//                       );
//                     }}
//                   >
//                     {timeSlot.localTime}
//                   </Button>
//                 ))}
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'space-between' }}>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={onAddTimeSlots}
//         >
//           Add Time Slots
//         </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           startIcon={<Delete />}
//           onClick={deleteSelectedTimeSlots}
//         >
//           Delete Selected
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default ServiceCard;




import React, { useState } from 'react';
import {
 Card,
 CardContent,
 CardActions,
 Typography,
 Box,
 IconButton,
 TextField,
 MenuItem,
 Button,
 Grid,
 Divider
} from '@mui/material';
import { CalendarToday, AttachMoney, AccessTime, Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceCard = ({ service, onAddTimeSlots, onRefresh }) => {
 const [editMode, setEditMode] = useState(false);
 const [editData, setEditData] = useState({
   experience: service.experience,
   charge: service.charge,
   status: service.status,
 });
 const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

 const getAuthHeaders = () => {
   const token = localStorage.getItem('authToken');
   return { headers: { Authorization: `Bearer ${token}` } };
 };

 const handleEditSubmit = async () => {
   try {
     await axios.patch('/bookServices/provider/updateServiceProvidedDetails', {
       serviceId: service.serviceId,
       ...editData
     }, getAuthHeaders());
     setEditMode(false);
     onRefresh();
   } catch (error) {
     console.error("Error updating service details:", error);
     toast.error("Failed to update service details. Please try again.");
   }
 };

 const deleteSelectedTimeSlots = async () => {
   if (selectedTimeSlots.length === 0) {
     toast("Please select at least one time slot to delete.");
     return;
   }

   try {
     await axios.delete('/bookServices/provider/deleteSlot', {
       data: {
         serviceId: service.serviceId,
         localTimeSlotIdList: selectedTimeSlots,
       },
       ...getAuthHeaders()
     });
     setSelectedTimeSlots([]);
     onRefresh();
   } catch (error) {
     console.error("Error deleting time slots:", error);
     toast.error("Failed to delete time slots. Please try again.");
   }
 };

 // Utility function to format date in UTC
 const formatDateInUTC = (dateString) => {
   const date = new Date(dateString);
   return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
 };

 return (
   <Card elevation={3} sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 3, p: 2 }}>
     <CardContent>
       <Box display="flex" alignItems="center" justifyContent="space-between">
         <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
           {service.serviceName}
         </Typography>
         <IconButton onClick={() => setEditMode(!editMode)}>
           <Edit color="primary" />
         </IconButton>
       </Box>

       <Divider sx={{ my: 2 }} />

       {editMode ? (
         <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
           <TextField
             label="Experience"
             type="number"
             value={editData.experience}
             onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
             fullWidth
           />
           <TextField
             label="Charge"
             type="number"
             value={editData.charge}
             onChange={(e) => setEditData({ ...editData, charge: e.target.value })}
             fullWidth
           />
           <TextField
             label="Status"
             select
             value={editData.status}
             onChange={(e) => setEditData({ ...editData, status: e.target.value })}
             fullWidth
           >
             <MenuItem value="ACTIVE">Active</MenuItem>
             <MenuItem value="INACTIVE">Inactive</MenuItem>
           </TextField>
           <Box display="flex" justifyContent="space-between">
             <Button variant="contained" color="primary" onClick={handleEditSubmit}>
               Save Changes
             </Button>
             <Button variant="outlined" onClick={() => setEditMode(false)}>
               Cancel
             </Button>
           </Box>
         </Box>
       ) : (
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
           <Box display="flex" alignItems="center" gap={1}>
             <CalendarToday color="action" />
             <Typography variant="body1">Experience: {service.experience} years</Typography>
           </Box>
           <Box display="flex" alignItems="center" gap={1}>
             <AttachMoney color="action" />
             <Typography variant="body1">Charge: ${service.charge}</Typography>
           </Box>
           <Box display="flex" alignItems="center" gap={1}>
             <AccessTime color="action" />
             <Typography variant="body1">Status: {service.status}</Typography>
           </Box>
         </Box>
       )}

       <Divider sx={{ my: 2 }} />

       <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
         Available Time Slots:
       </Typography>
       <Grid container spacing={1}>
         {service.dateSlotList.map((dateSlot) => (
           <Grid item xs={12} key={dateSlot.dateSlotId}>
             <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
               {formatDateInUTC(dateSlot.localDate)}
             </Typography>
             <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
               {dateSlot.timeSlotsDtoList.map((timeSlot) => (
                 <Button
                   key={timeSlot.timeSlotId}
                   variant="outlined"
                   color={selectedTimeSlots.includes(timeSlot.timeSlotId) ? 'primary' : 'default'}
                   onClick={() => {
                     setSelectedTimeSlots(prev =>
                       prev.includes(timeSlot.timeSlotId)
                         ? prev.filter(id => id !== timeSlot.timeSlotId)
                         : [...prev, timeSlot.timeSlotId]
                     );
                   }}
                 >
                   {timeSlot.localTime}
                 </Button>
               ))}
             </Box>
           </Grid>
         ))}
       </Grid>
     </CardContent>
     <CardActions sx={{ justifyContent: 'space-between' }}>
       <Button
         variant="contained"
         color="primary"
         startIcon={<Add />}
         onClick={onAddTimeSlots}
       >
         Add Time Slots
       </Button>
       <Button
         variant="outlined"
         color="secondary"
         startIcon={<Delete />}
         onClick={deleteSelectedTimeSlots}
       >
         Delete Selected
       </Button>
     </CardActions>
   </Card>
 );
};

export default ServiceCard;