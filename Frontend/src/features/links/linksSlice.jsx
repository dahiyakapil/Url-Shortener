// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { createShortLink as createShortLinkService } from "../links/linksService"; // Importing the linkService

// // Initial state for the slice
// const initialState = {
//   shortUrl: null,
//   loading: false,
//   error: null,
//   isModalOpen: false, // Add this to track modal visibility
// };

// // Async thunk for creating the short link
// export const createShortLink = createAsyncThunk(
//   "links/createShortLink",
//   async (linkData, { rejectWithValue }) => {
//     try {
//       const data = await createShortLinkService(linkData);
//       return data; // Assuming the response contains the short URL
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // linkSlice
// const linkSlice = createSlice({
//   name: "links",
//   initialState,
//   reducers: {
//     openModal(state) {
//       state.isModalOpen = true;
//     },
//     closeModal(state) {
//       state.isModalOpen = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createShortLink.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createShortLink.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shortUrl = action.payload.shortUrl; // Assuming the API response contains the short URL
//       })
//       .addCase(createShortLink.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { openModal, closeModal } = linkSlice.actions;
// export default linkSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { createShortLink as createShortLinkService, getAllShortUrls } from "../links/linksService"; // Importing linkService

// // Initial state for the slice
// const initialState = {
//   shortUrls: [], // Store the list of short URLs
//   shortUrl: null,
//   loading: false,
//   error: null,
//   isModalOpen: false, // Add this to track modal visibility
// };

// // Async thunk for creating the short link
// export const createShortLink = createAsyncThunk(
//   "links/createShortLink",
//   async (linkData, { rejectWithValue }) => {
//     try {
//       const data = await createShortLinkService(linkData);
//       return data; // Assuming the response contains the short URL
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for getting all the short URLs
// export const getAllShortLinks = createAsyncThunk(
//   "links/getAllShortLinks",
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getAllShortUrls(); // Fetch the list of short links
//       return data; // Assuming the response contains the list of short URLs
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // linkSlice
// const linkSlice = createSlice({
//   name: "links",
//   initialState,
//   reducers: {
//     openModal(state) {
//       state.isModalOpen = true;
//     },
//     closeModal(state) {
//       state.isModalOpen = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // For creating short link
//       .addCase(createShortLink.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createShortLink.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shortUrl = action.payload.shortUrl; // Assuming the API response contains the short URL
//       })
//       .addCase(createShortLink.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // For fetching all short links
//       .addCase(getAllShortLinks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllShortLinks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shortUrls = action.payload; // Assuming the response contains the list of short URLs
//       })
//       .addCase(getAllShortLinks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { openModal, closeModal } = linkSlice.actions;
// export default linkSlice.reducer;

// linkSlice.js

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   createShortLink as createShortLinkService,
//   getAllShortUrls,
// } from "../links/linksService"; // Importing both services

// // Initial state for the slice
// const initialState = {
//   shortUrls: [], // For storing all short links
//   loading: false,
//   error: null,
//   isModalOpen: false, // Modal visibility state
// };

// // Async thunk for creating the short link
// export const createShortLink = createAsyncThunk(
//   "links/createShortLink",
//   async (linkData, { rejectWithValue }) => {
//     try {
//       const data = await createShortLinkService(linkData);
//       return data; // Assuming the response contains the short URL
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for getting all short links
// export const fetchAllShortUrls = createAsyncThunk(
//   "links/fetchAllShortUrls",
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getAllShortUrls(); // This calls the service function
//       return data; // Assuming the response contains the list of short URLs
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Update a short URL
// export const updateShortUrl = createAsyncThunk(
//   "links/updateShortUrl",
//   async ({ shortURLId, updateData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${base_url}urls/${shortURLId}`,
//         updateData
//       );
//       return response.data.updatedUrl; // Assuming API returns the updated short URL object
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to update short URL"
//       );
//     }
//   }
// );

// // Delete a short URL
// export const deleteShortUrl = createAsyncThunk(
//   "links/deleteShortUrl",
//   async (shortURLId, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`${base_url}urls/${shortURLId}`);
//       return shortURLId; // Return the ID of the deleted short URL
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to delete short URL"
//       );
//     }
//   }
// );

