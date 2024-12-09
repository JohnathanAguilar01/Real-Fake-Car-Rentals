// Navbar.js
import React from "react";
import "./NavBar.css"; // Import CSS for styling
import { MdAccountCircle } from "react-icons/md";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-name">
        <h1>Real Fake Car Rentals</h1>
      </div>
      <button className="navbar-button">
        <MdAccountCircle className="navbar-actcir" />
        <span className="navbar-span">Login</span>
      </button>
    </nav>
  );
}

export default Navbar;
