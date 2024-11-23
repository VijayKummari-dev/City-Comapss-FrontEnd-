// import React, { useState, useEffect, useRef } from 'react';
// import {
//  Box,
//  Container,
//  Typography,
//  Card,
//  CardContent,
//  Grid,
//  Button,
//  Table,
//  TableBody,
//  TableCell,
//  TableContainer,
//  TableHead,
//  TableRow,
//  Paper,
//  Toolbar,
//  List,
//  ListItem,
//  ListItemIcon,
//  ListItemText,
//  Drawer,
//  Divider,
//  TextField,
//  Select,
//  MenuItem,
//  InputLabel,
//  FormControl,
//  Link,
//  Modal,
//  Tabs,
//  Tab,
//  Avatar,
//  IconButton,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { Home, Work, People, Assessment, Add, Edit, PhotoCamera, Key, Person } from '@mui/icons-material';
// import axios from 'axios';
// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
// import CreateJob from './CreateJob';
// import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
// import {jwtDecode} from "jwt-decode";

// const drawerWidth = 240;

// const JobProviderDashboard = () => {
//  const [activeTab, setActiveTab] = useState('dashboard');
//  const [profileTab, setProfileTab] = useState(0);
//  const [jobPostings, setJobPostings] = useState([]);
//  const [filteredJobPostings, setFilteredJobPostings] = useState([]);
//  const [filterStatus, setFilterStatus] = useState('ALL');
//  const [editingJob, setEditingJob] = useState(null);
//  const [openEditModal, setOpenEditModal] = useState(false);
//  const [selectedJobApplications, setSelectedJobApplications] = useState([]);
//  const [selectedJobId, setSelectedJobId] = useState(null);
//  const [username, setUsername] = useState("");

//  const [companyDetails, setCompanyDetails] = useState({
//    companyName: '',
//    industry: '',
//    companySize: '',
//    website: '',
//    location: '',
//    companyDescription: '',
//  });
//  const [isCompanyDetailsLoaded, setIsCompanyDetailsLoaded] = useState(false);
//  const [profilePhoto, setProfilePhoto] = useState(null);
//  const [isCropping, setIsCropping] = useState(false);
//  const [passwordDetails, setPasswordDetails] = useState({
//    currentPassword: '',
//    newPassword: '',
//    confirmPassword: '',
//  });
//  const [crop, setCrop] = useState({
//    unit: "%",
//    width: 50,
//    aspect: 1,
//  });
//  const [completedCrop, setCompletedCrop] = useState(null);
//  const [selectedFile, setSelectedFile] = useState(null);
//  const imgRef = useRef(null);
//  const canvasRef = useRef(null);

//  const [stats, setStats] = useState({
//    ActiveJobs: 0,
//    UnderReview: 0,
//    TotalApplications: 0,
//    AcceptedCandidates: 0,
//  });
//  const navigate = useNavigate();

//  useEffect(() => {
//    const token = localStorage.getItem("authToken");

//    if (!token) {
//      navigate("/login");
//      return;
//    }

//    try {
//      const decoded = jwtDecode(token);
//      if (decoded.UserType !== "JOB_PROVIDER") {
//        navigate("/not-authorized");
//        return;
//      }
//      setUsername(decoded.sub || "Job_Providers");
//    } catch (error) {
//      console.error("Failed to decode token:", error);
//      navigate("/login");
//      return;
//    }
//    if (activeTab === 'dashboard') {
//      fetchDashboardStats();
//      fetchCompanyDetails();
//    }
//    if (activeTab === 'jobPostings') fetchJobPostings();
//    if (activeTab === "profile") fetchProfileDetails();
//    if (activeTab === 'companyProfile') fetchCompanyDetails();
//  }, [activeTab]);

//  const fetchProfileDetails = async () => {
//    const token = localStorage.getItem("authToken");
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };

//    try {
//      const response = await axios.get("/user/all/details", config);
//      setProfilePhoto(response.data.profilePicture); // Set profile picture URL
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

//    if (!image || !crop?.width || !crop?.height) {
//      return null;
//    }

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
//        if (!blob) {
//          console.error("Canvas is empty");
//          return;
//        }
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
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//        "Content-Type": "multipart/form-data",
//      },
//    };

//    try {
//      const response = await axios.post("/user/all/updateProfilePicture", formData, config);
//      alert("Profile picture updated successfully!");
//      setProfilePhoto(URL.createObjectURL(croppedBlob)); // Update the displayed profile photo
//      setIsCropping(false);
//    } catch (error) {
//      console.error("Failed to upload profile picture:", error);
//      alert("Failed to upload profile picture.");
//    }
//  };
//  const fetchDashboardStats = async () => {
//    const token = localStorage.getItem('authToken');
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };

//    try {
//      const [activeJobsRes, underReviewRes, totalApplicationsRes, acceptedCandidatesRes] = await Promise.all([
//        axios.get('/jobPostings/company/activeJobPostings', config),
//        axios.get('/jobApplications/company/applications/UnderReview', config),
//        axios.get('/jobApplications/company/totalApplications', config),
//        axios.get('/jobApplications/company/acceptedCandidates', config),
//      ]);

//      setStats({
//        ActiveJobs: activeJobsRes.data,
//        UnderReview: underReviewRes.data,
//        TotalApplications: totalApplicationsRes.data,
//        AcceptedCandidates: acceptedCandidatesRes.data,
//      });
//    } catch (error) {
//      console.error('Failed to fetch dashboard stats:', error);
//    }
//  };

//  const fetchJobPostings = async () => {
//    const token = localStorage.getItem('authToken');
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };
//    try {
//      const response = await axios.get('/jobPostings/company/getAllJobsByCompany', config);
//      setJobPostings(response.data);
//      setFilteredJobPostings(response.data);
//    } catch (error) {
//      console.error('Failed to fetch job postings:', error);
//    }
//  };

//  const fetchCompanyDetails = async () => {
//    const token = localStorage.getItem('authToken');
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };
//    try {
//      const response = await axios.get('/jobPostings/company/allDetails', config);
//      setCompanyDetails(response.data);
//      setIsCompanyDetailsLoaded(true);
//    } catch (error) {
//      console.error('Failed to fetch company details:', error);
//    }
//  };

//  const handleCompanyDetailsChange = (event) => {
//    const { name, value } = event.target;
//    setCompanyDetails((prevDetails) => ({
//      ...prevDetails,
//      [name]: value,
//    }));
//  };

//  const handleSaveCompanyDetails = async () => {
//    const token = localStorage.getItem('authToken');
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };
//    try {
//      await axios.patch('/jobPostings/company/updateCompanyDetails', companyDetails, config);
//      alert('Company details updated successfully');
//    } catch (error) {
//      console.error('Failed to update company details:', error);
//    }
//  };

//  const fetchApplications = async (jobId) => {
//    const token = localStorage.getItem('authToken');
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };
//    try {
//      const response = await axios.get(`/jobApplications/company/applications/${jobId}`, config);
//      setSelectedJobApplications(response.data);
//      setSelectedJobId(jobId);
//      setActiveTab('applications');
//    } catch (error) {
//      console.error('Failed to fetch applications:', error);
//    }
//  };

