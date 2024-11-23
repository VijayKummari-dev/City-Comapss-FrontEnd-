import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobSearch.css";

// Retrieve token from localStorage
const token = localStorage.getItem("authToken");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [, setHasApplications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("jobPostings/public/getAllJobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleViewApplications = async () => {
    try {
      const response = await axios.get(
        "/jobApplications/users/applicant",
        config
      );
      console.log(response.data)
      if (response.data.length > 0) {
        setHasApplications(true);
      }
      navigate("/view-applications");
    } catch (error) {
      console.error("Error checking applications:", error);
    }
  };

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const saveJob = async (jobId) => {
    try {
      const response = await axios.post(
        "/saveJobs/users/save",
        { jobId },
        config
      );
      alert(response.data);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return (
    <div className="job-search-container">
      <div className="top-bar">
        <input type="text" placeholder="Search" className="search-input" />
        <div className="buttons-container">
          <button className="sort-button">Sort</button>
          <button
            className="view-saved-jobs-button"
            onClick={() => navigate("/save-jobs")}
          >
            View Saved Jobs
          </button>
          <button
            className="view-applications-button"
            onClick={handleViewApplications}
          >
            View Applications
          </button>
        </div>
      </div>
      <div className="job-cards-container">
        {jobs.map((job) => (
          <div className="job-card" key={job.jobId}>
            <p><strong>Company name:</strong> {job.company.companyName}</p>
            <p><strong>Job title:</strong> {job.jobTitle}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Job Description:</strong> {job.jobDescription}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Base Salary:</strong> {job.baseSalary}</p>
            <p><strong>Employment Type:</strong> {job.employmentType}</p>
            <p><strong>Job Status:</strong> {job.status}</p>
            <button className="apply-button" onClick={() => handleJobClick(job.jobId)}>
              Apply
            </button>
            <button className="save-job-icon" onClick={() => saveJob(job.jobId)}>
              Save Job
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearch;
