// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import './JobProvider.css';
// import { useNavigate } from 'react-router-dom';
// import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const JobProvider = () => {
//  const navigate = useNavigate();
//  const [formData, setFormData] = useState({
//    username: '',
//    password: '',
//    companyName: '',
//    companyEmail: '',
//    contactInfo: '',
//    companyId: '',
//    location: '',
//    industry: '',
//    companyDetails: '',
//  });

//  const [license, setLicense] = useState(null);
//  const [showPassword, setShowPassword] = useState(false);
//  const [error, setError] = useState('');
//  const [successMessage, setSuccessMessage] = useState('');
//  const [formValid, setFormValid] = useState(false);

//  const isEmailValid = useCallback((email) => /\S+@\S+\.\S+/.test(email), []);
//  const isPhoneNumberValid = useCallback((number) => /^\(\d{3}\) \d{3}-\d{4}$/.test(number), []);

//  useEffect(() => {
//    const isFormValid =
//      formData.username &&
//      formData.password &&
//      formData.companyName &&
//      isEmailValid(formData.companyEmail) &&
//      isPhoneNumberValid(formData.contactInfo) &&
//      formData.companyId &&
//      formData.location &&
//      formData.industry &&
//      formData.companyDetails &&
//      license;

//    setFormValid(isFormValid);
//  }, [formData, license, isEmailValid, isPhoneNumberValid]);

//  useEffect(() => {
//    document.body.classList.add('registration-background');
//    return () => {
//      document.body.classList.remove('registration-background');
//    };
//  }, []);

//  const handleChange = (e) => {
//    const { name, value } = e.target;

//    if (name === 'contactInfo') {
//      setFormData({ ...formData, [name]: formatPhoneNumber(value) });
//    } else {
//      setFormData({ ...formData, [name]: value });
//    }
//  };

//  const handleFileChange = (e) => {
//    setLicense(e.target.files[0]);
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
//      setError('Please fill in all fields correctly.');
//      return;
//    }

//    const formDataToSend = new FormData();
//    formDataToSend.append('username', formData.username);
//    formDataToSend.append('password', formData.password);
//    formDataToSend.append('companyName', formData.companyName);
//    formDataToSend.append('companyEmail', formData.companyEmail);
//    formDataToSend.append('contactInfo', formData.contactInfo);
//    formDataToSend.append('companyId', formData.companyId);
//    formDataToSend.append('location', formData.location);
//    formDataToSend.append('industry', formData.industry);
//    formDataToSend.append('companyDetails', formData.companyDetails);
//    formDataToSend.append('license', license); // Add the license file

//    try {
//      await axios.post('http://localhost:8080/user/public/register/jobProvider', formDataToSend, {
//        headers: {
//          'Content-Type': 'multipart/form-data',
//        },
//      });

//      toast.success('Registration successful!');
//      setError('');
//      setFormData({
//        username: '',
//        password: '',
//        companyName: '',
//        companyEmail: '',
//        contactInfo: '',
//        companyId: '',
//        location: '',
//        industry: '',
//        companyDetails: '',
//      });
//      setLicense(null);
//      //navigate('/login');
//    } catch (error) {
//      if (error.response && error.response.status === 400) {
//        setError(error.response.data.message);
//      } else {
//        toast.error('Registration failed. Please try again.');
//      }
//    }
//  };

//  return (
//    <div className="job-provider-registration">
//      <div className="job-provider-registration-card">
//        <h2 className="job-provider-registration-title">Job Provider Registration</h2>
//        <p className="job-provider-registration-subtitle">Register your company with City Compass</p>
//        {error && <div className="error">{error}</div>}
//        {successMessage && <div className="success">{successMessage}</div>}
//        <form onSubmit={handleSubmit} className="job-provider-registration-form" encType="multipart/form-data">
//          <div className="form-group">
//            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
//          </div>
//          <div className="form-group">
//            <div className="password-input">
//              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</span>
//            </div>
//          </div>
//          <div className="form-group">
//            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required />
//          </div>
//          <div className="form-group">
//            <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} placeholder="Company Email" required />
//            {!isEmailValid(formData.companyEmail) && formData.companyEmail && <p className="error-message">Enter a valid email address.</p>}
//          </div>
//          <div className="form-group">
//            <input type="tel" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Contact Info (e.g., (123) 456-7890)" required />
//            {!isPhoneNumberValid(formData.contactInfo) && formData.contactInfo && <p className="error-message">Enter a valid phone number.</p>}
//          </div>
//          <div className="form-group">
//            <input type="text" name="companyId" value={formData.companyId} onChange={handleChange} placeholder="Company ID" required />
//          </div>
//          <div className="form-group">
//            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
//          </div>
//          <div className="form-group">
//            <input type="text" name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" required />
//          </div>
//          <div className="form-group">
//            <textarea name="companyDetails" value={formData.companyDetails} onChange={handleChange} placeholder="Company Details" required />
//          </div>
//          <div className="form-group">
//            <label htmlFor="license">Upload License</label>
//            <input type="file" name="license" onChange={handleFileChange} required />
//          </div>
//          <button type="submit" className="register-button" disabled={!formValid}>Register</button>
//        </form>
//        <p className="login-redirect">
//          Already registered? <a href="/login">Log in</a>
//        </p>
//      </div>
//    </div>
//  );
// };

