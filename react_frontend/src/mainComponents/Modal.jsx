import React from "react";
import "./Modal.css";

function Modal({ open, children, onClose }) {
  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-window">
        <button className="modal-close" onClick={onClose}>
          x
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
