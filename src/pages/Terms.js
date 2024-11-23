import React from "react";
import { Typography, Box } from "@mui/material";

const Terms = () => {
    return (
        <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
            {/* Title */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", color: "#333" }}>
                Terms of Service
            </Typography>

            {/* Section 1 */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 4, fontWeight: "bold" }}>
                1. Introduction
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555", textAlign: "justify" }}>
                Welcome to City Compass! By registering and using our platform, you agree to comply with and be bound by these Terms of Service. 
                These terms govern your use of the services offered by City Compass, including features such as booking services, job applications, 
                itinerary planning, and more.
            </Typography>

            {/* Section 2 */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 4, fontWeight: "bold" }}>
                2. General Provisions for All Users
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555", textAlign: "justify" }}>
                • <b>Eligibility:</b> Users must be at least 18 years old or have parental/guardian consent to use the platform.<br />
                • <b>User Account:</b> You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.<br />
                • <b>Prohibited Activities:</b>
                <ul style={{ marginLeft: "20px" }}>
                    <li>Misuse of the platform, including providing false information or engaging in fraudulent activities.</li>
                    <li>Unauthorized access or interference with the platform’s functionalities.</li>
                </ul>
            </Typography>

            {/* Section 3 */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 4, fontWeight: "bold" }}>
                3. Terms for Service Providers
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555", textAlign: "justify" }}>
                • <b>Registration Requirements:</b>
                <ul style={{ marginLeft: "20px" }}>
                    <li>Service providers must register with valid business details and provide proof of licensing or certification.</li>
                    <li>Verification: Service providers will be verified by the City Compass team to ensure authenticity.</li>
                </ul>
                • <b>Responsibilities:</b>
                <ul style={{ marginLeft: "20px" }}>
                    <li>Maintain up-to-date and accurate service information.</li>
                    <li>Respond to user bookings and requests promptly.</li>
                    <li>Adhere to the agreed-upon terms with users for services provided.</li>
                </ul>
                • <b>Compliance:</b> Service providers are required to comply with all applicable local laws and regulations regarding their services.
            </Typography>

            {/* Section 4 */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 4, fontWeight: "bold" }}>
                4. Terms for Job Providers
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555", textAlign: "justify" }}>
                • <b>Posting Requirements:</b>
                <ul style={{ marginLeft: "20px" }}>
                    <li>Job postings must include accurate details about the role, company, and requirements.</li>
                    <li>Only verified businesses, with valid licenses, are permitted to post jobs.</li>
                </ul>
                • <b>Application Management:</b>
                <ul style={{ marginLeft: "20px" }}>
                    <li>Job providers can view, download, and respond to submitted applications.</li>
                    <li>Job providers must handle applicant data securely and in accordance with applicable data privacy laws.</li>
                </ul>
                • <b>Prohibited Activities:</b>
                <ul style={{ marginLeft: "20px" }}>
                    <li>Posting false or misleading job opportunities.</li>
                    <li>Discriminatory practices in job postings or application processes.</li>
                </ul>
            </Typography>

            {/* Section 5 */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 4, fontWeight: "bold" }}>
                5. Data Privacy
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555", textAlign: "justify" }}>
                City Compass values your privacy and ensures that all personal information, such as user profiles, bookings, and job applications, 
                is securely stored and managed. Users’ personal information will not be shared with third parties without explicit consent, 
                except as required by law.
            </Typography>

            {/* Section 6 */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 4, fontWeight: "bold" }}>
                6. Liability
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555", textAlign: "justify" }}>
                City Compass acts as a platform facilitator and is not liable for:
                <ul style={{ marginLeft: "20px" }}>
                    <li>Disputes between users and service providers or job providers.</li>
                    <li>The quality, accuracy, or availability of services or jobs listed on the platform.</li>
                </ul>
                Users, service providers, and job providers agree to use the platform at their own risk.
            </Typography>

            {/* Section 7 */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 4, fontWeight: "bold" }}>
                7. Amendments to Terms
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555", textAlign: "justify" }}>
                City Compass reserves the right to update or modify these Terms of Service at any time. Users will be notified of significant 
                changes via email or through the platform.
            </Typography>
        </Box>
    );
};

export default Terms;
