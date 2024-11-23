import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SaveJobs.css";

const token = localStorage.getItem("authToken");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get("/saveJobs/users", config);
      setSavedJobs(response.data);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  if (savedJobs.length === 0) return <div>No saved jobs found.</div>;

  return (
    <div className="saved-jobs-container">
      <h2>Saved Jobs</h2>
      {savedJobs.map((job) => (
        <div key={job.jobId} className="saved-job-card">
          <h3>{job.jobTitle}</h3>
          <p>{job.companyName}</p>
          <p>{job.location}</p>
        </div>
      ))}
    </div>
  );
};

export default SavedJobs;
