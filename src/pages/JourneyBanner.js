import React from "react";
import "./JourneyBanner.css"; 

const JourneyBanner = () => {
  const handleButtonClick = () => {
    window.location.href = "/AskAI"; // Change this to the correct route or URL
  };

  return (
    <div className="journey-banner">
      <h1 className="journey-title">City Compass: Where plans to Take Shape</h1>
      <p className="journey-subtitle">
        Build, personalize, and optimize your itineraries with our free AI trip
        planner. Designed for vacations, workations, and everyday adventures.
      </p>
      <button className="journey-button" onClick={handleButtonClick}>
      <span className="button-icon">🗺️</span> Create a new trip
      </button>
    </div>
  );
};

export default JourneyBanner;