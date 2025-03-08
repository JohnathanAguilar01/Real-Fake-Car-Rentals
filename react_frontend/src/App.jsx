import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./mainComponents/NavBar.jsx";
import VehiclePage from "./vehiclePage/VehiclePage.jsx";
import HomePage from "./homePage/HomePage.jsx";
import "./App.css";
import "./DarkMode.js";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import useDarkMode from "./DarkMode.js";
import { MantineProvider, Input } from "@mantine/core";

function App() {
  const isDarkMode = useDarkMode();

  return (
    <div className="App">
      <NavBar />
      <MantineProvider defaultColorScheme={isDarkMode ? "dark" : "light"}>
        <div className="routes">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<VehiclePage />} />
          </Routes>
        </div>
      </MantineProvider>
    </div>
  );
}

export default App;