//  const handleFilterChange = (event) => {
//    const status = event.target.value;
//    setFilterStatus(status);

//    if (status === 'ALL') {
//      setFilteredJobPostings(jobPostings);
//    } else {
//      setFilteredJobPostings(jobPostings.filter((job) => job.status === status));
//    }
//  };

//  const handleEditClick = (job) => {
//    setEditingJob(job);
//    setOpenEditModal(true);
//  };

//  const handleEditChange = (e) => {
//    const { name, value } = e.target;
//    setEditingJob((prev) => ({
//      ...prev,
//      [name]: value,
//    }));
//  };

//  const handleEditSave = async () => {
//    const token = localStorage.getItem('authToken');
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };
//    try {
//      await axios.put(`/jobPostings/company/update/${editingJob.jobId}`, editingJob, config);
//      setOpenEditModal(false);
//      fetchJobPostings();
//    } catch (error) {
//      console.error('Failed to update job posting:', error);
//    }
//  };
//  const handleLogout = () => {
//    localStorage.removeItem('authToken');
//    navigate('/login');
//  };
//  const handleStatusChange = async (applicationId, newStatus) => {
//    const token = localStorage.getItem('authToken');
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };
//    try {
//      await axios.put(`/jobApplications/company/updateStatus/${applicationId}/${newStatus}`, {}, config);
//      setSelectedJobApplications((prevApplications) =>
//        prevApplications.map((app) =>
//          app.applicationId === applicationId ? { ...app, status: newStatus } : app
//        )
//      );
//    } catch (error) {
//      console.error('Failed to update application status:', error);
//    }
//  };

//  const handleProfileTabChange = (event, newValue) => {
//    setProfileTab(newValue);
//  };

//  const handlePasswordChange = (e) => {
//    const { name, value } = e.target;
//    setPasswordDetails((prevDetails) => ({
//      ...prevDetails,
//      [name]: value,
//    }));
//  };

//  const handleSavePassword = async () => {
//    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
//      alert('New Password and Confirm Password do not match.');
//      return;
//    }

//    try {
//      const token = localStorage.getItem('authToken');
//      const config = {
//        headers: {
//          Authorization: `Bearer ${token}`,
//        },
//      };

//      const requestBody = {
//        oldPassword: passwordDetails.currentPassword,
//        newPassword: passwordDetails.newPassword,
//      };

//      const response = await axios.patch('/user/all/updatePassword', requestBody, config);
//      alert(response.data || 'Password updated successfully.');
//      setPasswordDetails({
//        currentPassword: '',
//        newPassword: '',
//        confirmPassword: '',
//      });
//    } catch (error) {
//      console.error('Failed to update password:', error);
//      alert(error.response?.data?.message || 'Failed to update password.');
//    }
//  };



//  return (
//    <Box display="flex" height="100vh">
//      {/* Sidebar */}
     
//      <Drawer
//        variant="permanent"
//        sx={{
//          width: drawerWidth,
//          flexShrink: 0,
//          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f7f7f7', color: 'black' },
//        }}
//      >
//       <Toolbar>
//  <Box display="flex" alignItems="center">
//    <HomeRepairServiceIcon style={{ color: 'black', marginRight: 8 }} /> {/* Icon added */}
//    <Typography variant="h6" color="black">
//      Job Provider
//    </Typography>
//  </Box>
// </Toolbar>

//        <Divider />
//        <List>
//          <ListItem button selected={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
//            <ListItemIcon>
//              <Home style={{ color: 'black' }} />
//            </ListItemIcon>
//            <ListItemText primary="Dashboard" />
//          </ListItem>
//          <ListItem button selected={activeTab === 'jobPostings'} onClick={() => setActiveTab('jobPostings')}>
//            <ListItemIcon>
//              <Work style={{ color: 'black' }} />
//            </ListItemIcon>
//            <ListItemText primary="Job Postings" />
//          </ListItem>
//          <ListItem button selected={activeTab === 'applications'} onClick={() => setActiveTab('applications')}>
//            <ListItemIcon>
//              <People style={{ color: 'black' }} />
//            </ListItemIcon>
//            <ListItemText primary="Applications" />
//          </ListItem>
//          <ListItem button selected={activeTab === 'companyProfile'} onClick={() => setActiveTab('companyProfile')}>
//            <ListItemIcon>
//              <Assessment style={{ color: 'black' }} />
//            </ListItemIcon>
//            <ListItemText primary="Company Profile" />
//          </ListItem>
//          <ListItem button selected={activeTab === 'createJob'} onClick={() => setActiveTab('createJob')}>
//            <ListItemIcon>
//              <Add style={{ color: 'black' }} />
//            </ListItemIcon>
//            <ListItemText primary="Create Job" />
//          </ListItem>
//          <ListItem button selected={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
//            <ListItemIcon>
//              <Person style={{ color: 'black' }} />
//            </ListItemIcon>
//            <ListItemText primary="Profile" />
//          </ListItem>
//        </List>
//        <Button
//          variant="contained"
//          color="secondary"
//          onClick={handleLogout}
//          sx={{ mt: 3 }}
//        >
//          Logout
//        </Button>
//      </Drawer>

//      {/* Main Content */}
//      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f1f5f9', p: 3 }}>
//        <Toolbar />
//        <Container maxWidth="lg">
          
//       {activeTab === 'dashboard' && (
//            <Grid container spacing={3} sx={{ mt: 2 }}>
//              {Object.entries(stats).map(([label, value], idx) => (
//                <Grid item xs={12} sm={6} md={3} key={idx}>
//                  <Card sx={{ bgcolor: ['#e0f2fe', '#fff3e0', '#e8f5e9', '#f3e5f5'][idx] }}>
//                    <CardContent sx={{ textAlign: 'center' }}>
//                      <Typography variant="h6">{label.replace(/([A-Z])/g, ' $1')}</Typography>
//                      <Typography variant="h4">{value}</Typography>
//                    </CardContent>
//                  </Card>
//                </Grid>
//              ))}
//            </Grid>
//          )}

//          {activeTab === 'profile' && (
//            <>
//              <Tabs value={profileTab} onChange={handleProfileTabChange} centered>
//                <Tab label="Profile Photo" icon={<PhotoCamera />} iconPosition="start" />
//                <Tab label="Password" icon={<Key />} iconPosition="start" />
//              </Tabs>
//              {profileTab === 0 && (
//                <Box sx={{ textAlign: "center", mt: 3 }}>
//                  <Avatar
//                    src={profilePhoto}
//                    alt="Profile"
//                    sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
//                  />
//                  <input
//                    accept="image/*"
//                    id="profile-photo-upload"
//                    type="file"
//                    style={{ display: "none" }}
//                    onChange={handleImageSelect}
//                  />
//                  <label htmlFor="profile-photo-upload">
//                    <IconButton component="span" color="primary">
//                      <PhotoCamera />
//                    </IconButton>
//                  </label>
//                  <Typography>Upload a new profile picture (max 5MB)</Typography>
//                </Box>

