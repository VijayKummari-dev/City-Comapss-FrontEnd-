import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Card, CardContent, Button, IconButton,
  CircularProgress, Box, TextField, MenuItem, Select, InputLabel,
  FormControl, Grid, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, Tab, Tabs
} from '@mui/material';
import {
  BusinessCenter as BusinessCenterIcon, LocationOn as LocationOnIcon,
  EventNote as EventNoteIcon, AttachMoney as AttachMoneyIcon,
  BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon
} from '@mui/icons-material';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date-posted'); // Default to 'Date Posted'
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [tabValue, setTabValue] = useState(0); // 0 for all jobs, 1 for saved jobs

  useEffect(() => {
      fetchJobs();
  }, []);

  // const fetchJobs = async () => {
  //     setLoading(true);
  //     try {
  //         const response = await axios.get('/jobPostings/public/getAllJobs', {
  //             headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
  //         });
  //         const jobsData = response.data.map(job => ({
  //             ...job,
  //             postedOnFormatted: moment(job.postedOn).fromNow(),
  //             saved: Math.random() < 0.5 // Randomly set saved state for demonstration
  //         }));
  //         setJobs(jobsData);
  //         setFilteredJobs(jobsData);
  //     } catch (error) {
  //         console.error("Error fetching jobs:", error);
  //     } finally {
  //         setLoading(false);
  //     }
  // };
  const fetchJobs = async () => {
      setLoading(true);
      try {
          const response = await axios.get('/jobPostings/public/getAllJobs', {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
          });

          const jobsData = response.data.map(job => ({
              ...job,
              postedOnFormatted: moment(job.postedOn).fromNow(),
              saved: job.saved // Adjust this based on your backend response
          }));

          // Sort jobs by "Date Posted" before setting state
          const sortedJobs = jobsData.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));

          setJobs(sortedJobs);
          setFilteredJobs(sortedJobs);
      } catch (error) {
          console.error("Error fetching jobs:", error);
      } finally {
          setLoading(false);
      }
  };

  const toggleSaved = async (jobId) => {
   try {
       // Optimistically update the UI
       setJobs((prevJobs) =>
           prevJobs.map((job) =>
               job.jobId === jobId ? { ...job, saved: !job.saved } : job
           )
       );

       const job = jobs.find((j) => j.jobId === jobId);
       const url = job.saved
           ? '/saveJobs/users/unSave' // If currently saved, unsave
           : '/saveJobs/users/save'; // Otherwise, save

       const response = await axios.post(
           url,
           { jobId },
           {
               headers: {
                  'Authorization': `Bearer ${localStorage.getItem('authToken')}` ,
                   'Content-Type': 'application/json',
               },
           }
       );
       window.location.reload();

       if (response.status !== 200) {
           throw new Error('Failed to toggle save status');
       }
   } catch (error) {
       console.error("Error toggling saved status:", error);
       alert("Something went wrong. Please try again.");

       // Revert the changes in case of an error
       setJobs((prevJobs) =>
           prevJobs.map((job) =>
               job.jobId === jobId ? { ...job, saved: !job.saved } : job
           )
       );
   }
};

  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
      setFilteredJobs(jobs.filter(job => newValue === 0 || (newValue === 1 && job.saved)));
  };

  const handleSearch = (e) => {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);
      const filtered = jobs.filter(job =>
          job.jobTitle.toLowerCase().includes(term) ||
          job.company?.companyName?.toLowerCase().includes(term) ||
          job.jobDescription.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term) ||
          job.employmentType.toLowerCase().includes(term)
      );
      setFilteredJobs(filtered);
  };

  // const handleSort = (e) => {
  //     const criteria = e.target.value;
  //     setSortCriteria(criteria);
  //     const sorted = [...filteredJobs].sort((a, b) => {
  //         if (criteria === 'a-z') return a.jobTitle.localeCompare(b.jobTitle);
  //         if (criteria === 'z-a') return b.jobTitle.localeCompare(a.jobTitle);
  //         return new Date(b.postedOn) - new Date(a.postedOn);
  //     });
  //     setFilteredJobs(sorted);
  // };

  const handleSort = (e) => {
      const criteria = e.target.value;
      setSortCriteria(criteria);

      const sorted = [...filteredJobs].sort((a, b) => {
          if (criteria === 'date-posted') {
              // Sort jobs by the most recent date posted (descending order)
              return new Date(b.postedOn) - new Date(a.postedOn);
          }
          if (criteria === 'a-z') return a.jobTitle.localeCompare(b.jobTitle);
          if (criteria === 'z-a') return b.jobTitle.localeCompare(a.jobTitle);

          return 0; // Default: no change
      });

      setFilteredJobs(sorted);
  };

  const formatEmploymentType = (type) => {
      return type.replace(/([A-Z])/g, ' $1').trim(); // Adds a space before any uppercase letter
  };

  const handleJobTypeFilter = (e) => {
      const type = e.target.value;
      setJobTypeFilter(type);
      setFilteredJobs(jobs.filter(job => type === 'all' || job.employmentType === type));
  };

  const handleOpen = (job) => {
      if (job.applied) {
          toast("You have already applied for this job.");
          return;
      }
      setSelectedJob(job);
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
      setSelectedJob(null);
      setResume(null);
      setCoverLetter(null);
  };

  const handleApply = async () => {
      if (!selectedJob || !coverLetter) {
          toast("Please select a job and upload a cover letter.");
          return;
      }

      const formData = new FormData();
      formData.append("jobId", selectedJob.jobId);
      formData.append("resume", resume);
      if (coverLetter) {
          formData.append("coverLetter", coverLetter);
      }

      try {
          const response = await axios.post('/jobApplications/users/apply', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
              }
          });
          window.location.reload();
          toast(response.data);
          const updatedJobs = jobs.map(job => {
              if (job.jobId === selectedJob.jobId) {
                  return { ...job, isApplied: true };
              }
              return job;
          });
          setJobs(updatedJobs);
          setFilteredJobs(updatedJobs);
          handleClose();
      } catch (error) {
          console.error("Error applying for job:", error);
          toast.error("Application failed. Ensure job is active and applicant exists.");
      }
  };

  if (loading) {
      return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
          </Box>
      );
  }

  return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box
       sx={{
         background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
         color: '#fff',
         padding: '40px 5px',
         textAlign: 'center',
       }}
     >
       <Typography variant="h3" fontWeight="bold" gutterBottom>
       Discover Opportunities Beyond the Screen

