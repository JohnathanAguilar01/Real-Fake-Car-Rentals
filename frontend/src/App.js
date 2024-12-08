import Navbar from "./NavBar.js";
import React, { useState } from "react";
import SideBar from "./SideBar.js";
import SearchBar from "./SearchBar.js";
import VehicleDisplay from "./VehicleDisplay.js";
import "./App.css";

function App() {
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Type, setType] = useState("");
  const [ShowVehicles, setShowVehicles] = useState(false);

  function setValues(start, end, type) {
    setStartDate(start);
    setEndDate(end);
    setType(type);
  }

  const onSearchClick = () => {
    setShowVehicles(true);
    console.log(StartDate + " " + EndDate + " " + Type);
  };

  return (
    <div className="App">
      <div className="App-navwrapper">
        <Navbar />
      </div>
      <div className="App-sidebarwrapper">
        <SideBar />
      </div>
      <div className="App-layout">
        <div className="App-searchbar">
          <SearchBar onSearch={setValues} onClick={onSearchClick} />
        </div>
        <div className="App-content">
          {ShowVehicles && (
            <VehicleDisplay
              StartDate={StartDate}
              EndDate={EndDate}
              Type={Type}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
