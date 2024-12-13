// Navbar.js
import React, { useState } from "react";
import "./NavBar.css"; // Import CSS for styling
import { MdAccountCircle } from "react-icons/md";
import Login from "../userAuth/Login.js";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-name">
        <h1>Real Fake Car Rentals</h1>
      </div>
      <button className="navbar-button" onClick={() => setIsOpen(true)}>
        <MdAccountCircle className="navbar-actcir" />
        <span className="navbar-span">Login</span>
      </button>
      <Login open={isOpen} onClose={() => setIsOpen(false)}>
        This is Login
      </Login>
    </nav>
  );
}

export default Navbar;
