import React, { useState, useEffect } from "react";
import VehicleCard from "./VehicleCard.js";
import "./VehicleDisplay.css";

function VehicleDisplay({ StartDate, EndDate, Type }) {
  const [vehicles, setVechicles] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:5000/Vehicles/AvailableVehicles/${StartDate}/${EndDate}/${Type}`,
    )
      .then((response) => response.json())
      .then((data) => setVechicles(data))
      .catch((error) => console.error("Error fetching vehicle data:", error));
  }, []);

  return (
    <div className="vehicle-display" id="vehicle-display">
      <h2>Search Results:</h2>
      <div className="vehicle-display-list-container">
        <div className="vehicle-display-list">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VehicleDisplay;
