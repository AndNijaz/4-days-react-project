// Modal.js
import "../../index.css";
import React from "react";
import warning from "../../Assets/warning.png";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <img src={warning} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