//              )}
//              {/* Crop Modal */}
//              {isCropping && selectedFile && (
//                <Modal
//                  open={isCropping}
//                  onClose={() => setIsCropping(false)}
//                  aria-labelledby="crop-image-modal"
//                  aria-describedby="crop-image-modal-description"
//                >
//                  <Box
//                    sx={{
//                      position: "absolute",
//                      top: "50%",
//                      left: "50%",
//                      transform: "translate(-50%, -50%)",
//                      width: "90%",
//                      maxWidth: "500px",
//                      bgcolor: "background.paper",
//                      p: 4,
//                      boxShadow: 24,
//                      borderRadius: 1,
//                    }}
//                  >
//                    <Typography variant="h6" mb={2}>
//                      Crop Your Profile Picture
//                    </Typography>
//                    <ReactCrop
//                      crop={crop}
//                      onChange={handleCropChange}
//                      onComplete={handleCropComplete}
//                      aspect={1}
//                    >
//                      <img
//                        ref={imgRef}
//                        src={selectedFile}
//                        alt="Crop me"
//                        style={{ maxWidth: "100%" }}
//                        onLoad={(e) => handleImageLoad(e.target)}
//                      />
//                    </ReactCrop>
//                    <Box sx={{ textAlign: "center", mt: 3 }}>
//                      <Button
//                        onClick={handleSaveCroppedImage}
//                        variant="contained"
//                        color="primary"
//                        sx={{ mr: 2 }}
//                      >
//                        Save
//                      </Button>
//                      <Button
//                        onClick={() => setIsCropping(false)}
//                        variant="outlined"
//                        color="secondary"
//                      >
//                        Cancel
//                      </Button>
//                    </Box>
//                  </Box>
//                </Modal>
//              )}

//              {/* Hidden Canvas for Cropping */}
//              <canvas ref={canvasRef} style={{ display: "none" }} />

//              {profileTab === 1 && (
//                <Box sx={{ mt: 3 }}>
//                  <TextField
//                    label="Current Password"
//                    name="currentPassword"
//                    value={passwordDetails.currentPassword}
//                    onChange={handlePasswordChange}
//                    type="password"
//                    fullWidth
//                    margin="normal"
//                  />
//                  <TextField
//                    label="New Password"
//                    name="newPassword"
//                    value={passwordDetails.newPassword}
//                    onChange={handlePasswordChange}
//                    type="password"
//                    fullWidth
//                    margin="normal"
//                  />
//                  <TextField
//                    label="Confirm New Password"
//                    name="confirmPassword"
//                    value={passwordDetails.confirmPassword}
//                    onChange={handlePasswordChange}
//                    type="password"
//                    fullWidth
//                    margin="normal"
//                  />
//                  <Button variant="contained" color="primary" onClick={handleSavePassword} sx={{ mt: 2 }}>
//                    Save Changes
//                  </Button>
//                </Box>
//              )}
//            </>
//          )}

//          {/* Other tabs */}
//          {activeTab === 'jobPostings' && (
//            <>
//              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                <Typography variant="h5">Job Postings</Typography>
//                <Button variant="contained" color="primary" onClick={() => setActiveTab('createJob')}>
//                  Create New Job
//                </Button>
//              </Box>
//              <FormControl variant="outlined" sx={{ minWidth: 200, mb: 2 }}>
//                <InputLabel>Status Filter</InputLabel>
//                <Select label="Status Filter" value={filterStatus} onChange={handleFilterChange}>
//                  <MenuItem value="ALL">All Postings</MenuItem>
//                  <MenuItem value="ACTIVE">Active Postings</MenuItem>
//                  <MenuItem value="INACTIVE">Inactive Postings</MenuItem>
//                </Select>
//              </FormControl>
//              <TableContainer component={Paper}>
//                <Table aria-label="job postings table">
//                  <TableHead>
//                    <TableRow>
//                      <TableCell>Job Title</TableCell>
//                      <TableCell>Location</TableCell>
//                      <TableCell>Type</TableCell>
//                      <TableCell>Applicants</TableCell>
//                      <TableCell>Posted Date</TableCell>
//                      <TableCell>Actions</TableCell>
//                      <TableCell>Applications</TableCell>
//                    </TableRow>
//                  </TableHead>
//                  <TableBody>
//                    {filteredJobPostings.length ? (
//                      filteredJobPostings.map((job) => (
//                        <TableRow key={job.jobId}>
//                          <TableCell>{job.jobTitle}</TableCell>
//                          <TableCell>{job.location}</TableCell>
//                          <TableCell>
//                            <Box
//                              sx={{
//                                display: 'inline-block',
//                                padding: '4px 8px',
//                                borderRadius: '4px',
//                                bgcolor: job.employmentType === 'FULL_TIME' ? '#4caf50' : '#ffeb3b',
//                                color: 'white',
//                                fontWeight: 'bold',
//                                fontSize: '0.8rem',
//                              }}
//                            >
//                              {job.employmentType.replace('_', ' ')}
//                            </Box>
//                          </TableCell>
//                          <TableCell>{job.jobApplicationList.length || 'N/A'}</TableCell>
//                          <TableCell>{new Date(job.postedOn).toLocaleDateString()}</TableCell>
//                          <TableCell>
//                            <Edit
//                              color="primary"
//                              style={{ cursor: 'pointer', marginRight: 8 }}
//                              onClick={() => handleEditClick(job)}
//                            />
//                          </TableCell>
//                          <TableCell>
//                            <Button color="primary" onClick={() => fetchApplications(job.jobId)}>
//                              View Applications
//                            </Button>
//                          </TableCell>
//                        </TableRow>
//                      ))
//                    ) : (
//                      <TableRow>
//                        <TableCell colSpan={8} align="center">
//                          No job postings available.
//                        </TableCell>
//                      </TableRow>
//                    )}
//                  </TableBody>
//                </Table>
//              </TableContainer>
//            </>
//          )}

