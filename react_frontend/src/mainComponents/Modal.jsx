import React from "react";
import ReactDom from "react-dom";
import "./Modal.css";

function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="modal">
      <div className="modal-window">
        <button className="modal-close" onClick={onClose}>
          x
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.getElementById("modal"),
  );
}

export default Modal;
