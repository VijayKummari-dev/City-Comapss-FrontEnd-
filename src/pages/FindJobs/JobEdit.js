// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./JobEdit.css";

// const JobEdit = () => {
//   const { jobId } = useParams();
//   const [jobDetails, setJobDetails] = useState({
//     jobTitle: "",
//     jobDescription: "",
//     baseSalary: "",
//     experience: "",
//     employmentType: "",
//     location: "",
//     status: "",
//     companyName: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch job details when the component mounts
//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const config = token
//           ? {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           : {};

//         const response = await axios.get(`/jobPostings/public/${jobId}`, config);
//         setJobDetails({
//           jobTitle: response.data.jobTitle,
//           jobDescription: response.data.jobDescription,
//           baseSalary: response.data.baseSalary,
//           experience: response.data.experience,
//           employmentType: response.data.employmentType,
//           location: response.data.location,
//           status: response.data.status,
//           companyName: response.data.companyName
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching job details:", error);
//         setError("Failed to fetch job details.");
//         setLoading(false);
//       }
//     };

//     fetchJobDetails();
//   }, [jobId]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setJobDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   // Handle the update button click
//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const config = token
//         ? {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         : {};

//       const response = await axios.put(
//         `/jobPostings/company/update/${jobId}`,
//         jobDetails,
//         config
//       );
//       console.log("Update response:", response.data);
//       alert("Job Details Updated Successfully");
//     } catch (error) {
//       console.error("Error updating job details:", error);
//       alert("Failed to update job details.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="job-edit-container">
//       <h2>Edit Job Details</h2>
//       <div className="job-edit-form">
//         <label>
//           Job Title:
//           <input
//             type="text"
//             name="jobTitle"
//             value={jobDetails.jobTitle}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Job Description:
//           <input
//             type="text"
//             name="jobDescription"
//             value={jobDetails.jobDescription}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Base Salary:
//           <input
//             type="text"
//             name="baseSalary"
//             value={jobDetails.baseSalary}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Experience:
//           <input
//             type="text"
//             name="experience"
//             value={jobDetails.experience}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Employment Type:
//           <input
//             type="text"
//             name="employmentType"
//             value={jobDetails.employmentType}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Location:
//           <input
//             type="text"
//             name="location"
//             value={jobDetails.location}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Status:
//           <input
//             type="text"
//             name="status"
//             value={jobDetails.status}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Company Name:
//           <input
//             type="text"
//             name="companyName"
//             value={jobDetails.companyName}
//             onChange={handleChange}
//           />
//         </label>
        
//         <button onClick={handleUpdate}>Update</button>
//       </div>
//     </div>
//   );
// };

// export default JobEdit;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./JobEdit.css";

const JobEdit = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobDescription: "",
    baseSalary: "",
    experience: "",
    employmentType: "",
    location: "",
    status: "",
    companyName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch job details when the component mounts
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          : {};

        // Make the GET request to fetch job details
        const response = await axios.get(`/jobPostings/public/${jobId}`, config);
        const { jobTitle, jobDescription, baseSalary, experience, employmentType, location, status, company } = response.data;

        // Set the job details, including the companyName from the Company model
        setJobDetails({
          jobTitle,
          jobDescription,
          baseSalary,
          experience,
          employmentType,
          location,
          status,
          companyName: company.companyName, // Fetching companyName from the Company model
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to fetch job details.");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle the update button click
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        : {};

      const response = await axios.put(
        `/jobPostings/company/update/${jobId}`,
        jobDetails,
        config
      );
      console.log("Update response:", response.data);
      alert("Job Details Updated Successfully");
    } catch (error) {
      console.error("Error updating job details:", error);
      alert("Failed to update job details.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="job-edit-container">
      <h2>Edit Job Details</h2>
      <div className="job-edit-form">
        <label>
          Job Title:
          <input
            type="text"
            name="jobTitle"
            value={jobDetails.jobTitle}
            onChange={handleChange}
          />
        </label>
        <label>
          Job Description:
          <input
            type="text"
            name="jobDescription"
            value={jobDetails.jobDescription}
            onChange={handleChange}
          />
        </label>
        <label>
          Base Salary:
          <input
            type="text"
            name="baseSalary"
            value={jobDetails.baseSalary}
            onChange={handleChange}
          />
        </label>
        <label>
          Experience:
          <input
            type="text"
            name="experience"
            value={jobDetails.experience}
            onChange={handleChange}
          />
        </label>
        <label>
          Employment Type:
          <select
            name="employmentType"
            value={jobDetails.employmentType}
            onChange={handleChange}
          >
            <option value="PartTime">PartTime</option>
            <option value="FullTime">FullTime</option>
            <option value="Contract">Contract</option>
          </select>
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={jobDetails.status}
            onChange={handleChange}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </label>
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={jobDetails.companyName}
            readOnly
          />
        </label>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default JobEdit;
