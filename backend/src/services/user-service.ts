import db from "../config/db.js";
import { User } from "../models/user.js";
import { RowDataPacket } from "mysql2";
import crypto from "crypto";
import bcrypt from "bcrypt";

// biome-ignore lint/complexity/noStaticOnlyClass: This class follows OOP patterns for learning purposes
export default class UserService {
  // updates the expire time for a session or makes a new one if no session exists
  private static addDaysToDate(date: Date, days: number): string {
    const futureDate = new Date(date);
    futureDate.setDate(futureDate.getDate() + days);

    // Format to YYYY-MM-DD
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(futureDate.getDate()).padStart(2, "0"); // Ensure two digits

    return `${year}-${month}-${day}`;
  }

  private static async createOrUpdateSession(
    userId: number,
    inputSessionId: string | null = null,
  ): Promise<string> {
    try {
      const today: Date = new Date();
      const expireLogin: string = UserService.addDaysToDate(today, 5);
      if (!inputSessionId) {
        const sessionId: string = crypto.randomUUID();
        const query: string =
          "INSERT INTO Sessions (session_id, user_id, expire_login, last_login) " +
          "VALUE (?,?,?,CURRENT_DATE())";
        const [results]: any = await db.query(query, [
          sessionId,
          userId,
          expireLogin,
        ]);
        return results.insertId;
      }
      const query: string =
        "UPDATE Sessions SET expire_login = ?, last_login = CURRENT_DATE() WHERE session_id = ?";
      const [results]: any = await db.query(query, [
        expireLogin,
        inputSessionId,
      ]);
      return results.insertId;
    } catch (error) {
      console.error("Database error: ", error);
      throw new Error("Error in database insert or update");
    }
  }

  static async sessionExists(sessionId: string): Promise<boolean> {
    try {
      const query: string =
        "SELECT COUNT(*) AS count FROM Sessions WHERE session_id = ?";
      const [results]: [RowDataPacket[], any] = await db.query(query, [
        sessionId,
      ]);
      return results[0].count > 0;
    } catch (error) {
      console.error("Database error checking session:", error);
      return false;
    }
  }

  static async login(userId: number, password: string): Promise<string | null> {
    const query = "SELECT Password FROM Customers WHERE user_id = ?";
    const [results]: [RowDataPacket[], any] = await db.execute(query, [userId]);
    const storedHash = results[0].Password; // Notice capital P if it's case-sensitive

    const isMatch = await bcrypt.compare(password, storedHash);
    if (isMatch) {
      const sessionid = await UserService.createOrUpdateSession(userId);
      return sessionid;
    }
    return null;
  }

  static async logout(sessionId: string): Promise<number> {
    const query: string = "DELETE FROM Sessions WHERE session_id = ?";
    const [results]: any = await db.query(query, [sessionId]);
    return results.affectedRows;
  }

  static async signup(
    user: User,
    confirmPassword: string,
  ): Promise<{ userId: number } | null> {
    if (user.password != confirmPassword) {
      throw new Error("Both passwords do not match");
    }

    const newUser = await User.createWithHashPassword(user);

    try {
      const query: string =
        "INSERT INTO Customers (FirstName, LastName, Email, UserName, Password)" +
        "VALUES (?, ?, ?, ?, ?)";
      const [results]: any = await db.query(query, [
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.userName,
        newUser.password,
      ]);
      return results.insertId ? { userId: results.insertId } : null;
    } catch (error) {
      console.error(error);
      throw new Error("Error in inserting new user into databse");
    }
  }
}
