// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText"; // Ensure this is included
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import TextField from "@mui/material/TextField";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonIcon from "@mui/icons-material/Person";
// import LogoutIcon from "@mui/icons-material/Logout";
// import BusinessIcon from '@mui/icons-material/Business';
// import BuildCircleIcon from '@mui/icons-material/BuildCircle';
// import WorkIcon from '@mui/icons-material/Work';
// import "./AdminDashboard.css";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const drawerWidth = 240;

// const AdminDashboard = () => {
//  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
//  const [username, setUsername] = useState("");
//  const [statistics, setStatistics] = useState({
//    totalServiceProviders: 0,
//    pendingApprovals: 0,
//    jobListings: 0,
//    rejectedApplications: 0,
//  });
//  const [passwordDetails, setPasswordDetails] = useState({
//    currentPassword: "",
//    newPassword: "",
//    confirmPassword: "",
//  });
//  const [serviceProviders, setServiceProviders] = useState([]);
//  const [AprovedserviceProviders, setAprovedserviceProviders] = useState([]);
//  const [companyregister, setcompanyregister] = useState([]);
//  const [approvedcompanies, setapprovedcompanies] = useState([]);
//  const [selectedItem, setSelectedItem] = useState(null);
//  const navigate = useNavigate();

//  useEffect(() => {
//    const token = localStorage.getItem("authToken");

//    if (!token) {
//      navigate("/login");
//      return;
//    }

//    try {
//      const decoded = jwtDecode(token);
//      if (decoded.UserType !== "ADMIN") {
//        navigate("/not-authorized");
//        return;
//      }

//      setUsername(decoded.sub || "Admin");
//      console.log(decoded);
//    } catch (error) {
//      console.error("Failed to decode token:", error);
//      navigate("/login");
//      return;
//    }

//    // Uncomment to fetch real data
//    fetchStatistics();
//    if (selectedMenu === "Service Providers") {
//      fetchServiceProviders();
//    }
//    if (selectedMenu === "Approved Service Providers") {
//      fetchAcceptedServiceProviders();
//    }
//    if (selectedMenu === "Approved company regester req") {
//      fetchPendingCompanyRegReq();
//    }
//    if (selectedMenu === "Approved companies") {
//      fetchAcceptecomapnyProviders();
//    }
//  }, [navigate, selectedMenu]);

//  const handlePasswordChange = (e) => {
//    const { name, value } = e.target;
//    setPasswordDetails((prevDetails) => ({
//      ...prevDetails,
//      [name]: value,
//    }));
//  };

//  const handleSavePassword = async () => {
//    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
//      toast.error("New Password and Confirm Password do not match.");
//      return;
//    }

//    const token = localStorage.getItem("authToken");
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };

//    const requestBody = {
//      oldPassword: passwordDetails.currentPassword,
//      newPassword: passwordDetails.newPassword,
//    };

//    try {
//      const response = await axios.patch("/user/all/updatePassword", requestBody, config);
//      toast.sucess(response.data || "Password updated successfully.");
//      setPasswordDetails({
//        currentPassword: "",
//        newPassword: "",
//        confirmPassword: "",
//      });
//    } catch (error) {
//      console.error("Failed to update password:", error);
//      toast.error(error.response?.data?.message || "Failed to update password.");
//    }
//  };

//  const DetailViewservice = ({ item, onBack }) => {
//    console.log("DetailViewService item:", item);
//    return (
//      <div>
//        <h2>{item.name || item.companyName}</h2>

//        <p>
//          <strong>Service:</strong> {item.serviceName || item.location}
//        </p>

//        <p>
//          <strong>Experience:</strong> {item.experience}
//        </p>

//        <p>
//          <strong>Charge:</strong> {item.charge}
//        </p>

//        <p>
//          <strong>View License:</strong>{" "}
//          <a
//            href={item.preSignedUrlLicense
//            }
//            target="_blank"
//            rel="noopener noreferrer"
//            style={{ textDecoration: "underline", cursor: "pointer" }}
//          >
//            View the License
//          </a>
//        </p>

//        <Button
//          className="back-button"
//          variant="outlined"
//          startIcon={<ArrowBackIcon />}
//          onClick={onBack}
//        >
//          Back to List
//        </Button>
//      </div>

//    );
//  };

//  const DetailViewcompany = ({ item, onBack }) => {
//    // Log the entire item object
//    console.log("DetailViewcompany item:", item);

//    return (
//      <div>
//        <h2>{item.companyName}</h2>

//        <p>
//          <strong>Location:</strong> {item.location}
//        </p>
//        <p>
//          <strong>companyDetails</strong>    {item.companyDetails
//          }

//        </p>
//        <p>
//          <strong>Status:</strong>{" "}
//          <span
//            className={
//              item.status === "Accepted"
//                ? "status-approved"
//                : item.status === "rejected"
//                  ? "status-rejected"
//                  : "status-pending"
//            }
//          >
//            {item.status}
//          </span>
//        </p>



//        <p>
//          <strong>View License:</strong>{" "}
//          {item.license ? (
//            <>
//              {/* Log the preSignedUrlLicense */}
//              {console.log("preSignedUrlLicense:", item.preSignedUrlLicense)}
//              <a
//                href={item.license}
//                target="_blank"
//                rel="noopener noreferrer"
//                style={{ textDecoration: "underline", cursor: "pointer" }}
//              >
//                View the License
//              </a>
//            </>
//          ) : (
//            <span>No License Available</span>
//          )}
//        </p>

//        <Button
//          className="back-button"
//          variant="outlined"
//          startIcon={<ArrowBackIcon />}
//          onClick={onBack}
//        >
//          Back to List
//        </Button>
//      </div>
//    );
//  };

//  // Fetch statistics data from the backend (dummy data for now)
//  const fetchStatistics = () => {
//    const token = localStorage.getItem("authToken");
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };

