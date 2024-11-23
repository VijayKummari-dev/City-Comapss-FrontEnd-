// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./JobApplications.css";

// const token = localStorage.getItem("authToken");
// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

// const JobApplications = () => {
//   const { jobId } = useParams();
//   const [applications, setApplications] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState({});
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await axios.get(
//           `/jobApplications/company/applications/${jobId}`,
//           config
//         );
//         setApplications(response.data);
//       } catch (error) {
//         console.error("Error fetching applications:", error);
//       }
//     };

//     fetchApplications();
//   }, [jobId]);

//   const handleStatusChange = (applicationId, newStatus) => {
//     setSelectedStatus((prev) => ({
//       ...prev,
//       [applicationId]: newStatus,
//     }));
//   };

//   const updateStatus = async (applicationId) => {
//     try {
//       const newStatus = selectedStatus[applicationId];
//       await axios.put(
//         `/jobPostings/company/updateStatus/${applicationId}/${newStatus}`,
//         null,
//         config
//       );
//       setShowConfirmation(true);
//       setTimeout(() => setShowConfirmation(false), 3000); // Hide confirmation after 3 seconds
//       // Refresh the application list or update the status in the state
//       setApplications((prevApplications) =>
//         prevApplications.map((app) =>
//           app.applicationId === applicationId
//             ? { ...app, status: newStatus }
//             : app
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <div className="job-applications-container">
//       <h2>Job Applications for Job ID: {jobId}</h2>
//       {applications.length === 0 ? (
//         <p>No applications found.</p>
//       ) : (
//         applications.map((application) => (
//           <div className="application-card" key={application.applicationId}>
//             <p><strong>Applicant Name:</strong> {application.applicant.name}</p>
//             <p>
//               <strong>Resume:</strong>{" "}
//               <a
//                 href={application.resume}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 download
//               >
//                 Download Resume
//               </a>
//             </p>
//             <p><strong>Status:</strong> {application.status}</p>
//             <p><strong>Applied On:</strong> {new Date(application.appliedOn).toLocaleString()}</p>
//             <select
//               value={selectedStatus[application.applicationId] || application.status}
//               onChange={(e) =>
//                 handleStatusChange(application.applicationId, e.target.value)
//               }
//             >
//               <option value="SUBMITTED">Submitted</option>
//               <option value="REVIEWING">Reviewing</option>
//               <option value="CLOSED">Closed</option>
//             </select>
//             <button onClick={() => updateStatus(application.applicationId)}>
//               Update Status
//             </button>
//             {showConfirmation && (
//               <p className="confirmation-message">Status updated successfully!</p>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default JobApplications;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./JobApplications.css";

const token = localStorage.getItem("authToken");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `/jobApplications/company/applications/${jobId}`,
          config
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [jobId]);

  // Function to handle status update
  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await axios.put(
        `/jobApplications/company/updateStatus/${applicationId}/${newStatus}`,
        {},
        config
      );

      if (response.status === 200) {
        // Show a confirmation alert
        alert("Application status updated successfully.");
        // Update the state to reflect the new status
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application.applicationId === applicationId
              ? { ...application, status: newStatus }
              : application
          )
        );
      } else {
        alert("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please check the console for details.");
    }
  };

  return (
    <div className="job-applications-container">
      <h2>Job Applications for Job ID: {jobId}</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((application) => (
          <div className="application-card" key={application.applicationId}>
            <p>
              <strong>Applicant Name:</strong> {application.applicant.name}
            </p>
            <p>
              <strong>Resume:</strong>{" "}
              <a
                href={application.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download Resume
              </a>
            </p>
            <p>
              <strong>Status:</strong> {application.status}
            </p>
            <p>
              <strong>Applied On:</strong>{" "}
              {new Date(application.appliedOn).toLocaleString()}
            </p>
            <select
              value={application.status}
              onChange={(e) =>
                handleStatusUpdate(application.applicationId, e.target.value)
              }
            >
              <option value="SUBMITTED">Submitted</option>
              <option value="REVIEWING">Reviewing</option>
              <option value="CLOSED">Closed</option>
            </select>
            <button
              onClick={() =>
                handleStatusUpdate(application.applicationId, application.status)
              }
            >
              Update Status
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobApplications;
