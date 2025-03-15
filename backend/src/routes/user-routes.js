import express from "express";
import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import crypto from "crypto";
import bcrypt from "bcrypt";
import db from "../db";
const router = express.Router();

router.use(bodyparser.json());
router.use(cookieparser());

const sessions = new Map();
const saltRounds = 5;

// generate a random uid
function generateSessionId() {
  return crypto.randomUUID();
}

// updates the expire time for a session or makes a new one if no session exists
async function createOrUpdateSession(username, inputSessionsId = null) {
  // Set expiration time to 2 days from now
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 2;

  // Use provided session ID or generate a new one
  let sessionsId = inputSessionsId || generateSessionId();

  // const [result] = await pool.query(query, [sessionsId, username]);Store session in the sessions map
  // sessions.set(sessionsId, { username, expiresAt });

  try {
    const query =
      "INSERT IGNORE INTO Sessions (SessionID, CustomerID) " +
      "SELECT ?, CustomerID FROM Customers WHERE UserName = ?";
    const [result] = await db.query(query, [sessionsId, username]);
  } catch (error) {
    console.error("Database error: ", error);
  }
  console.log(sessionsId);
  return sessionsId;
}

// function to remove all expired sessions
function removeexpiredsessions() {
  const currentdate = Date.now();
  for (let [sessionsid, session] of sessions) {
    if (session.expiresat < currentdate) {
      sessions.delete(sessionsid);
    }
  }
}

// middleware to refresh a session
function refreshsession(req, res, next) {
  removeexpiredsessions();

  const sessionid = req.cookies.sessionid;
  const session = sessions.get(sessionid);

  if (session) {
    createOrUpdateSession(session.username, sessionid);
    req.user = session;
  }

  next();
}

// middleware to check if user is logged in
async function authcheck(req, res, next) {
  const sessionid = req.cookies.sessionid;

  // Ensure sessionid is present and valid
  if (!sessionid || typeof sessionid !== "string" || sessionid.trim() === "") {
    return res.status(401).send("Unauthorized: No session ID provided");
  }

  const query =
    "SELECT COUNT(*) AS sessionExists FROM Sessions WHERE SessionID = ?";

  try {
    const [rows] = await db.query(query, [sessionid]);

    // Check if the session exists
    if (rows[0] && rows[0].sessionExists > 0) {
      return next();
    } else {
      return res.status(402).send("Unauthorized: Invalid session ID");
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

// login end point
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = "SELECT Password FROM Customers WHERE UserName = ?";
    const [results] = await db.execute(query, [username]);

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    const storedHash = results[0].Password; // Notice capital P if it's case-sensitive

    const isMatch = await bcrypt.compare(password, storedHash);
    if (isMatch) {
      const sessionid = await createOrUpdateSession(username);
      res.cookie("sessionid", String(sessionid), {
        secure: true,
        httponly: true,
        samesite: "none",
      });
      return res.json({ user: { username } });
    } else {
      return res.status(401).send("Incorrect User Information");
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal server error");
  }
});

router.post("/authCheck", authcheck, (req, res) => {
  res.sendStatus(200);
});

// logout end point
router.post("/logout", (req, res) => {
  const sessionid = req.cookies.sessionid;
  if (sessionid) {
    sessions.delete(sessionid);
  }
  res.clearCookie("sessionid");
  res.sendStatus(200);
});

// signup end point
router.post("/signup", (req, res) => {
  const { firstName, lastName, email, username, password, confirmPassword } =
    req.body;

  console.log(
    firstName +
      " " +
      lastName +
      " " +
      email +
      " " +
      username +
      " " +
      password +
      " " +
      confirmPassword,
  );
  if (password != confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).send("Missing information.");
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send("Internal server error");
    }

    const query =
      "INSERT INTO Customers (FirstName, LastName, Email, UserName, Password)" +
      "VALUES (?, ?, ?, ?, ?)";
    db.execute(query, [firstName, lastName, email, username, hash], (err) => {
      if (err) {
        return res.status(500).send("Database error.");
      }
      return res.status(201).send("User registered successfully");
    });
  });
});

export default router;
