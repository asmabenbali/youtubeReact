import { configureStore } from "@reduxjs/toolkit";
import { loadStateFromLocalStorage } from "../utils/localStorageUtils";
import videoReducer from "./slices/videoSlice";
import uiReducer from "./slices/uiSlice";
import commentReducer from "./slices/commentSlice";

/* Step 1: When the application starts, we'll load the state from localStorage (if it exists) and use it as the initial state for the Redux store. */
const persistedState = loadStateFromLocalStorage();

// Create the store
export const store = configureStore({
  reducer: {
    videos: videoReducer,
    ui: uiReducer,
    comments: commentReducer,
  },
  preloadedState: persistedState ? persistedState : undefined,
});

export default store;
