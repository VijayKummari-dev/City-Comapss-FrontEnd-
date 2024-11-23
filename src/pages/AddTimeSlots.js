// // src/components/AddTimeSlots.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const AddTimeSlots = ({ serviceId, onClose }) => {
//     const [date, setDate] = useState('');
//     const [times, setTimes] = useState([]);
//     const [currentTime, setCurrentTime] = useState('');

//     // Function to add a new time to the list
//     const addTime = () => {
//         setTimes([...times, currentTime]);
//         setCurrentTime('');
//     };

//     // Function to submit the date and times to the backend
//     const handleSubmit = () => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };
//         const slotData = [{ localDate: date, localTimeList: times }];

//         axios.post(`/bookServices/provider/createSlot/${serviceId}`, slotData, config)
//             .then(response => {
//                 alert("Time slots added successfully");
//                 onClose(); // Close the form after successful submission
//             })
//             .catch(error => {
//                 console.error("Error adding time slots:", error);
//                 alert("Failed to add time slots.");
//             });
//     };

//     return (
//         <div className="add-time-slots">
//             <h3>Add Time Slots</h3>
//             <label>Date:</label>
//             <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//             <label>Time:</label>
//             <input type="time" value={currentTime} onChange={(e) => setCurrentTime(e.target.value)} />
//             <button onClick={addTime}>Add Time</button>

//             <div>
//                 <h4>Selected Times:</h4>
//                 <ul>
//                     {times.map((time, index) => (
//                         <li key={index}>{time}</li>
//                     ))}
//                 </ul>
//             </div>

//             <button onClick={handleSubmit}>Submit Time Slots</button>
//             <button onClick={onClose}>Close</button>
//         </div>
//     );
// };

// export default AddTimeSlots;


// src/components/AddTimeSlots.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const AddTimeSlots = ({ serviceId, onClose }) => {
//     const [dateSlots, setDateSlots] = useState([]); // Track multiple dates with time slots
//     const [currentDate, setCurrentDate] = useState('');
//     const [currentTime, setCurrentTime] = useState('');
//     const [timeList, setTimeList] = useState([]); // Track times for the current date

//     // Add a time slot to the current date's list of times
//     const addTime = () => {
//         if (currentTime) {
//             setTimeList([...timeList, currentTime]);
//             setCurrentTime(''); // Reset the time input
//         }
//     };

//     // Add the current date with its time slots to the dateSlots array
//     const addDateSlot = () => {
//         if (currentDate && timeList.length > 0) {
//             setDateSlots([...dateSlots, { localDate: currentDate, localTimeList: timeList }]);
//             setCurrentDate(''); // Reset the date input
//             setTimeList([]); // Clear the times list for the next date
//         } else {
//             alert("Please select a date and at least one time.");
//         }
//     };

//     // Submit all date slots to the backend
//     const handleSubmit = () => {
//         const token = localStorage.getItem("authToken");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         axios.post(`/bookServices/provider/createSlot/${serviceId}`, dateSlots, config)
//             .then(response => {
//                 alert("Time slots added successfully");
//                 onClose(); // Close the form after successful submission
//             })
//             .catch(error => {
//                 console.error("Error adding time slots:", error);
//                 alert("Failed to add time slots.");
//             });
//     };

//     return (
//         <div className="add-time-slots">
//             <h3>Add Time Slots</h3>

//             {/* Date input */}
//             <label>Date:</label>
//             <input type="date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />

//             {/* Time input */}
//             <label>Time:</label>
//             <input type="time" value={currentTime} onChange={(e) => setCurrentTime(e.target.value)} />
//             <button onClick={addTime}>Add Time</button>

//             {/* Show list of times for the current date */}
//             {timeList.length > 0 && (
//                 <div>
//                     <h4>Selected Times for {currentDate}:</h4>
//                     <ul>
//                         {timeList.map((time, index) => (
//                             <li key={index}>{time}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* Button to add the current date and its time slots */}
//             <button onClick={addDateSlot}>Add Date Slot</button>

