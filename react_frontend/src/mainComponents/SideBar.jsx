import React from "react";
import ReactDom from "react-dom";
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

  return ReactDom.createPortal(
    <div className="modal">
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
    </div>,
    document.getElementById("modal"),
  );
}

export default SideBar;
