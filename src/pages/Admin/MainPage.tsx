import React, { useEffect } from "react";
import NavBar from "../../components/Admin/NavBar";
import SideBar from "../../components/Admin/SideBar";
import { Outlet, Route, Routes } from "react-router-dom";
import UseAdminRouteProtect from "../../hook/AdminSide/useAdminRouteProtectHook";

function MainPage() {

    UseAdminRouteProtect();

    
  
  return (
    <div className="w-full h-full flex">
      <SideBar />
      <div className="bg-white w-full">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
