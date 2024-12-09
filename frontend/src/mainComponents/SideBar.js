import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaTable } from "react-icons/fa";
import "./SideBar.css";

function SideBar() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <ul>
        <li className="sidebar-logo">
          <img
            src="/QuarterLogo.png"
            alt="J.E.N.I."
            className="sidebar-logo-img"
          />
        </li>
        <li>
          <button onClick={goToHome}>
            <FaHome size={30} />
          </button>
        </li>
        <li>
          <a href="#table">
            <FaTable size={30} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
