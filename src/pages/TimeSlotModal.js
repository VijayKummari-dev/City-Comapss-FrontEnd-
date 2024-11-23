

import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton } from '@mui/material';
import { Plus, Trash2, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TimeSlotModal = ({ serviceId, onClose, onSuccess }) => {
  const [localDate, setLocalDate] = useState('');
  const [localTimeList, setLocalTimeList] = useState([]);
  const [newTime, setNewTime] = useState('');
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const addTimeSlot = () => {
    if (newTime && !localTimeList.includes(newTime)) {
      setLocalTimeList([...localTimeList, newTime]);
      setNewTime('');
    } else {
      toast.error("Please enter a unique time to add.");
    }
  };

  const removeTimeSlot = (time) => {
    setLocalTimeList(localTimeList.filter((t) => t !== time));
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    setLocalDate(formattedDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localDate || localTimeList.length === 0) {
      toast.error("Please select a date and add at least one time slot.");
      return;
    }

    const payload = [
      {
        localDate: localDate,
        localTimeList: localTimeList,
      },
    ];

    try {
      const response = await axios.post(
        `/bookServices/provider/createSlot/${serviceId}`,
        payload,
        getAuthHeaders()
      );
      console.log("Time slots added successfully:", response.data);
      toast.success("Time slots added successfully.");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding time slots:", error);
      toast.error("Failed to add time slots. Please try again.");
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Add Time Slots</Typography>
          <IconButton onClick={onClose} color="secondary">
            <X />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={localDate}
          onChange={handleDateChange}
          inputProps={{ min: new Date().toISOString().split('T')[0] }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Add Time Slot"
          type="time"
          fullWidth
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button onClick={addTimeSlot} variant="contained" color="primary" startIcon={<Plus />}>Add Time Slot</Button>
        <Box>
          {localTimeList.map((time, index) => (
            <Box key={index} display="flex" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
              <Typography>{time}</Typography>
              <IconButton onClick={() => removeTimeSlot(time)} color="error">
                <Trash2 />
              </IconButton>
            </Box>
          ))}
        </Box>
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">Add Time Slots</Button>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimeSlotModal;
