
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Admin/MainPage";
import DashBoardComponent from "../components/Admin/DashBoardComponent";
import AdminNotFoundPage from "../pages/Admin/AdminNotFoundPage";
import Login from "../components/Admin/Login";
import SpecalityManagement from "../pages/Admin/SpecalityManagement";
import AddSpecalityManagment from "../pages/Admin/AddSpecalityManagment";



function AdminRouter() {
  return (
    <Routes>
      <Route element={<MainPage/>}>
        <Route path={"/admin/specalityManagement"} element={<SpecalityManagement/>}  />
        <Route path={"/admin/"} element={<DashBoardComponent/>} />
        <Route path={"/admin/AddSpecalityManagment"} element={<AddSpecalityManagment/>}/>
        <Route path={"/admin/doctorsManagment"} element={<DashBoardComponent/>} />
      </Route>
      
      <Route path={"/admin/login"} element={<Login/>}></Route>
      <Route path="/admin/*" element={<AdminNotFoundPage />} />
    </Routes>
  );
}

export default AdminRouter;
