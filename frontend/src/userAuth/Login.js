import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="login">
        <div className="login-logo">
          <img className="login-logo-img" src="/HalfLogo.png" alt="logo" />
        </div>
        <div className="login-textfeild">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "400px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="username" label="Username" variant="outlined" />
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
        <button className="login-button">Login</button>
      </div>
    </>
  );
}

export default Login;
