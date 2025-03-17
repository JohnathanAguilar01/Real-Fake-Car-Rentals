import { Request, Response } from "express";
import UserService from "../services/user-service.js";
import { TUser } from "../models/user.js";

// biome-ignore lint/complexity/noStaticOnlyClass: This class follows OOP patterns for learning purposes
export default class UserController {
  static async login(req: Request, res: Response) {
    try {
      const { id, password }: Pick<TUser, "id" | "password"> = req.body;
      if (!id || !password) {
        res.status(400).json({ error: "No user id or password recived" });
        return;
      }
      const sessionid = await UserService.login(id, password);
      if (!sessionid) {
        res.status(401).json({ error: "User not found" });
        return;
      }
      res.cookie("sessionid", String(sessionid), {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });
      res.json({ user: { id } });
      return;
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send("Internal server error");
    }
  }

  static async logout(req: Request, res: Response) {
    const sessionid = req.cookies.sessionid;
    if (!sessionid) {
      res.status(400).json({ error: "No session id recived" });
    }
    res.clearCookie("sessionid");
    res.sendStatus(200);
  }
}
