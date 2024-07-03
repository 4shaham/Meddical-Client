
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userAuthSlice from "../slice/userAuthSlice";
import AdminAuthSlice from "../slice/AdminAuthSlice";
import OtpSlice from "../slice/OtpSlice";
import AdminSpecality from "../slice/AdminSpecality";
import DoctorSlice from "../slice/DoctorAuthSlice";



export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user:userAuthSlice,
  admin:AdminAuthSlice,
  otpPageVerification:OtpSlice,
  specality:AdminSpecality,
  doctorAuth:DoctorSlice
});


const store=configureStore({
    reducer:rootReducer
})

export default store
