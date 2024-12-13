import React from "react";
import Navbar from "./NavBar.js";
import SideBar from "./SideBar.js";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="Layout">
      <div className="Layout-sidebar-wrapper">
        <SideBar />
      </div>
      <div className="Layout-nav-wrapper">
        <Navbar />
      </div>
      <div className="Layout-child">{children}</div>
    </div>
  );
}

export default Layout;
