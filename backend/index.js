const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const cookieParser = require("cookie-parser");

require("dotenv").config();

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
const VehiclesRoutes = require("./routes/Vehicles.js");
app.use("/Vehicles", VehiclesRoutes);

// Middleware to use UserAuth roustes
const UserAuthRoutes = require("./routes/UserAuth.js");
app.use("/UserAuth", UserAuthRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