</Typography>
       <Typography variant="h6" gutterBottom>
       City Compass – Your trusted partner for non-tech career success.
</Typography>
     </Box>
          <Tabs
  value={tabValue}
  onChange={handleTabChange}
  centered
  sx={{
      '& .MuiTab-root': {
          textTransform: 'none', // Prevent uppercase text
          fontWeight: 500,
          fontSize: '16px',
          color: '#666', // Gray for inactive tabs
      },
      '& .Mui-selected': {
          color: '#1976d2', // Highlighted color for active tab
          borderBottom: '2px solid #1976d2', // Underline active tab
      },
      '& .MuiTabs-indicator': {
          backgroundColor: '#1976d2',
      },
  }}
>
  <Tab label="All Jobs" />
  <Tab label="Saved Jobs" />
</Tabs>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <TextField
                  label="Search Jobs"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearch}
                  fullWidth
              />
              <FormControl sx={{ ml: 2, minWidth: 150 }}>
                  <InputLabel shrink>Job Type</InputLabel>
                  <Select
                      value={jobTypeFilter}
                      onChange={handleJobTypeFilter}
                      label="Job Type"
                      displayEmpty
                      inputProps={{ 'aria-label': 'Job Type' }}
                  >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="FullTime">Full Time</MenuItem>
                      <MenuItem value="PartTime">Part Time</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                  </Select>
              </FormControl>

              {/* <FormControl sx={{ ml: 2, minWidth :150 }}>
                  <InputLabel shrink>Sort By</InputLabel>
                  <Select
                      value={sortCriteria}
                      onChange={handleSort}
                      label="Sort By"
                      displayEmpty
                      inputProps={{ 'aria-label': 'Sort By' }}
                  >
                      <MenuItem value="a-z">A-Z</MenuItem>
                      <MenuItem value="z-a">Z-A</MenuItem>
                      <MenuItem value="date-posted">Date Posted</MenuItem>
                  </Select>
              </FormControl> */}
              <FormControl sx={{ ml: 2, minWidth: 150 }}>
                  <InputLabel shrink>Sort By</InputLabel>
                  <Select
                      value={sortCriteria}
                      onChange={handleSort}
                      label="Sort By"
                      displayEmpty
                      inputProps={{ 'aria-label': 'Sort By' }}
                  >
                      <MenuItem value="date-posted">Date Posted</MenuItem> {/* Default Option */}
                      <MenuItem value="a-z">A-Z</MenuItem>
                      <MenuItem value="z-a">Z-A</MenuItem>
                  </Select>
              </FormControl>


          </Box>
          {filteredJobs.length > 0 ? filteredJobs.map((job) => (
              <Card
  key={job.jobId}
  variant="outlined"
  sx={{
      mb: 2,
      boxShadow: tabValue === 1 ? '0 4px 10px rgba(0, 0, 0, 0.1)' : '0 2px 5px rgba(0, 0, 0, 0.05)', // Deeper shadow for Saved Jobs
      border: job.saved ? '2px solid #1976d2' : '1px solid #ddd', // Highlight saved jobs
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
          transform: 'scale(1.02)', // Subtle scale on hover
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Elevated shadow on hover
      },
  }}
>
                  {/* <CardContent>
                      <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={6}>
                              <Typography variant="h6" component="div">
                                  {job.jobTitle}
                              </Typography>
                              <Box display="flex" alignItems="center">
                                  <BusinessCenterIcon />
                                  <Typography variant="subtitle1" color="text.secondary" sx={{ ml: 1 }}>
                                      {job.company?.companyName || 'Not specified'}
                                  </Typography>
                              </Box>
                              <Box display="flex" alignItems="center">
                                  <LocationOnIcon />
                                  <Typography variant="subtitle1" color="text.secondary" sx={{ ml: 1 }}>
                                      {job.location}
                                  </Typography>
                              </Box>
                              <Box display="flex" alignItems="center">
                                  <EventNoteIcon />
                                  <Typography variant="subtitle1" color="text.secondary" sx={{ ml: 1 }}>
                                      {job.postedOnFormatted}
                                  </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ mt: 2 }}>
                                  {job.jobDescription}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                  <strong>Experience Required:</strong> {job.experience}
                              </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="flex-end">
                              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', mb: 1 }}>
                                  <AttachMoneyIcon sx={{ mr: 1 }} />
                                  {job.baseSalary}
                              </Typography>
                              <Chip label={formatEmploymentType(job.employmentType)}
                                  size="small" sx={{
                                      alignSelf: 'flex-end',
                                      bgcolor: '#E0E7FF',

                                      mb: 4 // Increased space to separate the employment type from the button
                                  }} />
                              <Box sx={{ alignSelf: 'flex-end', width: '100%', mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                  <IconButton
                                      onClick={() => toggleSaved(job.jobId)}
                                      sx={{
                                          color: job.saved ? '#1A237E' : 'inherit', // Dark blue color for saved
                                          '&:hover': {
                                              backgroundColor: '#1A237E33', // Slight dark blue highlight on hover (optional)
                                          },
                                      }}
                                  >
                                      {job.saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                  </IconButton>

                                  <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => handleOpen(job)}
                                      disabled={job.applied}
                                      sx={{ ml: 1 }}
                                  >
                                      {job.applied ? "Applied" : "Apply Now"}
                                  </Button>
                              </Box>
                          </Grid>
                      </Grid>
                  </CardContent>
              </Card> */}
              <CardContent>
  <Grid container spacing={2} alignItems="center">
      {/* Left Section: Job Details */}
      <Grid item xs={12} sm={6}>
          {/* Job Title */}
          <Typography 
              variant="h6" 
              component="div" 
              sx={{
                  color: '#1976d2', // Primary blue color for emphasis
                  fontWeight: 'bold',
              }}
          >
              {job.jobTitle}
          </Typography>

          {/* Company */}
          <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <BusinessCenterIcon sx={{ color: '#757575', fontSize: 20 }} />
              <Typography variant="subtitle1" sx={{ ml: 1, color: '#424242' }}>
                  {job.company?.companyName || 'Not specified'}
              </Typography>
          </Box>

          {/* Location */}
          <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <LocationOnIcon sx={{ color: '#757575', fontSize: 20 }} />
              <Typography variant="subtitle1" sx={{ ml: 1, color: '#424242' }}>
                  {job.location}
              </Typography>
          </Box>

          {/* Posted On */}
          <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <EventNoteIcon sx={{ color: '#757575', fontSize: 20 }} />
              <Typography variant="subtitle1" sx={{ ml: 1, color: '#424242' }}>
                  {job.postedOnFormatted}
              </Typography>
          </Box>

          {/* Job Description */}
          <Typography variant="body2" sx={{ mt: 2, color: '#333' }}>
              {job.jobDescription}
          </Typography>

          {/* Experience Required */}
          <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: '#424242' }}>
              <strong>Experience Required:</strong> {job.experience}
          </Typography>
      </Grid>

      {/* Right Section: Actions */}
      <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="flex-end">
          {/* Salary */}
          <Typography 
              variant="body2" 
              sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  width: '100%',
                  mb: 1,
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#1A237E', // Dark blue for salary text
              }}
          >
              <AttachMoneyIcon sx={{ mr: 1, fontSize: 20 }} />
              {job.baseSalary}
          </Typography>

          {/* Employment Type */}
          <Chip 
              label={formatEmploymentType(job.employmentType)}
              size="small" 
              sx={{
                  alignSelf: 'flex-end',
                  backgroundColor: job.saved ? '#1A237E' : '#E0E7FF',
                  color: job.saved ? '#fff' : '#1A237E',
                  fontWeight: 'bold',
                  mb: 4, // Spacing from the button
              }} 
          />

          {/* Actions: Save and Apply */}
          <Box 
              sx={{
                  alignSelf: 'flex-end',
                  width: '100%',
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
              }}
          >
              {/* Save Icon */}
              <IconButton
                  onClick={() => toggleSaved(job.jobId)}
                  sx={{
                      color: job.saved ? '#1A237E' : '#757575', // Dark blue for saved, gray for unsaved
                      '&:hover': {
                          color: job.saved ? '#0D47A1' : '#424242', // Darker on hover
                      },
                  }}
              >
                  {job.saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>

              {/* Apply Button */}
              <Button
                  variant="contained"
                  onClick={() => handleOpen(job)}
                  disabled={job.applied}
                  sx={{
                      ml: 1,
                      backgroundColor: job.applied ? '#4CAF50' : '#1976d2', // Green if applied
                      color: '#fff',
                      '&:hover': {
                          backgroundColor: job.applied ? '#388E3C' : '#115293', // Darker shade on hover
                      },
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                  }}
              >
                  {job.applied ? 'Applied' : 'Apply Now'}
              </Button>
          </Box>
      </Grid>
  </Grid>
</CardContent>
</Card>
          )) : (
              <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                  No jobs found.
              </Typography>
          )}
          {/* <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Apply for {selectedJob?.jobTitle}</DialogTitle>
              <DialogContent>
                  <TextField
                      type="file"
                      fullWidth
                      onChange={(e) => setResume(e.target.files[0])}
                      margin="dense"
                      helperText="Upload your resume (required)"
                  />
                  <TextField
                      type="file"
                      fullWidth
                      onChange={(e) => setCoverLetter(e.target.files[0])}
                      margin="dense"
                      helperText="Upload your cover letter (optional)"
                  />
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose} color="secondary">Cancel</Button>
                  <Button onClick={handleApply} color="primary">Submit Application</Button>
              </DialogActions>
          </Dialog> */}
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
      Apply for {selectedJob?.jobTitle}
  </DialogTitle>
  <DialogContent>
      <Typography variant="body2" sx={{ textAlign: 'center', mb: 2, color: 'text.secondary' }}>
          Complete your application
      </Typography>
      <Box
          component="form"
          sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 2,
          }}
      >
          {/* Full Name */}
          <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
          />

          {/* Email */}
          <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
          />

          {/* Phone */}
          <TextField
              label="Phone"
              type="tel"
              variant="outlined"
              fullWidth
              required
          />

          {/* Resume Upload */}
          <Box
  sx={{
      border: '1px dashed #1976d2',
      borderRadius: '8px',
      padding: 2,
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: '#f9f9f9',
      position: 'relative',
      '&:hover': {
          backgroundColor: '#f0f0f0',
      },
  }}
