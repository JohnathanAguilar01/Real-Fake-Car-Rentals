// Navbar.js
import React, { useEffect, useState } from "react";
import "./NavBar.css"; // Import CSS for styling
import { MdAccountCircle } from "react-icons/md";
import Modal from "../mainComponents/Modal.js";
import Login from "../userAuth/Login.js";
import SignUp from "../userAuth/SignUp.js";
import AccountButton from "./AccountButton.js";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function onClose() {
    setIsOpen(false);
    setIsSignUp(false);
  }

  useEffect(() => {
    fetch("http://localhost:5000/UserAuth/authCheck", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } else {
          setIsShown();
        }
        setIsLoading(false);
        return res.text();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error Validating Credentials:", error));
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <span className="loader"></span>
      </div>
    );
  }

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
      <Modal open={isOpen} onClose={() => onClose()}>
        {isSignUp ? (
          <SignUp
            setIsShown={setIsShown}
            onClose={() => onClose()}
            onLogin={() => setIsSignUp(!isSignUp)}
          ></SignUp>
        ) : (
          <Login
            setIsShown={setIsShown}
            onClose={() => onClose()}
            onSignUp={() => setIsSignUp(!isSignUp)}
          />
        )}
      </Modal>
    </nav>
  );
}

export default Navbar;
