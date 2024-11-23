// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./JobProviderJobPostings.css";

// const token = localStorage.getItem("authToken");
// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

// const JobProviderJobPostings = () => {
//   const [jobPostings, setJobPostings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchJobPostings();
//   }, []);

//   const fetchJobPostings = async () => {
//     try {
//       const response = await axios.get("/jobPostings/company/getAllJobsBYCompany", config);
//       setJobPostings(response.data);
//     } catch (error) {
//       console.error("Error fetching job postings:", error);
//     }
//   };

//   const viewApplications = (jobId) => {
//     navigate(`/jobPostings/company/applications/${jobId}`);
//   };

//   return (
//     <div className="job-postings-container">
//       <h2>Your Job Postings</h2>
//       <div className="job-postings-grid">
//         {jobPostings.map((job) => (
//           <div className="job-posting-card" key={job.jobId}>
//             <p><strong>Job Title:</strong> {job.jobTitle}</p>
//             <p><strong>Location:</strong> {job.location}</p>
//             <p><strong>Posted On:</strong> {new Date(job.postedOn).toLocaleDateString()}</p>
//             <button className="view-applications-button" onClick={() => viewApplications(job.jobId)}>
//               View Applications
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobProviderJobPostings;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobProviderJobPostings.css";

const token = localStorage.getItem("authToken");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const JobProviderJobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get("/jobPostings/company/getAllJobsBYCompany", config);
      setJobPostings(response.data);
    } catch (error) {
      console.error("Error fetching job postings:", error);
    }
  };

  const viewApplications = (jobId) => {
    navigate(`/jobPostings/company/applications/${jobId}`);
  };

  const editJobDetails = (job) => {
    navigate(`/jobEdit/${job.jobId}`, { state: { job } });
  };

  return (
    <div className="job-postings-container">
      <h2>Your Job Postings</h2>
      <div className="job-postings-grid">
        {jobPostings.map((job) => (
          <div className="job-posting-card" key={job.jobId}>
            <p><strong>Job Title:</strong> {job.jobTitle}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Posted On:</strong> {new Date(job.postedOn).toLocaleDateString()}</p>
            <button className="view-applications-button" onClick={() => viewApplications(job.jobId)}>
              View Applications
            </button>
            <button className="edit-job-details-button" onClick={() => editJobDetails(job)}>
              Edit Job Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobProviderJobPostings;

