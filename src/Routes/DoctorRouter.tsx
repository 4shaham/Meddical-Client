import React from "react";
import { Route, Routes } from "react-router-dom";
import DoctorMainPage from "../pages/Doctor/DoctorMainPage";
import RegistrationAndLogin from "../pages/Doctor/RegistrationAndLogin";
import Login from "../components/Doctor/Login";
import Registration from "../components/Doctor/Registration";
import KycVerificationPage from "../pages/Doctor/KycVerificationPage";
import DoctorOtpComponent from "../components/Doctor/DoctorOtpComponent";
import DashBoardComponent from "../components/Doctor/DashboardComponent";
import PrivateRoutes from "./protectRoutes";
import MyScheduleManamgemnt from "../components/Doctor/MyScheduleManamgemnt";

function DoctorRouter() {
  return (
    <div>
      <Routes>
        <Route element={<RegistrationAndLogin />}>
          <Route path="/doctor/login" element={<Login />} />
          <Route path="/doctor/register" element={<Registration />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<DoctorMainPage />}>
            <Route path="/doctor/" element={<DashBoardComponent />}></Route>
            <Route path="/doctor/mySchedule" element={<MyScheduleManamgemnt/>}></Route>
          </Route>
        </Route>  
          <Route
            path="/doctor/otpVerifcation"
            element={<DoctorOtpComponent />}
          />
        
        <Route
          path="/doctor/kycVerification"
          element={<KycVerificationPage />}
        />
      </Routes>
    </div>
  );
}

export default DoctorRouter;
