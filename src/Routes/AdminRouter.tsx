import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashBoard from "../pages/Admin/AdminDashBoard";
import AdminDoctorsManagment from "../pages/Admin/AdminDoctorsManagment";
import AdminUserManagment from "../pages/Admin/AdminUserManagment";
import AdminSpecalityManagment from "../pages/Admin/AdminSpecalityManagment";
import AdminVerifyNewDoctorRequest from "../pages/Admin/AdminVerifyNewDoctorRequest";
import AdminRote from "../components/Admin/AdminRoteProtectHook";

function AdminRouter() {
  return (
    <Routes>
      <Route path={"/admin/login"} element={<AdminLogin />}></Route>

    
        <Route path="/admin/userManagement" element={<AdminUserManagment />} />

      <Route path={"/admin/"} element={<AdminDashBoard />}></Route>
      <Route
        path="/admin/doctorsManagment"
        element={<AdminDoctorsManagment />}
      />

      <Route
        path="/admin/specalityManagement"
        element={<AdminSpecalityManagment />}
      />
      <Route
        path="/admin/verifyNewRequest"
        element={<AdminVerifyNewDoctorRequest />}
      />
    </Routes>
  );
}

export default AdminRouter;
