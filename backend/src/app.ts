import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
// route imports
import vehiclesRoutes from "./routes/vehicles-routes";
import userRoutes from "./routes/user-routes";

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
app.use("/vehicles", vehiclesRoutes);

// Middleware to use UserAuth routes
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
