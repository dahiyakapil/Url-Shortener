import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, logout } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Setting.css";
import DeleteModal from "./SettingModal";

const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // ✅ Get user data from Redux store
  const user = useSelector((state) => state.auth.user);
  const updatedUser = useSelector((state) => state.auth.user.updateuser); // ✅ Get updated user

  // ✅ State variables for form fields
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  
  const [originalEmail, setOriginalEmail] = useState(user?.email || "");
  const [originalMobile, setOriginalMobile] = useState(user?.mobile || "");
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Sync local state with updatedUser when it's available
  useEffect(() => {
    if (updatedUser) {
      setName(updatedUser.name || "");
      setEmail(updatedUser.email || "");
      setMobile(updatedUser.mobile || "");
      setOriginalEmail(updatedUser.email || "");
      setOriginalMobile(updatedUser.mobile || "");
    }
  }, [updatedUser]); // ✅ Runs whenever updatedUser changes

  const handleSaveChanges = async () => {
    if (!name.trim() || !email.trim() || !mobile.trim()) {
      toast.error("All fields are required!");
      return;
    }

    // ✅ Validate mobile number (only 10 digits allowed)
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Mobile number must be exactly 10 digits!");
      return;
    }

    try {
      const response = await dispatch(updateUser({ name, email, mobile })).unwrap();
      toast.success(response.message || "Profile updated successfully!");

      // ✅ Ensure the input fields get updated data
      setName(response.name || "");
      setEmail(response.email || "");
      setMobile(response.mobile || "");
      setOriginalEmail(response.email || "");
      setOriginalMobile(response.mobile || "");

      // ✅ Log out if email is changed
      if (email !== originalEmail) {
        toast.info("Email updated! Logging out...");
        setTimeout(() => {
          dispatch(logout());
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again!");
    }
  };

  return (
    <div className="account-settings">
      <form className="settings-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // ✅ Allow only numbers
              if (value.length <= 10) {
                setMobile(value);
              }
            }}
            placeholder="Enter your 10-digit mobile number"
          />
        </div>
        <div className="button-group">
          <button className="save-button" type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button className="delete-button" type="button" onClick={() => setIsModalOpen(true)}>
            Delete Account
          </button>
        </div>
      </form>
      <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ToastContainer />
    </div>
  );
};

export default Setting;
