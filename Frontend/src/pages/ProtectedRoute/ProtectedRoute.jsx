import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

const ProtectedRoute = () => {
  // Access the authentication state from the Redux store
  const { user, isLoading, isError } = useSelector((state) => state.auth);

  // If authentication is in progress, show a loading indicator
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or animation
  }

  // If there was an error during authentication, show an error message
  if (isError) {
    return <div>Error: Please try again later.</div>; // Optional: Display error if needed
  }

  // If there is no user (not authenticated), redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the protected routes
  return <Outlet />;
};

export default ProtectedRoute;
