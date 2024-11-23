
// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import './ServiceProvider.css';
// import { useNavigate } from 'react-router-dom';

// const ServiceProvider = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: '',
//     name: '',
//     email: '',
//     number: '',
//     service: '',
//     experience: '',
//     charge: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [formValid, setFormValid] = useState(false);

//   const isEmailValid = useCallback((email) => /\S+@\S+\.\S+/.test(email), []);
//   const isPasswordValid = useCallback((password) => password.length >= 6, []);
//   const isPhoneNumberValid = useCallback((number) => /^\(\d{3}\) \d{3}-\d{4}$/.test(number), []);

//   const doPasswordsMatch = formData.password === formData.confirmPassword;
  
//   useEffect(() => {
//     const isFormValid =
//       formData.name &&
//       isEmailValid(formData.email) &&
//       isPhoneNumberValid(formData.number) &&
//       formData.username &&
//       isPasswordValid(formData.password) &&
//       doPasswordsMatch;

//     setFormValid(isFormValid);
//   }, [formData, isEmailValid, isPasswordValid, isPhoneNumberValid, doPasswordsMatch]);

//   useEffect(() => {
//     document.body.classList.add('registration-background');
//     return () => {
//       document.body.classList.remove('registration-background');
//     };
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const formatPhoneNumber = (value) => {
//     const cleaned = value.replace(/\D/g, '');
//     if (cleaned.length <= 3) {
//       return `(${cleaned}`;
//     } else if (cleaned.length <= 6) {
//       return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
//     } else if (cleaned.length <= 10) {
//       return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
//     } else {
//       return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formValid) {
//       setError('Please fill in all fields correctly.');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:8080/user/public/register/serviceProvider', {
//         username: formData.username,
//         password: formData.password,
//         name: formData.name,
//         email: formData.email,
//         number: formData.number,
//         service: formData.service,
//         experience: formData.experience,
//         charge: formData.charge,
//       });

//       setSuccessMessage('Registration successful!');
//       setError('');
//       setFormData({
//         username: '',
//         password: '',
//         confirmPassword: '',
//         name: '',
//         email: '',
//         number: '',
//         service: '',
//         experience: '',
//         charge: '',
//       });
//       navigate('/login');
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setError(error.response.data.message);
//       } else {
//         setError('Registration failed. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="service-provider-registration">
//       <div className="service-provider-registration-card">
//         <h2 className="service-provider-registration-title">Service Provider Registration</h2>
//         <p className="service-provider-registration-subtitle">Join City Compass as a service provider!</p>
//         {error && <div className="error">{error}</div>}
//         {successMessage && <div className="success">{successMessage}</div>}
//         <form onSubmit={handleSubmit} className="service-provider-registration-form">
//           <div className="form-group">
//             <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
//           </div>
//           <div className="form-group">
//             <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
//           </div>
//           <div className="form-group">
//             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//           </div>
//           <div className="form-group">
//             <input type="tel" name="number" value={formData.number} onChange={(e) => setFormData({ ...formData, number: formatPhoneNumber(e.target.value) })} placeholder="Mobile (e.g., (123) 456-7890)" required />
//           </div>
//           <div className="form-group">
//             <div className="password-input">
//               <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//               <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</span>
//             </div>
//           </div>
//           <div className="form-group">
//             <div className="password-input">
//               <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
//               <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? 'Hide' : 'Show'}</span>
//             </div>
//           </div>
//           <div className="form-group">
//             <select name="service" value={formData.service} onChange={handleChange} required>
//               <option value="">Select Service Offered</option>
//               <option value="PLUMBER">Plumber</option>
//               <option value="ELECTRICIAN">Electrician</option>
//               <option value="MECHANIC">Mechanic</option>
//               <option value="CLEANING">Cleaning</option>
//               <option value="PESTCONTROL">PestControl</option>
//               <option value="SPAS">SPA</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <input
//               type="number"
//               name="experience"
//               value={formData.experience}
//               onChange={handleChange}
             
//               placeholder="Experience (in years)"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="number"
//               name="charge"
//               value={formData.charge}
//               onChange={handleChange}
             
//               placeholder="Charge (per hour or service)"
//               required
//             />
//           </div>
//           <button type="submit" className="register-button">Register</button>
//         </form>
//         <p className="login-redirect">
//           Already registered? <a href="/login">Log in</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ServiceProvider;



// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import "./ServiceProvider.css";
// import { useNavigate } from "react-router-dom";

// const ServiceProvider = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     email: "",
//     number: "",
//     service: "",
//     experience: "",
//     charge: "",
//     license: "null",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [formValid, setFormValid] = useState(false);

//   const isEmailValid = useCallback((email) => /\S+@\S+\.\S+/.test(email), []);
//   const isPasswordValid = useCallback((password) => password.length >= 6, []);
//   const isPhoneNumberValid = useCallback(
//     (number) => /^\(\d{3}\) \d{3}-\d{4}$/.test(number),
//     []
//   );

//   const doPasswordsMatch = formData.password === formData.confirmPassword;

//   useEffect(() => {
//     const isFormValid =
//       formData.name &&
//       isEmailValid(formData.email) &&
//       isPhoneNumberValid(formData.number) &&
//       formData.username &&
//       isPasswordValid(formData.password) &&
//       doPasswordsMatch;

//     setFormValid(isFormValid);
//   }, [
//     formData,
//     isEmailValid,
//     isPasswordValid,
//     isPhoneNumberValid,
//     doPasswordsMatch,
//   ]);

//   useEffect(() => {
//     document.body.classList.add("registration-background");
//     return () => {
//       document.body.classList.remove("registration-background");
//     };
//   }, []);
//   // Input change handler
//   const handleChangee = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "contactInfo") {
//       setFormData({ ...formData, [name]: formatPhoneNumber(value) });
//     } else if (name === "license") {
//       setFormData({ ...formData, license: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const formatPhoneNumber = (value) => {
//     const cleaned = value.replace(/\D/g, '');
//     if (cleaned.length <= 3) {
//       return `(${cleaned}`;
//     } else if (cleaned.length <= 6) {
//       return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
//     } else if (cleaned.length <= 10) {
//       return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
//     } else {
//       return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formValid) {
//       setError("Please fill in all fields correctly.");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:8080/user/public/register/serviceProvider",
//         {
//           username: formData.username,
//           password: formData.password,
//           name: formData.name,
//           email: formData.email,
//           number: formData.number,
//           service: formData.service,
//           experience: formData.experience,
//           charge: formData.charge,
//           license: formData.license,
//         },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setSuccessMessage("Registration successful!");
//       setError("");
//       setFormData({
//         username: "",
//         password: "",
//         confirmPassword: "",
//         name: "",
//         email: "",
//         number: "",
//         service: "",
//         experience: "",
//         charge: "",
//         license: "null",
//       });
//       navigate("/login");
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setError(error.response.data.message);
//       } else {
//         setError("Registration failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="service-provider-registration">
//       <div className="service-provider-registration-card">
//         <h2 className="service-provider-registration-title">
//           Service Provider Registration
//         </h2>
//         <p className="service-provider-registration-subtitle">
//           Join City Compass as a service provider!
//         </p>
//         {error && <div className="error">{error}</div>}
//         {successMessage && <div className="success">{successMessage}</div>}
//         <form
//           onSubmit={handleSubmit}
//           className="service-provider-registration-form"
//         >
//           <div className="form-group">
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Full Name"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Username"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="tel"
//               name="number"
//               value={formData.number}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   number: formatPhoneNumber(e.target.value),
//                 })
//               }
//               placeholder="Mobile (e.g., (123) 456-7890)"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <div className="password-input">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 required
//               />
//               <span
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </span>
//             </div>
//           </div>
//           <div className="form-group">
//             <div className="password-input">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 required
//               />
//               <span
//                 className="toggle-password"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? "Hide" : "Show"}
//               </span>
//             </div>
//           </div>
//           <div className="form-group">
//             <select
//               name="service"
//               value={formData.service}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Service Offered</option>
//               <option value="PLUMBER">Plumber</option>
//               <option value="ELECTRICIAN">Electrician</option>
//               <option value="MECHANIC">Mechanic</option>
//               <option value="CLEANING">Cleaning</option>
//               <option value="PESTCONTROL">Pest Control</option>
//               <option value="SPAS">SPA</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <input
//               type="number"
//               name="experience"
//               value={formData.experience}
//               onChange={handleChange}
//               placeholder="Experience (in years)"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="number"
//               name="charge"
//               value={formData.charge}
//               onChange={handleChange}
//               placeholder="Charge (per hour or service)"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="file"
//               name="license"
//               onChange={handleChangee}
//               accept=".pdf,.jpg,.jpeg,.png"
//               required
//             />
//             <p className="file-input-note">
//               Upload your company license (PDF, JPG, JPEG, PNG).
//             </p>
//           </div>
//           <button type="submit" className="register-button">
//             Register
//           </button>
//         </form>
//         <p className="login-redirect">
//           Already registered? <a href="/login">Log in</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ServiceProvider;


import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ServiceProvider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    number: "",
    service: "",
    experience: "",
    charge: "",
    license: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formValid, setFormValid] = useState(false);

  const isEmailValid = useCallback((email) => /\S+@\S+\.\S+/.test(email), []);
  const isPasswordValid = useCallback((password) => password.length >= 6, []);
  const isPhoneNumberValid = useCallback(
    (number) => /^\(\d{3}\) \d{3}-\d{4}$/.test(number),
    []
  );

  const doPasswordsMatch = formData.password === formData.confirmPassword;

  useEffect(() => {
    const isFormValid =
      formData.name &&
      isEmailValid(formData.email) &&
      isPhoneNumberValid(formData.number) &&
      formData.username &&
      isPasswordValid(formData.password) &&
      doPasswordsMatch;

    setFormValid(isFormValid);
  }, [
    formData,
    isEmailValid,
    isPasswordValid,
    isPhoneNumberValid,
    doPasswordsMatch,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, license: e.target.files[0] });
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 3) {
      return `(${cleaned}`;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValid) {
      setError("Please fill in all fields correctly.");
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      for (const key in formData) {
        formDataToSubmit.append(key, formData[key]);
      }

      await axios.post(
        "http://localhost:8080/user/public/register/serviceProvider",
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccessMessage("Registration successful!");
      setError("");
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
        number: "",
        service: "",
        experience: "",
        charge: "",
        license: null,
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Service Provider Registration
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
          Join City Compass as a service provider!
        </Typography>

        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography color="success.main">{successMessage}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile (e.g., (123) 456-7890)"
            name="number"
            value={formData.number}
            onChange={(e) =>
              setFormData({
                ...formData,
                number: formatPhoneNumber(e.target.value),
              })
            }
            required
          />

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Select Service Offered</InputLabel>
            <Select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              label="Select Service Offered"
            >
              <MenuItem value="PLUMBER">Plumber</MenuItem>
              <MenuItem value="ELECTRICIAN">Electrician</MenuItem>
              <MenuItem value="MECHANIC">Mechanic</MenuItem>
              <MenuItem value="CLEANING">Cleaning</MenuItem>
              <MenuItem value="PESTCONTROL">Pest Control</MenuItem>
              <MenuItem value="SPAS">SPA</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Experience (in years)"
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Charge (per hour or service)"
            name="charge"
            type="number"
            value={formData.charge}
            onChange={handleChange}
            required
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 1 }}
          >
            Upload License
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </Button>
          <Typography variant="body2" color="textSecondary">
            Upload your company license (PDF, JPG, JPEG, PNG).
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={!formValid}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already registered? <a href="/login">Log in</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default ServiceProvider;
