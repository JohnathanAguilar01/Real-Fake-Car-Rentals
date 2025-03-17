import { Request, Response } from "express";
import UserService from "../services/user-service.js";
import { TUser, User } from "../models/user.js";

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
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async logout(req: Request, res: Response) {
    const sessionid = req.cookies.sessionid;
    if (!sessionid) {
      res.status(400).json({ error: "No session id recived" });
      return;
    }
    try {
      await UserService.logout(sessionid);
      res.clearCookie("sessionid");
      res.sendStatus(200);
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async signup(req: Request, res: Response) {
    try {
      const { userInput, confirmPassword } = req.body as {
        userInput: TUser;
        confirmPassword: string;
      };
      const newUser: User = await UserService.signup(
        userInput,
        confirmPassword,
      );
      res.status(200).json({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        userName: newUser.userName,
        id: newUser.id,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "PASSWORDS_DO_NOT_MATCH") {
          res.status(400).json({ error: "Passwords do not match" });
          return;
        }
      }

      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
