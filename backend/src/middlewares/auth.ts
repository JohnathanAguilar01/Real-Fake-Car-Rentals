import { Request, Response, NextFunction } from "express";
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
      res.status(401).send("Unauthorized: No session ID provided");
      return;
    }

    const exists: boolean = await UserService.sessionExists(sessionid);
    if (!exists) {
      res.status(401).send("Unauthorized: Invalid session ID");
      return;
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
