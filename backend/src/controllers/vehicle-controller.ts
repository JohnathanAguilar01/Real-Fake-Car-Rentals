import { Request, Response } from "express";
import VehicleService from "../services/vehicle-service.js";
import Utils from "../utility/utils.js";

export default class VehicleController {
  static async getAllVehicles(req: Request, res: Response) {
    try {
      const vehicles = await VehicleService.getAllVehicles();
      res.json(vehicles);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error:" + error);
    }
  }

  static async getAvailableVehicles(req: Request, res: Response) {
    try {
      const type: string = (req.query.type as string) ?? "";
      const startDate: string = (req.query.startDate as string) ?? "";
      const endDate: string = (req.query.endDate as string) ?? "";

      if (
        !Utils.isValidMySQLDate(startDate) ||
        !Utils.isValidMySQLDate(endDate)
      ) {
        res.status(400).json({ error: "Invalid date format" });
        return;
      }

      const vehicles = await VehicleService.getAvailableVehicles(
        type,
        startDate,
        endDate,
      );
      if (!vehicles || vehicles.length === 0) {
        res.status(404).json({ error: "No cars found" });
        return;
      }
      res.json(vehicles);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while searching for available vehicles",
      });
    }
  }
}
