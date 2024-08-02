import React, { Children, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdNotifications } from "react-icons/io";
import { FaUsersRectangle } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdLocalFireDepartment } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminLogout } from "../../api/admin";
import { CiLogout } from "react-icons/ci";
import { AiOutlineTransaction } from "react-icons/ai";



function SideBar() {

  const location=useLocation()

  console.log("hiiii side bar",location);

  const sideBard = [
    { path: "/admin/", element: "AdminDashBoard", icon: <LuLayoutDashboard /> },
    {
      path: "/admin/verifyNewRequest",
      element: "Verify New Request",
      icon: <IoMdNotifications />,
    },
    {
      path: "/admin/userManagement",
      element: "User Management",
      icon: <FaUsersRectangle />,
    },
    {
      path: "/admin/doctorsManagment",
      element: "Doctors Management",
      icon: <FaUserDoctor />,
    },
    {
      path: "/admin/specalityManagement",
      element: "Specality Management",
      icon: <MdLocalFireDepartment className="w-25 h-25" />,
    },
    {
      path: "/admin/transactionHistory",
      element: "Transaction History",
      icon: <AiOutlineTransaction />,
    },
  ];

  const sideBardElements = () =>
    sideBard.map((values, index) => (
      <Link to={values.path}>
        <div
          className={location.pathname == values.path?"mt-2 rounded-md mx-auto bg-white p-5  text-md font-medium flex text-center g":"mt-2 rounded-md mx-auto  p-5  text-md font-medium flex text-center g"} 
          key={index}
        >
           <h1 className="flex my-auto text-lg  "><span className="mt-1 mx-2 ">{values.icon}</span>{values.element}</h1>
        </div>
      </Link>
    ));

  const navigate = useNavigate();
  const handleLogoutButton = async () => {
    try {
      const response = await adminLogout();
      if (response.data.status) {
        navigate("/admin/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[25%]  md:bg-gray-300 md:p-5 md:h-screen md:text-center">
      <div className="m-3 mx-auto mb-11">
        <h1 className="text-black text-4xl custom-font">MEDDICAL</h1>
      </div>
      <div>{sideBardElements()}</div>
      <div className="mt-10 rounded-md  text-md font-medium flex gap-1 bg-red-600 w-1/2 text-center p-2 text-white" onClick={handleLogoutButton}>
        <CiLogout />
          Logout
 
      </div>
    </div>
  );
}

export default React.memo(SideBar);
