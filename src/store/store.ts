import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import currentDaySlice from "./slice/currentDaySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentDay: currentDaySlice,
  },
});

export default store;