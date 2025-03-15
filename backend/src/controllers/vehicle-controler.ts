import Vehicle from "../models/vehicle";
import db from "../config/db";

class VehicleController {
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
  ): Promise<Vehicle[] | null> {
    const query: string =
      "INSERT INTO Reservations (StartDate, EndDate, Insurance, CustomerID, Vehicle)" +
      "VALUES (?, ?, ?, ?, ?)";
    const values = [startDate, endDate, insurance, customerID, vehicleID];
    const [result]: any = await db.query(query, values);
    return result.length ? result[0] : null;
  }
}

export default VehicleController;
