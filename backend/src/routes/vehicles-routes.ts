import express from "express";
import VehicleController from "../controllers/vehicle-controller";
const router = express.Router();

// Example: Fetch all users
router.get("/", VehicleController.getAllVehicles);
router.get("/available", VehicleController.getAvailableVehicles);

export default router;
