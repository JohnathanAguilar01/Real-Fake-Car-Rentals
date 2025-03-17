import db from "../config/db.js";
import { RowDataPacket } from "mysql2";
import crypto from "crypto";
import bcrypt from "bcrypt";

// biome-ignore lint/complexity/noStaticOnlyClass: This class follows OOP patterns for learning purposes
export default class UserService {
  // updates the expire time for a session or makes a new one if no session exists
  private static async createOrUpdateSession(
    userId: number,
    inputSessionId: string | null = null,
  ) {
    try {
      if (!inputSessionId) {
        const sessionId: string = crypto.randomUUID();
        const addDaysToDate = (date: Date, days: number): string => {
          const futureDate = new Date(date);
          futureDate.setDate(futureDate.getDate() + days);

          // Format to YYYY-MM-DD
          const year = futureDate.getFullYear();
          const month = String(futureDate.getMonth() + 1).padStart(2, "0"); // Ensure two digits
          const day = String(futureDate.getDate()).padStart(2, "0"); // Ensure two digits

          return `${year}-${month}-${day}`;
        };

        // Example Usage
        const today: Date = new Date();
        const expireLogin: string = addDaysToDate(today, 5);

        const query: string =
          "INSERT INTO Sessions (session_id, user_id, expire_login) " +
          "VALUE (?,?,?)";
        const [results] = await db.query(query, [
          sessionId,
          userId,
          expireLogin,
        ]);
        console.log(results);
        return sessionId;
      }
      const sessionId: string | null = inputSessionId;
      const query: string =
        "UPDATE Sessions SET last_login = ? WHERE session_id = ?";
      const [results] = await db.query(query, [sessionId]);
      console.log(results);
      return sessionId;
    } catch (error) {
      console.error("Database error: ", error);
    }
  }

  static async sessionExists(sessionId: string) {
    const query: string =
      "SELECT COUNT(*) AS count FROM Sessions WHERE session_id = ?";
    const [results]: [RowDataPacket[], any] = await db.query(query, sessionId);
    return results[0].count > 0;
  }

  static async login(userId: number, password: string) {
    const query = "SELECT Password FROM Customers WHERE user_id = ?";
    const [results]: [RowDataPacket[], any] = await db.execute(query, userId);
    const storedHash = results[0].Password; // Notice capital P if it's case-sensitive

    const isMatch = await bcrypt.compare(password, storedHash);
    if (isMatch) {
      const sessionid = await this.createOrUpdateSession(userId);
      return sessionid;
    }
    return null;
  }

  static async logout(sessionId: string) {
    const query: string = "DELETE FROM Sessions WHERE session_id = ?";
    const [results]: any = await db.query(query, sessionId);
    return results.affectedRows;
  }
}
