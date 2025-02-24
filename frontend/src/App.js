import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./mainComponents/NavBar.js";
import VehiclePage from "./vehiclePage/VehiclePage.js";
import HomePage from "./homePage/HomePage.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="routes">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<VehiclePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
