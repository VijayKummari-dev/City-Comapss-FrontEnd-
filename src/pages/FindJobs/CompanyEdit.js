import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompanyEdit.css";

const CompanyEdit = () => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyDetails: "",
    location: "",
    industry: "",
    companyId: "",
    status: "ACTIVE",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch company details when the component mounts
  const fetchCompanyDetails = async () => {
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

      const response = await axios.get(
        "/jobPostings/company/allDetails",
        config
      );
      const {
        companyName,
        companyDetails,
        location,
        industry,
        companyId,
        status,
      } = response.data;
      setCompanyDetails({
        companyName,
        companyDetails,
        location,
        industry,
        companyId,
        status,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching company details:", error);
      setError("Token may have expired, please login again");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prevDetails) => ({
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

      await axios.patch(
        "/jobPostings/company/updateCompanyDetails",
        companyDetails,
        config
      );
      alert("Company Details Updated Successfully");

      // Refetch the company details to ensure the UI is updated
      fetchCompanyDetails();
    } catch (error) {
      console.error("Error updating company details:", error);
      alert("Token may have expired, please login again and try.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="company-edit-container">
      <h2>Edit Company Details</h2>
      <div className="company-edit-form">
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={companyDetails.companyName}
            readOnly
          />
        </label>
        <label>
          Company Details:
          <input
            type="text"
            name="companyDetails"
            value={companyDetails.companyDetails}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={companyDetails.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Industry:
          <input
            type="text"
            name="industry"
            value={companyDetails.industry}
            onChange={handleChange}
          />
        </label>
        <label>
          Company ID:
          <input
            type="text"
            name="companyId"
            value={companyDetails.companyId}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={companyDetails.status}
            onChange={handleChange}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </label>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default CompanyEdit;
