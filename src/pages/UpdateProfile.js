// import React, { useState, useEffect, useRef } from "react";
// import {
//  Box,
//  Container,
//  Typography,
//  Avatar,
//  Modal,
//  Button,
//  Toolbar,
//  List,
//  ListItem,
//  ListItemIcon,
//  ListItemText,
//  Drawer,
//  Divider,
//  IconButton,
//  TextField,
// } from "@mui/material";
// import { Edit, Home, PhotoCamera, Person } from "@mui/icons-material";
// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
// import axios from "axios";
// import { Key } from "lucide-react";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const modalStyle = {
//  position: "absolute",
//  top: "50%",
//  left: "50%",
//  transform: "translate(-50%, -50%)",
//  width: "90%",
//  maxWidth: "500px",
//  backgroundColor: "#ffffff",
//  padding: "16px",
//  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//  borderRadius: "8px",
// };

// const drawerWidth = 240;

// const UpdateProfile = () => {
//  const [activeTab, setActiveTab] = useState("dashboard");
//  const [profilePhoto, setProfilePhoto] = useState(null);
//  const [isCropping, setIsCropping] = useState(false);
//  const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 1 });
//  const [completedCrop, setCompletedCrop] = useState(null);
//  const [selectedFile, setSelectedFile] = useState(null);
//  const imgRef = useRef(null);
//  const canvasRef = useRef(null);
//  const [passwordDetails, setPasswordDetails] = useState({
//    currentPassword: "",
//    newPassword: "",
//    confirmPassword: "",
//  });
//  const token = localStorage.getItem("authToken");

//  const config = {
//    headers: {
//      Authorization: `Bearer ${token}`,
//      "Content-Type": "multipart/form-data",
//    },
//  };

//  useEffect(() => {
//    if (activeTab === "profile") fetchProfileDetails();
//  }, [activeTab]);

//  const fetchProfileDetails = async () => {
//    try {
//      const response = await axios.get("/user/all/details", config);
//      setProfilePhoto(response.data.profilePicture);
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

//  const handleCropChange = (newCrop) => setCrop(newCrop);

//  const handleCropComplete = (newCrop) => setCompletedCrop(newCrop);

//  const getCroppedImage = () => {
//    if (!imgRef.current || !completedCrop?.width || !completedCrop?.height) {
//      console.error("No image or crop data found.");
//      return null;
//    }

//    const canvas = canvasRef.current;
//    if (!canvas) {
//      console.error("Canvas reference not set.");
//      return null;
//    }

//    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
//    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
//    const ctx = canvas.getContext("2d");

//    canvas.width = completedCrop.width;
//    canvas.height = completedCrop.height;

//    ctx.drawImage(
//      imgRef.current,
//      completedCrop.x * scaleX,
//      completedCrop.y * scaleY,
//      completedCrop.width * scaleX,
//      completedCrop.height * scaleY,
//      0,
//      0,
//      completedCrop.width,
//      completedCrop.height
//    );

//    return new Promise((resolve) => {
//      canvas.toBlob((blob) => {
//        if (!blob) {
//          console.error("Canvas is empty.");
//          return;
//        }
//        resolve(blob);
//      }, "image/jpeg");
//    });
//  };

//  const handleSaveCroppedImage = async () => {
//    const croppedBlob = await getCroppedImage();
//    if (!croppedBlob) return;

//    const formData = new FormData();
//    formData.append("file", croppedBlob);

//    try {
//      await axios.post("/user/all/updateProfilePicture", formData, config);
//      toast.success("Profile picture updated successfully!");
//      setProfilePhoto(URL.createObjectURL(croppedBlob));
//      setIsCropping(false);
//    } catch (error) {
//      console.error("Failed to upload profile picture:", error);
//      toast.error("Failed to upload profile picture.");
//    }
//  };

//  const handlePasswordChange = (e) => {
//    const { name, value } = e.target;
//    setPasswordDetails((prev) => ({ ...prev, [name]: value }));
//  };

//  const handleSavePassword = async () => {
//    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
//      toast.error("New Password and Confirm Password do not match.");
//      return;
//    }
//    const token = localStorage.getItem("authToken");
//    const config = { headers: { Authorization: `Bearer ${token}` } };
//    const requestBody = {
//      oldPassword: passwordDetails.currentPassword,
//      newPassword: passwordDetails.newPassword,
//    };
//    try {
//      await axios.patch(
//        "/user/all/updatePassword", requestBody, config);
 
//      toast.success("Password updated successfully.");
//      setPasswordDetails({
//        currentPassword: "",
//        newPassword: "",
//        confirmPassword: "",
//      });
//    } catch (error) {
//      console.error("Failed to update password:", error);
//      toast.error("Failed to update password.");
//    }
//  };

