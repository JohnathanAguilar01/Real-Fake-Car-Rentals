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
        <button className="vehicle-card-rent">Rent</button>
      </div>
    </div>
  );
}

export default VehicleCard;
