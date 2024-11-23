// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, MenuItem, Box } from '@mui/material';
// import axios from 'axios';

// const employmentTypes = [
//   { value: ' FullTime', label: 'Full-Time' },
//   { value: 'PartTime', label: 'Part-Time' },
//   { value: 'Contract', label: 'Contract' },
// ];

// const statuses = [
//   { value: 'ACTIVE', label: 'Open' },
//   { value: 'INACTIVE', label: 'Closed' },
 
// ];

// const CreateJob = ({ setActiveTab }) => {
//   const [jobData, setJobData] = useState({
//     jobTitle: '',
//     jobDescription: '',
//     baseSalary: '',
//     experience: '',
//     location: '',
//     employmentType: '',
//     status: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setJobData({ ...jobData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setMessage('');
//     setError('');

//     const token = localStorage.getItem('authToken'); // Assuming auth token is stored here
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     try {
//       const response = await axios.post('/jobPostings/company/createJobPost', jobData, config);
//       if (response.status === 200) {
//         setMessage(response.data);  // Display success message
//         setJobData({
//           jobTitle: '',
//           jobDescription: '',
//           baseSalary: '',
//           experience: '',
//           location: '',
//           employmentType: '',
//           status: '',
//         });
//         setError('');
//         setActiveTab('jobPostings'); // Switch to job postings tab after creation
//       }
//     } catch (err) {
//       console.error("Error creating job post:", err);
//       setError(err.response ? err.response.data : 'An error occurred while creating the job post.');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h5" align="center" gutterBottom>
//         Create New Job
//       </Typography>
      
//       {message && <Typography color="success.main" align="center">{message}</Typography>}
//       {error && <Typography color="error.main" align="center">{error}</Typography>}

//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//         <TextField
//           label="Job Title"
//           name="jobTitle"
//           value={jobData.jobTitle}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Job Description"
//           name="jobDescription"
//           value={jobData.jobDescription}
//           onChange={handleChange}
//           fullWidth
//           multiline
//           rows={4}
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Base Salary"
//           name="baseSalary"
//           value={jobData.baseSalary}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Experience"
//           name="experience"
//           value={jobData.experience}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Location"
//           name="location"
//           value={jobData.location}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Employment Type"
//           name="employmentType"
//           value={jobData.employmentType}
//           onChange={handleChange}
//           fullWidth
//           select
//           required
//           margin="normal"
//         >
//           {employmentTypes.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           label="Status"
//           name="status"
//           value={jobData.status}
//           onChange={handleChange}
//           fullWidth
//           select
//           required
//           margin="normal"
//         >
//           {statuses.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Create Job
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default CreateJob;


// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, MenuItem, Box, Paper } from '@mui/material';
// import axios from 'axios';

// const employmentTypes = [
//   { value: ' FullTime', label: 'Full-Time' },
//   { value: 'PartTime', label: 'Part-Time' },
//   { value: 'Contract', label: 'Contract' },
// ];

// const statuses = [
//   { value: 'ACTIVE', label: 'Open' },
//   { value: 'INACTIVE', label: 'Closed' },
// ];

// const CreateJob = ({ setActiveTab }) => {
//   const [jobData, setJobData] = useState({
//     jobTitle: '',
//     jobDescription: '',
//     baseSalary: '',
//     experience: '',
//     location: '',
//     employmentType: '',
//     status: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setJobData({ ...jobData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setMessage('');
//     setError('');

//     const token = localStorage.getItem('authToken'); // Assuming auth token is stored here
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     try {
//       const response = await axios.post('/jobPostings/company/createJobPost', jobData, config);
//       if (response.status === 200) {
//         setMessage(response.data);  // Display success message
//         setJobData({
//           jobTitle: '',
//           jobDescription: '',
//           baseSalary: '',
//           experience: '',
//           location: '',
//           employmentType: '',
//           status: '',
//         });
//         setError('');
//         setActiveTab('jobPostings'); // Switch to job postings tab after creation
//       }
//     } catch (err) {
//       console.error("Error creating job post:", err);
//       setError(err.response ? err.response.data : 'An error occurred while creating the job post.');
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
//       <Paper
//         elevation={3}
//         sx={{
//           padding: '2rem',
//           borderRadius: '12px',
//           width: '100%',
//           maxWidth: '500px',
//           backgroundColor: '#ffffff',
//         }}
//       >
//         <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
//           Create New Job
//         </Typography>

//         {message && <Typography color="success.main" align="center" sx={{ mb: 2 }}>{message}</Typography>}
//         {error && <Typography color="error.main" align="center" sx={{ mb: 2 }}>{error}</Typography>}

//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
//           <TextField
//             label="Job Title"
//             name="jobTitle"
//             value={jobData.jobTitle}
//             onChange={handleChange}
//             fullWidth
//             required
//             margin="dense"
//             variant="outlined"
//             sx={{ borderRadius: '8px' }}
//           />
//           <TextField
//             label="Job Description"
//             name="jobDescription"
//             value={jobData.jobDescription}
//             onChange={handleChange}
//             fullWidth
//             multiline
//             rows={4}
//             required
//             margin="dense"
//             variant="outlined"
//             sx={{ borderRadius: '8px' }}
//           />
//           <TextField
//             label="Base Salary"
//             name="baseSalary"
//             value={jobData.baseSalary}
//             onChange={handleChange}
//             fullWidth
//             required
//             margin="dense"
//             variant="outlined"
//             sx={{ borderRadius: '8px' }}
//           />
//           <TextField
//             label="Experience"
//             name="experience"
//             value={jobData.experience}
//             onChange={handleChange}
//             fullWidth
//             required
//             margin="dense"
//             variant="outlined"
//             sx={{ borderRadius: '8px' }}
//           />
//           <TextField
//             label="Location"
//             name="location"
//             value={jobData.location}
//             onChange={handleChange}
//             fullWidth
//             required
//             margin="dense"
//             variant="outlined"
//             sx={{ borderRadius: '8px' }}
//           />
//           <TextField
//             label="Employment Type"
//             name="employmentType"
//             value={jobData.employmentType}
//             onChange={handleChange}
//             fullWidth
//             select
//             required
//             margin="dense"
//             variant="outlined"
//             sx={{ borderRadius: '8px' }}
//           >
//             {employmentTypes.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             label="Status"
//             name="status"
//             value={jobData.status}
//             onChange={handleChange}
//             fullWidth
//             select
//             required
//             margin="dense"
//             variant="outlined"
//             sx={{ borderRadius: '8px' }}
//           >
//             {statuses.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{
//               mt: 3,
//               py: 1.5,
//               fontSize: '1rem',
//               fontWeight: 'bold',
//               backgroundColor: '#007bff',
//               '&:hover': { backgroundColor: '#0056b3' },
//               borderRadius: '8px',
//               textTransform: 'uppercase',
//             }}
//           >
//             Create Job
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default CreateJob;

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, MenuItem, Box, Paper } from '@mui/material';
import axios from 'axios';

const employmentTypes = [
  { value: ' FullTime', label: 'Full-Time' },
  { value: 'PartTime', label: 'Part-Time' },
  { value: 'Contract', label: 'Contract' },
];

const statuses = [
  { value: 'ACTIVE', label: 'Open' },
  { value: 'INACTIVE', label: 'Closed' },
];

const CreateJob = ({ setActiveTab }) => {

  const [jobData, setJobData] = useState({
    jobTitle: '',
    jobDescription: '',
    baseSalary: '',
    experience: '',
    location: '',
    employmentType: '',
    status: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('authToken'); // Assuming auth token is stored here
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post('/jobPostings/company/createJobPost', jobData, config);
      if (response.status === 200) {
        setMessage(response.data);  // Display success message
        setJobData({
          jobTitle: '',
          jobDescription: '',
          baseSalary: '',
          experience: '',
          location: '',
          employmentType: '',
          status: '',
        });
        setError('');
        setActiveTab('jobPostings'); // Switch to job postings tab after creation
      }
    } catch (err) {
      console.error("Error creating job post:", err);
      setError(err.response ? err.response.data : 'You cannot create post until Admin approves you as Job Provider');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '0vh', // Ensures full viewport height
        paddingBottom: 0, // Remove any extra padding at the bottom
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#f7f9fc',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: '600', color: '#333', mb: 3 }}
        >
          Create New Job
        </Typography>

        {message && <Typography color="success.main" align="center" sx={{ mb: 2 }}>{message}</Typography>}
        {error && <Typography color="error.main" align="center" sx={{ mb: 2 }}>{error}</Typography>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Job Title"
            name="jobTitle"
            value={jobData.jobTitle}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
            variant="outlined"
            sx={{ borderRadius: '8px', backgroundColor: '#ffffff' }}
          />
          <TextField
            label="Job Description"
            name="jobDescription"
            value={jobData.jobDescription}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
            margin="dense"
            variant="outlined"
            sx={{ borderRadius: '8px', backgroundColor: '#ffffff' }}
          />
          <TextField
            label="Base Salary"
            name="baseSalary"
            value={jobData.baseSalary}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
            variant="outlined"
            sx={{ borderRadius: '8px', backgroundColor: '#ffffff' }}
          />
          <TextField
            label="Experience"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
            variant="outlined"
            sx={{ borderRadius: '8px', backgroundColor: '#ffffff' }}
          />
          <TextField
            label="Location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
            variant="outlined"
            sx={{ borderRadius: '8px', backgroundColor: '#ffffff' }}
          />
          <TextField
            label="Employment Type"
            name="employmentType"
            value={jobData.employmentType}
            onChange={handleChange}
            fullWidth
            select
            required
            margin="dense"
            variant="outlined"
            sx={{ borderRadius: '8px', backgroundColor: '#ffffff' }}
          >
            {employmentTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Status"
            name="status"
            value={jobData.status}
            onChange={handleChange}
            fullWidth
            select
            required
            margin="dense"
            variant="outlined"
            sx={{ borderRadius: '8px', backgroundColor: '#ffffff' }}
          >
            {statuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              backgroundImage: 'linear-gradient(135deg, #007bff, #0056b3)',
              boxShadow: '0px 4px 12px rgba(0, 123, 255, 0.3)',
              '&:hover': { backgroundImage: 'linear-gradient(135deg, #0056b3, #004494)' },
              borderRadius: '8px',
              textTransform: 'uppercase',
            }}
          >
            Create Job
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateJob;
