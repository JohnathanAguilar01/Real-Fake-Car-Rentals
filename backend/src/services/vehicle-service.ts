import Vehicle from "../models/vehicle";
import db from "../config/db";

// biome-ignore lint/complexity/noStaticOnlyClass: This class follows OOP patterns for learning purposes
export default class VehicleService {
  static async getAllVehicles(): Promise<Vehicle[]> {
    const result: any = await db.query("SELECT * FROM Cars");
    return result;
  }

  static async getAvailableVehicles(
    type: string,
    startDate: string,
    endDate: string,
  ): Promise<Vehicle[]> {
    const query: string =
      "SELECT car_id, mileage, mpg, price, car_year, model, make, color, car_type, vin from Cars " +
      "WHERE car_type = ? AND " +
      "car_id NOT IN " +
      "(SELECT car_id from Reservations " +
      "WHERE ? < end_date AND " +
      "? > start_date)";
    const [result]: any = await db.query(query, [type, startDate, endDate]);
    return result;
  }

  static async rentVehicle(
    startDate: string,
    endDate: string,
    insurance: boolean,
    userId: number,
    carId: number,
  ): Promise<{ reservationsId: number } | null> {
    try {
      const query: string =
        "INSERT INTO Reservations (start_date, end_date, insurance, user_id, car_id)" +
        "VALUES (?, ?, ?, ?, ?)";
      const values = [startDate, endDate, insurance, userId, carId];
      const [result]: any = await db.query(query, values);
      return result.insertId ? { reservationsId: result.insertId } : null;
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  }
}
