import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
// route imports
import VehiclesRoutes from "./routes/Vehicles.js";
import UserAuthRoutes from "./routes/UserAuth.js";

const app = express();

app.use(
  cors({
    origin: true, // Replace with your frontend's origin
    credentials: true, // Allow cookies and credentials
  }),
  cookieParser(),
);
app.use(express.json());

// Middleware to use Vehicles routes
app.use("/Vehicles", VehiclesRoutes);

// Middleware to use UserAuth routes
app.use("/UserAuth", UserAuthRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
