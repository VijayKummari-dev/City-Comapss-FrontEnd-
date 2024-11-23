
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//     const [formData, setFormData] = useState({ username: '', password: '' });
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         document.body.classList.add('login-background');
//         return () => {
//           document.body.classList.remove('login-background');
//         };
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccessMessage('');

//         const { username, password } = formData;

//         if (!username || !password) {
//             toast.success('Username and password are required.');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:8080/user/public/login', { username, password });
//             const token = response.data;
            
//             if (token) {
//                 localStorage.setItem("authToken", token);
//                 const decodedToken = jwtDecode(token);
//                 const userType = decodedToken.UserType?.toUpperCase();

//                 localStorage.setItem('userRole', userType);

//                 toast.success('Login successful!');
//                 setError('');

//                 switch (userType) {
//                     case 'USER':
//                         navigate('/');
//                         break;
//                     case 'JOB_PROVIDER':
//                         navigate('/job-provider-dashboard');
//                         break;
//                     case 'SERVICE_PROVIDER':
//                         navigate('/Spdashboard');
//                         break;
//                     case 'ADMIN':
//                         navigate('/admin');
//                         break;
//                     default:
//                         toast.error('Unknown user type.');
//                 }
//             } else {
//                 toast.error('Login failed. Please try again.');
//             }
//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.message || 'Invalid username or password.');
//             } else if (error.request) {
//                 toast.error('Invalid Credentials.');
//             } else {
//                 toast.error('Error during login. Please try again.');
//             }
//         }
//     };

//     // Check if both fields are filled
//     const formValid = formData.username && formData.password;

//     return (
//         <div className="login-page">
//             <div className="login-container">
//                 <h2>Welcome to City Compass</h2>
//                 <p className="login-subheading">Your gateway to local resources</p>
//                 <form onSubmit={handleSubmit} className="login-form">
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             id="username"
//                             name="username"
//                             placeholder='Username'
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <div className="password-input">
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 id="password"
//                                 name="password"
//                                 placeholder='Password'
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <span 
//                                 className="toggle-password" 
//                                 onClick={togglePasswordVisibility}
//                             >
//                                 {showPassword ? 'Hide' : 'Show'}
//                             </span>
//                         </div>
//                     </div>

//                     {error && <span className="error">{error}</span>}
//                     {successMessage && <span className="success">{successMessage}</span>}

//                     <button type="submit" className="login-button" disabled={!formValid}>
//                         Login
//                     </button>
//                 </form>
//                 <div className="link-section">
//                     <p>Don't have an account? <a href="/register">Sign up</a></p>
//                     <p><a href="/forgot-password">Forgot Password?</a></p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure proper import
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/cc_logo.jpg'; // Import the logo

const Login = () => {
   const [formData, setFormData] = useState({ username: '', password: '' });
   const [error, setError] = useState('');
   const [successMessage, setSuccessMessage] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
       document.body.classList.add('login-background');
       return () => {
           document.body.classList.remove('login-background');
       };
   }, []);

   const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value });
   };

   const togglePasswordVisibility = () => {
       setShowPassword(!showPassword);
   };

   const handleSubmit = async (e) => {
       e.preventDefault();
       setError('');
       setSuccessMessage('');

       const { username, password } = formData;

       if (!username || !password) {
           toast.success('Username and password are required.');
           return;
       }

       try {
           const response = await axios.post('http://localhost:8080/user/public/login', { username, password });
           const token = response.data;

           if (token) {
               localStorage.setItem("authToken", token);
               const decodedToken = jwtDecode(token);
               const userType = decodedToken.UserType?.toUpperCase();

               localStorage.setItem('userRole', userType);

               toast.success('Login successful!');
               setError('');

               switch (userType) {
                   case 'USER':
                       navigate('/');
                       break;
                   case 'JOB_PROVIDER':
                       navigate('/job-provider-dashboard');
                       break;
                   case 'SERVICE_PROVIDER':
                       navigate('/Spdashboard');
                       break;
                   case 'ADMIN':
                       navigate('/admin');
                       break;
                   default:
                       toast.error('Unknown user type.');
               }
           } else {
               toast.error('Login failed. Please try again.');
           }
       } catch (error) {
           if (error.response) {
               toast.error(error.response.data.message || 'Invalid username or password.');
           } else if (error.request) {
               toast.error('Invalid Credentials.');
           } else {
               toast.error('Error during login. Please try again.');
           }
       }
   };

   const formValid = formData.username && formData.password;

   return (
       <div className="login-page">
           <div className="login-container">
               {/* Logo Section */}
               <div className="logo-container">
                   <img src={logo} alt="City Compass Logo" className="login-logo" />
               </div>
               
               <h2>Welcome to City Compass</h2>
               <p className="login-subheading">Your gateway to local resources</p>
               <form onSubmit={handleSubmit} className="login-form">
                   <div className="form-group">
                       <input
                           type="text"
                           id="username"
                           name="username"
                           placeholder='Username'
                           value={formData.username}
                           onChange={handleChange}
                           required
                       />
                   </div>

                   <div className="form-group">
                       <div className="password-input">
                           <input
                               type={showPassword ? 'text' : 'password'}
                               id="password"
                               name="password"
                               placeholder='Password'
                               value={formData.password}
                               onChange={handleChange}
                               required
                           />
                           <span 
                               className="toggle-password" 
                               onClick={togglePasswordVisibility}
                           >
                               {showPassword ? 'Hide' : 'Show'}
                           </span>
                       </div>
                   </div>

                   {error && <span className="error">{error}</span>}
                   {successMessage && <span className="success">{successMessage}</span>}

                   <button type="submit" className="login-button" disabled={!formValid}>
                       Login
                   </button>
               </form>
               <div className="link-section">
                   <p>Don't have an account? <a href="/register">Sign up</a></p>
                   <p><a href="/forgot-password">Forgot Password?</a></p>
               </div>
           </div>
       </div>
   );
};

export default Login;