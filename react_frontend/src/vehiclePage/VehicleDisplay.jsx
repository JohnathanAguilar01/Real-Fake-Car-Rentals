import React, { useState, useEffect } from "react";
import VehicleCard from "./VehicleCard.jsx";
import "./VehicleDisplay.css";
import SearchBar from "./SearchBar.jsx";

function VehicleDisplay() {
  const [vehicles, setVehicles] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Type, setType] = useState("");
  const [ShowVehicles, setShowVehicles] = useState(false);

  useEffect(() => {
    // Only fetch if all required parameters are set
    if (StartDate && EndDate && Type) {
      fetch(
        `${import.meta.env.VITE_API_URL}/Vehicles/AvailableVehicles/${StartDate}/${EndDate}/${Type}`,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setVehicles(data))
        .catch((error) => console.error("Error fetching vehicle data:", error));
    }
  }, [StartDate, EndDate, Type]); // Dependencies: run effect whenever these change

  function setValues(start, end, type) {
    setStartDate(start);
    setEndDate(end);
    setType(type);
    setShowVehicles(true);
    console.log(`Start: ${start}, End: ${end}, Type: ${type}`);
  }

  return (
    <div className="vehicle-display">
      <div className="vehicle-display-searchbar">
        <SearchBar onSearch={setValues} />
      </div>

      {ShowVehicles && (
        <div className="vehicle-display-list">
          <h2>Search Results:</h2>
          <div className="vehicle-display-list-container">
            <div className="vehicle-display-grid">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.CarID} // Ensure a unique key
                  carid={vehicle.CarID}
                  mileage={vehicle.Mileage}
                  mpg={vehicle.MPG}
                  price={vehicle.Price}
                  carYear={vehicle.CarYear}
                  model={vehicle.Model}
                  make={vehicle.Make}
                  color={vehicle.Color}
                  carType={vehicle.CarType}
                  startDate={StartDate}
                  endDate={EndDate}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleDisplay;
