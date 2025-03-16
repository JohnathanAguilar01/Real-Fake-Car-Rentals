import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import UserController from "../controllers/user-controller.js";
const router = express.Router();
router.use(bodyParser.json());
router.use(cookieParser());

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

export default router;
