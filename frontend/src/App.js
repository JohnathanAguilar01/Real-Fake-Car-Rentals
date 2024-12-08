import Navbar from "./NavBar.js";
import React from "react";
import SideBar from "./SideBar.js";
import SearchBar from "./SearchBar.js";
import VehicleDisplay from "./VehicleDisplay.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-navwrapper">
        <Navbar />
      </div>
      <div className="App-layout">
        <div className="App-sidebarwrapper">
          <SideBar />
        </div>
        <div className="App-searchbar">
          <SearchBar />
        </div>
        <div className="App-content">
          <VehicleDisplay />
        </div>
      </div>
    </div>
  );
}

export default App;
