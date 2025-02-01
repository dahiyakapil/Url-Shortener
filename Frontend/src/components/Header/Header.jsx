import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  closeModal,
  createShortLink,
} from "../../features/links/linksSlice";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CreateShortLinkModal from "../../pages/Modal/CreateShortLinkModal";
import "./Header.css";
import { useLocation } from "react-router-dom";
import debounce from "lodash/debounce";

import {
  searchUrls,
  clearSearchResults,
} from "../../features/search/SearchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Add this hook
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { links, loading, error, isModalOpen } = useSelector(
    (state) => state.links // Accessing the Redux state (links slice)
  );

  // Function to open the Create New Short Link modal
  const handleCreateNewClick = () => {
    dispatch(openModal()); // Dispatch the openModal action to show the modal
  };

  // Handle the modal form submission
  const handleModalSubmit = (linkData) => {
    dispatch(createShortLink(linkData)) // Dispatching the action to create a short link
      .then(() => {
        toast.success("Short URL created successfully!"); // Success toast
      })
      .catch(() => {
        toast.error("Failed to create short URL."); // Error toast
      });
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logout()); // Dispatch logout action
      toast.success("Logged out successfully"); // Show success toast message
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Failed to logout"); // Show error toast message
    }
  };

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    }
    document.addEventListener("mousedown", handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, [dropdownRef]);

  // Fetch user data from Redux state
  const { user } = useSelector((state) => state.auth); // Access user data from auth slice
  const userName = user?.name || "User"; // Fallback to "User" if name is undefined

  // Function to get the initials of the user's name
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" "); // Split the name into parts (first name, last name)
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join(""); // Get the first letter of each part
    return initials.length > 2 ? initials.slice(0, 2) : initials; // If more than two initials, take the first two
  };

  // Get the initials of the logged-in user
  const userInitials = getInitials(user?.name);

  // Weather and date state
  const [weather, setWeather] = useState(null);
  // Greeting based on time of day
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  //-------------------Search
  // Search implementation
  const debouncedSearch = useRef(
    debounce((term) => {
      if (location.pathname === "/links") {
        if (term.trim()) {
          dispatch(searchUrls(term));
        } else {
          dispatch(clearSearchResults());
        }
      }
    }, 300)
  ).current;

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };
  // Formatted current date
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-header">
      <div className="header-left">
        <div className="greeting">
          <p>
            {weather && weather.main ? (
              <span>
                🌞 {getGreeting()}, {user?.name || "User"}! It's{" "}
                {Math.round(weather.main.temp)}&deg;C and{" "}
                {weather.weather[0].description} in {weather.name}.
                <span className="date"> {formattedDate}</span>
              </span>
            ) : (
              <span>
                🌞 {getGreeting()}, {user?.name || "User"}
              </span>
            )}
          </p>
          <p>
            <span className="date"> {formattedDate}</span>
          </p>
        </div>
        <div className="header-right">
          <button
            className="create-button"
            onClick={handleCreateNewClick}
            disabled={loading}
          >
            {loading ? "Creating..." : "+ Create new"}
          </button>

          <input
            type="text"
            className="search-bar"
            placeholder="Search by remarks"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {/* Profile Dropdown */}
          <div className="profile-container" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="profile-button">
              {userInitials || "SU"} {/* Display the initials */}
            </button>
            {isDropdownOpen && (
              <div className="logout-dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conditionally Render Modal */}
      {isModalOpen && (
        <CreateShortLinkModal
          onClose={() => dispatch(closeModal())}
          onSubmit={handleModalSubmit}
          error={error}
          loading={loading}
        />
      )}


      <ToastContainer />
    </div>
  );
};

export default Header;