//    axios
//      .get("/admin/getAllAcceptedCompaniesCount", config)
//      .then((response) =>
//        setStatistics((prev) => ({
//          ...prev,
//          totalServiceProviders: response.data,
//        }))
//      )
//      .catch((error) =>
//        console.error("Error fetching total service providers:", error)
//      );

//    axios
//      .get("/admin/getAllAcceptedServicesCount", config)
//      .then((response) =>
//        setStatistics((prev) => ({
//          ...prev,
//          pendingApprovals: response.data,
//        }))
//      )
//      .catch((error) =>
//        console.error("Error fetching pending approvals:", error)
//      );

//    axios
//      .get("/admin/getAllJobPostings", config)
//      .then((response) =>
//        setStatistics((prev) => ({ ...prev, jobListings: response.data }))
//      )
//      .catch((error) => console.error("Error fetching job listings:", error));

//    axios
//      .get("/admin/rejectedApplications", config)
//      .then((response) =>
//        setStatistics((prev) => ({
//          ...prev,
//          rejectedApplications: response.data.count,
//        }))
//      )
//      .catch((error) =>
//        console.error("Error fetching rejected applications:", error)
//      );
//  };

//  // Fetch service providers data
//  const fetchServiceProviders = () => {
//    const token = localStorage.getItem("authToken");
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };

//    axios
//      .get("/admin/getAllPendingServiceProvided", config)
//      .then((response) => {
//        console.log("API Response:", response.data);
//        setServiceProviders(response.data);
//      })
//      .catch((error) =>
//        console.error("Error fetching service providers:", error)
//      );
//  };

//  // Fetch Accepted service providers data
//  const fetchAcceptedServiceProviders = () => {
//    const token = localStorage.getItem("authToken");
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };

//    axios
//      .get("/admin/getAllAcceptedServiceProviders", config)
//      .then((response) => {
//        console.log("API Response:", response.data);
//        setAprovedserviceProviders(response.data);
//      })
//      .catch((error) =>
//        console.error("Error fetching Aceepted service providers:", error)
//      );
//  };
//  // Fetch Accepted companies providers data
//  const fetchAcceptecomapnyProviders = () => {
//    const token = localStorage.getItem("authToken");
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };

//    axios
//      .get("/admin/getAllAcceptedCompanyPermission", config)
//      .then((response) => {
//        console.log("API Response:", response.data);
//        setapprovedcompanies(response.data);
//      })
//      .catch((error) =>
//        console.error("Error fetching Aceepted service providers:", error)
//      );
//  };

//  // Fetch pending comapnies requests
//  const fetchPendingCompanyRegReq = () => {
//    const token = localStorage.getItem("authToken");
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };

//    axios
//      .get("/admin/getAllPendingCompanyPermission", config)
//      .then((response) => {
//        console.log("API Response:", response.data);
//        setcompanyregister(response.data);
//      })
//      .catch((error) =>
//        console.error("Error fetching Aceepted service providers:", error)
//      );
//  };

//  // Handle approval or rejection of service providers
//  const handleApprovalservice = (serviceId, decision) => {
//    const token = localStorage.getItem("authToken");
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };

//    axios
//      .patch(`/admin/updatePermission/${serviceId}/${decision}`, {}, config)
//      .then(() => {
//        // Remove the approved/rejected request from the frontend
//        setServiceProviders((prev) =>
//          prev.filter((provider) => provider.serviceId !== serviceId)
//        );
//        console.log(`Service provider ${serviceId} ${decision} successfully.`);
//      })
//      .catch((error) => {
//        console.error(
//          `Error updating permission for service provider ${serviceId}:`,
//          error
//        );
//      });
//  };

//  // Handle approval or rejection of company providers
//  const handleApprovalcompany = (serviceId, decision) => {
//    const token = localStorage.getItem("authToken");
//    const config = {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };

//    axios
//      .patch(
//        `/admin/updateCompanyPermission/${serviceId}/${decision}`,
//        {},
//        config
//      )
//      .then(() => {
//        // Remove the approved/rejected request from the frontend
//        setcompanyregister((prev) =>
//          prev.filter((provider) => provider.registrationId !== serviceId)
//        );
//        console.log(`Service provider ${serviceId} ${decision} successfully.`);
//      })
//      .catch((error) => {
//        console.error(
//          `Error updating permission for service provider ${serviceId}:`,
//          error
//        );
//      });
//  };

//  const handleMenuClick = (menu) => setSelectedMenu(menu);

//  const handleLogout = () => {
//    localStorage.removeItem("authToken");
//    navigate("/login");
//  };

//  return (
//    <Box sx={{ display: "flex" }}>
//      <AppBar
//        position="fixed"
//        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//      >
//        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//          <Typography variant="h6" noWrap component="div">
//            City Compass Admin
//          </Typography>

//          <Box sx={{ display: "flex", alignItems: "center" }}>
//            <Avatar
//              alt={username}
//              src="/default-profile.png"
//              sx={{ width: 32, height: 32, marginRight: 1 }}
//            />
//            <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
//              {username}
//            </Typography>
//            <Button
//              color="inherit"
//              startIcon={<LogoutIcon />}
//              onClick={handleLogout}
//            >
//              Logout
//            </Button>
//          </Box>
//        </Toolbar>
//      </AppBar>

