import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import currentDaySlice from "./slice/currentDaySlice";
import trainingsSlice from "./slice/trainingsSlice";
import createTrainingSlice from "./slice/createTrainingSlice";
import forgotPwdSlice from "./slice/forgotPwdSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentDay: currentDaySlice,
    trainings: trainingsSlice,
    createTraining: createTrainingSlice,
    forgotPwd: forgotPwdSlice.reducer,
  },
});

export default store;