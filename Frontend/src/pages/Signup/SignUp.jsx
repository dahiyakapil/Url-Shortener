import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      // ✅ Allow only numbers and restrict to 10 digits
      const sanitizedValue = value.replace(/\D/g, "");
      if (sanitizedValue.length <= 10) {
        setFormData({ ...formData, [name]: sanitizedValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Form Validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Mobile number must be exactly 10 digits!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // ✅ Dispatch signup action
    dispatch(signup(formData)).then((action) => {
      if (action.type === "auth/signup/fulfilled") {
        toast.success("Signup successful! Redirecting to login...");
        
        // ✅ Wait 2 seconds before navigating to login
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (action.type === "auth/signup/rejected") {
        toast.error(message || "Signup failed. Please try again.");
      }
    });
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="right-section">
        <div className="top-right-nav">
          <button className="signup-btn">SignUp</button>
          <button className="login-btn">
            <Link to="/login">Login</Link>
          </button>
        </div>

        <div className="form-container">
          <h4>Join us Today!</h4>

          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-field"
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="email"
              name="email"
              placeholder="Email id"
              className="input-field"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile no."
              className="input-field"
              onChange={handleChange}
              value={formData.mobile}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
              onChange={handleChange}
              value={formData.password}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input-field"
              onChange={handleChange}
              value={formData.confirmPassword}
            />
            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          {isError && <p className="error-message">{message}</p>}

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {/* ✅ ToastContainer to display messages */}
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
