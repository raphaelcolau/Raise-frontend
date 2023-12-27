import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import currentDaySlice from "./slice/currentDaySlice";
import trainingsSlice from "./slice/trainingsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentDay: currentDaySlice,
    trainings: trainingsSlice,
  },
});

export default store;