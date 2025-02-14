const express = require("express");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../../database/db");

router.use(bodyparser.json());
router.use(cookieparser());

const users = [{ user: "johnnyaguilar", pw: "password" }];
const sessions = new Map();
const saltRounds = 5;

// check to see if login credentials are correct
function credentialscheck(username, password) {
  var foo = true;
  user = users.find((user) => user.user === username && user.pw === password);
  if (!user) {
    foo = false;
  }
  return foo;
}

// generate a random uid
function generateSessionId() {
  return crypto.randomUUID();
}

// updates the expire time for a session or makes a new one if no session exists
function createOrUpdateSession(username, inputSessionsId = null) {
  // Set expiration time to 2 days from now
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 2;

  // Use provided session ID or generate a new one
  let sessionsId = inputSessionsId || generateSessionId();

  // Store session in the sessions map
  sessions.set(sessionsId, { username, expiresAt });

  return sessionsId;
}

// function to remove all expired sessions
function removeexpiredsessions() {
  const currentdate = date.now();
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
    createorupdatesession(session.username, sessionsid);
    req.user = session;
  }

  next();
}

// middleware to check if user is logged in
function authcheck(req, res, next) {
  const sessionid = req.cookies.sessionid;
  const session = sessions.get(sessionid);

  if (session) {
    req.user = session;
    next();
  } else {
    return res.status(401).send("incorrect user credentials");
  }
}

// login end point
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const isvalid = credentialscheck(username, password);
  console.log(isvalid);

  if (isvalid) {
    const sessionid = createOrUpdateSession(username);
    res.cookie("sessionid", sessionid, {
      secure: true,
      httponly: true,
      samesite: "none",
    });
    res.json({ user: { username } });
  } else {
    res.status(401).send("Incorrect User Information");
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
  res.clearCookie("sessionId");
  res.sendStatus(200);
});

// signup end point
router.post("/signup", (req, res) => {
  const { firstName, lastName, email, username, password, confirmPassword } =
    req.body;

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

module.exports = router;
