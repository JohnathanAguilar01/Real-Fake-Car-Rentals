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
}) {
  return (
    <div className="vehicle-card">
      <h1>
        {carYear} {make} {model}
      </h1>
      <p>Car ID: {carid}</p>
      <p>Mileage: {mileage} miles</p>
      <p>MPG: {mpg} miles per gallon</p>
      <p>Price: ${parseFloat(price).toFixed(2)}</p>
      <p>Color: {color}</p>
      <p>Type: {carType}</p>
    </div>
  );
}

export default VehicleCard;
