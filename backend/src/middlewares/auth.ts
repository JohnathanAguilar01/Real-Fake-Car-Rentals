import { Request, Response, NextFunction } from "express";
import db from "../config/db.js";
import UserService from "../services/user-service.js";

// middleware to check if user is logged in
export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const sessionid = req.cookies.sessionid;
    // Ensure sessionid is present and valid
    if (
      !sessionid ||
      typeof sessionid !== "string" ||
      sessionid.trim() === ""
    ) {
      res.status(401).json({ error: "Unauthorized: No session ID provided" });
      return;
    }

    const exists: boolean = await UserService.sessionExists(sessionid);
    if (!exists) {
      res.status(401).json({ error: "Unauthorized: Invalid session ID" });
      return;
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

// middleware to refresh a session
export const refreshsession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const sessionid = req.cookies.sessionid;
    if (
      !sessionid ||
      typeof sessionid !== "string" ||
      sessionid.trim() === ""
    ) {
      next();
      return;
    }
    const sessionExist = await UserService.sessionExists(sessionid);

    if (sessionExist) {
      const query: string = "SELECT user_id FROM Sessions WHERE session_id = ?";
      const [results]: any = await db.query(query, [sessionid]);
      await UserService.createOrUpdateSession(results[0].user_id, sessionid);
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
