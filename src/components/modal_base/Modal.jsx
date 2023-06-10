import React from "react";
import "./modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (isOpen) console.log("displayed");

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
