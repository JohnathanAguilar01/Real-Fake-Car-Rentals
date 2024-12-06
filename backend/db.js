const db = require("../database/db");

// Example: Fetch all users
app.get("/Vehicles", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Vehicles");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
