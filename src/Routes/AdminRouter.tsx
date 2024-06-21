
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Admin/MainPage";
import DashBoardComponent from "../components/Admin/DashBoardComponent";
import AdminNotFoundPage from "../pages/Admin/AdminNotFoundPage";
import Login from "../components/Admin/Login";



function AdminRouter() {
  return (
    <Routes>
      <Route element={<MainPage/>}>
        <Route path={"/admin/specalityManagement"}  />
        <Route path={"/admin/"} element={<DashBoardComponent/>} />
        <Route path={"/admin/doctorsManagment"} element={<DashBoardComponent/>} />
      </Route>
      
      <Route path={"/admin/login"} element={<Login/>}></Route>
      <Route path="/admin/*" element={<AdminNotFoundPage />} />
    </Routes>
  );
}

export default AdminRouter;
