import React,{Children, useState} from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdNotifications } from "react-icons/io";
import { FaUsersRectangle } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdLocalFireDepartment } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../../api/admin";
import { CiLogout } from "react-icons/ci";


function SideBar() {
  
  console.log("hiiii side bar")

  const sideBard = [
    {path: "/admin/", element: "AdminDashBoard", icon:<LuLayoutDashboard/> },
    {
      path: "/admin/verifyNewRequest",
      element: "Verify New Request",
      icon: <IoMdNotifications />,
    },
    { path: "/admin/userManagement", element: "User Management", icon: <FaUsersRectangle /> },
    { path: "/admin/doctorsManagment", element: "Doctors Management", icon: <FaUserDoctor /> },
    {
      path: "/admin/specalityManagement",
      element: "Specality Management",
      icon: <MdLocalFireDepartment />,
    },
    {
      path: "/admin/transactionHistory",
      element: "Transaction History",
      icon: <MdLocalFireDepartment />,
    },
   
 
  ];



  const sideBardElements = () =>
    sideBard.map((values, index) => (
    <Link  to={values.path}><div
        className="mt-10 mx-auto text-md font-medium flex text-center gap-6 p-2"
        key={index}
      >
        {values.icon} <h1 className="-mt-1">{values.element}</h1>
      </div></Link> 
    ));

    const navigate = useNavigate();
  const handleLogoutButton = async () => {
    try {
      const response = await adminLogout();
      if (response.data.status) {
        navigate("/admin/login");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="w-[25%]  md:bg-gray-200 md:p-5 md:h-screen md:text-center">
       <div className="m-3 mx-auto mb-11">
        <h1 className="text-black text-4xl custom-font">MEDDICAL</h1>
      </div>
      <div>{sideBardElements()}</div>
      <div
        className="mt-10 mx-auto text-md font-medium flex text-center  p-2"
      >
       <CiLogout /><h1 onClick={handleLogoutButton} className="-mt-1">Logout</h1>
      </div>
    
    </div>
  );
}

export default React.memo(SideBar);
