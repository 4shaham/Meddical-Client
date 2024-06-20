import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "../pages/User/UserLogin";
import UserRegistration from "../pages/User/UserRegistration";
import UserVerifyOtp from "../pages/User/UserVerifyOtp";
import UserHome from "../pages/User/UserHome";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store/store";
import PrivateRoutes from "./protectRoutes";

function UserRouter() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={"/login"} element={<UserLogin />} />
          <Route path="/registration" element={<UserRegistration />} />
        </Route>
        <Route path="/otpVerification" element={<UserVerifyOtp />} />
        <Route path="/" element={<UserHome />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