// // linkSlice
// const linkSlice = createSlice({
//   name: "links",
//   initialState,
//   reducers: {
//     openModal(state) {
//       state.isModalOpen = true;
//     },
//     closeModal(state) {
//       state.isModalOpen = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createShortLink.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createShortLink.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shortUrl = action.payload.shortUrl; // Assuming the API response contains the short URL
//       })
//       .addCase(createShortLink.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchAllShortUrls.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllShortUrls.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shortUrls = action.payload; // Store the list of short links
//       })
//       .addCase(fetchAllShortUrls.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { openModal, closeModal } = linkSlice.actions;
// export default linkSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   createShortLink as createShortLinkService,
//   getAllShortUrls,
//   editShortUrl,
//   deleteShortUrl as deleteShortUrlService,
//   fetchTotalClicks,
//   fetchDateWiseClicks,
//   fetchClickDevices,
// } from "../links/linksService";

// // Initial state
// // const initialState = {
// //   shortUrls: [], // List of short URLs
// //   loading: false, // Loading state
// //   error: null, // Error messages
// //   isModalOpen: false, // Modal visibility
// // };

// const initialState = {
//   shortUrls: [],
//   totalClicks: 0,
//   dateWiseClicks: [],
//   clickDevices: [],
//   loading: false,
//   error: null,
//   isModalOpen: false,
// };

