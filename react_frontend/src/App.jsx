import React from "react";
import { Routes, Route } from "react-router-dom";
import { MantineProvider, Input } from "@mantine/core";
import NavBar from "./mainComponents/NavBar.jsx";
import VehiclePage from "./vehiclePage/VehiclePage.jsx";
import HomePage from "./homePage/HomePage.jsx";
import useDarkMode from "./DarkMode.js";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./App.css";

function App() {
  const isDarkMode = useDarkMode();

  return (
    <div className="App">
      <MantineProvider defaultColorScheme={isDarkMode ? "dark" : "light"}>
        <NavBar />
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