//      <Drawer
//        variant="permanent"
//        sx={{
//          width: drawerWidth,
//          flexShrink: 0,
//          [`& .MuiDrawer-paper`]: {
//            width: drawerWidth,
//            boxSizing: "border-box",
//            backgroundColor: "#1E1E2F",
//            color: "#FFF",
//          },
//        }}
//      >
//        <Toolbar />
//        <List>
//          <ListItem disablePadding>
//            <ListItemButton onClick={() => handleMenuClick("Dashboard")}>
//              <ListItemIcon>
//                <DashboardIcon style={{ color: "#FFF" }} />
//              </ListItemIcon>
//              <ListItemText primary="Dashboard" />
//            </ListItemButton>
//          </ListItem>
//          <ListItem disablePadding>
//            <ListItemButton
//              onClick={() => handleMenuClick("Service Providers")}
//            >
//              <ListItemIcon>
//                <PersonIcon style={{ color: "#FFF" }} />
//              </ListItemIcon>
//              <ListItemText primary="Service Provider requests" />
//            </ListItemButton>
//          </ListItem>
//          <ListItem disablePadding>
//            <ListItemButton
//              onClick={() => handleMenuClick("Approved Service Providers")}
//            >
//              <ListItemIcon>
//                <PersonIcon style={{ color: "#FFF" }} />
//              </ListItemIcon>
//              <ListItemText primary="Approved Service Providers" />
//            </ListItemButton>
//          </ListItem>
//          <ListItem disablePadding>
//            <ListItemButton
//              onClick={() => handleMenuClick("Approved company regester req")}
//            >
//              <ListItemIcon>
//                <PersonIcon style={{ color: "#FFF" }} />
//              </ListItemIcon>
//              <ListItemText primary="Approved company regester req" />
//            </ListItemButton>
//          </ListItem>
//          <ListItem disablePadding>
//            <ListItemButton
//              onClick={() => handleMenuClick("Approved companies")}
//            >
//              <ListItemIcon>
//                <PersonIcon style={{ color: "#FFF" }} />
//              </ListItemIcon>
//              <ListItemText primary="Approved companies" />
//            </ListItemButton>
//          </ListItem>

//          <ListItem disablePadding>
//            <ListItemButton onClick={() => setSelectedMenu("Update Password")}>
//              <ListItemIcon>
//                <PersonIcon style={{ color: "#FFF" }} />
//              </ListItemIcon>
//              <ListItemText primary="Update Password" />
//            </ListItemButton>
//          </ListItem>
//        </List>
//      </Drawer>

//      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//        <Toolbar />
//        {selectedMenu === "Dashboard" && (
//          // <Box sx={{ display: "flex", gap: 3, marginTop: 3 }}>
//          //   <Card
//          //     sx={{
//          //       backgroundColor: "#4caf50", // Green background color
//          //       color: "#fff", // White text color
//          //       display: "flex",
//          //       alignItems: "center",
//          //       padding: 2,
//          //       borderRadius: 2,
//          //       boxShadow: 3,
//          //     }}
//          //   >
//          //     <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
//          //       <BusinessIcon sx={{ fontSize: 40 }} />
//          //     </Box>
//          //     <CardContent>
//          //       <Typography variant="h6">Total companies Registered</Typography>
//          //       <Typography variant="h4">
//          //         {statistics.totalServiceProviders}
//          //       </Typography>
//          //     </CardContent>
//          //   </Card>

//          //   <Card className="stat-card">
//          //     <CardContent>
//          //       <Typography variant="h6">Total Registered Services</Typography>
//          //       <Typography variant="h4">
//          //         {statistics.pendingApprovals}
//          //       </Typography>
//          //     </CardContent>
//          //   </Card>
//          //   <Card className="stat-card">
//          //     <CardContent>
//          //       <Typography variant="h6">Job Listings</Typography>
//          //       <Typography variant="h4">{statistics.jobListings}</Typography>
//          //     </CardContent>
//          //   </Card>

//          // </Box>
//          <Box sx={{ display: "flex", gap: 3, marginTop: 3 }}>
//  {/* Total Companies Registered */}
//  <Card
//    sx={{
//      backgroundColor: "#e8f5e9", // Light green background
//      color: "#2e7d32", // Darker green text
//      display: "flex",
//      alignItems: "center",
//      justifyContent: "space-between",
//      padding: 2,
//      borderRadius: 2,
//      boxShadow: 3,
//      width: "300px", // Fixed width
//      height: "150px", // Fixed height
//    }}
//  >
//    <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
//      <BusinessIcon sx={{ fontSize: 40 }} />
//    </Box>
//    <CardContent>
//      <Typography variant="h6">Total Companies Registered</Typography>
//      <Typography variant="h4">{statistics.totalServiceProviders}</Typography>
//    </CardContent>
//  </Card>

//  {/* Total Registered Services */}
//  <Card
//    sx={{
//      backgroundColor: "#e3f2fd", // Light blue background
//      color: "#1565c0", // Darker blue text
//      display: "flex",
//      alignItems: "center",
//      justifyContent: "space-between",
//      padding: 2,
//      borderRadius: 2,
//      boxShadow: 3,
//      width: "300px", // Fixed width
//      height: "150px", // Fixed height
//    }}
//  >
//    <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
//      <BuildCircleIcon sx={{ fontSize: 40 }} />
//    </Box>
//    <CardContent>
//      <Typography variant="h6">Total Registered Services</Typography>
//      <Typography variant="h4">{statistics.pendingApprovals}</Typography>
//    </CardContent>
//  </Card>

//  {/* Job Listings */}
//  <Card
//    sx={{
//      backgroundColor: "#fff3e0", // Light orange background
//      color: "#ef6c00", // Darker orange text
//      display: "flex",
//      alignItems: "center",
//      justifyContent: "space-between",
//      padding: 2,
//      borderRadius: 2,
//      boxShadow: 3,
//      width: "300px", // Fixed width
//      height: "150px", // Fixed height
//    }}
//  >
//    <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
//      <WorkIcon sx={{ fontSize: 40 }} />
//    </Box>
//    <CardContent>
//      <Typography variant="h6">Job Listings</Typography>
//      <Typography variant="h4">{statistics.jobListings}</Typography>
//    </CardContent>
//  </Card>
// </Box>


//        )}

