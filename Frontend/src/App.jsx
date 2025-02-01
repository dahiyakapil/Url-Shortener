
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/newDash/NewDash";
import Links from "./pages/Links/LinksCreated";
import Analytics from "./pages/newAnalytics/NewAnalytics";
import "./App.css";
import MainLayout from "./components/MainLayout/MainLayout";
import SignupPage from "./pages/Signup/SignUp";
import Login from "./pages/login/Login";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import Setting from "./pages/Setting/Setting";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        
        <Route path="/login" element={<Login />} />

        {/* Protected routes wrapped with MainLayout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/links" element={<Links />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Setting />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
