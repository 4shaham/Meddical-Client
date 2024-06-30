import React from "react";
import { Route, Routes } from "react-router-dom";
import DoctorHomePage from "../pages/Doctor/DoctorHomePage";
import RegistrationAndLogin from "../pages/Doctor/RegistrationAndLogin";
import Login from "../components/Doctor/Login";
import Registration from "../components/Doctor/Registration";
import KycVerificationPage from "../pages/Doctor/KycVerificationPage";
import DoctorOtpComponent from "../components/Doctor/DoctorOtpComponent";

function DoctorRouter() {
  return (
    <div>
      <Routes>
        <Route element={<RegistrationAndLogin />}>
          <Route path="/doctor/login" element={<Login />} />
          <Route path="/doctor/register" element={<Registration />} />
        </Route>

        <Route path="/doctor/otpVerifcation" element={<DoctorOtpComponent />} />
        <Route path="/doctor/" element={<DoctorHomePage />} />
        <Route
          path="/doctor/kycVerification"
          element={<KycVerificationPage />}
        />
      </Routes>
    </div>
  );
}

export default DoctorRouter;
