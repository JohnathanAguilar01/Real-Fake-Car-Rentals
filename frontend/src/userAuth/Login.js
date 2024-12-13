import React from "react";
import ReactDom from "react-dom";
import "./Login.css";

function Login({ open, children, onClose }) {
  console.log("Login component rendered. Open:", open); // Debug line
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="login">
      <div className="login-window">
        <p>{children}</p>
        <button className="login-close" onClick={onClose}>
          X
        </button>
      </div>
    </div>,
    document.getElementById("login"),
  );
}

export default Login;
