const express = require("express");
const router = express.Router();
const db = require("../../database/db");

// Example: Fetch all users
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Vehicles");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
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

router.post("/RentVehicle", (req, res) => {
  const { startDate, endDate, insurance, customerID, vechileID } = req.body;

  const foo =
    "INSERT INTO Reservations (StartDate, EndDate, Insurance, CustomerID, Vehicle)" +
    "VALUES (?, ?, ?, ?, ?)";
  const values = [startDate, endDate, insurance, customerID, vechileID];

  db.query(foo, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    res
      .status(201)
      .json({ message: "Car added successfully", id: result.insertId });
  });
});

module.exports = router;
