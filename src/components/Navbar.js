// import React, { useState, useEffect, useMemo} from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Navbar.css';
// import logo from '../images/logo.png';
// import defaultProfilePic from '../images/pogo.png'; // Import default profile picture

// function Navbar() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userRole, setUserRole] = useState(null);
//     const [profilePic, setProfilePic] = useState(defaultProfilePic);
  
//     const navigate = useNavigate();
//     const token = localStorage.getItem('authToken');


//     const config = useMemo(() => ({
//         headers: { Authorization: `Bearer ${token}` },
//     }), [token]);
//     const role = localStorage.getItem('userRole');
//     const handleLogout = () => {
//         localStorage.removeItem('authToken');
//         setProfilePic(defaultProfilePic);
//         window.location.reload() 
       
//         navigate('/');
//       };
    
     
//     useEffect(() => {
//        fetchProfileDetails();
//       }, []);
//     const fetchProfileDetails = async () => {
//         try {
//         const response = await axios.get("/user/all/details", config);
//         const profilePic = response.data.profilePicture;
//         setIsLoggedIn(!!token);
//         setUserRole(role);
//         if (profilePic) {
//             setProfilePic(profilePic);
//         }
//         } catch (error) {
//         console.error("Failed to fetch profile details:", error);
//         }
//     }     
//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };  
//     const handleProfileClick = async(e) => {
//         toggleSidebar(); 
      
//     };
//     return (
//         <nav className="navbar">
//             <h2 className="navbar-logo">
//                 <Link to="/" className="logo">
//                     <img src={logo} alt="City Compass" className="logo-image" />
//                 </Link>
//             </h2>
//             <div className="navbar-menu">
//                 {isLoggedIn ? (
//                     <div className="navbar-auth">
//                         {userRole === 'ADMIN' && (
//                             <Link to="/admin-dashboard" className="navbar-link">Admin Dashboard</Link>
//                         )}
//                         <button onClick={handleLogout} className="navbar-button">Logout</button>
//                     </div>
//                 ) : (
//                     <div className="navbar-auth">
//                         <Link to="/login">Login</Link>
//                         <Link to="/register">Register</Link>
//                     </div>
//                 )}
//                 {/* Replace the hamburger button with the profile picture icon */}
//                 {isLoggedIn && (
//                 <img
//                     src={profilePic}
//                     alt="Profile"
//                     className="profile-icon"
//                     onClick={handleProfileClick}
//                 />
//             )}
//             </div>

//             {isSidebarOpen && (
//                 <div className="sidebar">
//                     <button className="close-btn" onClick={toggleSidebar}>×</button> 
//                     <ul className="sidebar-links">
//                         <li><Link to ="/update-profile">Update Profile</Link></li>    
//                         <li><Link to="/track-services">Track Your Services</Link></li>
//                         <li><Link to="/track-jobs">Track Your Applied Jobs</Link></li>
                       
                       
//                     </ul>
//                 </div>
//             )}
//         </nav>
//     );
// }

// export default Navbar;


// import React, { useState, useEffect, useMemo } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Navbar.css';
// import logo from '../images/logo.png';
// import defaultProfilePic from '../images/pogo.png'; // Import default profile picture
// import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';

// function Navbar() {
//    const [isLoggedIn, setIsLoggedIn] = useState(false);
//    const [userRole, setUserRole] = useState(null);
//    const [profilePic, setProfilePic] = useState(defaultProfilePic);
//    const [anchorEl, setAnchorEl] = useState(null); // Anchor element for dropdown menu

//    const navigate = useNavigate();
//    const token = localStorage.getItem('authToken');

//    const config = useMemo(() => ({
//        headers: { Authorization: `Bearer ${token}` },
//    }), [token]);

//    const role = localStorage.getItem('userRole');

//    const handleLogout = () => {
//        localStorage.removeItem('authToken');
//        setProfilePic(defaultProfilePic);
//        navigate('/');
//        window.location.reload(); 
//    };

//    useEffect(() => {
//        fetchProfileDetails();
//    }, []);

//    const fetchProfileDetails = async () => {
//        try {
//            const response = await axios.get("/user/all/details", config);
//            const profilePic = response.data.profilePicture;
//            setIsLoggedIn(!!token);
//            setUserRole(role);
//            if (profilePic) {
//                setProfilePic(profilePic);
//            }
//        } catch (error) {
//            console.error("Failed to fetch profile details:", error);
//        }
//    };

//    // Handlers for dropdown menu
//    const handleMenuOpen = (event) => {
//        setAnchorEl(event.currentTarget);
//    };

//    const handleMenuClose = () => {
//        setAnchorEl(null);
//    };

