import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SettingModal.css"

const DeleteModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth.deleteUser);

  const handleConfirmDelete = () => {
    dispatch(deleteUser())
      .then(() => {
        window.location.href = "/login";
        toast.success("Account deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete account:", error);
        toast.error("Failed to delete account. Please try again!");
      });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="setting-modal-overlay">
      <div className="setting-modal-container">
        <p className="setting-modal-text">Are you sure you want to delete your account?</p>
        <div className="setting-modal-actions">
          <button className="setting-modal-button setting-cancel" onClick={onClose}>
            No
          </button>
          <button
            className="setting-modal-button setting-confirm"
            onClick={handleConfirmDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;



// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteUser } from "../../features/auth/authSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./SettingModal.css";

// const DeleteModal = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth.deleteUser);

//   // Handle delete action
//   const handleConfirmDelete = () => {
//     dispatch(deleteUser())
//       .then(() => {
//         window.location.href = "/login";
//         toast.success("Account deleted successfully!");
//       })
//       .catch((error) => {
//         console.error("Failed to delete account:", error);
//         toast.error("Failed to delete account. Please try again!");
//       });
//     onClose(); // Close modal after action
//   };

//   // Only render modal when isOpen is true
//   if (!isOpen) return null;

//   return (
//     <div className="setting-modal-overlay">
//       <div className="setting-modal-container">
//         <p className="setting-modal-text">
//           Are you sure you want to delete your account?
//         </p>
//         <div className="setting-modal-actions">
//           <button className="setting-modal-button setting-cancel" onClick={onClose}>
//             No
//           </button>
//           <button
//             className="setting-modal-button setting-confirm"
//             onClick={handleConfirmDelete}
//             disabled={loading}
//           >
//             {loading ? "Deleting..." : "Yes"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteModal;
