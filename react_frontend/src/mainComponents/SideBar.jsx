import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDehaze } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaTable } from "react-icons/fa";
import "./SideBar.css";

function SideBar({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const goToHome = () => {
    navigate("/");
    onClose();
  };

  return (
    <div className="sidebar-modal">
      <div className="sidebar">
        <div className="sidebar-top">
          <button className="sidebar-hamburger" onClick={onClose}>
            <MdOutlineDehaze className="sidebar-icon" />
          </button>
          <img
            src="/QuarterLogo.png"
            alt="J.E.N.I."
            className="sidebar-logo-img"
          />
          <h1>R.F.C.R</h1>
        </div>
        <ul>
          <li>
            <button onClick={goToHome}>
              <FaHome size={30} />
            </button>
          </li>
          <li>
            <button href="#table">
              <FaTable size={30} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
