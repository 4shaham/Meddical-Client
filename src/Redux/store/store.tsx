
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userAuthSlice from "../slice/userAuthSlice";
import AdminAuthSlice from "../slice/AdminAuthSlice";



export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user:userAuthSlice,
  admin:AdminAuthSlice
});


const store=configureStore({
    reducer:rootReducer
})

export default store
