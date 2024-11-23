// // src/components/ViewServices.js
// import React, { useEffect, useState , navigate} from 'react';
// import axios from 'axios';
// import './ViewServices.css'; // Import CSS for styling
// import {jwtDecode} from jwtDecode;

// const ViewServices = () => {
//     // State to hold the list of services
//     const [services, setServices] = useState([]);

    
//     // Fetch services data when component mounts
//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
        
//     const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//     };

//         axios.get('/bookServices/provider/getAllProviderServices', config,{ withCredentials: true })
//             .then(response => {
//                 setServices(response.data);  // Store the response data in state
//             })
//             .catch(error => {
//                 console.error('Error fetching services:', error);
//             });
//     }, []);

//     // Render the list of services
//     return (
//         <div>
//             <h2>Your Services</h2>
//             {services.length > 0 ? (
//                 services.map(service => (
//                     <div key={service.serviceId} className="service-card">
//                         <h3>Service Name: {service.serviceName}</h3>
//                         <p>Provider: {service.name}</p>
//                         <p>Experience: {service.experience}</p>
//                         <p>Charge: ${service.charge}</p>
//                         <div className="date-slots">
//                             <h4>Date Slots:</h4>
//                             {service.dateSlotList.map(dateSlot => (
//                                 <div key={dateSlot.dateSlotId} className="date-slot">
//                                     <p>Date: {dateSlot.localDate}</p>
//                                     <div className="time-slots">
//                                         <h5>Time Slots:</h5>
//                                         {dateSlot.timeSlotsDtoList.map(timeSlot => (
//                                             <div key={timeSlot.timeSlotId} className="time-slot">
//                                                 <p>Time: {timeSlot.localTime}</p>
//                                                 <p>Available: {timeSlot.isAvailable ? 'Yes' : 'No'}</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>No services available.</p>
//             )}
//         </div>
//     );
// };

// export default ViewServices;

// src/components/ViewServices.js
                         // working version 
                        //  import React, { useEffect, useState } from 'react';
                        //  import axios from 'axios';
                        //  import './ViewServices.css';
                        //  import AddTimeSlots from './AddTimeSlots';
                         
                        //  const ViewServices = () => {
                        //      const [services, setServices] = useState([]);
                        //      const [selectedServiceId, setSelectedServiceId] = useState(null);
                        //      const [loading, setLoading] = useState(true);
                        //      const [error, setError] = useState(null);
                         
                        //      useEffect(() => {
                        //          const token = localStorage.getItem("authToken");
                        //          const config = {
                        //              headers: {
                        //                  Authorization: `Bearer ${token}`,
                        //              },
                        //          };
                         
                        //          axios.get('/bookServices/provider/getAllProviderServices', config)
                        //              .then(response => {
                        //                  setServices(response.data);
                        //                  setLoading(false);
                        //              })
                        //              .catch(error => {
                        //                  console.error('Error fetching services:', error);
                        //                  setError("Failed to load services. Please try again later.");
                        //                  setLoading(false);
                        //              });
                        //      }, []);
                         
                        //      const handleAddTimeSlots = (serviceId) => {
                        //          setSelectedServiceId(serviceId);
                        //      };
                         
                        //      const handleCloseAddTimeSlots = () => {
                        //          setSelectedServiceId(null);
                         
                        //          // Refresh the services after adding time slots
                        //          const token = localStorage.getItem("authToken");
                        //          const config = {
                        //              headers: {
                        //                  Authorization: `Bearer ${token}`,
                        //              },
                        //          };
                         
                        //          axios.get('/bookServices/provider/getAllProviderServices', config)
                        //              .then(response => {
                        //                  setServices(response.data);
                        //              })
                        //              .catch(error => {
                        //                  console.error('Error refreshing services:', error);
                        //              });
                        //      };
                         
                        //      if (loading) {
                        //          return <p>Loading services...</p>;
                        //      }
                         
                        //      if (error) {
                        //          return <p>{error}</p>;
                        //      }
                         
                        //      return (
                        //          <div>
                        //              <h2>Your Services</h2>
                        //              {services.length > 0 ? (
                        //                  services.map(service => (
                        //                      <div key={service.serviceId} className="service-card">
                        //                          <h3>Service Name: {service.serviceName}</h3>
                        //                          <p>Provider: {service.name}</p>
                        //                          <p>Experience: {service.experience}</p>
                        //                          <p>Charge: ${service.charge}</p>
                        //                          <div className="date-slots">
                        //                              <h4>Date Slots:</h4>
                        //                              {service.dateSlotList.map(dateSlot => (
                        //                                  <div key={dateSlot.dateSlotId} className="date-slot">
                        //                                      <p>Date: {dateSlot.localDate}</p>
                        //                                      <div className="time-slots">
                        //                                          <h5>Time Slots:</h5>
                        //                                          {dateSlot.timeSlotsDtoList.map(timeSlot => (
                        //                                              <div key={timeSlot.timeSlotId} className="time-slot">
                        //                                                  <p>Time: {timeSlot.localTime}</p>
                        //                                                  <p>Available: {timeSlot.isAvailable ? 'Yes' : 'No'}</p>
                        //                                              </div>
                        //                                          ))}
                        //                                      </div>
                        //                                  </div>
                        //                              ))}
                        //                          </div>
                        //                          <button onClick={() => handleAddTimeSlots(service.serviceId)}>Add Time Slots</button>
                        //                      </div>
                        //                  ))
                        //              ) : (
                        //                  <p>No services available.</p>
                        //              )}
                         
                        //              {selectedServiceId && (
                        //                  <AddTimeSlots 
                        //                      serviceId={selectedServiceId} 
                        //                      onClose={handleCloseAddTimeSlots} // Close modal and refresh services after adding slots
                        //                  />
                        //              )}
                        //          </div>
                        //      );
                        //  };
                         
                        //  export default ViewServices;
                         
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ViewServices.css';
// import AddTimeSlots from './AddTimeSlots';

