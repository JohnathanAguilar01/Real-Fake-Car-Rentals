import React from "react";
import "./SideBar.css";
import { FaHome } from "react-icons/fa";
import { FaTable } from "react-icons/fa";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img
          src="/QuarterLogo.png"
          alt="J.E.N.I."
          className="sidebar-logo-img"
        />
      </div>
      <ul>
        <li>
          <a href="#home">
            <FaHome size={30} />
          </a>
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