//        {selectedMenu === "Service Providers" && (
//          <div className="table-container">
//            <Typography variant="h6">
//              Recent Service Provider Applications
//            </Typography>
//            {selectedItem ? (
//              <DetailViewservice
//                item={selectedItem}
//                onBack={() => setSelectedItem(null)}
//              />
//            ) : (
//              <table className="table">
//                <thead>
//                  <tr>
//                    <th>Name</th>
//                    <th>Service</th>
//                    <th>Status</th>
//                    <th>Date</th>
//                    <th>Actions</th>
//                  </tr>
//                </thead>
//                <tbody>
//                  {serviceProviders.map((provider) => (
//                    <tr
//                      key={provider.serviceId}
//                      onClick={() => setSelectedItem(provider)}
//                      style={{ cursor: "pointer" }}
//                    >
//                      <td>{provider.name}</td>
//                      <td>{provider.serviceName}</td>
//                      <td
//                        className={
//                          provider.status === "Accepted"
//                            ? "status-approved"
//                            : provider.status === "rejected"
//                              ? "status-rejected"
//                              : "status-pending"
//                        }
//                      >
//                        {provider.status || "pending"}
//                      </td>
//                      <td>{new Date(provider. createdOn).toLocaleString().substring(0,10)}</td>
//                      <td>
//                        <Button
//                          variant="contained"
//                          color="success"
//                          size="small"
//                          onClick={(e) => {
//                            e.stopPropagation();
//                            handleApprovalservice(
//                              provider.serviceId,
//                              "Accepted"
//                            );
//                          }}
//                        >
//                          Approve
//                        </Button>
//                        <Button
//                          variant="contained"
//                          color="error"
//                          size="small"
//                          onClick={(e) => {
//                            e.stopPropagation();
//                            handleApprovalservice(
//                              provider.serviceId,
//                              "rejected"
//                            );
//                          }}
//                          sx={{ marginLeft: 1 }}
//                        >
//                          Reject
//                        </Button>
//                      </td>
//                    </tr>
//                  ))}
//                </tbody>
//              </table>
//            )}
//          </div>
//        )}

//        {selectedMenu === "Approved Service Providers" && (
//          <div className="table-container">
//            <Typography variant="h6">
//              Recent Service Provider Applications
//            </Typography>
//            <table className="table">
//              <thead>
//                <tr>
//                  <th>Name</th>
//                  <th>Service</th>
//                  <th>Status</th>

//                  <th>Date</th>
//                </tr>
//              </thead>
//              <tbody>
//                {AprovedserviceProviders.map((provider) => (
//                  <tr key={provider.serviceId}>
//                    <td>{provider.name}</td>
//                    <td>{provider.serviceName}</td>
//                    <td style={{ color: "#4caf50", fontWeight: "bold" }}>
//                      {provider.status}
//                    </td>

//                    <td>{new Date(provider.createdOn).toLocaleString().substring(0,10)}</td>
//                  </tr>
//                ))}
//              </tbody>
//            </table>
//          </div>
//        )}

//        {selectedMenu === "Approved company regester req" && (
//          <div className="table-container">
//            <table className="table">
//              <tbody>
//                {selectedMenu === "Approved company regester req" && (
//                  <div className="table-container">
//                    <Typography variant="h6">
//                      Approved Company Register Requests
//                    </Typography>
//                    {selectedItem ? (
//                      <DetailViewcompany
//                        item={selectedItem}
//                        onBack={() => setSelectedItem(null)}
//                      />
//                    ) : (
//                      <table className="table">
//                        <thead>
//                          <tr>
//                            <th>Name</th>
//                            <th>Company</th>
//                            <th>Status</th>
//                            <th>Date</th>
//                            <th>Actions</th>
//                          </tr>
//                        </thead>
//                        <tbody>
//                          {companyregister.map((provider) => (
//                            <tr
//                              key={provider.registrationId}
//                              onClick={() => setSelectedItem(provider)}
//                              style={{ cursor: "pointer" }}
//                            >
//                              <td>{provider.companyName}</td>
//                              <td>{provider.location}</td>
//                              <td
//                                className={
//                                  provider.status === "Accepted"
//                                    ? "status-approved"
//                                    : provider.status === "rejected"
//                                      ? "status-rejected"
//                                      : "status-pending"
//                                }
//                              >
//                                {provider.status || "pending"}
//                              </td>
//                              <td>
//                              <td>{new Date(provider.createdAt).toLocaleDateString()}</td>
//                              </td>
//                              <td>
//                                <Button
//                                  variant="contained"
//                                  color="success"
//                                  size="small"
//                                  onClick={(e) => {
//                                    e.stopPropagation();
//                                    handleApprovalcompany(
//                                      provider.registrationId,
//                                      "Accepted"
//                                    );
//                                  }}
//                                >
//                                  Approve
//                                </Button>
//                                <Button
//                                  variant="contained"
//                                  color="error"
//                                  size="small"
//                                  onClick={(e) => {
//                                    e.stopPropagation();
//                                    handleApprovalcompany(
//                                      provider.registrationId,
//                                      "rejected"
//                                    );
//                                  }}
//                                  sx={{ marginLeft: 1 }}
//                                >
//                                  Reject
//                                </Button>
//                              </td>
//                            </tr>
//                          ))}
//                        </tbody>
//                      </table>
//                    )}
//                  </div>
//                )}
//              </tbody>
//            </table>
//          </div>
//        )}

