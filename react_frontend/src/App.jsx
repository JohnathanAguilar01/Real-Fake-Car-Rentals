import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./mainComponents/NavBar.jsx";
import VehiclePage from "./vehiclePage/VehiclePage.jsx";
import HomePage from "./homePage/HomePage.jsx";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <div className="routes">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<VehiclePage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