// const ViewServices = () => {
//     const [services, setServices] = useState([]);
//     const [selectedServiceId, setSelectedServiceId] = useState(null);
//     const [selectedTimeSlots, setSelectedTimeSlots] = useState({}); // Track selected time slots for deletion
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         axios.get('/bookServices/provider/getAllProviderServices', config)
//             .then(response => {
//                 setServices(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching services:', error);
//                 setError("Failed to load services. Please try again later.");
//                 setLoading(false);
//             });
//     }, []);

//     const handleAddTimeSlots = (serviceId) => {
//         setSelectedServiceId(serviceId);
//     };

//     const handleTimeSlotSelect = (serviceId, timeSlotId) => {
//         setSelectedTimeSlots(prev => {
//             const newSelected = { ...prev };

//             // Initialize the service's selected time slots if it doesn't exist
//             if (!newSelected[serviceId]) {
//                 newSelected[serviceId] = new Set();
//             }

//             // Toggle selection of the time slot (add if not selected, remove if already selected)
//             if (newSelected[serviceId].has(timeSlotId)) {
//                 newSelected[serviceId].delete(timeSlotId); // Deselect
//             } else {
//                 newSelected[serviceId].add(timeSlotId); // Select
//             }

//             // If there are no more selected time slots for this service, delete the entry to keep the state clean
//             if (newSelected[serviceId].size === 0) {
//                 delete newSelected[serviceId];
//             }

//             return newSelected;
//         });
//     };

//     const deleteSelectedTimeSlots = (serviceId) => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             data: {
//                 serviceId: serviceId,
//                 localTimeSlotIdList: Array.from(selectedTimeSlots[serviceId] || []),
//             },
//         };

//         if (config.data.localTimeSlotIdList.length === 0) {
//             alert("Please select at least one time slot to delete.");
//             return;
//         }

//         axios.delete('/bookServices/provider/deleteSlot', config)
//             .then(response => {
//                 // Update services to reflect deleted time slots
//                 setServices(prevServices =>
//                     prevServices.map(service => {
//                         if (service.serviceId === serviceId) {
//                             service.dateSlotList.forEach(dateSlot => {
//                                 dateSlot.timeSlotsDtoList = dateSlot.timeSlotsDtoList.filter(
//                                     timeSlot => !config.data.localTimeSlotIdList.includes(timeSlot.timeSlotId)
//                                 );
//                             });
//                         }
//                         return service;
//                     })
//                 );

//                 // Clear selected time slots for this service
//                 setSelectedTimeSlots(prev => ({ ...prev, [serviceId]: new Set() }));

//                 alert("Selected time slots deleted successfully.");
//             })
//             .catch(error => {
//                 console.error("Error deleting time slots:", error);
//                 alert("Failed to delete time slots. Please try again.");
//             });
//     };

