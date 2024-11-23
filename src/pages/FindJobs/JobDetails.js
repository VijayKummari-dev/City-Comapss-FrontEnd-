import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./JobDetails.css";

// Retrieve token from localStorage
const token = localStorage.getItem("authToken");

// Check if the token exists and set up Axios configuration
const config = token
  ? {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Ensure Content-Type is set to multipart/form-data
      },
    }
  : null; // Handle case where token is missing

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Fetch job details with useCallback
  const fetchJobDetails = useCallback(async () => {
    if (!config) {
      setError("Authorization token is missing. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `/jobPostings/public/${jobId}`,
        config
      );
      setJob(response.data);
      setError(null); // Clear previous errors if any
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError("Failed to fetch job details. Please try again.");
    } finally {
      setLoading(false); // Set loading to false once request is complete
    }
  }, [jobId]);

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  // Function to handle job application
  const applyForJob = async () => {
    if (!config) {
      alert("Authorization token is missing. Please log in.");
      return;
    }

    // Retrieve files from input elements
    const resume = document.getElementById("resume").files[0];
    const coverLetter = document.getElementById("coverLetter").files[0];

    // Check if the resume is uploaded, as it is mandatory
    if (!resume) {
      alert("Please upload a resume before applying.");
      return;
    }

    // Create a FormData object to send files and other data
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", resume);
    if (coverLetter) formData.append("coverLetter", coverLetter);

    try {
      const response = await axios.post(
        "/jobApplications/users/apply",
        formData,
        config
      );

      // Handle the response and give feedback to the user
      if (response.status === 200) {
        alert(response.data || "Application submitted successfully!");
      } else {
        alert("Unexpected response from the server. Please try again.");
      }
    } catch (error) {
      console.error("Error applying for job:", error);

      // Enhanced error handling
      if (error.response) {
        // Server responded with a status code outside of the 2xx range
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        alert(`Error: ${error.response.data.message || "An error occurred on the server."}`);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("Request data:", error.request);
        alert("No response from the server. Please check your network connection.");
      } else {
        // Other errors, e.g., setting up the request
        console.error("Error message:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Display loading or error messages
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="job-details-container">
      <h2>{job.jobTitle}</h2>
      <p>{job.jobDescription}</p>
      <div className="upload-section">
        <label>
          Upload a Resume (mandatory)
          <input type="file" id="resume" required />
        </label>
        <label>
          Upload a Cover Letter (optional)
          <input type="file" id="coverLetter" />
        </label>
      </div>
      <button className="apply-button" onClick={applyForJob}>
        Apply
      </button>
    </div>
  );
};

export default JobDetails;