//          {activeTab === 'applications' && (
//            <>
//              <Typography variant="h5" gutterBottom>
//                Applications for Job #{selectedJobId}
//              </Typography>
//              <TableContainer component={Paper} sx={{ mt: 2 }}>
//                <Table aria-label="applications table">
//                  <TableHead>
//                    <TableRow>
//                      <TableCell>Applicant</TableCell>
//                      <TableCell>Position</TableCell>
//                      <TableCell>Status</TableCell>
//                      <TableCell>Applied Date</TableCell>
//                      <TableCell>Documents</TableCell>
//                      <TableCell>Actions</TableCell>
//                    </TableRow>
//                  </TableHead>
//                  <TableBody>
//                    {selectedJobApplications.length ? (
//                      selectedJobApplications.map((application) => (
//                        <TableRow key={application.applicationId}>
//                          <TableCell>
//                            <Typography variant="body1" component="div" style={{ fontWeight: 600 }}>
//                              {application.applicant.name}
//                            </Typography>
//                            <Typography variant="body2" component="textSecondary">
//                              {application.applicant.email}
//                            </Typography>
//                          </TableCell>
//                          <TableCell>{application.jobPosting.jobTitle}</TableCell>
//                          <TableCell>
//                            <Box
//                              sx={{
//                                display: 'inline-block',
//                                padding: '4px 8px',
//                                borderRadius: '4px',
//                                bgcolor:
//                                  application.status === 'REVIEWING'
//                                    ? '#ffeb3b'
//                                    : application.status === 'ACCEPTED'
//                                      ? '#4caf50'
//                                      : '#f44336',
//                                color: 'white',
//                                fontWeight: 'bold',
//                                fontSize: '0.8rem',
//                              }}
//                            >
//                              {application.status}
//                            </Box>
//                          </TableCell>
//                          <TableCell>{new Date(application.appliedOn).toLocaleDateString()}</TableCell>
//                          <TableCell>
//                            {application.resume ? (
//                              <Link href={application.resume} target="_blank" rel="noopener" color="primary">
//                                Resume
//                              </Link>
//                            ) : null}
//                            {application.resume && application.coverLetter ? ' | ' : null}
//                            {application.coverLetter ? (
//                              <Link href={application.coverLetter} target="_blank" rel="noopener" color="primary">
//                                Cover Letter
//                              </Link>
//                            ) : null}
//                            {!application.resume && !application.coverLetter ? 'N/A' : null}
//                          </TableCell>
//                          <TableCell>
//                            <FormControl variant="outlined" size="small">
//                              <Select
//                                value={application.status}
//                                onChange={(e) => handleStatusChange(application.applicationId, e.target.value)}
//                                displayEmpty
//                              >
//                                <MenuItem value="REVIEWING">Reviewing</MenuItem>
//                                <MenuItem value="SUBMITTED">Submitted</MenuItem>
//                                <MenuItem value="ACCEPTED">Accepted</MenuItem>
//                                <MenuItem value="REJECTED">Rejected</MenuItem>
//                              </Select>
//                            </FormControl>
//                          </TableCell>
//                        </TableRow>
//                      ))
//                    ) : (
//                      <TableRow>
//                        <TableCell colSpan={5} align="center">
//                          No applications available.
//                        </TableCell>
//                      </TableRow>
//                    )}
//                  </TableBody>
//                </Table>
//              </TableContainer>
//              <Button variant="contained" color="primary" onClick={() => setActiveTab('jobPostings')} sx={{ mt: 2 }}>
//                Back to Job Postings
//              </Button>
//            </>
//          )}

//          {activeTab === 'companyProfile' && isCompanyDetailsLoaded && (
//            <Box sx={{ maxWidth: '600px', mx: '0' }}>
//              <Typography variant="h5" gutterBottom>
//                Company Profile
//              </Typography>
//              <form>
//                <TextField
//                  label="Company Name"
//                  name="companyName"
//                  value={companyDetails.companyName}
//                  onChange={handleCompanyDetailsChange}
//                  fullWidth
//                  margin="normal"
//                />
//                <TextField
//                  label="Industry"
//                  name="industry"
//                  value={companyDetails.industry}
//                  onChange={handleCompanyDetailsChange}
//                  fullWidth
//                  margin="normal"
//                />
//                <TextField
//                  label="Company ID"
//                  name="companyId"
//                  value={companyDetails.companyId}
//                  onChange={handleCompanyDetailsChange}
//                  fullWidth
//                  margin="normal"
//                />
//                <FormControl fullWidth margin="normal">
//                  <InputLabel shrink>Status</InputLabel>
//                  <Select
//                    name="status"
//                    value={companyDetails.status || ''}
//                    onChange={handleCompanyDetailsChange}
//                    displayEmpty
//                    sx={{
//                      '& .MuiSelect-select': {
//                        paddingTop: '10px',
//                        paddingBottom: '10px',
//                      },
//                    }}
//                  >
//                    <MenuItem value="ACTIVE">Active</MenuItem>
//                    <MenuItem value="INACTIVE">Inactive</MenuItem>
//                  </Select>
//                </FormControl>

//                <TextField
//                  label="Location"
//                  name="location"
//                  value={companyDetails.location}
//                  onChange={handleCompanyDetailsChange}
//                  fullWidth
//                  margin="normal"
//                />
//                <TextField
//                  label="Company Description"
//                  name="companyDetails"
//                  value={companyDetails.companyDetails}
//                  onChange={handleCompanyDetailsChange}
//                  fullWidth
//                  margin="normal"
//                  multiline
//                  rows={4}
//                />
//                <Button
//                  variant="contained"
//                  color="primary"
//                  onClick={handleSaveCompanyDetails}
//                  sx={{ mt: 2 }}
//                  fullWidth
//                >
//                  Save Changes
//                </Button>
//              </form>
//            </Box>
//          )}

//          {activeTab === 'createJob' && <CreateJob setActiveTab={setActiveTab} />}
//        </Container>
//      </Box>

//      {openEditModal && (
//        <Modal
//          open={openEditModal}
//          onClose={() => setOpenEditModal(false)}
//          aria-labelledby="edit-job-modal-title"
//          aria-describedby="edit-job-modal-description"
//        >
//          <Box
//            sx={{
//              position: 'absolute',
//              top: '50%',
//              left: '50%',
//              transform: 'translate(-50%, -50%)',
//              width: 400,
//              bgcolor: 'background.paper',
//              borderRadius: 1,
//              boxShadow: 24,
//              p: 4,
//            }}
//          >
//            <Typography id="edit-job-modal-title" variant="h6" component="h2">
//              Edit Job Posting
//            </Typography>
//            <TextField
//              margin="normal"
//              fullWidth
//              label="Job Title"
//              name="jobTitle"
//              value={editingJob?.jobTitle || ''}
//              onChange={handleEditChange}
//            />
//            <TextField
//              margin="normal"
//              fullWidth
//              label="Job Description"
//              name="jobDescription"
//              value={editingJob?.jobDescription || ''}
//              onChange={handleEditChange}
//            />
//            <TextField
//              margin="normal"
//              fullWidth
//              label="Base Salary"
//              name="baseSalary"
//              value={editingJob?.baseSalary || ''}
//              onChange={handleEditChange}
//            />
//            <TextField
//              margin="normal"
//              fullWidth
//              label="Location"
//              name="location"
//              value={editingJob?.location || ''}
//              onChange={handleEditChange}
//            />
//            <FormControl fullWidth margin="normal">
//              <InputLabel>Employment Type</InputLabel>
//              <Select
//                name="employmentType"
//                value={editingJob?.employmentType || ''}
//                onChange={handleEditChange}
//              >
//                <MenuItem value="FullTime">Full-Time</MenuItem>
//                <MenuItem value="PartTime">Part-Time</MenuItem>
//                <MenuItem value="Contract">Contract</MenuItem>
//              </Select>
//            </FormControl>
//            <FormControl fullWidth margin="normal">
//              <InputLabel>Status</InputLabel>
//              <Select
//                name="status"
//                value={editingJob?.status || ''}
//                onChange={handleEditChange}
//              >
//                <MenuItem value="ACTIVE">Active</MenuItem>
//                <MenuItem value="INACTIVE">Inactive</MenuItem>
//              </Select>
//            </FormControl>
//            <Button variant="contained" color="primary" fullWidth onClick={handleEditSave} sx={{ mt: 2 }}>
//              Update
//            </Button>
//          </Box>
//        </Modal>
//      )}
//    </Box>
//  );
// };

