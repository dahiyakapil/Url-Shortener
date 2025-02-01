import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both fields!");
      return;
    }

    dispatch(login(formData)).then((action) => {
      if (action.type === "auth/admin-login/fulfilled") {
        toast.success("Login successful...");

        // ✅ Delay to ensure state update before navigation
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else if (action.type === "auth/admin-login/rejected") {
        toast.error(action.error?.message || "Login failed. Please try again.");
      }
    });
  };

  return (
    <div className="container">
      {/* Left Section - Image */}
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Right Section - Form */}
      <div className="right-section">
        <div className="top-right-nav">
          <button className="signup-btn">
            <Link to="/">SignUp</Link>
          </button>
          <button className="login-btn">Login</button>
        </div>

        <div className="form-container">
          <p className="login-text">Login</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email id"
              className="input-field"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
              onChange={handleChange}
              value={formData.password}
            />
            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {isError && <p className="error-message">{message}</p>}

          <p className="login-link">
            Don't have an account? <Link to="/">SignUp</Link>
          </p>
        </div>
      </div>

      {/* ToastContainer to render the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
