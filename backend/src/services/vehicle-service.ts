import Vehicle from "../models/vehicle.js";
import db from "../config/db.js";
import { throws } from "assert";

// biome-ignore lint/complexity/noStaticOnlyClass: This class follows OOP patterns for learning purposes
export default class VehicleService {
  static async getAllVehicles(): Promise<Vehicle[]> {
    const [result]: any = await db.query("SELECT * FROM Vehicles");
    return result;
  }

  static async getAvailableVehicles(
    type: string,
    startDate: string,
    endDate: string,
  ): Promise<Vehicle[]> {
    const query: string =
      "select CarID, Mileage, MPG, Price, CarYear, Model, Make, Color, CarType, VIN from Vehicles " +
      "where CarType = ? and " +
      "CarId not in " +
      "(select Vehicle from Reservations " +
      "where ? < EndDate and " +
      "? > StartDate)";
    const [result]: any = await db.query(query, [type, startDate, endDate]);
    return result;
  }

  static async rentVehicle(
    startDate: string,
    endDate: string,
    insurance: boolean,
    customerID: number,
    vehicleID: number,
  ): Promise<{ reservationsId: number } | null> {
    try {
      const query: string =
        "INSERT INTO Reservations (StartDate, EndDate, Insurance, CustomerID, Vehicle)" +
        "VALUES (?, ?, ?, ?, ?)";
      const values = [startDate, endDate, insurance, customerID, vehicleID];
      const [result]: any = await db.query(query, values);
      return result.insertId ? { reservationsId: result.insertId } : null;
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  }
}