// // Async thunk for creating a short link
// export const createShortLink = createAsyncThunk(
//   "links/createShortLink",
//   async (linkData, { rejectWithValue }) => {
//     try {
//       const data = await createShortLinkService(linkData);
//       return data; // Assuming API returns the created short URL
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for fetching all short links
// export const fetchAllShortUrls = createAsyncThunk(
//   "links/fetchAllShortUrls",
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getAllShortUrls(); // Fetch all short URLs using the service
//       return data; // Assuming API returns a list of short URLs
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for updating a short URL
// export const updateShortUrl = createAsyncThunk(
//   "links/updateShortUrl",
//   async ({ shortURLId, updateData }, { rejectWithValue }) => {
//     try {
//       const data = await editShortUrl(shortURLId, updateData); // Call the service
//       return data.updatedUrl; // Assuming API returns the updated URL object
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for deleting a short URL
// export const deleteShortUrlThunk = createAsyncThunk(  // Renamed to avoid conflict
//   "links/deleteShortUrl",
//   async (shortURLId, { rejectWithValue }) => {
//     try {
//       await deleteShortUrlService(shortURLId); // Call the service to delete the short URL
//       return shortURLId; // Return the deleted short URL ID for removal from state
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const getTotalClicks = createAsyncThunk("links/getTotalClicks", async (_, { rejectWithValue }) => {
//   try {
//     return await fetchTotalClicks();
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// export const getDateWiseClicks = createAsyncThunk("links/getDateWiseClicks", async (_, { rejectWithValue }) => {
//   try {
//     return await fetchDateWiseClicks();
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// export const getClickDevices = createAsyncThunk("links/getClickDevices", async (_, { rejectWithValue }) => {
//   try {
//     return await fetchClickDevices();
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // Slice definition
// const linkSlice = createSlice({
//   name: "links",
//   initialState,
//   reducers: {
//     openModal(state) {
//       state.isModalOpen = true;
//     },
//     closeModal(state) {
//       state.isModalOpen = false;
//     },
//   },
//   extraReducers: (builder) => {
//     // Create short URL
//     builder
//       .addCase(createShortLink.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createShortLink.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shortUrls.push(action.payload); // Add the created short URL to the list
//       })
//       .addCase(createShortLink.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Fetch all short URLs
//     builder
//       .addCase(fetchAllShortUrls.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllShortUrls.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shortUrls = action.payload; // Store the fetched list of short URLs
//       })
//       .addCase(fetchAllShortUrls.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Update a short URL
//     builder
//       .addCase(updateShortUrl.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateShortUrl.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedUrl = action.payload;
//         const index = state.shortUrls.findIndex((url) => url.shortURLId === updatedUrl.shortURLId);
//         if (index !== -1) {
//           state.shortUrls[index] = updatedUrl; // Update the URL in the state
//         }
//       })
//       .addCase(updateShortUrl.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Delete a short URL
//     builder
//       .addCase(deleteShortUrlThunk.pending, (state) => { // Renamed to deleteShortUrlThunk
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteShortUrlThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         const shortURLId = action.payload;
//         state.shortUrls = state.shortUrls.filter((url) => url.shortURLId !== shortURLId); // Remove the deleted URL
//       })
//       .addCase(deleteShortUrlThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//       // Get all clicks
//       builder
//       .addCase(getTotalClicks.fulfilled, (state, action) => {
//         state.totalClicks = action.payload;
//       })
//       .addCase(getDateWiseClicks.fulfilled, (state, action) => {
//         state.dateWiseClicks = action.payload;
//       })
//       .addCase(getClickDevices.fulfilled, (state, action) => {
//         state.clickDevices = action.payload;
//       });
//   },
// });

// export const { openModal, closeModal } = linkSlice.actions;
// export default linkSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   createShortLink as createShortLinkService,
//   getAllShortUrls,
//   editShortUrl,
//   deleteShortUrl as deleteShortUrlService,
//   fetchTotalClicks,
//   fetchDateWiseClicks,
//   fetchClickDevices as fetchClickDevicesService,
//   fetchUserDevice, // ✅ Ensure proper naming
// } from "../links/linksService";

// // Initial state
// const initialState = {
//   shortUrls: [],
//   totalClicks: 0,
//   dateWiseClicks: [],
//   clickDevices: [],
//   loading: false,
//   error: null,
//   isModalOpen: false,
//   device: null,
// };

// // ✅ Async thunks with correct imports
// export const createShortLink = createAsyncThunk(
//   "links/createShortLink",
//   async (linkData, { rejectWithValue }) => {
//     try {
//       return await createShortLinkService(linkData);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchAllShortUrls = createAsyncThunk(
//   "links/fetchAllShortUrls",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await getAllShortUrls();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateShortUrl = createAsyncThunk(
//   "links/updateShortUrl",
//   async ({ shortURLId, updateData }, { rejectWithValue }) => {
//     try {
//       const data = await editShortUrl(shortURLId, updateData);
//       return data.updatedUrl;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteShortUrlThunk = createAsyncThunk(
//   "links/deleteShortUrl",
//   async (shortURLId, { rejectWithValue }) => {
//     try {
//       await deleteShortUrlService(shortURLId);
//       return shortURLId;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // ✅ Correct Async Thunks
// export const getTotalClicks = createAsyncThunk("links/getTotalClicks", async (_, { rejectWithValue }) => {
//   try {
//     return await fetchTotalClicks();
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// export const getDateWiseClicks = createAsyncThunk("links/getDateWiseClicks", async (_, { rejectWithValue }) => {
//   try {
//     return await fetchDateWiseClicks();
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // ✅ Fix Import for Click Devices Fetch
// export const getClickDevices = createAsyncThunk("links/getClickDevices", async (_, { rejectWithValue }) => {
//   try {
//     return await fetchClickDevicesService(); // ✅ Ensure correct function call
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// export const getUserDevice = createAsyncThunk(
//   'userDevice/getDevice',
//   async () => {
//     const deviceData = await fetchUserDevice();
//     return deviceData.device; // The device type from the API
//   }
// );

// // Slice definition
// const linkSlice = createSlice({
//   name: "links",
//   initialState,
//   reducers: {
//     openModal(state) {
//       state.isModalOpen = true;
//     },
//     closeModal(state) {
//       state.isModalOpen = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createShortLink.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createShortLink.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shortUrls.push(action.payload);
//       })
//       .addCase(createShortLink.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     builder
//       .addCase(fetchAllShortUrls.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllShortUrls.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shortUrls = action.payload;
//       })
//       .addCase(fetchAllShortUrls.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     builder
//       .addCase(updateShortUrl.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateShortUrl.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedUrl = action.payload;
//         const index = state.shortUrls.findIndex((url) => url.shortURLId === updatedUrl.shortURLId);
//         if (index !== -1) {
//           state.shortUrls[index] = updatedUrl;
//         }
//       })
//       .addCase(updateShortUrl.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     builder
//       .addCase(deleteShortUrlThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteShortUrlThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shortUrls = state.shortUrls.filter((url) => url.shortURLId !== action.payload);
//       })
//       .addCase(deleteShortUrlThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // ✅ Ensure async thunks are added correctly
//     builder
//       .addCase(getTotalClicks.fulfilled, (state, action) => {
//         state.totalClicks = action.payload;
//       })
//       .addCase(getDateWiseClicks.fulfilled, (state, action) => {
//         state.dateWiseClicks = action.payload;
//       })
//       .addCase(getClickDevices.fulfilled, (state, action) => {
//         state.clickDevices = action.payload;
//       });
//   },
// });

// export const { openModal, closeModal } = linkSlice.actions;
// export default linkSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createShortLink as createShortLinkService,
  getAllShortUrls,
  editShortUrl,
  fetchTotalClicks,
  fetchDateWiseClicks,
  fetchClickDevices as fetchClickDevicesService,
  fetchUserDevice,
  fetchUserIp, // ✅ Ensure proper naming
} from "../links/linksService";

// Initial state
const initialState = {
  shortUrls: [],
  totalClicks: 0,
  dateWiseClicks: [],
  clickDevices: [],
  loading: false,
  error: null,
  isModalOpen: false,
  device: null,
  ip: {
    ipAddress: null,
    loading: false,
    error: null,
  },
};

// ✅ Async thunks with correct imports
export const createShortLink = createAsyncThunk(
  "links/createShortLink",
  async (linkData, { rejectWithValue }) => {
    try {
      return await createShortLinkService(linkData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllShortUrls = createAsyncThunk(
  "links/fetchAllShortUrls",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllShortUrls();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateShortUrl = createAsyncThunk(
  "links/updateShortUrl",
  async ({ shortURLId, updateData }, { rejectWithValue }) => {
    try {
      const data = await editShortUrl(shortURLId, updateData);
      return data.updatedUrl;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getTotalClicks = createAsyncThunk(
  "links/getTotalClicks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTotalClicks();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDateWiseClicks = createAsyncThunk(
  "links/getDateWiseClicks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchDateWiseClicks();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Fix Import for Click Devices Fetch
export const getClickDevices = createAsyncThunk(
  "links/getClickDevices",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchClickDevicesService(); // ✅ Ensure correct function call
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get User Device Thunk (correct data path)
export const getUserDevice = createAsyncThunk(
  "userDevice/getDevice",
  async (_, { rejectWithValue }) => {
    try {
      const deviceData = await fetchUserDevice();
      // Access the correct nested property
      return deviceData.deviceInfo.device.type;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get User IP Thunk (no changes needed here)
export const getUserIp = createAsyncThunk("ip/getUserIp", async () => {
  const ip = await fetchUserIp();
  return ip;
});



export const deleteShortUrlThunk = createAsyncThunk(
  'links/deleteShortUrl',
  async (shortURLId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/urls/${shortURLId}`);
      return response.data; // Return success message
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error message
    }
  }
);



// Slice definition
const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      // Filter links based on the search term
      state.filteredLinks = state.shortUrls.filter((link) =>
        link.remarks.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShortLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShortLink.fulfilled, (state, action) => {
        state.loading = false;
        state.shortUrls.push(action.payload);
      })
      .addCase(createShortLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchAllShortUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllShortUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.shortUrls = action.payload;
      })
      .addCase(fetchAllShortUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateShortUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShortUrl.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUrl = action.payload;
        const index = state.shortUrls.findIndex(
          (url) => url.shortURLId === updatedUrl.shortURLId
        );
        if (index !== -1) {
          state.shortUrls[index] = updatedUrl;
        }
      })
      .addCase(updateShortUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
    .addCase(deleteShortUrlThunk.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteShortUrlThunk.fulfilled, (state, action) => {
      state.shortUrls = state.shortUrls.filter((url) => url._id !== action.meta.arg);
    })
    .addCase(deleteShortUrlThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || 'Failed to delete URL';
    });

    // ✅ Ensure async thunks are added correctly for other features
    builder
      .addCase(getTotalClicks.fulfilled, (state, action) => {
        state.totalClicks = action.payload;
      })
      .addCase(getDateWiseClicks.fulfilled, (state, action) => {
        state.dateWiseClicks = action.payload;
      })
      .addCase(getClickDevices.fulfilled, (state, action) => {
        state.clickDevices = action.payload;
      });

    // ✅ Add handler for fetching user device
    builder
      .addCase(getUserDevice.pending, (state) => {
        state.loading = true;
        state.device = null; // Reset device before fetching new device info
        state.error = null;
      })
      .addCase(getUserDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.device = action.payload; // Stores device type string
      })
      .addCase(getUserDevice.rejected, (state, action) => {
        state.loading = false;
        state.device = null; // Reset device on error
        state.error = action.payload;
      })
      .addCase(getUserIp.pending, (state) => {
        state.ip.loading = true;
      })
      .addCase(getUserIp.fulfilled, (state, action) => {
        state.ip.loading = false;
        state.ip.ipAddress = action.payload; // Stores IP string
      })
      .addCase(getUserIp.rejected, (state, action) => {
        state.ip.loading = false;
        state.ip.error = action.error.message; // Handle error gracefully
      });
  },
});

export const { openModal, closeModal, setSearchTerm } = linkSlice.actions;
export default linkSlice.reducer;
