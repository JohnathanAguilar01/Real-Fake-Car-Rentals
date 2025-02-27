import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "./SignUp.css";

function SignUp({ setIsShown, onClose, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isInputRight, setIsInputRight] = useState(true);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  function onSignup() {
    fetch(`${process.env.REACT_APP_API_URL}/UserAuth/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
      }),
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
      <div className="signup">
        <img className="signup-logo-img" src="/HalfLogo.png" alt="logo" />
        {!isInputRight && (
          <input
            type="text"
            placeholder="Missing input or password do not match."
            className="signup-wrong-input"
          />
        )}
        <div className="signup-textfeild">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "400px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              onChange={(foo) => {
                setFirstName(foo.target.value);
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
              id="last-name"
              label="Last Name"
              variant="outlined"
              onChange={(foo) => {
                setLastName(foo.target.value);
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
              id="email"
              label="Email"
              variant="outlined"
              onChange={(foo) => {
                setEmail(foo.target.value);
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
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "400px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="confirm-password"
              label="Confirm Password"
              variant="outlined"
              onChange={(foo) => {
                setConfirmPassword(foo.target.value);
              }}
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </div>
        <button className="signup-button" onClick={onSignup}>
          Sign Up
        </button>
        <div className="signup-login-feild">
          <p>New user?</p>
          <p className="signup-login-button" onClick={onLogin}>
            Login
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
