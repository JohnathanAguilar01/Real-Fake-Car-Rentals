const express = require("express");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const crypto = require("crypto");
const router = express.Router();

router.use(bodyparser.json());
router.use(cookieparser());

const users = [{ user: "johnnyaguilar", pw: "password" }];
const sessions = new Map();

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
    res.status(401).send("incorrect user credentials");
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

// logout end point
router.post("/logout", (req, res) => {
  const sessionid = req.cookies.sessionid;
  if (sessionid) {
    sessions.delete(sessionid);
  }
  res.clearCookie("sessionId");
  res.sendstatus(200);
});

module.exports = router;
