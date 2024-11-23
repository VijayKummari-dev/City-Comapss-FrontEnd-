// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './UserRegistration.css'; // Use the updated CSS provided earlier
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const RegistrationForm = () => {
//  const navigate = useNavigate();
//  const [formData, setFormData] = useState({
//    name: '',
//    email: '',
//    mobile: '',
//    username: '',
//    password: '',
//    confirmPassword: '',
//  });

//  const [error, setError] = useState('');
//  const [successMessage, setSuccessMessage] = useState('');
//  const [showPassword, setShowPassword] = useState(false);
//  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//  const [formValid, setFormValid] = useState(false);

//  // Validation functions
//  const isEmailValid = useCallback((email) => /\S+@\S+\.\S+/.test(email), []);
//  const isPasswordValid = useCallback((password) => password.length >= 6, []);
//  const isPhoneNumberValid = useCallback((number) => /^\(\d{3}\) \d{3}-\d{4}$/.test(number), []);

//  const doPasswordsMatch = formData.password === formData.confirmPassword;

//  useEffect(() => {
//    const isFormValid =
//      formData.name &&
//      isEmailValid(formData.email) &&
//      isPhoneNumberValid(formData.mobile) &&
//      formData.username &&
//      isPasswordValid(formData.password) &&
//      doPasswordsMatch;

//    setFormValid(isFormValid);
//  }, [formData, isEmailValid, isPasswordValid, isPhoneNumberValid, doPasswordsMatch]);

//  const handleChange = (e) => {
//    const { name, value } = e.target;

//    if (name === 'mobile') {
//      setFormData({ ...formData, [name]: formatPhoneNumber(value) });
//    } else {
//      setFormData({ ...formData, [name]: value });
//    }
//  };

//  const formatPhoneNumber = (value) => {
//    const cleaned = value.replace(/\D/g, '');

//    if (cleaned.length <= 3) {
//      return `(${cleaned}`;
//    } else if (cleaned.length <= 6) {
//      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
//    } else if (cleaned.length <= 10) {
//      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
//    } else {
//      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
//    }
//  };

//  const handleSubmit = async (e) => {
//    e.preventDefault();

//    if (!formValid) {
//      toast.error('Please fill in all fields correctly.');
//      return;
//    }

//    try {
//      await axios.post('http://localhost:8080/user/public/register', {
//        name: formData.name,
//        email: formData.email,
//        number: formData.mobile,
//        username: formData.username,
//        password: formData.password,
//        userType: 'USER',
//      });

//      toast.success('Registration successful!');
//      setError('');
//      setFormData({
//        name: '',
//        email: '',
//        mobile: '',
//        username: '',
//        password: '',
//        confirmPassword: '',
//      });

//      navigate('/login');
//    } catch (error) {
//      if (error.response && error.response.status === 400) {
//        toast.error(error.response.data.message);
//      } else {
//        toast.error('Please provide correct details and  try again.');
//      }
//    }
//  };

//  return (
//    <div className="page-specific-container">

//      <div className="container">
//        {/* Left Column: Informational Section */}
//        <div className="info-section">
//          <div className="app-name">CITY COMPASS</div>
//          <div className="feature">
//            <h3>Get started quickly</h3>
//            <p>Sign up in just a few clicks and access everything you need to get started right away.</p>
//          </div>
//          <div className="feature">
//            <h3>Explore endless opportunities</h3>
//            <p>Find jobs, book trusted services, and connect with a vibrant community—all in one place.</p>
//          </div>
//          {/* <div className="feature">
//      <h3>Plan with confidence</h3>
//      <p>Effortlessly organize your itineraries and manage your schedule with our easy-to-use tools.</p>
//    </div> */}
//        </div>


//        {/* Right Column: Registration Form */}
//        <div className="form-section">
//          <h2>Create your account</h2>
//          {error && <div className="error">{error}</div>}
//          {successMessage && <div className="success">{successMessage}</div>}
//          <form onSubmit={handleSubmit} className="registration-form">
//            <div className="form-group">
//              <input
//                type="text"
//                id="name"
//                name="name"
//                value={formData.name}
//                onChange={handleChange}
//                placeholder="Full Name"
//                required
//              />
//            </div>
//            <div className="form-group">
//              <input
//                type="text"
//                id="username"
//                name="username"
//                value={formData.username}
//                onChange={handleChange}
//                placeholder="Username"
//                required
//              />
//            </div>
//            <div className="form-group">
//              <input
//                type="email"
//                id="email"
//                name="email"
//                value={formData.email}
//                onChange={handleChange}
//                placeholder="Email"
//                required
//              />
//              {!isEmailValid(formData.email) && formData.email && (
//                <p className="error-message">Enter a valid email address.</p>
//              )}
//            </div>
//            <div className="form-group">
//              <input
//                type="tel"
//                id="mobile"
//                name="mobile"
//                value={formData.mobile}
//                onChange={handleChange}
//                placeholder="Mobile (e.g., (123) 456-7890)"
//                required
//              />
//              {!isPhoneNumberValid(formData.mobile) && formData.mobile && (
//                <p className="error-message">Enter a valid phone number.</p>
//              )}
//            </div>
//            <div className="form-group">
//              <div className="password-input">
//                <input
//                  type={showPassword ? 'text' : 'password'}
//                  id="password"
//                  name="password"
//                  value={formData.password}
//                  onChange={handleChange}
//                  placeholder="Password"
//                  required
//                />
//                {formData.password && (
//                  <span
//                    className="toggle-password"
//                    onClick={() => setShowPassword(!showPassword)}
//                  >
//                    {showPassword ? 'Hide' : 'Show'}
//                  </span>
//                )}
//              </div>
//              {formData.password && !isPasswordValid(formData.password) && (
//                <p className="error-message">Create a password at least 6 characters long.</p>
//              )}
//            </div>
//            <div className="form-group">
//              <div className="password-input">
//                <input
//                  type={showConfirmPassword ? 'text' : 'password'}
//                  id="confirmPassword"
//                  name="confirmPassword"
//                  value={formData.confirmPassword}
//                  onChange={handleChange}
//                  placeholder="Confirm Password"
//                  required
//                />
//                {formData.confirmPassword && (
//                  <span
//                    className="toggle-password"
//                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                  >
//                    {showConfirmPassword ? 'Hide' : 'Show'}
//                  </span>
//                )}
//              </div>
//              {formData.confirmPassword && !doPasswordsMatch && (
//                <p className="error-message">Passwords do not match!</p>
//              )}
//            </div>
//            <button type="submit" disabled={!formValid}>
//              Create account
//            </button>
//          </form>
//          <p className="login-redirect">
//            Already have an account? <a href="/login">Log in</a>
//          </p>
//        </div>
//      </div>
//      </div>
// );
// };

//      export default RegistrationForm;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserRegistration.css';
import logo from '../images/cc_logo.jpg'; // Replace with your logo path
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formValid, setFormValid] = useState(false);

  // Validation for individual fields
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Full Name is required.';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Enter a valid email address.';
        }
        break;
      case 'mobile':
        if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) {
          error = 'Enter a valid phone number.';
        }
        break;
      case 'username':
        if (!value.trim()) {
          error = 'Username is required.';
        }
        break;
      case 'password':
        if (value.length < 6) {
          error = 'Password must be at least 6 characters.';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Passwords do not match.';
        }
        break;
      default:
        break;
    }

    return error;
  };

  // Format phone number dynamically
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Remove non-digit characters
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;

    const formattedNumber = [
      match[1] && `(${match[1]}`,
      match[2] && `) ${match[2]}`,
      match[3] && `-${match[3]}`,
    ]
      .filter(Boolean)
      .join('');
    return formattedNumber;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const formattedValue = name === 'mobile' ? formatPhoneNumber(value) : value;

    setFormData({ ...formData, [name]: formattedValue });

    if (touched[name]) {
      const error = validateField(name, formattedValue);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Check form validity whenever formData or errors are updated
  useEffect(() => {
    const isFormValid = Object.values(errors).every((error) => !error) &&
      Object.keys(formData).every((key) => formData[key].trim());
    setFormValid(isFormValid);
  }, [errors, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValid) {
      toast.error('Please fill in all fields correctly.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/user/public/register', {
        name: formData.name,
        email: formData.email,
        number: formData.mobile,
        username: formData.username,
        password: formData.password,
        userType: 'USER',
      });
      toast.success('Registration successful!');
      setFormData({
        name: '',
        email: '',
        mobile: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/login');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <img src={logo} alt="City Compass Logo" className="registration-logo" />
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.name && touched.name ? 'error' : ''}`}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Full Name"
              required
            />
            {errors.name && touched.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className={`form-group ${errors.username && touched.username ? 'error' : ''}`}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Username"
              required
            />
            {errors.username && touched.username && (
              <p className="error-message">{errors.username}</p>
            )}
          </div>
          <div className={`form-group ${errors.email && touched.email ? 'error' : ''}`}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              required
            />
            {errors.email && touched.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className={`form-group ${errors.mobile && touched.mobile ? 'error' : ''}`}>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Mobile (e.g., (123) 456-7890)"
              required
            />
            {errors.mobile && touched.mobile && <p className="error-message">{errors.mobile}</p>}
          </div>
          <div className={`form-group ${errors.password && touched.password ? 'error' : ''}`}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              required
            />
            {errors.password && touched.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <div
            className={`form-group ${
              errors.confirmPassword && touched.confirmPassword ? 'error' : ''
            }`}
          >
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>
          <button type="submit" disabled={!formValid} className="register-button">
           Create account
          </button>

        </form>
        <p className="login-redirect">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;