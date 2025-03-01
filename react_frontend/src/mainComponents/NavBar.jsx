import React, { useEffect, useState } from "react";
import "./NavBar.css"; // Import CSS for styling
import { MdOutlineDehaze } from "react-icons/md";
import Modal from "../mainComponents/Modal.jsx";
import Login from "../userAuth/Login.jsx";
import SignUp from "../userAuth/SignUp.jsx";
import AccountButton from "./AccountButton.jsx";
import SideBar from "./SideBar.jsx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL);

  function onClose() {
    setIsOpen(false);
    setIsSignUp(false);
  }

  function onCloseSide() {
    setIsSideOpen(false);
  }

  useEffect(() => {
    fetch(`${API_URL}/UserAuth/authCheck`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } else {
          setIsShown();
        }
        return res.text();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error Validating Credentials:", error))
      .finally(() => setIsLoading(false));
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
      <button className="navbar-hamburger" onClick={setIsSideOpen}>
        <MdOutlineDehaze className="navbar-icon" />
      </button>
      <div className="navbar-name">
        <img className="navbar-logo" src="QuarterLogo.png" alt="Logo" />
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
      {/*<SideBar open={isSideOpen} onClose={() => onCloseSide()} />*/}
    </nav>
  );
}

export default Navbar;
