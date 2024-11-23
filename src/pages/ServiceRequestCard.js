import React from 'react';

const ServiceRequestCard = ({ request }) => (
    <div className="request-card">
        <h3>Requested By: {request.requestedUserName}</h3>
        <p>Service: {request.service.name}</p>
        <p>Provider: {request.providerUserName}</p>
        <p>Problem Description: {request.requestedUserProblem}</p>
        <p>Charge: {request.charge}</p>
        <p>Time Slot: {request.localTime || "N/A"}</p>
        <p>Permission: {request.permission}</p>
        <p>Request Status: {request.userRequestStatus}</p>
        {/* Add buttons to respond to the request if needed */}
    </div>
);

export default ServiceRequestCard;
