import React, { useState } from "react";
import { TextInput } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import "./Login.css";

function Login({ setIsShown, onClose, onSignUp }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isInputRight, setIsInputRight] = useState(true);

  function onLogin() {
    fetch(`${import.meta.env.VITE_API_URL}/UserAuth/login`, {
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
        <div className="login-textfeild"></div>
        <TextInput
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          size="lg"
          w={400}
          m={5}
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          size="lg"
          w={400}
          m={5}
        />
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
