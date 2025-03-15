import { Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user-controller.js";

// middleware to check if user is logged in
const authCheck = async (
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
      return res.status(401).send("Unauthorized: No session ID provided");
    }

    const exists: boolean = await UserController.sessionExists(sessionid);
    if (!exists) {
      return res.status(401).send("Unauthorized: Invalid session ID");
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