// export default JobProviderDashboard;






import React, { useState, useEffect, useRef } from 'react';
import {
 Box,
 Container,
 Typography,
 Card,
 CardContent,
 Grid,
 Button,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Paper,
 Toolbar,
 List,
 ListItem,
 ListItemIcon,
 ListItemText,
 Drawer,
 Divider,
 TextField,
 Select,
 MenuItem,
 InputLabel,
 FormControl,
 Link,
 Modal,
 Tabs,
 Tab,
 Avatar,
 IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Work, People, Assessment, Add, Edit, PhotoCamera, Key, Person } from '@mui/icons-material';
import axios from 'axios';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import CreateJob from './CreateJob';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { jwtDecode } from "jwt-decode";

const drawerWidth = 240;

const JobProviderDashboard = () => {
 const [activeTab, setActiveTab] = useState('dashboard');
 const [profileTab, setProfileTab] = useState(0);
 const [jobPostings, setJobPostings] = useState([]);
 const [filteredJobPostings, setFilteredJobPostings] = useState([]);
 const [filterStatus, setFilterStatus] = useState('ALL');
 const [editingJob, setEditingJob] = useState(null);
 const [openEditModal, setOpenEditModal] = useState(false);
 const [selectedJobApplications, setSelectedJobApplications] = useState([]);
 const [selectedJobId, setSelectedJobId] = useState(null);
 const [username, setUsername] = useState("");
 const [openCoverLetterModal, setOpenCoverLetterModal] = useState(false);
 const [selectedCoverLetter, setSelectedCoverLetter] = useState("");
 const [confirmationOpen, setConfirmationOpen] = useState(false);
 const [pendingStatus, setPendingStatus] = useState(null);
 const [selectedApplicationId, setSelectedApplicationId] = useState(null);

 const [companyDetails, setCompanyDetails] = useState({
   companyName: '',
   industry: '',
   companySize: '',
   website: '',
   location: '',
   companyDescription: '',
 });
 const [isCompanyDetailsLoaded, setIsCompanyDetailsLoaded] = useState(false);
 const [profilePhoto, setProfilePhoto] = useState(null);
 const [isCropping, setIsCropping] = useState(false);
 const [passwordDetails, setPasswordDetails] = useState({
   currentPassword: '',
   newPassword: '',
   confirmPassword: '',
 });
 const [crop, setCrop] = useState({
   unit: "%",
   width: 50,
   aspect: 1,
 });
 const [completedCrop, setCompletedCrop] = useState(null);
 const [selectedFile, setSelectedFile] = useState(null);
 const imgRef = useRef(null);
 const canvasRef = useRef(null);

 const [stats, setStats] = useState({
   ActiveJobs: 0,
   UnderReview: 0,
   TotalApplications: 0,
   AcceptedCandidates: 0,
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
     if (decoded.UserType !== "JOB_PROVIDER") {
       navigate("/not-authorized");
       return;
     }
     setUsername(decoded.sub || "Job_Providers");
   } catch (error) {
     console.error("Failed to decode token:", error);
     navigate("/login");
     return;
   }
   if (activeTab === 'dashboard') {
     fetchDashboardStats();
     fetchCompanyDetails();
   }
   if (activeTab === 'jobPostings') fetchJobPostings();
   if (activeTab === "profile") fetchProfileDetails();
   if (activeTab === 'companyProfile') fetchCompanyDetails();
 }, [activeTab]);

 const fetchProfileDetails = async () => {
   const token = localStorage.getItem("authToken");
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };

   try {
     const response = await axios.get("/user/all/details", config);
     setProfilePhoto(response.data.profilePicture); // Set profile picture URL
   } catch (error) {
     console.error("Failed to fetch profile details:", error);
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

   if (!image || !crop?.width || !crop?.height) {
     return null;
   }

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
       if (!blob) {
         console.error("Canvas is empty");
         return;
       }
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
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "multipart/form-data",
     },
   };

   try {
     const response = await axios.post("/user/all/updateProfilePicture", formData, config);
     alert("Profile picture updated successfully!");
     setProfilePhoto(URL.createObjectURL(croppedBlob)); // Update the displayed profile photo
     setIsCropping(false);
   } catch (error) {
     console.error("Failed to upload profile picture:", error);
     alert("Failed to upload profile picture.");
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
     const [activeJobsRes, underReviewRes, totalApplicationsRes, acceptedCandidatesRes] = await Promise.all([
       axios.get('/jobPostings/company/activeJobPostings', config),
       axios.get('/jobApplications/company/applications/UnderReview', config),
       axios.get('/jobApplications/company/totalApplications', config),
       axios.get('/jobApplications/company/acceptedCandidates', config),
     ]);

     setStats({
       ActiveJobs: activeJobsRes.data,
       UnderReview: underReviewRes.data,
       TotalApplications: totalApplicationsRes.data,
       AcceptedCandidates: acceptedCandidatesRes.data,
     });
   } catch (error) {
     console.error('Failed to fetch dashboard stats:', error);
   }
 };
 const handleViewCoverLetter = (coverLetterText) => {
   setSelectedCoverLetter(coverLetterText);
   setOpenCoverLetterModal(true);
 };
 const handleCloseModal = () => {
   setOpenCoverLetterModal(false);
   setSelectedCoverLetter("");
 };
 const fetchJobPostings = async () => {
   const token = localStorage.getItem('authToken');
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
   try {
     const response = await axios.get('/jobPostings/company/getAllJobsByCompany', config);
     setJobPostings(response.data);
     setFilteredJobPostings(response.data);
   } catch (error) {
     console.error('Failed to fetch job postings:', error);
   }
 };

 const fetchCompanyDetails = async () => {
   const token = localStorage.getItem('authToken');
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
   try {
     const response = await axios.get('/jobPostings/company/allDetails', config);
     setCompanyDetails(response.data);
     setIsCompanyDetailsLoaded(true);
   } catch (error) {
     console.error('Failed to fetch company details:', error);
   }
 };

 const handleCompanyDetailsChange = (event) => {
   const { name, value } = event.target;
   setCompanyDetails((prevDetails) => ({
     ...prevDetails,
     [name]: value,
   }));
 };

 const handleSaveCompanyDetails = async () => {
   const token = localStorage.getItem('authToken');
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
   try {
     await axios.patch('/jobPostings/company/updateCompanyDetails', companyDetails, config);
     alert('Company details updated successfully');
   } catch (error) {
     console.error('Failed to update company details:', error);
   }
 };

 const fetchApplications = async (jobId) => {
   const token = localStorage.getItem('authToken');
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
   try {
     const response = await axios.get(`/jobApplications/company/applications/${jobId}`, config);
     setSelectedJobApplications(response.data);
     setSelectedJobId(jobId);
     setActiveTab('applications');
   } catch (error) {
     console.error('Failed to fetch applications:', error);
   }
 };

 const handleFilterChange = (event) => {
   const status = event.target.value;
   setFilterStatus(status);

   if (status === 'ALL') {
     setFilteredJobPostings(jobPostings);
   } else {
     setFilteredJobPostings(jobPostings.filter((job) => job.status === status));
   }
 };

 const handleEditClick = (job) => {
   setEditingJob(job);
   setOpenEditModal(true);
 };

 const handleEditChange = (e) => {
   const { name, value } = e.target;
   setEditingJob((prev) => ({
     ...prev,
     [name]: value,
   }));
 };

 const handleEditSave = async () => {
   const token = localStorage.getItem('authToken');
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
   try {
     await axios.put(`/jobPostings/company/update/${editingJob.jobId}`, editingJob, config);
     setOpenEditModal(false);
     fetchJobPostings();
   } catch (error) {
     console.error('Failed to update job posting:', error);
   }
 };
 const handleLogout = () => {
   localStorage.removeItem('authToken');
   navigate('/login');
 };
 const handleStatusChange = (applicationId, newStatus) => {
   if (newStatus === "ACCEPTED" || newStatus === "REJECTED") {
     // Open confirmation modal for final statuses
     setPendingStatus(newStatus);
     setSelectedApplicationId(applicationId);
     setConfirmationOpen(true);
   } else {
     // Proceed with direct status update for other statuses
     updateApplicationStatus(applicationId, newStatus);
   }
 };
 const updateApplicationStatus = async (applicationId, newStatus) => {
   const token = localStorage.getItem("authToken");
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
   try {
     await axios.put(`/jobApplications/company/updateStatus/${applicationId}/${newStatus}`, {}, config);
     setSelectedJobApplications((prevApplications) =>
       prevApplications.map((app) =>
         app.applicationId === applicationId ? { ...app, status: newStatus } : app
       )
     );
   } catch (error) {
     console.error("Failed to update application status:", error);
   }
 };
 const finalizeStatusChange = async () => {
   if (selectedApplicationId && pendingStatus) {
     await updateApplicationStatus(selectedApplicationId, pendingStatus);
     setConfirmationOpen(false);
     setPendingStatus(null);
     setSelectedApplicationId(null);
   }
 };

 const handleProfileTabChange = (event, newValue) => {
   setProfileTab(newValue);
 };

 const handlePasswordChange = (e) => {
   const { name, value } = e.target;
   setPasswordDetails((prevDetails) => ({
     ...prevDetails,
     [name]: value,
   }));
 };

 const handleSavePassword = async () => {
   if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
     alert('New Password and Confirm Password do not match.');
     return;
   }

   try {
     const token = localStorage.getItem('authToken');
     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };

     const requestBody = {
       oldPassword: passwordDetails.currentPassword,
       newPassword: passwordDetails.newPassword,
     };

     const response = await axios.patch('/user/all/updatePassword', requestBody, config);
     alert(response.data || 'Password updated successfully.');
     setPasswordDetails({
       currentPassword: '',
       newPassword: '',
       confirmPassword: '',
     });
   } catch (error) {
     console.error('Failed to update password:', error);
     alert(error.response?.data?.message || 'Failed to update password.');
   }
 };



 return (
   <Box display="flex" height="100vh">
     {/* Sidebar */}

     <Drawer
       variant="permanent"
       sx={{
         width: drawerWidth,
         flexShrink: 0,
         '& .MuiDrawer-paper': {
           width: drawerWidth,
           boxSizing: 'border-box',
           backgroundColor: '#f7f7f7',
           color: 'black',
           display: 'flex',
           flexDirection: 'column', // Ensure proper flex alignment
         },
       }}
     >
       <Toolbar>
         <Box display="flex" alignItems="center">
           <HomeRepairServiceIcon style={{ color: 'black', marginRight: 8 }} /> {/* Icon added */}
           <Typography variant="h6" color="black">
             Job Provider
           </Typography>
         </Box>
       </Toolbar>
       <Divider />
       <List>
         <ListItem button selected={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
           <ListItemIcon>
             <Home style={{ color: 'black' }} />
           </ListItemIcon>
           <ListItemText primary="Dashboard" />
         </ListItem>
         <ListItem button selected={activeTab === 'jobPostings'} onClick={() => setActiveTab('jobPostings')}>
           <ListItemIcon>
             <Work style={{ color: 'black' }} />
           </ListItemIcon>
           <ListItemText primary="Job Postings" />
         </ListItem>
         <ListItem button selected={activeTab === 'applications'} onClick={() => setActiveTab('applications')}>
           <ListItemIcon>
             <People style={{ color: 'black' }} />
           </ListItemIcon>
           <ListItemText primary="Applications" />
         </ListItem>
         <ListItem button selected={activeTab === 'companyProfile'} onClick={() => setActiveTab('companyProfile')}>
           <ListItemIcon>
             <Assessment style={{ color: 'black' }} />
           </ListItemIcon>
           <ListItemText primary="Company Profile" />
         </ListItem>
         <ListItem button selected={activeTab === 'createJob'} onClick={() => setActiveTab('createJob')}>
           <ListItemIcon>
             <Add style={{ color: 'black' }} />
           </ListItemIcon>
           <ListItemText primary="Create Job" />
         </ListItem>
         <ListItem button selected={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
           <ListItemIcon>
             <Person style={{ color: 'black' }} />
           </ListItemIcon>
           <ListItemText primary="Profile" />
         </ListItem>
       </List>

       <Box sx={{ flexGrow: 1 }} /> {/* Push Logout Button to Bottom */}

       <Button
         variant="contained"
         color="primary"
         onClick={handleLogout}
         sx={{
           mb: 2,
           mx: 2,
         }}
       >
         Logout
       </Button>
     </Drawer>

     {/* Job Type Color Change */}



     {/* Main Content */}
     <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f1f5f9', p: 3 }}>
       <Toolbar />
       <Container maxWidth="lg">

         {activeTab === 'dashboard' && (
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
         )}

         {activeTab === 'profile' && (
           <>
             <Tabs value={profileTab} onChange={handleProfileTabChange} centered>
               <Tab label="Profile Photo" icon={<PhotoCamera />} iconPosition="start" />
               <Tab label="Password" icon={<Key />} iconPosition="start" />
             </Tabs>
             {profileTab === 0 && (
               <Box sx={{ textAlign: "center", mt: 3 }}>
                 <Avatar
                   src={profilePhoto}
                   alt="Profile"
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
                 <Typography>Upload a new profile picture (max 5MB)</Typography>
               </Box>

             )}
             {/* Crop Modal */}
             {isCropping && selectedFile && (
               <Modal
                 open={isCropping}
                 onClose={() => setIsCropping(false)}
                 aria-labelledby="crop-image-modal"
                 aria-describedby="crop-image-modal-description"
               >
                 <Box
                   sx={{
                     position: "absolute",
                     top: "50%",
                     left: "50%",
                     transform: "translate(-50%, -50%)",
                     width: "90%",
                     maxWidth: "500px",
                     bgcolor: "background.paper",
                     p: 4,
                     boxShadow: 24,
                     borderRadius: 1,
                   }}
                 >
                   <Typography variant="h6" mb={2}>
                     Crop Your Profile Picture
                   </Typography>
                   <ReactCrop
                     crop={crop}
                     onChange={handleCropChange}
                     onComplete={handleCropComplete}
                     aspect={1}
                   >
                     <img
                       ref={imgRef}
                       src={selectedFile}
                       alt="Crop me"
                       style={{ maxWidth: "100%" }}
                       onLoad={(e) => handleImageLoad(e.target)}
                     />
                   </ReactCrop>
                   <Box sx={{ textAlign: "center", mt: 3 }}>
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

             {/* Hidden Canvas for Cropping */}
             <canvas ref={canvasRef} style={{ display: "none" }} />

             {profileTab === 1 && (
               <Box sx={{ mt: 3 }}>
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
                 <Button variant="contained" color="primary" onClick={handleSavePassword} sx={{ mt: 2 }}>
                   Save Changes
                 </Button>
               </Box>
             )}
           </>
         )}

         {/* Other tabs */}
         {activeTab === 'jobPostings' && (
           <>
             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
               <Typography variant="h5">Job Postings</Typography>
               <Button variant="contained" color="primary" onClick={() => setActiveTab('createJob')}>
                 Create New Job
               </Button>
             </Box>
             <FormControl variant="outlined" sx={{ minWidth: 200, mb: 2 }}>
               <InputLabel>Status Filter</InputLabel>
               <Select label="Status Filter" value={filterStatus} onChange={handleFilterChange}>
                 <MenuItem value="ALL">All Postings</MenuItem>
                 <MenuItem value="ACTIVE">Active Postings</MenuItem>
                 <MenuItem value="INACTIVE">Inactive Postings</MenuItem>
               </Select>
             </FormControl>
             <TableContainer component={Paper}>
               <Table aria-label="job postings table">
                 <TableHead>
                   <TableRow>
                     <TableCell>Job Title</TableCell>
                     <TableCell>Location</TableCell>
                     <TableCell>Type</TableCell>
                     <TableCell>Applicants</TableCell>
                     <TableCell>Posted Date</TableCell>
                     <TableCell>Actions</TableCell>
                     <TableCell>Applications</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {filteredJobPostings.length ? (
                     filteredJobPostings.map((job) => (
                       <TableRow key={job.jobId}>
                         <TableCell>{job.jobTitle}</TableCell>
                         <TableCell>{job.location}</TableCell>
                         <TableCell>
                           <Box
                             sx={{
                               display: 'inline-block',
                               padding: '4px 8px',
                               borderRadius: '4px',
                               bgcolor: job.employmentType === 'FULL_TIME' ? '#1976d2' : '#64b5f6', // Blue colors for job types
                               color: 'white',
                               fontWeight: 'bold',
                               fontSize: '0.8rem',
                             }}
                           >
                             {job.employmentType.replace('_', ' ')}
                           </Box>
                         </TableCell>

                         <TableCell>{job.jobApplicationList.length || 'N/A'}</TableCell>
                         <TableCell>{new Date(job.postedOn).toLocaleDateString()}</TableCell>
                         <TableCell>
                           <Edit
                             color="primary"
                             style={{ cursor: 'pointer', marginRight: 8 }}
                             onClick={() => handleEditClick(job)}
                           />
                         </TableCell>
                         <TableCell>
                           <Button color="primary" onClick={() => fetchApplications(job.jobId)}>
                             View Applications
                           </Button>
                         </TableCell>
                       </TableRow>
                     ))
                   ) : (
                     <TableRow>
                       <TableCell colSpan={8} align="center">
                         No job postings available.
                       </TableCell>
                     </TableRow>
                   )}
                 </TableBody>
               </Table>
             </TableContainer>
           </>
         )}

         {activeTab === 'applications' && (
           <>
             <Typography variant="h5" gutterBottom>
               Applications for Job #{selectedJobId}
             </Typography>
             <TableContainer component={Paper} sx={{ mt: 2 }}>
               <Table aria-label="applications table">
                 <TableHead>
                   <TableRow>
                     <TableCell>Applicant</TableCell>
                     <TableCell>Position</TableCell>
                     <TableCell>Status</TableCell>
                     <TableCell>Applied Date</TableCell>
                     <TableCell>Documents</TableCell>
                     <TableCell>Actions</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {selectedJobApplications.length ? (
                     selectedJobApplications.map((application) => (
                       <TableRow key={application.applicationId}>
                         <TableCell>
                           <Typography variant="body1" component="div" style={{ fontWeight: 600 }}>
                             {application.applicant.name}
                           </Typography>
                           <Typography variant="body2" component="textSecondary">
                             {application.applicant.email}
                           </Typography>
                         </TableCell>
                         <TableCell>{application.jobPosting.jobTitle}</TableCell>
                         <TableCell>
                           <Box
                             sx={{
                               display: 'inline-block',
                               padding: '4px 8px',
                               borderRadius: '4px',
                               bgcolor:
                                 application.status === 'REVIEWING'
                                   ? '#ffeb3b'
                                   : application.status === 'ACCEPTED'
                                     ? '#4caf50'
                                     : '#f44336',
                               color: 'white',
                               fontWeight: 'bold',
                               fontSize: '0.8rem',
                             }}
                           >
                             {application.status}
                           </Box>
                         </TableCell>
                         <TableCell>{new Date(application.appliedOn).toLocaleDateString()}</TableCell>
 
                         <TableCell>
                           <Button href={application.resume} target="_blank" rel="noopener"
                             sx={{
                               textTransform: "none",
                               // fontWeight: "bold",
                               color: "#1976d2",
                               bgcolor: "transparent",
                               "&:hover": {
                                 bgcolor: "#F6FAFD", // Light blue background
                               },
                             }}
                           >
                             RESUME
                           </Button>{" "}
                           {application.resume && application.coverLetter ? " | " : null}
                           {application.coverLetter && (
                             <Button
                               variant="text"
                               onClick={() =>
                                 handleViewCoverLetter(application.coverLetter)
                               }
                               sx={{
                                 textTransform: "none",
                                 // fontWeight: "bold",
                                 color: "#1976d2",
                                 bgcolor: "transparent",
                                 "&:hover": {
                                   bgcolor: "#F6FAFD", // Light blue background
                                 },
                               }}
                             >
                               COVER LETTER
                             </Button>
                           )}
                         </TableCell>
                         <TableCell>
                           <FormControl variant="outlined" size="small" fullWidth>
                             <Select
                               value={application.status || ""} // Default to "" if no status is set
                               onChange={(e) => handleStatusChange(application.applicationId, e.target.value)}
                               displayEmpty
                               disabled={["ACCEPTED", "REJECTED"].includes(application.status)} // Disable dropdown if finalized
                               renderValue={(value) => {
                                 // Render placeholder "Take Action" if no value is selected
                                 if (!value) {
                                   return <span style={{ color: "#888" }}>Take Action</span>;
                                 }
                                 return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Capitalize the value
                               }}
                             >
                               {/* Default placeholder */}

                               <MenuItem value="REVIEWING">Reviewing</MenuItem>
                               <MenuItem value="ACCEPTED">Accepted</MenuItem>
                               <MenuItem value="REJECTED">Rejected</MenuItem>
                             </Select>
                           </FormControl>
                         </TableCell>




                       </TableRow>
                     ))
                   ) : (
                     <TableRow>
                       <TableCell colSpan={5} align="center">
                         No applications available.
                       </TableCell>
                     </TableRow>
                   )}
                 </TableBody>
               </Table>
             </TableContainer>
             <Button variant="contained" color="primary" onClick={() => setActiveTab('jobPostings')} sx={{ mt: 2 }}>
               Back to Job Postings
             </Button>
           </>
         )}

         {activeTab === 'companyProfile' && isCompanyDetailsLoaded && (
           <Box sx={{ maxWidth: '600px', mx: '0' }}>
             <Typography variant="h5" gutterBottom>
               Company Profile
             </Typography>
             <form>
               <TextField
                 label="Company Name"
                 name="companyName"
                 value={companyDetails.companyName}
                 onChange={handleCompanyDetailsChange}
                 fullWidth
                 margin="normal"
               />
               <TextField
                 label="Industry"
                 name="industry"
                 value={companyDetails.industry}
                 onChange={handleCompanyDetailsChange}
                 fullWidth
                 margin="normal"
               />
               <TextField
                 label="Company ID"
                 name="companyId"
                 value={companyDetails.companyId}
                 onChange={handleCompanyDetailsChange}
                 fullWidth
                 margin="normal"
               />
               <FormControl fullWidth margin="normal">
                 <InputLabel shrink>Status</InputLabel>
                 <Select
                   name="status"
                   value={companyDetails.status || ''}
                   onChange={handleCompanyDetailsChange}
                   displayEmpty
                   sx={{
                     '& .MuiSelect-select': {
                       paddingTop: '10px',
                       paddingBottom: '10px',
                     },
                   }}
                 >
                   <MenuItem value="ACTIVE">Active</MenuItem>
                   <MenuItem value="INACTIVE">Inactive</MenuItem>
                 </Select>
               </FormControl>

               <TextField
                 label="Location"
                 name="location"
                 value={companyDetails.location}
                 onChange={handleCompanyDetailsChange}
                 fullWidth
                 margin="normal"
               />
               <TextField
                 label="Company Description"
                 name="companyDetails"
                 value={companyDetails.companyDetails}
                 onChange={handleCompanyDetailsChange}
                 fullWidth
                 margin="normal"
                 multiline
                 rows={4}
               />
               <Button
                 variant="contained"
                 color="primary"
                 onClick={handleSaveCompanyDetails}
                 sx={{ mt: 2 }}
                 fullWidth
               >
                 Save Changes
               </Button>
             </form>
           </Box>
         )}

         {activeTab === 'createJob' && <CreateJob setActiveTab={setActiveTab} />}
       </Container>
     </Box>
     <Modal
       open={openCoverLetterModal}
       onClose={handleCloseModal}
       aria-labelledby="cover-letter-modal-title"
       aria-describedby="cover-letter-modal-description"
     >
       <Box
         sx={{
           position: "absolute",
           top: "50%",
           left: "50%",
           transform: "translate(-50%, -50%)",
           width: "90%",
           maxWidth: "600px",
           bgcolor: "white",
           boxShadow: 24,
           p: 4,
           borderRadius: 2,
         }}
       >
         <Typography
           id="cover-letter-modal-title"
           variant="h6"
           sx={{ mb: 2 }}
         >
           Cover Letter
         </Typography>
         <Typography
           id="cover-letter-modal-description"
           variant="body1"
           sx={{
             maxHeight: "400px",
             overflowY: "auto",
             whiteSpace: "pre-wrap", // Preserves line breaks
             lineHeight: 1.6,
           }}
         >
           {selectedCoverLetter || "No Cover Letter Provided."}
         </Typography>
         <Box textAlign="center" mt={3}>
           <Button
             variant="contained"
             color="primary"
             onClick={handleCloseModal}
           >
             Close
           </Button>
         </Box>
       </Box>
     </Modal>
     <Modal
       open={confirmationOpen}
       onClose={() => setConfirmationOpen(false)}
       aria-labelledby="status-confirmation-title"
       aria-describedby="status-confirmation-description"
     >
       <Box
         sx={{
           position: "absolute",
           top: "50%",
           left: "50%",
           transform: "translate(-50%, -50%)",
           width: "90%",
           maxWidth: "400px",
           bgcolor: "white",
           boxShadow: 24,
           p: 4,
           borderRadius: 2,
         }}
       >
         <Typography id="status-confirmation-title" variant="h6" sx={{ mb: 2 }}>
           Confirm Status Change
         </Typography>
         <Typography id="status-confirmation-description" variant="body1">
           Are you sure you want to change the status to <b>{pendingStatus}</b>?
         </Typography>
         <Box textAlign="center" mt={3}>
           <Button variant="contained" color="primary" onClick={finalizeStatusChange} sx={{ mr: 2 }}>
             Confirm
           </Button>
           <Button
             variant="outlined"
             color="secondary"
             onClick={() => setConfirmationOpen(false)}
           >
             Cancel
           </Button>
         </Box>
       </Box>
     </Modal>

     {openEditModal && (
       <Modal
         open={openEditModal}
         onClose={() => setOpenEditModal(false)}
         aria-labelledby="edit-job-modal-title"
         aria-describedby="edit-job-modal-description"
       >
         <Box
           sx={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             width: 400,
             bgcolor: 'background.paper',
             borderRadius: 1,
             boxShadow: 24,
             p: 4,
           }}
         >
           <Typography id="edit-job-modal-title" variant="h6" component="h2">
             Edit Job Posting
           </Typography>
           <TextField
             margin="normal"
             fullWidth
             label="Job Title"
             name="jobTitle"
             value={editingJob?.jobTitle || ''}
             onChange={handleEditChange}
           />
           <TextField
             margin="normal"
             fullWidth
             label="Job Description"
             name="jobDescription"
             value={editingJob?.jobDescription || ''}
             onChange={handleEditChange}
           />
           <TextField
             margin="normal"
             fullWidth
             label="Base Salary"
             name="baseSalary"
             value={editingJob?.baseSalary || ''}
             onChange={handleEditChange}
           />
           <TextField
             margin="normal"
             fullWidth
             label="Location"
             name="location"
             value={editingJob?.location || ''}
             onChange={handleEditChange}
           />
           <FormControl fullWidth margin="normal">
             <InputLabel>Employment Type</InputLabel>
             <Select
               name="employmentType"
               value={editingJob?.employmentType || ''}
               onChange={handleEditChange}
             >
               <MenuItem value="FullTime">Full-Time</MenuItem>
               <MenuItem value="PartTime">Part-Time</MenuItem>
               <MenuItem value="Contract">Contract</MenuItem>
             </Select>
           </FormControl>
           <FormControl fullWidth margin="normal">
             <InputLabel>Status</InputLabel>
             <Select
               name="status"
               value={editingJob?.status || ''}
               onChange={handleEditChange}
             >
               <MenuItem value="ACTIVE">Active</MenuItem>
               <MenuItem value="INACTIVE">Inactive</MenuItem>
             </Select>
           </FormControl>
           <Button variant="contained" color="primary" fullWidth onClick={handleEditSave} sx={{ mt: 2 }}>
             Update
           </Button>
         </Box>
       </Modal>

     )}
   </Box>
 );
};

export default JobProviderDashboard;
