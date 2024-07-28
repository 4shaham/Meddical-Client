import { Route, Routes } from "react-router-dom";
import UserRegistration from "../pages/User/UserRegistrationAndLogin";
import UserVerifyOtp from "../pages/User/UserVerifyOtp";
import UserMainPage from "../pages/User/UserMainPage";
import Registration from "../components/User/Registration";
import LoginForm from "../components/User/LoginForm";
import ForgotPasswordEmailVerification from "../components/User/ForgotPasswordEmailVerification";
import UpdatePassword from "../components/User/UpdatePassword";
import UserHomePage from "../pages/User/UserHomePage";
import UserDoctorsPage from "../pages/User/UserDoctorsPage";
import DoctorProfilePage from "../pages/User/DoctorProfilePage";
import AppointmentPage from "../pages/User/AppointmentPage";
import SuccessesPage from "../pages/User/SuccessesPage";
import ProfilePage from "../pages/User/ProfilePage";
import UserAppointmentPage from "../pages/User/UserAppointmentPage";
import UserProtectRoutes from "./UserProtectRoutes";
import Messenger from "../pages/User/Messenger";
import Prescription from "../components/User/Prescription";

function UserRouter() {
  return (
    <div>
      <Routes>
        <Route element={<UserRegistration />}>
          <Route path={"/login"} element={<LoginForm />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/forgotPassword"
            element={<ForgotPasswordEmailVerification />}
          />
        </Route>
        <Route path="/otpVerification" element={<UserVerifyOtp />} />
        <Route path="/" element={<UserMainPage/>}>
            <Route path="/" element={<UserHomePage/>}/>
            <Route path="/doctors" element={<UserDoctorsPage/>}/>
            <Route path="/doctorprofile" element={<DoctorProfilePage/>} />
            <Route path="/appointmentPage" element={<AppointmentPage/>} />
            
            <Route element={<UserProtectRoutes/>}>
              <Route path="/successPage" element={<SuccessesPage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/myAppointmentPage" element={<UserAppointmentPage/>} />
              <Route path="/prescriptionPage" element={<Prescription/>} />
            </Route>  
            <Route path="/chatingPage" element={<Messenger/>}/>
        </Route>
        <Route path="/updatePassword" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
