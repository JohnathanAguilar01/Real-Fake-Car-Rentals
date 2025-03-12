import React, { useState } from "react";
import { TextInput } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import "./SignUp.css";

function SignUp({ setIsShown, onClose, onLogin }) {
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
    fetch(`${import.meta.env.VITE_API_URL}/UserAuth/signup`, {
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
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
            size="lg"
            w={400}
            m={5}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
            size="lg"
            w={400}
            m={5}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            size="lg"
            w={400}
            m={5}
          />
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
          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            size="lg"
            w={400}
            m={5}
          />
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
