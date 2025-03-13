import express from "express";
import db from "../db.js";
const router = express.Router();

// Example: Fetch all users
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Vehicles");
    res.json(rows);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send("Server error: this big bad");
  }
});

router.get("/AvailableVehicles/:StartDate/:EndDate/:Type", async (req, res) => {
  try {
    const StartDate = req.params.StartDate;
    const EndDate = req.params.EndDate;
    const Type = req.params.Type;
    const foo =
      "select CarID, Mileage, MPG, Price, CarYear, Model, Make, Color, CarType, VIN from Vehicles " +
      "where CarType = ? and " +
      "CarId not in " +
      "(select Vehicle from Reservations " +
      "where ? < EndDate and " +
      "? > StartDate)";
    const [rows] = await db.query(foo, [Type, StartDate, EndDate]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/RentVehicle", async (req, res) => {
  try {
    const { startDate, endDate, insurance, customerID, vehicleID } = req.body;
    const foo =
      "INSERT INTO Reservations (StartDate, EndDate, Insurance, CustomerID, Vehicle)" +
      "VALUES (?, ?, ?, ?, ?)";
    const values = [startDate, endDate, insurance, customerID, vehicleID];

    const [result] = await db.query(foo, values);
    res
      .status(201)
      .json({ message: "Car added successfully", id: result.insertId });
  } catch (err) {
    console.error("Error inserting data:", err.message);
    return res.status(500).json({ error: "Database error" });
  }
});

export default router;
