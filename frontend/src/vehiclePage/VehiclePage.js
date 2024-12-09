import React from "react";
import VehicleDisplay from "./VehicleDisplay.js";
import Layout from "../mainComponents/Layout.js";

function VehiclePage() {
  return (
    <div className="App">
      <Layout>
        <VehicleDisplay />
      </Layout>
    </div>
  );
}

export default VehiclePage;