// {selectedMenu === "Update Password" && (
//          <Box sx={{ maxWidth: "400px", mx: "auto", mt: 3 }}>
//            <Typography variant="h5" gutterBottom>
//              Update Password
//            </Typography>
//            <TextField
//              label="Current Password"
//              name="currentPassword"
//              value={passwordDetails.currentPassword}
//              onChange={handlePasswordChange}
//              type="password"
//              fullWidth
//              margin="normal"
//            />
//            <TextField
//              label="New Password"
//              name="newPassword"
//              value={passwordDetails.newPassword}
//              onChange={handlePasswordChange}
//              type="password"
//              fullWidth
//              margin="normal"
//            />
//            <TextField
//              label="Confirm New Password"
//              name="confirmPassword"
//              value={passwordDetails.confirmPassword}
//              onChange={handlePasswordChange}
//              type="password"
//              fullWidth
//              margin="normal"
//            />
//            <Button
//              variant="contained"
//              color="primary"
//              fullWidth
//              onClick={handleSavePassword}
//              sx={{ mt: 2 }}
//            >
//              Save Changes
//            </Button>
//          </Box>
//        )}
//        {selectedMenu === "Approved companies" && (
//          <div className="table-container">
//            <Typography variant="h6">Approved companys</Typography>
//            <table className="table">
//              <thead>
//                <tr>
//                  <th>Name</th>
//                  <th>Company</th>
//                  <th>Status</th>
//                  <th>Date</th>
//                </tr>
//              </thead>
//              <tbody>
//                {approvedcompanies.map((provider) => (
//                  <tr key={provider.companyId}>
//                    <td>{provider.companyName}</td>
//                    <td>{provider.location}</td>
//                    <td style={{ color: "#4caf50", fontWeight: "bold" }}>
//                      {provider.status}
//                    </td>
//                    <td>{new Date(provider.createdAt).toLocaleDateString()}</td>
//                    <td></td>
//                  </tr>
//                ))}
//              </tbody>
//            </table>
//          </div>
//        )}
//      </Box>
//    </Box>
//  );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText"; // Ensure this is included
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessIcon from '@mui/icons-material/Business';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import WorkIcon from '@mui/icons-material/Work';
import "./AdminDashboard.css";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const drawerWidth = 240;

