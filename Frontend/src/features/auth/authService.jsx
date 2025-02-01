// import axios from "axios";
// import { base_url } from "../../utils/base_url";

// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// const config = {
//   headers: {
//     Authorization: `Bearer ${getTokenFromLocalStorage?.token}`,
//     Accept: "application/json",
//   },
// };

// const signup = async (user) => {
//   const response = await axios.post(`${base_url}user/create-user`, user);
//   if (response.data) {
//     localStorage.setItem("user", JSON.stringify(response.data));
//   }
//   return response.data;
// };

// const login = async (user) => {
//   const response = await axios.post(`${base_url}user/login`, user);
//   // console.log(response.data);
//   if (response.data) {
//     localStorage.setItem("user", JSON.stringify(response.data));
//   }
//   return response.data;
// };

// const authService = {
//   signup,
//   login,
// };

// export default authService;



import axios from "axios";
import { base_url } from "../../utils/base_url";


const getTokenFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).token : null;
};

// Axios configuration with token
const config = () => ({
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    Accept: "application/json",
  },
});


const signup = async (user) => {
  const response = await axios.post(`${base_url}user/create-user`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (user) => {
  try {
    const response = await axios.post(`${base_url}user/login`, user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

const logout = async () => {
  // Clear the user data from localStorage
  localStorage.removeItem('customer');

  // Optionally, invalidate session in backend if your API supports it
  const response = await axios.post(`${base_url}user/logout`, {}, config);
  if (response.data) {
    return response.data; // You can return the response if needed
  }
};

// const updateUserService = async (userData) => {
//   try {
//     const response = await axios.put(`${base_url}user/update-user`, userData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getTokenFromLocalStorage()}`,
//       },
//     });
//     console.log("Update response:", response);
//     return response.data; // Return the response data if successful
//   } catch (error) {
//     console.error("Error updating user:", error);
//     // Return a clear error message
//     throw error.response?.data || error.message || "Failed to update user";
//   }
// };

const updateUserService = async (userData) => {
  try {
    const response = await axios.put(`${base_url}user/update-user`, userData, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });
    
    // Merge updated fields with existing user data
    const updatedUser = {
      ...JSON.parse(localStorage.getItem("user")),
      ...response.data
    };
    
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
    
  } catch (error) {
    console.error("Update error:", error);
    throw error.response?.data || error.message;
  }
};


// Delete user service function
const deleteUserService = async () => {
  try {
    const response = await axios.delete(`${base_url}user/delete-user`, config());
    console.log(response)
    return response.data; // Return the response if successful
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(error.response?.data || error.message || "Failed to delete user");
  }
};



const authService = {
  signup,
  login,
  logout,
  updateUserService,
  deleteUserService
};

export default authService;
