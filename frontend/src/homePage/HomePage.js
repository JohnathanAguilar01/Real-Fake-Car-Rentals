import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../mainComponents/NavBar.js";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const goToSearch = () => {
    navigate("/search"); // Navigate to the About page
  };
  return (
    <div className="homepage">
      <div className="homepage-navbar">
        <NavBar />
      </div>
      <div className="homepage-banner">
        <img
          className="homepage-banner-img"
          src="/carbanner.jpg"
          alt="car banner"
        />
        <div className="homepage-banner-content">
          <h1>REAL FAKE CAR RENTALS</h1>
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
