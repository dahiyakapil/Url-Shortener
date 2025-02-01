import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import img1 from "../../assets/Dashboard-Images/img1.png";
import img1Active from "../../assets/Dashboard-Images/activeDashboard.png";
import img2 from "../../assets/Dashboard-Images/img2.svg";
import img2Active from "../../assets/Dashboard-Images/activeLink.png";
import img3 from "../../assets/Dashboard-Images/img3.svg";
import img3Active from "../../assets/Dashboard-Images/activeAnalytics.png";
import img4 from "../../assets/Dashboard-Images/img4.svg";
import img4Active from "../../assets/Dashboard-Images/activeSetting.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="dashboard-items">
        <div
          className={`item1 ${activeLink === "/dashboard" ? "active" : ""}`}
          onClick={() => handleNavigation("/dashboard")}
        >
          <img
            className="icon1"
            src={activeLink === "/dashboard" ? img1Active : img1}
            alt="dashboard"
          />
          <p>Dashboard</p>
        </div>

        <div
          className={`item2 ${activeLink === "/links" ? "active" : ""}`}
          onClick={() => handleNavigation("/links")}
        >
          <img
            className="icon2"
            src={activeLink === "/links" ? img2Active : img2}
            alt="Links"
          />
          <p>Links</p>
        </div>

        <div
          className={`item3 ${activeLink === "/analytics" ? "active" : ""}`}
          onClick={() => handleNavigation("/analytics")}
        >
          <img
            className="icon3"
            src={activeLink === "/analytics" ? img3Active : img3}
            alt="Analytics"
          />
          <p>Analytics</p>
        </div>

        <div
          className={`setting ${activeLink === "/settings" ? "active" : ""}`}
          onClick={() => handleNavigation("/settings")}
        >
          <img
          className="icon4"
            src={activeLink === "/settings" ? img4Active : img4}
            alt="Setting"
          />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
