import { Route, Routes } from "react-router-dom";
import UserRegistration from "../pages/User/UserRegistrationAndLogin";
import UserVerifyOtp from "../pages/User/UserVerifyOtp";
import UserHome from "../pages/User/UserHome";
import Registration from "../components/User/Registration";
import LoginForm from "../components/User/LoginForm";
import ForgotPasswordEmailVerification from "../components/User/ForgotPasswordEmailVerification";
import UpdatePassword from "../components/User/UpdatePassword";

function UserRouter() {
  return (
    <div>
      <Routes>

        <Route element={<UserRegistration />}>
          <Route path={"/login"} element={<LoginForm />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgotPassword" element={<ForgotPasswordEmailVerification/>} />
        </Route>
        <Route path="/otpVerification" element={<UserVerifyOtp />} />
        <Route path="/" element={<UserHome />} />
        <Route path="/updatePassword" element={<UpdatePassword/>}/>
        
      </Routes>
    </div>
  );
}

export default UserRouter;