//     if (loading) {
//         return <p>Loading services...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <h2>Your Services</h2>
//             {services.length > 0 ? (
//                 services.map(service => (
//                     <div key={service.serviceId} className="service-card">
//                         <h3>Service Name: {service.serviceName}</h3>
//                         <p>Provider: {service.name}</p>
//                         <p>Experience: {service.experience}</p>
//                         <p>Charge: ${service.charge}</p>
//                         <div className="date-slots">
//                             <h4>Date Slots:</h4>
//                             {service.dateSlotList.map(dateSlot => (
//                                 <div key={dateSlot.dateSlotId} className="date-slot">
//                                     <p>Date: {dateSlot.localDate}</p>
//                                     <div className="time-slots">
//                                         <h5>Time Slots:</h5>
//                                         {dateSlot.timeSlotsDtoList.map(timeSlot => (
//                                             <div key={timeSlot.timeSlotId} className="time-slot">
//                                                 <label>
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={
//                                                             selectedTimeSlots[service.serviceId] &&
//                                                             selectedTimeSlots[service.serviceId].has(timeSlot.timeSlotId)
//                                                         }
//                                                         onChange={() => handleTimeSlotSelect(service.serviceId, timeSlot.timeSlotId)}
//                                                     />
//                                                     Time: {timeSlot.localTime} - Available: {timeSlot.isAvailable ? 'Yes' : 'No'}
//                                                 </label>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <button onClick={() => handleAddTimeSlots(service.serviceId)}>Add Time Slots</button>
//                         <button onClick={() => deleteSelectedTimeSlots(service.serviceId)}>
//                             Delete Selected Time Slots
//                         </button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No services available.</p>
//             )}

//             {selectedServiceId && (
//                 <AddTimeSlots 
//                     serviceId={selectedServiceId} 
//                     onClose={() => setSelectedServiceId(null)} 
//                 />
//             )}
//         </div>
//     );
// };

// export default ViewServices;
                     // with added deleting time slots .

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ViewServices.css';
// import AddTimeSlots from './AddTimeSlots';

// const ViewServices = () => {
//     const [services, setServices] = useState([]);
//     const [selectedServiceId, setSelectedServiceId] = useState(null);
//     const [selectedTimeSlots, setSelectedTimeSlots] = useState({}); // Track selected time slots for deletion
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         axios.get('/bookServices/provider/getAllProviderServices', config)
//             .then(response => {
//                 setServices(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching services:', error);
//                 setError("Failed to load services. Please try again later.");
//                 setLoading(false);
//             });
//     }, []);

//     const handleAddTimeSlots = (serviceId) => {
//         setSelectedServiceId(serviceId);
//     };

//     const handleTimeSlotSelect = (serviceId, timeSlotId) => {
//         setSelectedTimeSlots(prev => {
//             const newSelected = { ...prev };

//             // Initialize the service's selected time slots as an array if it doesn't exist
//             if (!newSelected[serviceId]) {
//                 newSelected[serviceId] = [];
//             }

//             // Toggle selection of the time slot (add if not selected, remove if already selected)
//             if (newSelected[serviceId].includes(timeSlotId)) {
//                 newSelected[serviceId] = newSelected[serviceId].filter(id => id !== timeSlotId); // Deselect
//             } else {
//                 newSelected[serviceId] = [...newSelected[serviceId], timeSlotId]; // Select
//             }

//             return newSelected;
//         });
//     };

//     const deleteSelectedTimeSlots = (serviceId) => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             data: {
//                 serviceId: serviceId,
//                 localTimeSlotIdList: selectedTimeSlots[serviceId] || [],
//             },
//         };

//         if (config.data.localTimeSlotIdList.length === 0) {
//             alert("Please select at least one time slot to delete.");
//             return;
//         }

//         axios.delete('/bookServices/provider/deleteSlot', config)
//             .then(response => {
//                 // Update services to reflect deleted time slots
//                 setServices(prevServices =>
//                     prevServices.map(service => {
//                         if (service.serviceId === serviceId) {
//                             service.dateSlotList.forEach(dateSlot => {
//                                 dateSlot.timeSlotsDtoList = dateSlot.timeSlotsDtoList.filter(
//                                     timeSlot => !config.data.localTimeSlotIdList.includes(timeSlot.timeSlotId)
//                                 );
//                             });
//                         }
//                         return service;
//                     })
//                 );

//                 // Clear selected time slots for this service
//                 setSelectedTimeSlots(prev => ({ ...prev, [serviceId]: [] }));

//                 alert("Selected time slots deleted successfully.");
//             })
//             .catch(error => {
//                 console.error("Error deleting time slots:", error);
//                 alert("Failed to delete time slots. Please try again.");
//             });
//     };

//     if (loading) {
//         return <p>Loading services...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <h2>Your Services</h2>
//             {services.length > 0 ? (
//                 services.map(service => (
//                     <div key={service.serviceId} className="service-card">
//                         <h3>Service Name: {service.serviceName}</h3>
//                         <p>Provider: {service.name}</p>
//                         <p>Experience: {service.experience}</p>
//                         <p>Charge: ${service.charge}</p>
//                         <p>Status: {service.status}</p> 
//                         <div className="date-slots">
//                             <h4>Date Slots:</h4>
//                             {service.dateSlotList.map(dateSlot => (
//                                 <div key={dateSlot.dateSlotId} className="date-slot">
//                                     <p>Date: {dateSlot.localDate}</p>
//                                     <div className="time-slots">
//                                         <h5>Time Slots:</h5>
//                                         {dateSlot.timeSlotsDtoList.map(timeSlot => (
//                                             <div key={timeSlot.timeSlotId} className="time-slot">
//                                                 <label>
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={
//                                                             selectedTimeSlots[service.serviceId] &&
//                                                             selectedTimeSlots[service.serviceId].includes(timeSlot.timeSlotId)
//                                                         }
//                                                         onChange={() => handleTimeSlotSelect(service.serviceId, timeSlot.timeSlotId)}
//                                                     />
//                                                     Time: {timeSlot.localTime} - Available: {timeSlot.isAvailable ? 'Yes' : 'No'}
//                                                 </label>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <button onClick={() => handleAddTimeSlots(service.serviceId)}>Add Time Slots</button>
//                         <button onClick={() => deleteSelectedTimeSlots(service.serviceId)}>
//                             Delete Selected Time Slots
//                         </button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No services available.</p>
//             )}

//             {selectedServiceId && (
//                 <AddTimeSlots 
//                     serviceId={selectedServiceId} 
//                     onClose={() => setSelectedServiceId(null)} 
//                 />
//             )}
//         </div>
//     );
// };

// export default ViewServices;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ViewServices.css';
// import AddTimeSlots from './AddTimeSlots';

// const ViewServices = () => {
//     const [services, setServices] = useState([]);
//     const [selectedServiceId, setSelectedServiceId] = useState(null);
//     const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editMode, setEditMode] = useState(null); // Track which service is in edit mode
//     const [editData, setEditData] = useState({ experience: '', charge: '', status: 'ACTIVE' }); // Store edit data

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         axios.get('/bookServices/provider/getAllProviderServices', config)
//             .then(response => {
//                 setServices(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching services:', error);
//                 setError("Failed to load services. Please try again later.");
//                 setLoading(false);
//             });
//     }, []);

//     const handleAddTimeSlots = (serviceId) => {
//         setSelectedServiceId(serviceId);
//     };

//     const handleEditClick = (service) => {
//         setEditMode(service.serviceId);
//         setEditData({
//             experience: service.experience,
//             charge: service.charge,
//             status: service.status,
//         });
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleEditSubmit = (serviceId) => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         const payload = {
//             serviceId: serviceId,
//             ...editData
//         };

//         axios.patch('/bookServices/provider/updateServiceProvidedDetails', payload, config)
//             .then(response => {
//                 setServices(prevServices =>
//                     prevServices.map(service =>
//                         service.serviceId === serviceId
//                             ? { ...service, ...editData }
//                             : service
//                     )
//                 );
//                 alert("Service details updated successfully.");
//                 setEditMode(null); // Exit edit mode
//             })
//             .catch(error => {
//                 console.error("Error updating service details:", error);
//                 alert("Failed to update service details. Please try again.");
//             });
//     };

//     const handleTimeSlotSelect = (serviceId, timeSlotId) => {
//         setSelectedTimeSlots(prev => {
//             const newSelected = { ...prev };

//             if (!newSelected[serviceId]) {
//                 newSelected[serviceId] = [];
//             }

//             if (newSelected[serviceId].includes(timeSlotId)) {
//                 newSelected[serviceId] = newSelected[serviceId].filter(id => id !== timeSlotId);
//             } else {
//                 newSelected[serviceId] = [...newSelected[serviceId], timeSlotId];
//             }

//             return newSelected;
//         });
//     };

//     const deleteSelectedTimeSlots = (serviceId) => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             data: {
//                 serviceId: serviceId,
//                 localTimeSlotIdList: selectedTimeSlots[serviceId] || [],
//             },
//         };

//         if (config.data.localTimeSlotIdList.length === 0) {
//             alert("Please select at least one time slot to delete.");
//             return;
//         }

//         axios.delete('/bookServices/provider/deleteSlot', config)
//             .then(response => {
//                 setServices(prevServices =>
//                     prevServices.map(service => {
//                         if (service.serviceId === serviceId) {
//                             service.dateSlotList.forEach(dateSlot => {
//                                 dateSlot.timeSlotsDtoList = dateSlot.timeSlotsDtoList.filter(
//                                     timeSlot => !config.data.localTimeSlotIdList.includes(timeSlot.timeSlotId)
//                                 );
//                             });
//                         }
//                         return service;
//                     })
//                 );

//                 setSelectedTimeSlots(prev => ({ ...prev, [serviceId]: [] }));

//                 alert("Selected time slots deleted successfully.");
//             })
//             .catch(error => {
//                 console.error("Error deleting time slots:", error);
//                 alert("Failed to delete time slots. Please try again.");
//             });
//     };

//     if (loading) {
//         return <p>Loading services...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <h2>Your Services</h2>
//             {services.length > 0 ? (
//                 services.map(service => (
//                     <div key={service.serviceId} className="service-card">
//                         <h3>Service Name: {service.serviceName}</h3>
//                         <p>Provider: {service.name}</p>
//                         <p>Experience: {service.experience}</p>
//                         <p>Charge: ${service.charge}</p>
//                         <p>Status: {service.status}</p>

//                         {editMode === service.serviceId ? (
//                             <div className="edit-form">
//                                 <h4>Edit Service Details</h4>
//                                 <label>
//                                     Experience:
//                                     <input
//                                         type="text"
//                                         name="experience"
//                                         value={editData.experience}
//                                         onChange={handleEditChange}
//                                     />
//                                 </label>
//                                 <label>
//                                     Charge:
//                                     <input
//                                         type="text"
//                                         name="charge"
//                                         value={editData.charge}
//                                         onChange={handleEditChange}
//                                     />
//                                 </label>
//                                 <label>
//                                     Status:
//                                     <select
//                                         name="status"
//                                         value={editData.status}
//                                         onChange={handleEditChange}
//                                     >
//                                         <option value="ACTIVE">Active</option>
//                                         <option value="INACTIVE">Inactive</option>
//                                     </select>
//                                 </label>
//                                 <button onClick={() => handleEditSubmit(service.serviceId)}>Save</button>
//                                 <button onClick={() => setEditMode(null)}>Cancel</button>
//                             </div>
//                         ) : (
//                             <button onClick={() => handleEditClick(service)}>Edit</button>
//                         )}

//                         <div className="date-slots">
//                             <h4>Date Slots:</h4>
//                             {service.dateSlotList.map(dateSlot => (
//                                 <div key={dateSlot.dateSlotId} className="date-slot">
//                                     <p>Date: {dateSlot.localDate}</p>
//                                     <div className="time-slots">
//                                         <h5>Time Slots:</h5>
//                                         {dateSlot.timeSlotsDtoList.map(timeSlot => (
//                                             <div key={timeSlot.timeSlotId} className="time-slot">
//                                                 <label>
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={
//                                                             selectedTimeSlots[service.serviceId] &&
//                                                             selectedTimeSlots[service.serviceId].includes(timeSlot.timeSlotId)
//                                                         }
//                                                         onChange={() => handleTimeSlotSelect(service.serviceId, timeSlot.timeSlotId)}
//                                                     />
//                                                     Time: {timeSlot.localTime} - Available: {timeSlot.isAvailable ? 'Yes' : 'No'}
//                                                 </label>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <button onClick={() => handleAddTimeSlots(service.serviceId)}>Add Time Slots</button>
//                         <button onClick={() => deleteSelectedTimeSlots(service.serviceId)}>
//                             Delete Selected Time Slots
//                         </button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No services available.</p>
//             )}

//             {selectedServiceId && (
//                 <AddTimeSlots 
//                     serviceId={selectedServiceId} 
//                     onClose={() => setSelectedServiceId(null)} 
//                 />
//             )}
//         </div>
//     );
// };

// export default ViewServices;
                // working for editing details  and adding and deleting time slots.
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ViewServices.css';
// import AddTimeSlots from './AddTimeSlots';

// const ViewServices = () => {
//     const [services, setServices] = useState([]);
//     const [selectedServiceId, setSelectedServiceId] = useState(null);
//     const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editMode, setEditMode] = useState(null); // Track which service is in edit mode
//     const [editData, setEditData] = useState({ experience: '', charge: '', status: 'ACTIVE' }); // Store edit data

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         axios.get('/bookServices/provider/getAllProviderServices', config)
//             .then(response => {
//                 setServices(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching services:', error);
//                 setError("Failed to load services. Please try again later.");
//                 setLoading(false);
//             });
//     }, []);

//     const handleAddTimeSlots = (serviceId) => {
//         setSelectedServiceId(serviceId);
//     };

//     const handleEditClick = (service) => {
//         setEditMode(service.serviceId);
//         setEditData({
//             experience: service.experience,
//             charge: service.charge,
//             status: service.status,
//         });
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleEditSubmit = (serviceId) => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         const payload = {
//             serviceId: serviceId,
//             ...editData
//         };

//         console.log("Submitting edit with payload:", payload); // Debugging log

//         axios.patch('/bookServices/provider/updateServiceProvidedDetails', payload, config)
//             .then(response => {
//                 console.log("Edit response:", response); // Debugging log
//                 setServices(prevServices =>
//                     prevServices.map(service =>
//                         service.serviceId === serviceId
//                             ? { ...service, ...editData }
//                             : service
//                     )
//                 );
//                 alert("Service details updated successfully.");
//                 setEditMode(null); // Exit edit mode
//             })
//             .catch(error => {
//                 console.error("Error updating service details:", error);
//                 alert("Failed to update service details. Please try again.");
//             });
//     };

//     const handleTimeSlotSelect = (serviceId, timeSlotId) => {
//         setSelectedTimeSlots(prev => {
//             const newSelected = { ...prev };

//             if (!newSelected[serviceId]) {
//                 newSelected[serviceId] = [];
//             }

//             if (newSelected[serviceId].includes(timeSlotId)) {
//                 newSelected[serviceId] = newSelected[serviceId].filter(id => id !== timeSlotId);
//             } else {
//                 newSelected[serviceId] = [...newSelected[serviceId], timeSlotId];
//             }

//             return newSelected;
//         });
//     };

//     const deleteSelectedTimeSlots = (serviceId) => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             data: {
//                 serviceId: serviceId,
//                 localTimeSlotIdList: selectedTimeSlots[serviceId] || [],
//             },
//         };

//         if (config.data.localTimeSlotIdList.length === 0) {
//             alert("Please select at least one time slot to delete.");
//             return;
//         }

//         axios.delete('/bookServices/provider/deleteSlot', config)
//             .then(response => {
//                 setServices(prevServices =>
//                     prevServices.map(service => {
//                         if (service.serviceId === serviceId) {
//                             service.dateSlotList.forEach(dateSlot => {
//                                 dateSlot.timeSlotsDtoList = dateSlot.timeSlotsDtoList.filter(
//                                     timeSlot => !config.data.localTimeSlotIdList.includes(timeSlot.timeSlotId)
//                                 );
//                             });
//                         }
//                         return service;
//                     })
//                 );

//                 setSelectedTimeSlots(prev => ({ ...prev, [serviceId]: [] }));

//                 alert("Selected time slots deleted successfully.");
//             })
//             .catch(error => {
//                 console.error("Error deleting time slots:", error);
//                 alert("Failed to delete time slots. Please try again.");
//             });
//     };

//     if (loading) {
//         return <p>Loading services...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <h2>Your Services</h2>
//             {services.length > 0 ? (
//                 services.map(service => (
//                     <div key={service.serviceId} className="service-card">
//                         <h3>Service Name: {service.serviceName}</h3>
//                         <p>Provider: {service.name}</p>
//                         <p>Experience: {service.experience}</p>
//                         <p>Charge: ${service.charge}</p>
//                         <p>Status: {service.status}</p>

//                         {editMode === service.serviceId ? (
//                             <div className="edit-form">
//                                 <h4>Edit Service Details</h4>
//                                 <label>
//                                     Experience:
//                                     <input
//                                         type="text"
//                                         name="experience"
//                                         value={editData.experience}
//                                         onChange={handleEditChange}
//                                     />
//                                 </label>
//                                 <label>
//                                     Charge:
//                                     <input
//                                         type="text"
//                                         name="charge"
//                                         value={editData.charge}
//                                         onChange={handleEditChange}
//                                     />
//                                 </label>
//                                 <label>
//                                     Status:
//                                     <select
//                                         name="status"
//                                         value={editData.status}
//                                         onChange={handleEditChange}
//                                     >
//                                         <option value="ACTIVE">Active</option>
//                                         <option value="INACTIVE">Inactive</option>
//                                     </select>
//                                 </label>
//                                 <button onClick={() => handleEditSubmit(service.serviceId)}>Save</button>
//                                 <button onClick={() => setEditMode(null)}>Cancel</button>
//                             </div>
//                         ) : (
//                             <button onClick={() => handleEditClick(service)}>Edit</button>
//                         )}

//                         <div className="date-slots">
//                             <h4>Date Slots:</h4>
//                             {service.dateSlotList.map(dateSlot => (
//                                 <div key={dateSlot.dateSlotId} className="date-slot">
//                                     <p>Date: {dateSlot.localDate}</p>
//                                     <div className="time-slots">
//                                         <h5>Time Slots:</h5>
//                                         {dateSlot.timeSlotsDtoList.map(timeSlot => (
//                                             <div key={timeSlot.timeSlotId} className="time-slot">
//                                                 <label>
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={
//                                                             selectedTimeSlots[service.serviceId] &&
//                                                             selectedTimeSlots[service.serviceId].includes(timeSlot.timeSlotId)
//                                                         }
//                                                         onChange={() => handleTimeSlotSelect(service.serviceId, timeSlot.timeSlotId)}
//                                                     />
//                                                     Time: {timeSlot.localTime} - Available: {timeSlot.isAvailable ? 'Yes' : 'No'}
//                                                 </label>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <button onClick={() => handleAddTimeSlots(service.serviceId)}>Add Time Slots</button>
//                         <button onClick={() => deleteSelectedTimeSlots(service.serviceId)}>
//                             Delete Selected Time Slots
//                         </button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No services available.</p>
//             )}

//             {selectedServiceId && (
//                 <AddTimeSlots 
//                     serviceId={selectedServiceId} 
//                     onClose={() => setSelectedServiceId(null)} 
//                 />
//             )}
//         </div>
//     );
// };

// export default ViewServices;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ViewServices.css'; // Ensure you have appropriate styles defined here
// import AddTimeSlots from './AddTimeSlots';

// const ViewServices = () => {
//     const [services, setServices] = useState([]);
//     const [serviceRequests, setServiceRequests] = useState([]);
//     const [selectedServiceId, setSelectedServiceId] = useState(null);
//     const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editMode, setEditMode] = useState(null);
//     const [editData, setEditData] = useState({ experience: '', charge: '', status: 'ACTIVE' });

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         axios.get('/bookServices/provider/getAllProviderServices', config)
//             .then(response => {
//                 setServices(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching services:', error);
//                 setError("Failed to load services. Please try again later.");
//                 setLoading(false);
//             });
//     }, []);

//     const fetchServiceRequests = () => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         axios.get('/bookServices/provider/getAllProviderRequests', config)
//             .then(response => {
//                 setServiceRequests(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching service requests:', error);
//                 setError("Failed to load service requests.");
//             });
//     };

//     const handleAddTimeSlots = (serviceId) => {
//         setSelectedServiceId(serviceId);
//     };

//     const handleEditClick = (service) => {
//         setEditMode(service.serviceId);
//         setEditData({
//             experience: service.experience,
//             charge: service.charge,
//             status: service.status,
//         });
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleEditSubmit = (serviceId) => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         const payload = {
//             serviceId: serviceId,
//             ...editData
//         };

//         axios.patch('/bookServices/provider/updateServiceProvidedDetails', payload, config)
//             .then(response => {
//                 setServices(prevServices =>
//                     prevServices.map(service =>
//                         service.serviceId === serviceId
//                             ? { ...service, ...editData }
//                             : service
//                     )
//                 );
//                 alert("Service details updated successfully.");
//                 setEditMode(null);
//             })
//             .catch(error => {
//                 console.error("Error updating service details:", error);
//                 alert("Failed to update service details. Please try again.");
//             });
//     };

//     const handleTimeSlotSelect = (serviceId, timeSlotId) => {
//         setSelectedTimeSlots(prev => {
//             const newSelected = { ...prev };

//             if (!newSelected[serviceId]) {
//                 newSelected[serviceId] = [];
//             }

//             if (newSelected[serviceId].includes(timeSlotId)) {
//                 newSelected[serviceId] = newSelected[serviceId].filter(id => id !== timeSlotId);
//             } else {
//                 newSelected[serviceId] = [...newSelected[serviceId], timeSlotId];
//             }

//             return newSelected;
//         });
//     };

//     const deleteSelectedTimeSlots = (serviceId) => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             data: {
//                 serviceId: serviceId,
//                 localTimeSlotIdList: selectedTimeSlots[serviceId] || [],
//             },
//         };

//         if (config.data.localTimeSlotIdList.length === 0) {
//             alert("Please select at least one time slot to delete.");
//             return;
//         }

//         axios.delete('/bookServices/provider/deleteSlot', config)
//             .then(response => {
//                 setServices(prevServices =>
//                     prevServices.map(service => {
//                         if (service.serviceId === serviceId) {
//                             service.dateSlotList.forEach(dateSlot => {
//                                 dateSlot.timeSlotsDtoList = dateSlot.timeSlotsDtoList.filter(
//                                     timeSlot => !config.data.localTimeSlotIdList.includes(timeSlot.timeSlotId)
//                                 );
//                             });
//                         }
//                         return service;
//                     })
//                 );

//                 setSelectedTimeSlots(prev => ({ ...prev, [serviceId]: [] }));

//                 alert("Selected time slots deleted successfully.");
//             })
//             .catch(error => {
//                 console.error("Error deleting time slots:", error);
//                 alert("Failed to delete time slots. Please try again.");
//             });
//     };

//     const handleResponse = (requestId, decision) => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         axios.patch(`/bookServices/provider/updateResponse/${requestId}/${decision}`, {}, config)
//             .then(response => {
//                 setServiceRequests(prevRequests => prevRequests.filter(req => req.serviceRequestedId !== requestId));
//                 alert(`Request has been ${decision === 'accepted' ? 'accepted' : 'declined'} successfully.`);
//             })
//             .catch(error => {
//                 console.error("Error updating request response:", error);
//                 alert("Failed to update request response. Please try again.");
//             });
//     };

//     if (loading) {
//         return <p>Loading services...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div className="view-services-container">
//             <h2>Your Services</h2>
//             {services.length > 0 ? (
//                 services.map(service => (
//                     <div key={service.serviceId} className="service-card">
//                         <h3>Service Name: {service.serviceName}</h3>
//                         <p>Provider: {service.name}</p>
//                         <p>Experience: {service.experience}</p>
//                         <p>Charge: ${service.charge}</p>
//                         <p>Status: {service.status}</p>
//                         <button onClick={() => handleEditClick(service)}>Edit</button>

//                         {editMode === service.serviceId && (
//                             <div className="edit-form">
//                                 <h4>Edit Service Details</h4>
//                                 <label>
//                                     Experience:
//                                     <input
//                                         type="text"
//                                         name="experience"
//                                         value={editData.experience}
//                                         onChange={handleEditChange}
//                                     />
//                                 </label>
//                                 <label>
//                                     Charge:
//                                     <input
//                                         type="text"
//                                         name="charge"
//                                         value={editData.charge}
//                                         onChange={handleEditChange}
//                                     />
//                                 </label>
//                                 <label>
//                                     Status:
//                                     <select
//                                         name="status"
//                                         value={editData.status}
//                                         onChange={handleEditChange}
//                                     >
//                                         <option value="ACTIVE">Active</option>
//                                         <option value="INACTIVE">Inactive</option>
//                                     </select>
//                                 </label>
//                                 <button onClick={() => handleEditSubmit(service.serviceId)}>Save</button>
//                                 <button onClick={() => setEditMode(null)}>Cancel</button>
//                             </div>
//                         )}

//                         <div className="date-slots">
//                             <h4>Date Slots:</h4>
//                             {service.dateSlotList.map(dateSlot => (
//                                 <div key={dateSlot.dateSlotId} className="date-slot">
//                                     <p>Date: {dateSlot.localDate}</p>
//                                     <div className="time-slots">
//                                         <h5>Time Slots:</h5>
//                                         {dateSlot.timeSlotsDtoList.map(timeSlot => (
//                                             <div key={timeSlot.timeSlotId} className="time-slot">
//                                                 <label>
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={
//                                                             selectedTimeSlots[service.serviceId] &&
//                                                             selectedTimeSlots[service.serviceId].includes(timeSlot.timeSlotId)
//                                                         }
//                                                         onChange={() => handleTimeSlotSelect(service.serviceId, timeSlot.timeSlotId)}
//                                                     />
//                                                     Time: {timeSlot.localTime} - Available: {timeSlot.isAvailable ? 'Yes' : 'No'}
//                                                 </label>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <button onClick={() => handleAddTimeSlots(service.serviceId)}>Add Time Slots</button>
//                         <button onClick={() => deleteSelectedTimeSlots(service.serviceId)}>
//                             Delete Selected Time Slots
//                         </button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No services available.</p>
//             )}

//             {/* Service Requests Section */}
//             <div className="service-requests">
//                 <h2>Service Requests</h2>
//                 <button onClick={fetchServiceRequests}>View Service Requests</button>
//                 {serviceRequests.length > 0 ? (
//                     serviceRequests.map(request => (
//                         <div key={request.serviceRequestedId} className="request-card">
//                             <h3>Requested By: {request.requestedUserName}</h3>
//                             <p>Service: {request.service.name}</p>
//                             <p>Provider: {request.providerUserName}</p>
//                             <p>Problem Description: {request.requestedUserProblem}</p>
//                             <p>Charge: {request.charge}</p>
//                             <p>Time Slot: {request.localTime ? request.localTime : "N/A"}</p>
//                             <p>Permission: {request.permission}</p>
//                             <p>Request Status: {request.userRequestStatus}</p>
//                             <button onClick={() => handleResponse(request.serviceRequestedId, 'accepted')}>Accept</button>
//                             <button onClick={() => handleResponse(request.serviceRequestedId, 'declined')}>Decline</button>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No service requests found.</p>
//                 )}
//             </div>

//             {selectedServiceId && (
//                 <AddTimeSlots 
//                     serviceId={selectedServiceId} 
//                     onClose={() => setSelectedServiceId(null)} 
//                 />
//             )}
//         </div>
//     );
// };

// export default ViewServices;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewServices.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewServices = () => {
    const [services, setServices] = useState([]);
    const [serviceRequests, setServiceRequests] = useState([]);
    const [selectedView, setSelectedView] = useState("Dashboard");
    const [editMode, setEditMode] = useState(null);
    const [editData, setEditData] = useState({ experience: '', charge: '', status: 'ACTIVE' });
    const [newSlotDate, setNewSlotDate] = useState("");
    const [newSlotTime, setNewSlotTime] = useState("");

    useEffect(() => {
        fetchServices();
        fetchServiceRequests();
    }, []);

    const fetchServices = () => {
        const token = localStorage.getItem("authToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        axios.get('/bookServices/provider/getAllProviderServices', config)
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services:', error));
    };

    const fetchServiceRequests = () => {
        const token = localStorage.getItem("authToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        axios.get('/bookServices/provider/getAllProviderRequests', config)
            .then(response => setServiceRequests(response.data))
            .catch(error => console.error('Error fetching service requests:', error));
    };

    const handleEditClick = (service) => {
        setEditMode(service.serviceId);
        setEditData({
            experience: service.experience,
            charge: service.charge,
            status: service.status,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = (serviceId) => {
        const token = localStorage.getItem("authToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        axios.patch('/bookServices/provider/updateServiceProvidedDetails', { serviceId, ...editData }, config)
            .then(() => {
                setServices(prevServices =>
                    prevServices.map(service =>
                        service.serviceId === serviceId ? { ...service, ...editData } : service
                    )
                );
                toast.success("Service details updated successfully.");
                setEditMode(null);
            })
            .catch(error => console.error("Error updating service details:", error));
    };

    const handleAddNewTimeSlot = (serviceId) => {
        if (!newSlotDate || !newSlotTime) {
            toast.error("Please select both date and time.");
            return;
        }

        const token = localStorage.getItem("authToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        axios.post('/bookServices/provider/addSlot', {
            serviceId,
            date: newSlotDate,
            time: newSlotTime,
        }, config)
            .then(response => {
                setServices(prevServices =>
                    prevServices.map(service =>
                        service.serviceId === serviceId
                            ? { ...service, dateSlotList: [...service.dateSlotList, response.data] }
                            : service
                    )
                );
                setNewSlotDate("");
                setNewSlotTime("");
                toast.success("Time slot added successfully.");
            })
            .catch(error => console.error("Error adding time slot:", error));
    };

    const handleDeleteTimeSlot = (serviceId, timeSlotId) => {
        const token = localStorage.getItem("authToken");
        const config = { headers: { Authorization: `Bearer ${token}` }, data: { serviceId, timeSlotId } };

        axios.delete('/bookServices/provider/deleteSlot', config)
            .then(() => {
                setServices(prevServices =>
                    prevServices.map(service =>
                        service.serviceId === serviceId
                            ? {
                                ...service,
                                dateSlotList: service.dateSlotList.map(dateSlot => ({
                                    ...dateSlot,
                                    timeSlotsDtoList: dateSlot.timeSlotsDtoList.filter(ts => ts.timeSlotId !== timeSlotId)
                                }))
                            }
                            : service
                    )
                );
                toast.success("Time slot deleted successfully.");
            })
            .catch(error => console.error("Error deleting time slot:", error));
    };

    // New handleResponse function
    const handleResponse = (requestId, decision) => {
        const token = localStorage.getItem("authToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        axios.patch(`/bookServices/provider/updateResponse/${requestId}/${decision}`, {}, config)
            .then(() => {
                setServiceRequests(prevRequests => prevRequests.filter(req => req.serviceRequestedId !== requestId));
                toast(`Request has been ${decision === 'accepted' ? 'accepted' : 'declined'} successfully.`);
            })
            .catch(error => console.error("Error updating request response:", error));
    };

    const renderDashboard = () => (
        <section className="dashboard-overview">
            <h2>Dashboard</h2>
            <div className="overview-cards">
                <div className="overview-card">
                    <h3>Total Requests</h3>
                    <p>{serviceRequests.length}</p>
                </div>
                <div className="overview-card">
                    <h3>Pending Requests</h3>
                    <p>{serviceRequests.filter(req => req.userRequestStatus === 'pending').length}</p>
                </div>
                <div className="overview-card">
                    <h3>Accepted Requests</h3>
                    <p>{serviceRequests.filter(req => req.userRequestStatus === 'accepted').length}</p>
                </div>
            </div>
        </section>
    );

    const renderMyServices = () => (
        <section className="services-section">
            <h2>My Services</h2>
            {services.map(service => (
                <div key={service.serviceId} className="service-card">
                    <h3>{service.serviceName}</h3>
                    <p>Experience: {service.experience}</p>
                    <p>Charge: ${service.charge}</p>
                    <p>Status: {service.status}</p>
                    <button onClick={() => handleEditClick(service)}>Edit</button>

                    {editMode === service.serviceId && (
                        <div className="edit-form">
                            <label>Experience: <input type="text" name="experience" value={editData.experience} onChange={handleEditChange} /></label>
                            <label>Charge: <input type="text" name="charge" value={editData.charge} onChange={handleEditChange} /></label>
                            <label>Status: <select name="status" value={editData.status} onChange={handleEditChange}><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></label>
                            <button onClick={() => handleEditSubmit(service.serviceId)}>Save</button>
                            <button onClick={() => setEditMode(null)}>Cancel</button>
                        </div>
                    )}

                    <div className="time-slots-section">
                        <h4>Time Slots</h4>
                        {service.dateSlotList.map(dateSlot => (
                            <div key={dateSlot.dateSlotId} className="date-slot">
                                <p>Date: {dateSlot.localDate}</p>
                                {dateSlot.timeSlotsDtoList.map(timeSlot => (
                                    <div key={timeSlot.timeSlotId} className="time-slot">
                                        <span>{timeSlot.localTime}</span>
                                        <button onClick={() => handleDeleteTimeSlot(service.serviceId, timeSlot.timeSlotId)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className="add-time-slot">
                            <h4>Add New Time Slot</h4>
                            <input type="date" value={newSlotDate} onChange={e => setNewSlotDate(e.target.value)} />
                            <input type="time" value={newSlotTime} onChange={e => setNewSlotTime(e.target.value)} />
                            <button onClick={() => handleAddNewTimeSlot(service.serviceId)}>Add</button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );

    const renderRequests = () => (
        <section className="requests-section">
            <h2>Service Requests</h2>
            {serviceRequests.map(request => (
                <div key={request.serviceRequestedId} className="request-card">
                    <p>Requested By: {request.requestedUserName}</p>
                    <p>Problem Description: {request.requestedUserProblem}</p>
                    <button onClick={() => handleResponse(request.serviceRequestedId, 'accepted')}>Accept</button>
                    <button onClick={() => handleResponse(request.serviceRequestedId, 'declined')}>Decline</button>
                </div>
            ))}
        </section>
    );

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Service Provider</h2>
                <nav>
                    <ul>
                        <li onClick={() => setSelectedView("Dashboard")}>Dashboard</li>
                        <li onClick={() => setSelectedView("My Services")}>My Services</li>
                        <li onClick={() => setSelectedView("Requests")}>Requests</li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                {selectedView === "Dashboard" && renderDashboard()}
                {selectedView === "My Services" && renderMyServices()}
                {selectedView === "Requests" && renderRequests()}
            </main>
        </div>
    );
};

export default ViewServices;
