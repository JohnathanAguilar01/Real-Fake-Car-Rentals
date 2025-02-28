import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const goToSearch = () => {
    navigate("/search"); // Navigate to the About page
  };
  return (
    <div className="homepage">
      <div className="homepage-banner">
        <div className="homepage-banner-content">
          <h1 className="homepage-banner-text">REAL FAKE CAR RENTALS</h1>
          <div className="homepage-banner-button-wrapper">
            <button className="homepage-banner-button" onClick={goToSearch}>
              RENT NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
