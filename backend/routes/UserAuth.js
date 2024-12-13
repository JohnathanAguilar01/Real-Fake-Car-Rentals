const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(bodyParser.json());
router.use(cookieParser());

const users = [{ user: "johnnyaguilar", pw: "password" }];
const sessions = new Map();

// check to see if login credentials are correct
function credentialsCheck(username, password) {
  var foo = true;
  user = users.find((user) => user.user === username && user.pw === password);
  if (!user) {
    foo = false;
  }
  return foo;
}

// generate a random UID
function generateSessionId() {
  return crypto.randomUUID();
}

// updates the expire time for a session or makes a new one if no session exists
function createOrUpdateSession(username, inputSessionsId = null) {
  // set expiresAt to 2 days
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 2;

  if (inputSessionsId) {
    const sessionsId = inputSessionsId;
  } else {
    const sessionsId = generateSessionId();
  }

  sessions.set(sessionsId, { username, expiresAt });
  return sessionsId;
}

// function to remove all expired sessions
function removeExpiredSessions() {
  const currentDate = Date.now();
  for (let [sessionsId, session] of sessions) {
    if (session.expiresAt < currentDate) {
      sessions.delete(sessionsId);
    }
  }
}

// Middleware to refresh a session
function refreshSession(req, res, next) {
  removeExpiredSessions();

  const sessionId = req.cookies.sessionId;
  const session = sessions.get(sessionsId);

  if (session) {
    createOrUpdateSession(session.username, sessionsId);
    req.user = session;
  }

  next();
}

// Middleware to check if user is logged in
function authCheck(req, res, next) {
  const sessionId = req.cookies.sessionId;
  const session = sessions.get(sessionId);

  if (session) {
    req.user = session;
    next();
  } else {
    res.status(401).send("Incorrect User Credentials");
  }
}

// login end point
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const credentialsCheck = credentialsCheck(username, password);

  if (credentialsCheck) {
    const sessionId = createOrUpdateSession(username);
    res.cookie("sessionId", sessionId, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.json({ user: { username } });
  } else {
    send.status(401).send("Incorrect User Information");
  }
});

// logout end point
router.post("/logout", (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.clearCookie(sessionId);
  res.sendStatus(200);
});
