
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userAuthSlice from "../slice/userAuthSlice";
import AdminAuthSlice from "../slice/AdminAuthSlice";
import OtpSlice from "../slice/OtpSlice";
import AdminSpecality from "../slice/AdminSpecality";



export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user:userAuthSlice,
  admin:AdminAuthSlice,
  otpPageVerification:OtpSlice,
  specality:AdminSpecality
  
});


const store=configureStore({
    reducer:rootReducer
})

export default store
