import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/user', // Replace with your actual backend URL
});


// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
