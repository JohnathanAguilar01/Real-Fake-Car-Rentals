// Navbar.js
import React, { useState } from "react";
import "./NavBar.css"; // Import CSS for styling
import { MdAccountCircle } from "react-icons/md";
import Modal from "../userAuth/Modal.js";
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
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Login />
      </Modal>
    </nav>
  );
}

export default Navbar;
