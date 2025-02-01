// src/components/Links/DeleteModal.jsx

import React from "react";
import ReactModal from "react-modal";
import "./DeleteModal.css"; // Importing the CSS file for styling

// Configure the modal to be attached to the root element
ReactModal.setAppElement("#root");

const DeleteModal = ({ visible, onCancel, onDelete, url }) => {
  return (
    <ReactModal
      isOpen={visible}
      onRequestClose={onCancel}
      className="delete-modal"
      overlayClassName="delete-modal-overlay"
    >
      <div className="delete-modal-content">
        <h3 className="text-content"> Are you sure, you want to remove it ? </h3>

        <div className="delete-modal-actions">
          <button className="delete-modal-cancel-btn" onClick={onCancel}>
            NO
          </button>
          <button
            className="delete-modal-confirm-btn"
            onClick={() => onDelete(url)}
          >
            YES
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default DeleteModal;
