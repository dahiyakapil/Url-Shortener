import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import linkReducer from "../features/links/linksSlice";
import searchReducer from "../features/search/SearchSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linkReducer,
    search: searchReducer
  },
});