// export default JobProvider;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './JobProvider.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const JobProvider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    companyName: '',
    companyEmail: '',
    contactInfo: '',
    companyId: '',
    location: '',
    industry: '',
    companyDetails: '',
  });

  const [license, setLicense] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const isEmailValid = useCallback((email) => /\S+@\S+\.\S+/.test(email), []);
  const isPhoneNumberValid = useCallback((number) => /^\(\d{3}\) \d{3}-\d{4}$/.test(number), []);

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required.';
    if (!formData.password) errors.password = 'Password is required.';
    if (!formData.companyName) errors.companyName = 'Company name is required.';
    if (!formData.companyEmail || !isEmailValid(formData.companyEmail)) {
      errors.companyEmail = 'Enter a valid email address.';
    }
    if (!formData.contactInfo || !isPhoneNumberValid(formData.contactInfo)) {
      errors.contactInfo = 'Enter a valid phone number.';
    }
    if (!formData.companyId) errors.companyId = 'Company ID is required.';
    if (!formData.location) errors.location = 'Location is required.';
    if (!formData.industry) errors.industry = 'Industry is required.';
    if (!formData.companyDetails) errors.companyDetails = 'Company details are required.';
    if (!license) errors.license = 'License is required.';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'contactInfo' ? formatPhoneNumber(value) : value });
  };

  const handleFileChange = (e) => {
    setLicense(e.target.files[0]);
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
    formDataToSend.append('license', license);

    try {
      await axios.post('http://localhost:8080/user/public/register/jobProvider', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Registration successful!');
      setFormErrors({});
      setFormData({
        username: '',
        password: '',
        companyName: '',
        companyEmail: '',
        contactInfo: '',
        companyId: '',
        location: '',
        industry: '',
        companyDetails: '',
      });
      setLicense(null);
      navigate('/login');
    } catch (error) {
      toast.error({ submit: error.response?.data.message || 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="job-provider-registration">
      <div className="job-provider-registration-card">
        <h2 className="job-provider-registration-title">Job Provider Registration</h2>
        {formErrors.submit && <div className="error">{formErrors.submit}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="job-provider-registration-form">
          {[
            { name: 'username', placeholder: 'Username', type: 'text' },
            { name: 'password', placeholder: 'Password', type: showPassword ? 'text' : 'password' },
            { name: 'companyName', placeholder: 'Company Name', type: 'text' },
            { name: 'companyEmail', placeholder: 'Company Email', type: 'email' },
            { name: 'contactInfo', placeholder: 'Contact Info (e.g., (123) 456-7890)', type: 'tel' },
            { name: 'companyId', placeholder: 'Company ID', type: 'text' },
            { name: 'location', placeholder: 'Location', type: 'text' },
            { name: 'industry', placeholder: 'Industry', type: 'text' },
          ].map((field) => (
            <div className="form-group" key={field.name}>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
              {formErrors[field.name] && <p className="error-message">{formErrors[field.name]}</p>}
            </div>
          ))}
          <div className="form-group">
            <textarea
              name="companyDetails"
              value={formData.companyDetails}
              onChange={handleChange}
              placeholder="Company Details"
              required
            />
            {formErrors.companyDetails && <p className="error-message">{formErrors.companyDetails}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="license">Upload Company License</label>
            <input type="file" name="license" onChange={handleFileChange} required />
            {formErrors.license && <p className="error-message">{formErrors.license}</p>}
          </div>
          <button type="submit" className="register-button" disabled={Object.keys(formErrors).length > 0}>
            Register
          </button>
        </form>
        <p className="login-redirect">
          Already registered? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default JobProvider;