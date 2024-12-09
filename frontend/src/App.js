import React from "react";
import { Routes, Route } from "react-router-dom";
import VehiclePage from "./vehiclePage/VehiclePage.js";
import HomePage from "./homePage/HomePage.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<VehiclePage />} />
      </Routes>
    </div>
  );
}

export default App;