//  return (
//    <Box display="flex" height="100vh">
//      <Drawer
//        variant="permanent"
//        sx={{
//          width: drawerWidth,
//          flexShrink: 0,
//          "& .MuiDrawer-paper": {
//            width: drawerWidth,
//            boxSizing: "border-box",
//            backgroundColor: "#1e293b",
//            color: "white",
//          },
//        }}
//      >
//        <List>
//          <ListItem
//            button
//            selected={activeTab === "profile"}
//            onClick={() => setActiveTab("profile")}
//          >
//            <ListItemIcon>
//              <Person style={{ color: "white" }} />
//            </ListItemIcon>
//            <ListItemText primary="Profile" />
//          </ListItem>
//          <ListItem
//            button
//            selected={activeTab === "ChangePassword"}
//            onClick={() => setActiveTab("ChangePassword")}
//          >
//            <ListItemIcon>
//              <Key style={{ color: "white" }} />
//            </ListItemIcon>
//            <ListItemText primary="Change Password" />
//          </ListItem>
//        </List>
//      </Drawer>

//      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f1f5f9", p: 3 }}>
//        <Toolbar />
//        <Container maxWidth="lg">
//          {activeTab === "profile" && (
//            <Box sx={{ textAlign: "center", mt: 3 }}>
//              <Avatar
//                src={profilePhoto}
//                alt="Profile"
//                sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
//              />
//              <input
//                accept="image/*"
//                id="profile-photo-upload"
//                type="file"
//                style={{ display: "none" }}
//                onChange={handleImageSelect}
//              />
//              <label htmlFor="profile-photo-upload">
//                <IconButton component="span" color="primary">
//                  <PhotoCamera />
//                </IconButton>
//              </label>
//              <Typography>Upload a new profile picture (max 5MB)</Typography>
//            </Box>
//          )}

//          {isCropping && selectedFile && (
//            <Modal open={isCropping} onClose={() => setIsCropping(false)}>
//              <Box sx={{ ...modalStyle }}>
//                <Typography variant="h6" mb={2}>
//                  Crop Your Profile Picture
//                </Typography>
//                <ReactCrop
//                  crop={crop}
//                  onChange={handleCropChange}
//                  onComplete={handleCropComplete}
//                >
//                  <img
//                    ref={imgRef}
//                    src={selectedFile}
//                    alt="Crop me"
//                    onLoad={(e) => handleImageLoad(e.target)}
//                  />
//                </ReactCrop>
//                <canvas ref={canvasRef} style={{ display: "none" }} />
//                <Button onClick={handleSaveCroppedImage} variant="contained">
//                  Save
//                </Button>
//              </Box>
//            </Modal>
//          )}

//          {activeTab === "ChangePassword" && (
//            <>
//              <Typography variant="h6" mb={2} align="center">
//                Change Password
//              </Typography>
//              <TextField
//                label="Current Password"
//                name="currentPassword"
//                value={passwordDetails.currentPassword}
//                onChange={handlePasswordChange}
//                type="password"
//                fullWidth
//                margin="normal"
//              />
//              <TextField
//                label="New Password"
//                name="newPassword"
//                value={passwordDetails.newPassword}
//                onChange={handlePasswordChange}
//                type="password"
//                fullWidth
//                margin="normal"
//              />
//              <TextField
//                label="Confirm New Password"
//                name="confirmPassword"
//                value={passwordDetails.confirmPassword}
//                onChange={handlePasswordChange}
//                type="password"
//                fullWidth
//                margin="normal"
//              />
//              <Button
//                variant="contained"
//                color="primary"
//                onClick={handleSavePassword}
//                sx={{ mt: 2 }}
//              >
//                Save Changes
//              </Button>
//            </>
//          )}
//        </Container>
//      </Box>
//    </Box>
//  );
// };

// export default UpdateProfile;

import React, { useState, useEffect, useRef } from "react";
import {
 Box,
 Container,
 Typography,
 Avatar,
 Modal,
 Button,
 Toolbar,
 List,
 ListItem,
 ListItemIcon,
 ListItemText,
 Drawer,
 IconButton,
 TextField,
} from "@mui/material";
import { PhotoCamera, Person } from "@mui/icons-material";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";
import { Key } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const modalStyle = {
 position: "absolute",
 top: "50%",
 left: "50%",
 transform: "translate(-50%, -50%)",
 width: "90%",
 maxWidth: "500px",
 backgroundColor: "#ffffff",
 padding: "16px",
 boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
 borderRadius: "8px",
};

