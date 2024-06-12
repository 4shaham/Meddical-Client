import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "../pages/User/UserLogin";
import UserRegistration from "../pages/User/UserRegistration";
import UserVerifyOtp from "../pages/User/UserVerifyOtp";
import UserHome from "../pages/User/UserHome";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store/store";

function UserRouter() {
  const userStatus = useSelector((state: RootState) => {
    return state.user.userData;
  });

  return (
    <div>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/registration" element={<UserRegistration />} />
        <Route path="/otpVerification" element={<UserVerifyOtp />} />
        <Route path="/" element={<UserHome />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
