
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Admin/MainPage";
import DashBoardComponent from "../components/Admin/DashBoardComponent";
import AdminNotFoundPage from "../pages/Admin/AdminNotFoundPage";
import Login from "../components/Admin/Login";
import SpecalityManagement from "../pages/Admin/SpecalityManagement";
import AddSpecalityManagment from "../pages/Admin/AddSpecalityManagment";
import VerifyRequestPage from "../pages/Admin/VerifyRequestPage";
import DoctorDetailAndKycPage from "../pages/Admin/DoctorDetailAndKycPage";
import AddSpecalityForm from "../components/Admin/AddSpecalityForm";
import EditSpecalityManagment from "../components/Admin/EditSpecalityManagment";
import DeleteSpecalityManagment from "../components/Admin/DeleteSpecalityManagment";



function AdminRouter() {
  return (
    <Routes>
      <Route element={<MainPage/>}>
        <Route path={"/admin/specalityManagement"} element={<SpecalityManagement/>}  />
        <Route path={"/admin/"} element={<DashBoardComponent/>} />
        <Route element={<AddSpecalityManagment/>}>
           <Route path={"/admin/AddSpecalityManagment"} element={<AddSpecalityForm/>}/>
           <Route path={"/admin/EditSpecality"} element={<EditSpecalityManagment/>}/>
           <Route path={"/admin/deletedSpecality"} element={<DeleteSpecalityManagment/>}/>
        </Route>
        <Route path={"/admin/doctorsManagment"} element={<DashBoardComponent/>} />
        <Route path={"/admin/verifyNewRequest"} element={<VerifyRequestPage/>} />
        <Route path={"/admin/kycDataView"} element={<DoctorDetailAndKycPage/>}/>
      </Route>
      
      <Route path={"/admin/login"} element={<Login/>}></Route>
      <Route path="/admin/*" element={<AdminNotFoundPage/>}/>
    </Routes>
  );
}

export default AdminRouter;
