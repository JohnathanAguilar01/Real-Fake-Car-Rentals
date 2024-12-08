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

module.exports = router;