//             {/* Display all date slots with times */}
//             {dateSlots.length > 0 && (
//                 <div>
//                     <h4>All Date Slots:</h4>
//                     {dateSlots.map((slot, index) => (
//                         <div key={index}>
//                             <p>Date: {slot.localDate}</p>
//                             <ul>
//                                 {slot.localTimeList.map((time, idx) => (
//                                     <li key={idx}>{time}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Submit button */}
//             <button onClick={handleSubmit}>Submit All Time Slots</button>
//             <button onClick={onClose}>Close</button>
//         </div>
//     );
// };

// export default AddTimeSlots;

// src/components/AddTimeSlots.js
// src/components/AddTimeSlots.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTimeSlots = ({ serviceId, onClose }) => {
    const [dateSlots, setDateSlots] = useState([]); // Track multiple dates with time slots
    const [startDate, setStartDate] = useState('');
    const [numberOfDays, setNumberOfDays] = useState(1);
    const [currentTime, setCurrentTime] = useState('');
    const [error, setError] = useState(''); // Error message state

    // Function to add selected date with time slots to the dateSlots array
    const addDateSlot = () => {
        const today = new Date(); // Get today's date
        const selectedDate = new Date(startDate); // Convert selected date to Date object

        if (startDate === '' || currentTime === '') {
            toast.error("Please select a start date and a time.");
            return;
        }

        if (selectedDate < today) {
            toast.error("You cannot add time slots for past dates.");
            return;
        } else {
            toast.error(""); // Clear error if date is valid
        }

        const selectedDates = Array.from({ length: numberOfDays }, (_, i) => {
            const date = new Date(selectedDate);
            date.setDate(date.getDate() + i); // Calculate the new date
            return date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        });

        // Map selected dates to their time slots
        const newDateSlots = selectedDates.map(date => ({
            localDate: date,
            localTimeList: [currentTime],
        }));

        // Merge new date slots with existing ones
        const updatedDateSlots = [...dateSlots];
        newDateSlots.forEach(newSlot => {
            const existingSlot = updatedDateSlots.find(slot => slot.localDate === newSlot.localDate);
            if (existingSlot) {
                existingSlot.localTimeList.push(currentTime); // Add time to existing date
            } else {
                updatedDateSlots.push(newSlot); // Add new date slot
            }
        });

        setDateSlots(updatedDateSlots);
        setCurrentTime(''); // Reset the time input
    };

    // Function to submit all date slots to the backend
    const handleSubmit = () => {
        const token = localStorage.getItem("authToken");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.post(`/bookServices/provider/createSlot/${serviceId}`, dateSlots, config)
            .then(response => {
                toast.success("Time slots added successfully");
                onClose(); // Close the form after successful submission
            })
            .catch(error => {
                console.error("Error adding time slots:", error);
                toast.error("Failed to add time slots.");
            });
    };

    return (
        <div className="add-time-slots">
            <h3>Add Time Slots</h3>

            {error && <p className="error">{error}</p>} {/* Display error message */}

            {/* Start Date input */}
            <label>Start Date:</label>
            <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                min={new Date().toISOString().split('T')[0]} // Disable past dates
            />

            {/* Number of Days input */}
            <label>Number of Days:</label>
            <input 
                type="number" 
                value={numberOfDays} 
                min="1" 
                onChange={(e) => setNumberOfDays(Number(e.target.value))} 
            />

            {/* Time input */}
            <label>Time:</label>
            <input 
                type="time" 
                value={currentTime} 
                onChange={(e) => setCurrentTime(e.target.value)} 
            />
            <button onClick={addDateSlot}>Add Date and Time</button>

            {/* Display all date slots with times */}
            {dateSlots.length > 0 && (
                <div>
                    <h4>All Date Slots:</h4>
                    {dateSlots.map((slot, index) => (
                        <div key={index}>
                            <p><strong>Date:</strong> {slot.localDate}</p>
                            <ul>
                                {slot.localTimeList.map((time, idx) => (
                                    <li key={idx}>{time}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* Submit button */}
            <button onClick={handleSubmit}>Submit All Time Slots</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default AddTimeSlots;
