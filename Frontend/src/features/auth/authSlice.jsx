// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "./authService";

// // Get the user from localStorage if it exists
// const getUserfromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// // Signup Async thunk
// export const signup = createAsyncThunk(
//   "auth/signup",
//   async (user, thunkAPI) => {
//     try {
//       return await authService.signup(user);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data || error.message);
//     }
//   }
// );

// // Login Async thunk
// export const login = createAsyncThunk(
//   "auth/admin-login",
//   async (user, thunkAPI) => {
//     try {
//       const response = await authService.login(user);
//       return response; // Successfully returned data from login
//     } catch (error) {
//       // Handle the error by serializing the error message
//       const errorMessage =
//         error.response?.data?.message || error.message || "Login failed";
//       return thunkAPI.rejectWithValue(errorMessage); // Only return a string message
//     }
//   }
// );

// // Logout Reducer
// export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//   try {
//     authService.logout();
//     localStorage.removeItem("user");
//     return {};
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data || error.message);
//   }
// });

// // Update User
// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async (userData, thunkAPI) => {
//     try {
//       const response = await updateUserService(userData);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: getUserfromLocalStorage,
//     isError: false,
//     isLoading: false,
//     isSuccess: false,
//     message: "",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Signup Actions
//       .addCase(signup.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(signup.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.payload;
//       })

//       // Login Actions
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//       })
//       // .addCase(login.fulfilled, (state, action) => {
//       //   state.isLoading = false;
//       //   state.isSuccess = true;
//       //   state.user = action.payload;
//       // })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//         localStorage.setItem("user", JSON.stringify(action.payload)); // Store user
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.payload; // Only handle string messages
//       })

//       // Logout Actions
//       .addCase(logout.pending, (state) => {
//         state.isLoading = true;
//       })
//       // .addCase(logout.fulfilled, (state) => {
//       //   state.isLoading = false;
//       //   state.isSuccess = true;
//       //   state.user = null; // Clear the user from the Redux state
//       // })
//       .addCase(logout.fulfilled, (state) => {
//         state.isLoading = false;
//         state.isSuccess = false;
//         state.isError = false;
//         state.message = "";
//         state.user = null; // Clear user from Redux
//       })
//       .addCase(logout.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.payload;
//       })
//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default authSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get the user from localStorage if it exists
const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Signup Async thunk
export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      return await authService.signup(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

// Login Async thunk
export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      const response = await authService.login(user);
      return response; // Successfully returned data from login
    } catch (error) {
      // Handle the error by serializing the error message
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(errorMessage); // Only return a string message
    }
  }
);

// Logout Reducer
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    authService.logout();
    localStorage.removeItem("user");
    return {};
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data || error.message);
  }
});

// Update User
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.updateUserService(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.deleteUserService();
      // Clear user data from localStorage
      localStorage.removeItem("user");

      // Dispatch logout action to clear the Redux state
      dispatch(logout());

      return response; // Return the response if deletion is successful
    } catch (error) {
      return rejectWithValue(error.message); // Reject with the error message if something goes wrong
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserfromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    deleteUser: {
      loading: false,
      success: false,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup Actions
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Login Actions
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Store user
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload; // Only handle string messages
      })

      // Logout Actions
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.user = null; // Clear user from Redux
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Update User Actions
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true; // Track loading state
        state.isError = false; // Reset error state on new request
        state.message = ""; // Clear previous message
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Merge updates with existing user data
        state.user = {
          ...state.user,
          ...action.payload
        };
        
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false; // Loading is done
        state.isError = true; // Set error state
        state.isSuccess = false; // Reset success state
        state.message = action.payload || "Failed to update user"; // Handle failure message
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null; // Ensure the user is cleared after deletion
        state.message = "User deleted successfully";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to delete user";
      });
  },
});

export default authSlice.reducer;
