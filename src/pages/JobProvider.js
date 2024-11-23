// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import './JobProvider.css'; // Add relevant styles in this CSS file
// import { useNavigate } from 'react-router-dom';

// const JobProvider = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     companyName: '',
//     companyEmail: '',
//     contactInfo: '',
//     companyId: '',
//     location: '',
//     industry: '',
//     companyDetails: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [formValid, setFormValid] = useState(false);

//   const isEmailValid = useCallback((email) => /\S+@\S+\.\S+/.test(email), []);
//   const isPhoneNumberValid = useCallback((number) => /^\(\d{3}\) \d{3}-\d{4}$/.test(number), []);

//   useEffect(() => {
//     // Check if the form is valid
//     const isFormValid =
//       formData.username &&
//       formData.password &&
//       formData.companyName &&
//       isEmailValid(formData.companyEmail) &&
//       isPhoneNumberValid(formData.contactInfo) &&
//       formData.companyId &&
//       formData.location &&
//       formData.industry &&
//       formData.companyDetails;

//     setFormValid(isFormValid);
//   }, [formData, isEmailValid, isPhoneNumberValid]);

//   useEffect(() => {
//     document.body.classList.add('registration-background');
//     return () => {
//       document.body.classList.remove('registration-background');
//     };
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'contactInfo') {
//       setFormData({ ...formData, [name]: formatPhoneNumber(value) });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
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
//       await axios.post('http://localhost:8080/user/public/register/jobProvider', {
//         username: formData.username,
//         password: formData.password,
//         companyName: formData.companyName,
//         companyEmail: formData.companyEmail,
//         contactInfo: formData.contactInfo,
//         companyId: formData.companyId,
//         location: formData.location,
//         industry: formData.industry,
//         companyDetails: formData.companyDetails,
//       });

//       setSuccessMessage('Registration successful!');
//       setError('');
//       setFormData({
//         username: '',
//         password: '',
//         companyName: '',
//         companyEmail: '',
//         contactInfo: '',
//         companyId: '',
//         location: '',
//         industry: '',
//         companyDetails: '',
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
//     <div className="job-provider-registration">
//       <div className="job-provider-registration-card">
//         <h2 className="job-provider-registration-title">Job Provider Registration</h2>
//         <p className="job-provider-registration-subtitle">Register your company with City Compass</p>
//         {error && <div className="error">{error}</div>}
//         {successMessage && <div className="success">{successMessage}</div>}
//         <form onSubmit={handleSubmit} className="job-provider-registration-form">
//           <div className="form-group">
//             <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
//           </div>
//           <div className="form-group">
//             <div className="password-input">
//               <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//               <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</span>
//             </div>
//           </div>
//           <div className="form-group">
//             <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required />
//           </div>
//           <div className="form-group">
//             <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} placeholder="Company Email" required />
//             {!isEmailValid(formData.companyEmail) && formData.companyEmail && <p className="error-message">Enter a valid email address.</p>}
//           </div>
//           <div className="form-group">
//             <input type="tel" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Contact Info (e.g., (123) 456-7890)" required />
//             {!isPhoneNumberValid(formData.contactInfo) && formData.contactInfo && <p className="error-message">Enter a valid phone number.</p>}
//           </div>
//           <div className="form-group">
//             <input type="text" name="companyId" value={formData.companyId} onChange={handleChange} placeholder="Company ID" required />
//           </div>
//           <div className="form-group">
//             <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
//           </div>
//           <div className="form-group">
//             <input type="text" name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" required />
//           </div>
//           <div className="form-group">
//             <textarea name="companyDetails" value={formData.companyDetails} onChange={handleChange} placeholder="Company Details" required />
//           </div>
//           <button type="submit" className="register-button" disabled={!formValid}>Register</button>
//         </form>
//         <p className="login-redirect">
//           Already registered? <a href="/login">Log in</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default JobProvider;
