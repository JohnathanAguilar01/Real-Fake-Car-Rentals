import React from "react";
import "./VehicleCard.css";

function VehicleCard({
  carid,
  mileage,
  mpg,
  price,
  carYear,
  model,
  make,
  color,
  carType,
  startDate,
  endDate,
}) {
  function onRent() {
    console.log(carid);
    fetch("http://localhost:5000/Vehicles/RentVehicle", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
        insurance: 1,
        customerID: 1,
        vechileID: carid,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } else {
          console.log("Car Added");
        }
        return res.text();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error Validating Credentials:", error));
  }
  return (
    <div className="vehicle-card">
      <div className="vehicle-card-img-container">
        <img className="vehicle-card-img" src="/car.jpg" alt="car img" />
      </div>
      <div className="vehicle-card-info">
        <h3>
          {carYear} {make} {model}
        </h3>
        <p>Car ID: {carid}</p>
        <p>Mileage: {mileage} miles</p>
        <p>MPG: {mpg} miles per gallon</p>
        <p>Color: {color}</p>
        <p>Type: {carType}</p>
      </div>
      <div className="vehicle-card-price">
        <h3>Price: ${parseFloat(price).toFixed(2)}</h3>
        <button className="vehicle-card-rent" onClick={onRent}>
          Rent
        </button>
      </div>
    </div>
  );
}

export default VehicleCard;