const AdminDashboard = () => {
 const [selectedMenu, setSelectedMenu] = useState("Dashboard");
 const [username, setUsername] = useState("");
 const [statistics, setStatistics] = useState({
   totalServiceProviders: 0,
   pendingApprovals: 0,
   jobListings: 0,
   rejectedApplications: 0,
 });
 const [passwordDetails, setPasswordDetails] = useState({
   currentPassword: "",
   newPassword: "",
   confirmPassword: "",
 });
 const [serviceProviders, setServiceProviders] = useState([]);
 const [AprovedserviceProviders, setAprovedserviceProviders] = useState([]);
 const [companyregister, setcompanyregister] = useState([]);
 const [approvedcompanies, setapprovedcompanies] = useState([]);
 const [selectedItem, setSelectedItem] = useState(null);
 const navigate = useNavigate();

 useEffect(() => {
   const token = localStorage.getItem("authToken");

   if (!token) {
     navigate("/login");
     return;
   }

   try {
     const decoded = jwtDecode(token);
     if (decoded.UserType !== "ADMIN") {
       navigate("/not-authorized");
       return;
     }

     setUsername(decoded.sub || "Admin");
     console.log(decoded);
   } catch (error) {
     console.error("Failed to decode token:", error);
     navigate("/login");
     return;
   }

   // Uncomment to fetch real data
   fetchStatistics();
   if (selectedMenu === "Service Providers") {
     fetchServiceProviders();
   }
   if (selectedMenu === "Approved Service Providers") {
     fetchAcceptedServiceProviders();
   }
   if (selectedMenu === "Approved company regester req") {
     fetchPendingCompanyRegReq();
   }
   if (selectedMenu === "Approved companies") {
     fetchAcceptecomapnyProviders();
   }
 }, [navigate, selectedMenu]);

 const handlePasswordChange = (e) => {
   const { name, value } = e.target;
   setPasswordDetails((prevDetails) => ({
     ...prevDetails,
     [name]: value,
   }));
 };

 const handleSavePassword = async () => {
   if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
     alert("New Password and Confirm Password do not match.");
     return;
   }

   const token = localStorage.getItem("authToken");
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };

   const requestBody = {
     oldPassword: passwordDetails.currentPassword,
     newPassword: passwordDetails.newPassword,
   };

   try {
     const response = await axios.patch("/user/all/updatePassword", requestBody, config);
     alert(response.data || "Password updated successfully.");
     setPasswordDetails({
       currentPassword: "",
       newPassword: "",
       confirmPassword: "",
     });
   } catch (error) {
     console.error("Failed to update password:", error);
     alert(error.response?.data?.message || "Failed to update password.");
   }
 };

 const DetailViewservice = ({ item, onBack }) => {
   console.log("DetailViewService item:", item);
   return (
     <div>
       <h2>{item.name || item.companyName}</h2>

       <p>
         <strong>Service:</strong> {item.serviceName || item.location}
       </p>

       <p>
         <strong>Experience:</strong> {item.experience}
       </p>

       <p>
         <strong>Charge:</strong> {item.charge}
       </p>

       <p>
         <strong>View License:</strong>{" "}
         <a
           href={item.preSignedUrlLicense
           }
           target="_blank"
           rel="noopener noreferrer"
           style={{ textDecoration: "underline", cursor: "pointer" }}
         >
           View the License
         </a>
       </p>

       <Button
         className="back-button"
         variant="outlined"
         startIcon={<ArrowBackIcon />}
         onClick={onBack}
       >
         Back to List
       </Button>
     </div>

   );
 };

 const DetailViewcompany = ({ item, onBack }) => {
   // Log the entire item object
   console.log("DetailViewcompany item:", item);

   return (
     <div>
       <h2>{item.companyName}</h2>

       <p>
         <strong>Location:</strong> {item.location}
       </p>
       <p>
         <strong>companyDetails</strong>    {item.companyDetails
         }

       </p>
       <p>
         <strong>Status:</strong>{" "}
         <span
           className={
             item.status === "Accepted"
               ? "status-approved"
               : item.status === "rejected"
                 ? "status-rejected"
                 : "status-pending"
           }
         >
           {item.status}
         </span>
       </p>



       <p>
         <strong>View License:</strong>{" "}
         {item.license ? (
           <>
             {/* Log the preSignedUrlLicense */}
             {console.log("preSignedUrlLicense:", item.preSignedUrlLicense)}
             <a
               href={item.license}
               target="_blank"
               rel="noopener noreferrer"
               style={{ textDecoration: "underline", cursor: "pointer" }}
             >
               View the License
             </a>
           </>
         ) : (
           <span>No License Available</span>
         )}
       </p>

       <Button
         className="back-button"
         variant="outlined"
         startIcon={<ArrowBackIcon />}
         onClick={onBack}
       >
         Back to List
       </Button>
     </div>
   );
 };

 // Fetch statistics data from the backend (dummy data for now)
 const fetchStatistics = () => {
   const token = localStorage.getItem("authToken");
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };

   axios
     .get("/admin/getAllAcceptedCompaniesCount", config)
     .then((response) =>
       setStatistics((prev) => ({
         ...prev,
         totalServiceProviders: response.data,
       }))
     )
     .catch((error) =>
       console.error("Error fetching total service providers:", error)
     );

   axios
     .get("/admin/getAllAcceptedServicesCount", config)
     .then((response) =>
       setStatistics((prev) => ({
         ...prev,
         pendingApprovals: response.data,
       }))
     )
     .catch((error) =>
       console.error("Error fetching pending approvals:", error)
     );

   axios
     .get("/admin/getAllJobPostings", config)
     .then((response) =>
       setStatistics((prev) => ({ ...prev, jobListings: response.data }))
     )
     .catch((error) => console.error("Error fetching job listings:", error));

   axios
     .get("/admin/rejectedApplications", config)
     .then((response) =>
       setStatistics((prev) => ({
         ...prev,
         rejectedApplications: response.data.count,
       }))
     )
     .catch((error) =>
       console.error("Error fetching rejected applications:", error)
     );
 };

 // Fetch service providers data
 const fetchServiceProviders = () => {
   const token = localStorage.getItem("authToken");
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };

   axios
     .get("/admin/getAllPendingServiceProvided", config)
     .then((response) => {
       console.log("API Response:", response.data);
       setServiceProviders(response.data);
     })
     .catch((error) =>
       console.error("Error fetching service providers:", error)
     );
 };

 // Fetch Accepted service providers data
 const fetchAcceptedServiceProviders = () => {
   const token = localStorage.getItem("authToken");
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };

   axios
     .get("/admin/getAllAcceptedServiceProviders", config)
     .then((response) => {
       console.log("API Response:", response.data);
       setAprovedserviceProviders(response.data);
     })
     .catch((error) =>
       console.error("Error fetching Aceepted service providers:", error)
     );
 };
 // Fetch Accepted companies providers data
 const fetchAcceptecomapnyProviders = () => {
   const token = localStorage.getItem("authToken");
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };

   axios
     .get("/admin/getAllAcceptedCompanyPermission", config)
     .then((response) => {
       console.log("API Response:", response.data);
       setapprovedcompanies(response.data);
     })
     .catch((error) =>
       console.error("Error fetching Aceepted service providers:", error)
     );
 };

 // Fetch pending comapnies requests
 const fetchPendingCompanyRegReq = () => {
   const token = localStorage.getItem("authToken");
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };

   axios
     .get("/admin/getAllPendingCompanyPermission", config)
     .then((response) => {
       console.log("API Response:", response.data);
       setcompanyregister(response.data);
     })
     .catch((error) =>
       console.error("Error fetching Aceepted service providers:", error)
     );
 };

 // Handle approval or rejection of service providers
 const handleApprovalservice = (serviceId, decision) => {
   const token = localStorage.getItem("authToken");
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };

   axios
     .patch(`/admin/updatePermission/${serviceId}/${decision}`, {}, config)
     .then(() => {
       // Remove the approved/rejected request from the frontend
       setServiceProviders((prev) =>
         prev.filter((provider) => provider.serviceId !== serviceId)
       );
       console.log(`Service provider ${serviceId} ${decision} successfully.`);
     })
     .catch((error) => {
       console.error(
         `Error updating permission for service provider ${serviceId}:`,
         error
       );
     });
 };

 // Handle approval or rejection of company providers
 const handleApprovalcompany = (serviceId, decision) => {
   const token = localStorage.getItem("authToken");
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };

   axios
     .patch(
       `/admin/updateCompanyPermission/${serviceId}/${decision}`,
       {},
       config
     )
     .then(() => {
       // Remove the approved/rejected request from the frontend
       setcompanyregister((prev) =>
         prev.filter((provider) => provider.registrationId !== serviceId)
       );
       console.log(`Service provider ${serviceId} ${decision} successfully.`);
     })
     .catch((error) => {
       console.error(
         `Error updating permission for service provider ${serviceId}:`,
         error
       );
     });
 };

 const handleMenuClick = (menu) => setSelectedMenu(menu);

 const handleLogout = () => {
   localStorage.removeItem("authToken");
   navigate("/");
 };

 return (
   <Box sx={{ display: "flex" }}>
     <AppBar
       position="fixed"
       sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
     >
       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
         <Typography variant="h6" noWrap component="div">
           City Compass Admin
         </Typography>

        
       </Toolbar>
     </AppBar>

     <Drawer
       variant="permanent"
       sx={{
         width: drawerWidth,
         flexShrink: 0,
         [`& .MuiDrawer-paper`]: {
           width: drawerWidth,
           boxSizing: "border-box",
           backgroundColor: "#1E1E2F",
           color: "#FFF",
         },
       }}
     >
       <Toolbar />
       <List>
         <ListItem disablePadding>
           <ListItemButton onClick={() => handleMenuClick("Dashboard")}>
             <ListItemIcon>
               <DashboardIcon style={{ color: "#FFF" }} />
             </ListItemIcon>
             <ListItemText primary="Dashboard" />
           </ListItemButton>
         </ListItem>
         <ListItem disablePadding>
           <ListItemButton
             onClick={() => handleMenuClick("Service Providers")}
           >
             <ListItemIcon>
               <PersonIcon style={{ color: "#FFF" }} />
             </ListItemIcon>
             <ListItemText primary="Pending Service Approvals" />
           </ListItemButton>
         </ListItem>
         <ListItem disablePadding>
           <ListItemButton
             onClick={() => handleMenuClick("Approved Service Providers")}
           >
             <ListItemIcon>
               <PersonIcon style={{ color: "#FFF" }} />
             </ListItemIcon>
             <ListItemText primary="Approved Services" />
           </ListItemButton>
         </ListItem>
         <ListItem disablePadding>
           <ListItemButton
             onClick={() => handleMenuClick("Approved company regester req")}
           >
             <ListItemIcon>
               <PersonIcon style={{ color: "#FFF" }} />
             </ListItemIcon>
             <ListItemText primary="Pending Companies Approvals" />
           </ListItemButton>
         </ListItem>
         <ListItem disablePadding>
           <ListItemButton
             onClick={() => handleMenuClick("Approved companies")}
           >
             <ListItemIcon>
               <PersonIcon style={{ color: "#FFF" }} />
             </ListItemIcon>
             <ListItemText primary="Approved companies" />
           </ListItemButton>
         </ListItem>

         <ListItem disablePadding>
           <ListItemButton onClick={() => setSelectedMenu("Update Password")}>
             <ListItemIcon>
               <PersonIcon style={{ color: "#FFF" }} />
             </ListItemIcon>
             <ListItemText primary="Update Password" />
           </ListItemButton>
         </ListItem>
         <ListItem disablePadding>
           <ListItemButton onClick={handleLogout}>
             <ListItemIcon>
             <LogoutIcon style={{ color: "white" }}/>
             </ListItemIcon>
             <ListItemText primary="Logout" />
           </ListItemButton>
         </ListItem>

       </List>
     </Drawer>

     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <Toolbar />
       {selectedMenu === "Dashboard" && (
         // <Box sx={{ display: "flex", gap: 3, marginTop: 3 }}>
         //   <Card
         //     sx={{
         //       backgroundColor: "#4caf50", // Green background color
         //       color: "#fff", // White text color
         //       display: "flex",
         //       alignItems: "center",
         //       padding: 2,
         //       borderRadius: 2,
         //       boxShadow: 3,
         //     }}
         //   >
         //     <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
         //       <BusinessIcon sx={{ fontSize: 40 }} />
         //     </Box>
         //     <CardContent>
         //       <Typography variant="h6">Total companies Registered</Typography>
         //       <Typography variant="h4">
         //         {statistics.totalServiceProviders}
         //       </Typography>
         //     </CardContent>
         //   </Card>

         //   <Card className="stat-card">
         //     <CardContent>
         //       <Typography variant="h6">Total Registered Services</Typography>
         //       <Typography variant="h4">
         //         {statistics.pendingApprovals}
         //       </Typography>
         //     </CardContent>
         //   </Card>
         //   <Card className="stat-card">
         //     <CardContent>
         //       <Typography variant="h6">Job Listings</Typography>
         //       <Typography variant="h4">{statistics.jobListings}</Typography>
         //     </CardContent>
         //   </Card>

         // </Box>


         
         <Box sx={{ display: "flex", gap: 3, marginTop: 3 }}>
 {/* Total Companies Registered */}


 {/* {username}
            
         
           
   
 <Card
   sx={{
     backgroundColor: "#e8f5e9", // Light green background
     color: "#2e7d32", // Darker green text
     display: "flex",
     alignItems: "center",
     justifyContent: "space-between",
     padding: 2,
     borderRadius: 2,
     boxShadow: 3,
     width: "300px", // Fixed width
     height: "150px", // Fixed height
   }}
 >
   <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
     <BusinessIcon sx={{ fontSize: 40 }} />
   </Box>
   <CardContent>
     <Typography variant="h6">Total Companies Registered</Typography>
     <Typography variant="h4">{statistics.totalServiceProviders}</Typography>
   </CardContent>
 </Card> */}
 <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Align everything to the left
    padding: "20px",
    gap: "20px", // Space between the name and the cards
  }}
>
  {/* Display the Username */}
  <Typography
    variant="h5"
    sx={{
      fontWeight: "bold",
      color: "#2e7d32", // Green text
    }}
  >
    Welcome, {username}!
  </Typography>

  {/* Container for Cards */}
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start", // Align cards to the left
      gap: "20px", // Space between each card
      flexWrap: "wrap", // Wrap cards if the screen is too small
    }}
  >
    {/* Total Companies Registered */}
    <Card
      sx={{
        backgroundColor: "#e8f5e9", // Light green background
        color: "#2e7d32", // Darker green text
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        width: "300px", // Fixed width
        height: "150px", // Fixed height
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
        <BusinessIcon sx={{ fontSize: 40 }} />
      </Box>
      <CardContent>
        <Typography variant="h6">Companies Registered</Typography>
        <Typography variant="h4">{statistics.totalServiceProviders}</Typography>
      </CardContent>
    </Card>

    {/* Total Registered Services */}
    <Card
      sx={{
        backgroundColor: "#e3f2fd", // Light blue background
        color: "#1565c0", // Darker blue text
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        width: "300px", // Fixed width
        height: "150px", // Fixed height
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
        <BuildCircleIcon sx={{ fontSize: 40 }} />
      </Box>
      <CardContent>
        <Typography variant="h6">Services Registered </Typography>
        <Typography variant="h4">{statistics.pendingApprovals}</Typography>
      </CardContent>
    </Card>

    {/* Job Listings */}
    <Card
      sx={{
        backgroundColor: "#fff3e0", // Light orange background
        color: "#ef6c00", // Darker orange text
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        width: "300px", // Fixed width
        height: "150px", // Fixed height
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
        <WorkIcon sx={{ fontSize: 40 }} />
      </Box>
      <CardContent>
        <Typography variant="h6">Job Listings</Typography>
        <Typography variant="h4">{statistics.jobListings}</Typography>
      </CardContent>
    </Card>
  </div>
</div>





</Box>


       )}

       {selectedMenu === "Service Providers" && (
         <div className="table-container">
           <Typography variant="h6">
             Recent Service Provider Applications
           </Typography>
           {selectedItem ? (
             <DetailViewservice
               item={selectedItem}
               onBack={() => setSelectedItem(null)}
             />
           ) : (
             <table className="table">
               <thead>
                 <tr>
                   <th>Name</th>
                   <th>Service</th>
                   <th>Status</th>
                   <th>Date</th>
                   <th>Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {serviceProviders.map((provider) => (
                   <tr
                     key={provider.serviceId}
                     onClick={() => setSelectedItem(provider)}
                     style={{ cursor: "pointer" }}
                   >
                     <td>{provider.name}</td>
                     <td>{provider.serviceName}</td>
                     <td
                       className={
                         provider.status === "Accepted"
                           ? "status-approved"
                           : provider.status === "rejected"
                             ? "status-rejected"
                             : "status-pending"
                       }
                     >
                       {provider.status || "pending"}
                     </td>
                     <td>{new Date(provider. createdOn).toLocaleString().substring(0,10)}</td>
                     <td>
                       <Button
                         variant="contained"
                         color="success"
                         size="small"
                         onClick={(e) => {
                           e.stopPropagation();
                           handleApprovalservice(
                             provider.serviceId,
                             "Accepted"
                           );
                         }}
                       >
                         Approve
                       </Button>
                       <Button
                         variant="contained"
                         color="error"
                         size="small"
                         onClick={(e) => {
                           e.stopPropagation();
                           handleApprovalservice(
                             provider.serviceId,
                             "rejected"
                           );
                         }}
                         sx={{ marginLeft: 1 }}
                       >
                         Reject
                       </Button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           )}
         </div>
       )}

       {selectedMenu === "Approved Service Providers" && (
         <div className="table-container">
           <Typography variant="h6">
             Recent Service Provider Applications
           </Typography>
           <table className="table">
             <thead>
               <tr>
                 <th>Name</th>
                 <th>Service</th>
                 <th>Status</th>

                 <th>Date</th>
               </tr>
             </thead>
             <tbody>
               {AprovedserviceProviders.map((provider) => (
                 <tr key={provider.serviceId}>
                   <td>{provider.name}</td>
                   <td>{provider.serviceName}</td>
                   <td style={{ color: "#4caf50", fontWeight: "bold" }}>
                     {provider.status}
                   </td>

                   <td>{new Date(provider.createdOn).toLocaleString().substring(0,10)}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       )}

       {selectedMenu === "Approved company regester req" && (
         <div className="table-container">
           <table className="table">
             <tbody>
               {selectedMenu === "Approved company regester req" && (
                 <div className="table-container">
                   <Typography variant="h6">
                     Approved Company Register Requests
                   </Typography>
                   {selectedItem ? (
                     <DetailViewcompany
                       item={selectedItem}
                       onBack={() => setSelectedItem(null)}
                     />
                   ) : (
                     <table className="table">
                       <thead>
                         <tr>
                           <th>Name</th>
                           <th>Company</th>
                           <th>Status</th>
                           <th>Date</th>
                           <th>Actions</th>
                         </tr>
                       </thead>
                       <tbody>
                         {companyregister.map((provider) => (
                           <tr
                             key={provider.registrationId}
                             onClick={() => setSelectedItem(provider)}
                             style={{ cursor: "pointer" }}
                           >
                             <td>{provider.companyName}</td>
                             <td>{provider.location}</td>
                             <td
                               className={
                                 provider.status === "Accepted"
                                   ? "status-approved"
                                   : provider.status === "rejected"
                                     ? "status-rejected"
                                     : "status-pending"
                               }
                             >
                               {provider.status || "pending"}
                             </td>
                             <td>
                             <td>{new Date(provider.createdAt).toLocaleDateString()}</td>
                             </td>
                             <td>
                               <Button
                                 variant="contained"
                                 color="success"
                                 size="small"
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   handleApprovalcompany(
                                     provider.registrationId,
                                     "Accepted"
                                   );
                                 }}
                               >
                                 Approve
                               </Button>
                               <Button
                                 variant="contained"
                                 color="error"
                                 size="small"
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   handleApprovalcompany(
                                     provider.registrationId,
                                     "rejected"
                                   );
                                 }}
                                 sx={{ marginLeft: 1 }}
                               >
                                 Reject
                               </Button>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   )}
                 </div>
               )}
             </tbody>
           </table>
         </div>
       )}

{selectedMenu === "Update Password" && (
         <Box sx={{ maxWidth: "400px", mx: "auto", mt: 3 }}>
           <Typography variant="h5" gutterBottom>
             Update Password
           </Typography>
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
           <Button
             variant="contained"
             color="primary"
             fullWidth
             onClick={handleSavePassword}
             sx={{ mt: 2 }}
           >
             Save Changes
           </Button>
         </Box>
       )}
       {selectedMenu === "Approved companies" && (
         <div className="table-container">
           <Typography variant="h6">Approved companys</Typography>
           <table className="table">
             <thead>
               <tr>
                 <th>Name</th>
                 <th>Company</th>
                 <th>Status</th>
                 <th>Date</th>
               </tr>
             </thead>
             <tbody>
               {approvedcompanies.map((provider) => (
                 <tr key={provider.companyId}>
                   <td>{provider.companyName}</td>
                   <td>{provider.location}</td>
                   <td style={{ color: "#4caf50", fontWeight: "bold" }}>
                     {provider.status}
                   </td>
                   <td>{new Date(provider.createdAt).toLocaleDateString()}</td>
                   <td></td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       )}
     </Box>
   </Box>
 );
};

export default AdminDashboard;