//    return (
//        <nav className="navbar">
//            <h2 className="navbar-logo">
//                <Link to="/" className="logo">
//                    <img src={logo} alt="City Compass" className="logo-image" />
//                </Link>
//            </h2>
//            <div className="navbar-menu">
//                {isLoggedIn ? (
//                    <div className="navbar-auth">
//                        {userRole === 'ADMIN' && (
//                            <Link to="/admin-dashboard" className="navbar-link">Admin Dashboard</Link>
//                        )}
//                        {/* <button onClick={handleLogout} className="navbar-button">Logout</button> */}
//                    </div>
//                ) : (
//                    <div className="navbar-auth">
//                        <Link to="/login">Login</Link>
//                        <Link to="/register">Register</Link>
//                    </div>
//                )}

//                {/* Profile Picture Dropdown */}
//                {isLoggedIn && (
//                    <>
//                        <IconButton onClick={handleMenuOpen}>
//                            <Avatar
//                                src={profilePic}
//                                alt="Profile"
//                                className="profile-icon"
//                            />
//                        </IconButton>
//                        <Menu
//                            anchorEl={anchorEl}
//                            open={Boolean(anchorEl)}
//                            onClose={handleMenuClose}
//                            PaperProps={{
//                                style: {
//                                    marginTop: '10px', // Adjust dropdown position
//                                },
//                            }}
//                        >
//                            <MenuItem onClick={handleMenuClose}>
//                                <Link to="/update-profile" className="menu-link">Update Profile</Link>
//                            </MenuItem>
//                            <MenuItem onClick={handleMenuClose}>
//                                <Link to="/track-services" className="menu-link">Track Your Services</Link>
//                            </MenuItem>
//                            <MenuItem onClick={handleMenuClose}>
//                                <Link to="/track-jobs" className="menu-link">Track Your Applied Jobs</Link>
//                            </MenuItem>
//                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                        </Menu>
//                    </>
//                )}
//            </div>
//        </nav>
//    );
// }

// export default Navbar;


//navbar.js

