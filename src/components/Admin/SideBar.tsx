import React,{useState} from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdNotifications } from "react-icons/io";
import { FaUsersRectangle } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdLocalFireDepartment } from "react-icons/md";
import { Link } from "react-router-dom";

function SideBar() {
  let sideBard = [
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
      element: "specality Management",
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

  return (
    <div className="w-[25%] md:bg-gray-100 md:p-5 md:h-screen md:text-center">
      <div>{sideBardElements()}</div>
    </div>
  );
}

export default SideBar;
