// Navbar.js
import React, { useState } from "react";
import "./NavBar.css"; // Import CSS for styling
import { MdAccountCircle } from "react-icons/md";
import Modal from "../userAuth/Modal.js";
import Login from "../userAuth/Login.js";
import AccountButton from "./AccountButton.js";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(true);

  return (
    <nav className="navbar">
      <div className="navbar-name">
        <h1>Real Fake Car Rentals</h1>
      </div>
      <AccountButton setIsOpen={setIsOpen} isShown={isShown}>
        Login
      </AccountButton>
      <AccountButton setIsOpen={setIsOpen} isShown={!isShown}>
        Sign Out
      </AccountButton>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Login setIsShown={setIsShown} />
      </Modal>
    </nav>
  );
}

export default Navbar;
