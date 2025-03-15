import db from "../config/db.js";
import crypto from "crypto";

// biome-ignore lint/complexity/noStaticOnlyClass: This class follows OOP patterns for learning purposes
export class UserController {
  // updates the expire time for a session or makes a new one if no session exists
  async createOrUpdateSession(
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
        const [result]: any = await db.query(query, [
          sessionId,
          userId,
          expireLogin,
        ]);
        console.log(result);
        return sessionId;
      }
      const sessionId: string | null = inputSessionId;
      const query: string =
        "UPDATE Sessions SET last_login = ? WHERE session_id = ?";
      const [result] = await db.query(query, [sessionId]);
      console.log(result);
      return sessionId;
    } catch (error) {
      console.error("Database error: ", error);
    }
  }
}
