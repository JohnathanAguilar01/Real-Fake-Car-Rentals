import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import UserController from "../controllers/user-controller";
const router = express.Router();
router.use(bodyParser.json());
router.use(cookieParser());

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.post("/signup", UserController.signup);

export default router;
