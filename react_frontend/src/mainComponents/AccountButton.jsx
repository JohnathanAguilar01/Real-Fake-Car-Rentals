import React from "react";
import "./AccountButton.css"; // Import CSS for styling
import { MdAccountCircle } from "react-icons/md";

function AccountButton({ setIsOpen, isShown, children }) {
  if (!isShown) return null;

  return (
    <button className="button" onClick={() => setIsOpen(true)}>
      <MdAccountCircle className="button-actcir" />
      <div className="button-span">{children}</div>
    </button>
  );
}

export default AccountButton;
