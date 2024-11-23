

import React, { useState } from "react";
import axios from "axios";
import "./UserJobSearchByCompanyName.css";

const JobSearch = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobPostings, setJobPostings] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  // Authentication token configuration
  const token = localStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Handle input change
  const handleInputChange = (e) => {
    setCompanyName(e.target.value);
  };

  // Fetch job postings by company name
  const handleSearch = async () => {
    if (!companyName) {
      setStatusMessage("Please enter a company name.");
      return;
    }

    try {
      const response = await axios.get(
        `jobPostings/public/company/${companyName}`,
        config
      );
      if (response.data.length === 0) {
        setStatusMessage("No job postings found for this company.");
      } else {
        setJobPostings(response.data);
        setStatusMessage("");
      }
    } catch (error) {
      console.error("Error fetching job postings:", error);
      setStatusMessage("Failed to retrieve job postings. Please try again.");
    }
  };

  return (
    <div className="job-search-container">
      <h2>Search Job Postings by Company Name</h2>
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={handleInputChange}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
      <div className="job-list">
        {jobPostings.length > 0 && (
          <ul>
            {jobPostings.map((job) => (
              <li key={job.jobId} className="job-item">
                <h3>{job.jobTitle}</h3>
                <p>{job.jobDescription}</p>
                <p><strong>Salary:</strong> {job.baseSalary}</p>
                <p><strong>Experience:</strong> {job.experience}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Employment Type:</strong> {job.employmentType}</p>
                <p><strong>Status:</strong> {job.status}</p>
                <p><strong>Posted On:</strong> {new Date(job.postedOn).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobSearch;

