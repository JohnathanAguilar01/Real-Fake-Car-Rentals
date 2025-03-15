import express from "express";
import VehicleController from "../controllers/vehicle-controler";
const router = express.Router();

// Example: Fetch all users
router.get("/", async (req, res) => {
  try {
    const vehicles = await VehicleController.getAllVehicles();
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error:" + error);
  }
});

router.get("/available", async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;
    const vehicles = await VehicleController.getAvailableVehicles(
      type,
      startDate,
      endDate,
    );
    if (!vehicles) {
      res.status(404).json({ error: "No cars found" });
    }
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error:" + error);
  }
});

export default router;