import React, { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/cc_logo.jpg";
import defaultProfilePic from "../images/pogo.png";
import {
 AppBar,
 Toolbar,
 IconButton,
 Avatar,
 Menu,
 MenuItem,
 Button,
 Box,
 Typography,
 Drawer,
 List,
 ListItem,
 ListItemText,
 InputBase,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { Bold } from "lucide-react";

const Navbar = () => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [userRole, setUserRole] = useState(null);
 const [profilePic, setProfilePic] = useState(defaultProfilePic);
 const [anchorEl, setAnchorEl] = useState(null);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");

 const navigate = useNavigate();
 const token = localStorage.getItem("authToken");

 const config = useMemo(
   () => ({
     headers: { Authorization: `Bearer ${token}` },
   }),
   [token]
 );

 const role = localStorage.getItem("userRole");

 const handleLogout = () => {
   localStorage.removeItem("authToken");
   setProfilePic(defaultProfilePic);
   navigate("/");
   window.location.reload();
 };

 useEffect(() => {
   fetchProfileDetails();
 }, []);

 const fetchProfileDetails = async () => {
   try {
     const response = await axios.get("/user/all/details", config);
     const profilePic = response.data.profilePicture;
     setIsLoggedIn(!!token);
     setUserRole(role);
     if (profilePic) {
       setProfilePic(profilePic);
     }
   } catch (error) {
     console.error("Failed to fetch profile details:", error);
   }
 };

 const handleMenuOpen = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleMenuClose = () => {
   setAnchorEl(null);
 };

 const handleMobileMenuToggle = () => {
   setMobileMenuOpen((prev) => !prev);
 };

 return (
   <AppBar
     position="sticky"
     sx={{
       bgcolor: "white",
       boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
       zIndex: 1300, // Ensures the navbar stays above other elements
     }}
   >
     <Toolbar
       sx={{
         px: { xs: 2, sm: 4, md: 6 },
         justifyContent: "space-between",
       }}
     >
       {/* Logo and Branding */}
       <Box display="flex" alignItems="center">
         <Link
           to="/"
           style={{
             textDecoration: "none",
             display: "flex",
             alignItems: "center",
             cursor: "pointer",
           }}
         >
           <img
             src={logo}
             alt="Logo"
             style={{ height: "59px", marginRight: "8px" }}
           />
           <Typography
             variant="h6"
             sx={{
               fontWeight: "bold",
               fontSize: { xs: "1.4rem", sm: "1.7rem" },
               fontFamily: "Luckiest Guy, sans-serif",
               color: "#202B3F",
               letterSpacing: "1px",
               background: "linear-gradient(90deg, #202B3F, #4facfe)",
               WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
               transition: "transform 0.3s ease",
               "&:hover": {
                 transform: "scale(1.05)",
               },
             }}
           >
             City Compass
           </Typography>
         </Link>
       </Box>


       {/* Desktop Navigation */}
       <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
         {isLoggedIn ? (
           <>
             {userRole === "ADMIN" && (
               <Button
                 component={NavLink}
                 to="/admin-dashboard"
                 sx={{
                   color: "#0077ff",
                   textTransform: "none",
                   fontWeight: "bold",
                   "&.active": {
                     color: "#0056b3",
                     borderBottom: "2px solid #0056b3",
                   },
                   "&:hover": { bgcolor: "#f0f8ff" },
                 }}
               >
                 Admin Dashboard
               </Button>
             )}
             <IconButton onClick={handleMenuOpen}>
               <Avatar src={profilePic} alt="Profile" sx={{ width: 50, height: 50 }} />
             </IconButton>
             <Menu
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={handleMenuClose}
               PaperProps={{
                 style: {
                   marginTop: "10px",
                   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                   borderRadius: "8px",
                 },
               }}
             >
               <MenuItem onClick={handleMenuClose}>
                 <Link
                   to="/update-profile"
                   style={{
                     textDecoration: "none",
                     color: "#333",
                     fontWeight: "500",
                   }}
                 >
                   Update Profile
                 </Link>
               </MenuItem>
               <MenuItem onClick={handleMenuClose}>
                 <Link
                   to="/track-services"
                   style={{
                     textDecoration: "none",
                     color: "#333",
                     fontWeight: "500",
                   }}
                 >
                   Track Your Services
                 </Link>
               </MenuItem>
               <MenuItem onClick={handleMenuClose}>
                 <Link
                   to="/track-jobs"
                   style={{
                     textDecoration: "none",
                     color: "#333",
                     fontWeight: "500",
                   }}
                 >
                   Track Your Applied Jobs
                 </Link>
               </MenuItem>
               <MenuItem onClick={handleLogout}>
                 <Typography sx={{ color: "#ff4d4d", fontWeight: "500" }}>
                   Logout
                 </Typography>
               </MenuItem>
             </Menu>
           </>
         ) : (
           <>
             <Button
               component={NavLink}
               to="/login"
               variant="outlined"
               sx={{
                 borderColor: "#0073B!",
                 color: "#0073B1",

                 textTransform: "none",
                 fontWeight: "bold",
                 "&.active": { color: "#0056b3", borderBottom: "2px solid #0056b3" },
                 "&:hover": { bgcolor: "#f0f8ff" },
               }}
             >
               Login
             </Button>
             <Button
               component={NavLink}
               to="/register"
               variant="outlined"
               sx={{
                 borderColor: "#0073B1",
                 color: "#0073B1",
                 textTransform: "none",
                 fontWeight: "bold",
                 "&:hover": { bgcolor: "#0077ff", color: "white" },
               }}
             >
               Register
             </Button>
           </>
         )}
       </Box>

       {/* Mobile Menu */}
       <Box sx={{ display: { xs: "flex", md: "none" } }}>
         <IconButton onClick={handleMobileMenuToggle} sx={{ color: "#0077ff" }}>
           <MenuIcon />
         </IconButton>
       </Box>
     </Toolbar>

     {/* Mobile Drawer */}
     <Drawer anchor="right" open={mobileMenuOpen} onClose={handleMobileMenuToggle}>
       <Box sx={{ width: 250, bgcolor: "white", p: 2 }}>
         <List>
           <ListItem button onClick={handleMobileMenuToggle}>
             <ListItemText>
               <Link to="/" style={{ textDecoration: "none", color: "#0077ff" }}>
                 Home
               </Link>
             </ListItemText>
           </ListItem>
           {isLoggedIn ? (
             <>
               <ListItem button>
                 <ListItemText>
                   <Link to="/update-profile" style={{ textDecoration: "none", color: "#0073B1" }}>
                     Update Profile
                   </Link>
                 </ListItemText>
               </ListItem>
               <ListItem button>
                 <ListItemText>
                   <Link to="/track-services" style={{ textDecoration: "none", color: "#0073B1" }}>
                     Track Services
                   </Link>
                 </ListItemText>
               </ListItem>
               <ListItem button>
                 <ListItemText>
                   <Link to="/track-jobs" style={{ textDecoration: "none", color: "#0073B1" }}>
                     Track Jobs
                   </Link>
                 </ListItemText>
               </ListItem>
               <ListItem button onClick={handleLogout}>
                 <Typography sx={{ color: "#ff4d4d", fontWeight: "500" }}>Logout</Typography>
               </ListItem>
             </>
           ) : (
             <>
               <ListItem button>
                 <ListItemText>
                   <Link to="/login" style={{ textDecoration: "none", color: "#0077ff" }}>
                     Login
                   </Link>
                 </ListItemText>
               </ListItem>
               <ListItem button>
                 <ListItemText>
                   <Link to="/register" style={{ textDecoration: "none", color: "#0077ff" }}>
                     Register
                   </Link>
                 </ListItemText>
               </ListItem>
             </>
           )}
         </List>
       </Box>
     </Drawer>
   </AppBar>
 );
};

export default Navbar;