>
  {/* Visual elements for the drop/upload area */}
  {!resume ? (
      <>
          <Typography variant="body2" sx={{ color: '#1976d2' }}>
              <strong>Upload a file or drag and drop</strong>
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              PDF up to 10MB
          </Typography>
      </>
  ) : (
      <>
          {/* Display selected file name */}
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
              Selected File: <strong>{resume.name}</strong>
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Size: {(resume.size / (1024 * 1024)).toFixed(2)} MB
          </Typography>
      </>
  )}

  {/* Hidden Input for File */}
  <input
      type="file"
      accept="application/pdf"
      style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          opacity: 0,
          cursor: 'pointer',
      }}
      onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
              // Check file size (limit to 10MB)
              if (file.size > 10 * 1024 * 1024) {
                  alert('File size exceeds 10MB. Please upload a smaller file.');
              } else {
                  setResume(file); // Update the resume state
              }
          }
      }}
  />
</Box>


          {/* Cover Letter */}
          <TextField
              label="Cover Letter"
              placeholder="Why are you interested in this position?"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              onChange={(e) => setCoverLetter(e.target.value)}
          />
      </Box>
  </DialogContent>
  <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
      <Button
          onClick={handleClose}
          variant="outlined"
          color="secondary"
          sx={{ width: '40%' }}
      >
          Cancel
      </Button>
      <Button
          onClick={handleApply}
          variant="contained"
          color="primary"
          sx={{ width: '40%' }}
      >
          Submit Application
      </Button>
  </DialogActions>
</Dialog>

      </Container>
  );
};

export default FindJobs;