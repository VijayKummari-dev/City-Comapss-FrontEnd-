// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ViewApplications.css";

// // Retrieve token from localStorage
// const token = localStorage.getItem("authToken");
// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

// const ViewApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await axios.get(
//           "/jobApplications/users/applicant",
//           config
//         );

//         // Check if response data is an array
//         if (Array.isArray(response.data)) {
//           setApplications(response.data);
//         } else {
//           throw new Error("Invalid data format received from the server.");
//         }
//       } catch (error) {
//         console.error("Error fetching applications:", error);
//         setError("Failed to fetch applications. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="applications-container">
//       <h2>Your Job Applications</h2>
//       {applications.length === 0 ? (
//         <p>No applications found.</p>
//       ) : (
//         <ul className="applications-list">
//           {applications.map((application) => {
//             if (!application.jobPosting) {
//               console.warn("Missing jobPosting in application:", application); // Debugging line
//               return null; // Skip rendering if jobPosting is missing
//             }

//             return (
//               <li key={application.applicationId} className="application-item">
//                 <h3>{application.jobPosting.jobTitle}</h3>
//                 <p>Status: {application.status}</p>
//                 <p>
//                   Applied On:{" "}
//                   {new Date(application.appliedOn).toLocaleDateString()}
//                 </p>
//                 <a
//                   href={application.resume}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Resume
//                 </a>
//                 {application.coverLetter && (
//                   <a
//                     href={application.coverLetter}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View Cover Letter
//                   </a>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ViewApplications;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewApplications.css";

// Retrieve token from localStorage
const token = localStorage.getItem("authToken");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "/jobApplications/users/applicant",
          config
        );

        if (Array.isArray(response.data)) {
          setApplications(response.data);
          console.log("Applications fetched:", response.data); // Log data to verify
        } else {
          throw new Error("Unexpected data format from server.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to fetch applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="applications-container">
      <h2>Your Job Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul className="applications-list">
          {applications.map((application) => (
            <li key={application.applicationId} className="application-item">
              <h3>Company : {application.jobPosting.company.companyName}</h3>
              <p>Job Title : {application.jobPosting?.jobTitle || "Job Title Unavailable"}</p>
              <p>Status: {application.status || "Status Unavailable"}</p>
              <p>
                Applied On:{" "}
                {application.appliedOn
                  ? new Date(application.appliedOn).toLocaleDateString()
                  : "Date Unavailable"}
              </p>
              {application.resume && (
                <a
                  href={application.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              )}
              {application.coverLetter && (
                <a
                  href={application.coverLetter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Cover Letter
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewApplications;

