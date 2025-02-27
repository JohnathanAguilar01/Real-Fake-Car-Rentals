import React, { useState } from "react";
require("dotenv").config({ path: "../.env" });
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Login.css";

function Login({ setIsShown, onClose, onSignUp }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isInputRight, setIsInputRight] = useState(true);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  function onLogin() {
    fetch(`${process.env.BACKEND_API_URL}/UserAuth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          setIsInputRight(false);
          throw new Error("Network response was not ok");
        } else {
          setIsShown();
          onClose();
          setIsInputRight(true);
        }
        return res.text();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error Validating Credentials:", error));
  }

  return (
    <>
      <div className="login">
        <div className="login-logo">
          <img className="login-logo-img" src="/HalfLogo.png" alt="logo" />
        </div>
        {!isInputRight && (
          <input
            type="text"
            placeholder="Invalid username or password."
            className="login-wrong-input"
          />
        )}
        <div className="login-textfeild">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "400px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              onChange={(foo) => {
                setUsername(foo.target.value);
              }}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "400px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              onChange={(foo) => {
                setPassword(foo.target.value);
              }}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </div>
        <button className="login-button" onClick={onLogin}>
          Login
        </button>
        <div className="login-signup-feild">
          <p>New user?</p>
          <p className="login-signup-button" onClick={onSignUp}>
            Sign Up
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