const UpdateProfile = () => {
 const [profilePhoto, setProfilePhoto] = useState(null);
 const [isCropping, setIsCropping] = useState(false);
 const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 1 });
 const [completedCrop, setCompletedCrop] = useState(null);
 const [selectedFile, setSelectedFile] = useState(null);
 const imgRef = useRef(null);
 const canvasRef = useRef(null);
 const [passwordDetails, setPasswordDetails] = useState({
   currentPassword: "",
   newPassword: "",
   confirmPassword: "",
 });
 const token = localStorage.getItem("authToken");

 const config = {
   headers: {
     Authorization: `Bearer ${token}`,
     "Content-Type": "multipart/form-data",
   },
 };

 useEffect(() => {
   fetchProfileDetails();
 }, []);

 const fetchProfileDetails = async () => {
   try {
     const response = await axios.get("/user/all/details", config);
     setProfilePhoto(response.data.profilePicture);
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

 const handleCropChange = (newCrop) => setCrop(newCrop);

 const handleCropComplete = (newCrop) => setCompletedCrop(newCrop);

 const getCroppedImage = () => {
   if (!imgRef.current || !completedCrop?.width || !completedCrop?.height) {
     console.error("No image or crop data found.");
     return null;
   }

   const canvas = canvasRef.current;
   if (!canvas) {
     console.error("Canvas reference not set.");
     return null;
   }

   const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
   const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
   const ctx = canvas.getContext("2d");

   canvas.width = completedCrop.width;
   canvas.height = completedCrop.height;

   ctx.drawImage(
     imgRef.current,
     completedCrop.x * scaleX,
     completedCrop.y * scaleY,
     completedCrop.width * scaleX,
     completedCrop.height * scaleY,
     0,
     0,
     completedCrop.width,
     completedCrop.height
   );

   return new Promise((resolve) => {
     canvas.toBlob((blob) => {
       if (!blob) {
         console.error("Canvas is empty.");
         return;
       }
       resolve(blob);
     }, "image/jpeg");
   });
 };

 const handleSaveCroppedImage = async () => {
   const croppedBlob = await getCroppedImage();
   if (!croppedBlob) return;

   const formData = new FormData();
   formData.append("file", croppedBlob);

   try {
     await axios.post("/user/all/updateProfilePicture", formData, config);
     toast.success("Profile picture updated successfully!");
     setProfilePhoto(URL.createObjectURL(croppedBlob));
     setIsCropping(false);
   } catch (error) {
     console.error("Failed to upload profile picture:", error);
     toast.error("Failed to upload profile picture.");
   }
 };

 const handlePasswordChange = (e) => {
   const { name, value } = e.target;
   setPasswordDetails((prev) => ({ ...prev, [name]: value }));
 };

 const handleSavePassword = async () => {
   if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
     toast.error("New Password and Confirm Password do not match.");
     return;
   }
const token = localStorage.getItem("authToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };

   const requestBody = {
     oldPassword: passwordDetails.currentPassword,
     newPassword: passwordDetails.newPassword,
   };

   try {
     const response= await axios.patch("/user/all/updatePassword", requestBody, config);
     console.log(response);

     if(response.data =="Old Password is Wrong")
     {toast.error("Invalid Current password");}
     else
     toast.success("Password updated successfully.");
     setPasswordDetails({
       currentPassword: "",
       newPassword: "",
       confirmPassword: "",
     });
   } catch (error) {
     console.error("Failed to update password:", error);
     toast.error("Failed to update password.");
   }
 };

 return (
   <Container maxWidth="lg">
     <Box sx={{ textAlign: "center", mt: 3 }}>
       <Typography variant="h5" mb={3}>
         Update Profile
       </Typography>

       {/* Profile Picture Section */}
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

     {isCropping && selectedFile && (
       <Modal open={isCropping} onClose={() => setIsCropping(false)}>
         <Box sx={{ ...modalStyle }}>
           <Typography variant="h6" mb={2}>
             Crop Your Profile Picture
           </Typography>
           <ReactCrop
             crop={crop}
             onChange={handleCropChange}
             onComplete={handleCropComplete}
           >
             <img
               ref={imgRef}
               src={selectedFile}
               alt="Crop me"
               onLoad={(e) => handleImageLoad(e.target)}
             />
           </ReactCrop>
           <canvas ref={canvasRef} style={{ display: "none" }} />
           <Button onClick={handleSaveCroppedImage} variant="contained">
             Save
           </Button>
         </Box>
       </Modal>
     )}

     {/* Change Password Section */}
     <Box mt={5}>
       <Typography variant="h6" mb={2}>
         Change Password
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
         onClick={handleSavePassword}
         sx={{ mt: 2 }}
       >
         Save Changes
       </Button>
     </Box>
   </Container>
 );
};

export default UpdateProfile;