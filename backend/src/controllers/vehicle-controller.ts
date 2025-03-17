import { Request, Response } from "express";
import VehicleService from "../services/vehicle-service.js";

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

      const vehicles = await VehicleService.getAvailableVehicles(
        type,
        startDate,
        endDate,
      );
      if (!vehicles) {
        res.status(404).json({ error: "No cars found" });
        return;
      }
      res.json(vehicles);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error:" + error);
    }
  }
}
