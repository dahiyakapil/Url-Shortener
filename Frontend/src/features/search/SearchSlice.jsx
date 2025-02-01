import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchByRemarks } from './SearchService';

export const searchUrls = createAsyncThunk(
  'search/searchUrls',
  async (remarks, { rejectWithValue }) => {
    try {
      return await searchByRemarks(remarks);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;