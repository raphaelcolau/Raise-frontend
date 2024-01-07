import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import currentDaySlice from "./slice/currentDaySlice";
import trainingsSlice from "./slice/trainingsSlice";
import createTrainingSlice from "./slice/createTrainingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentDay: currentDaySlice,
    trainings: trainingsSlice,
    createTraining: createTrainingSlice,
  },
});

export default store;