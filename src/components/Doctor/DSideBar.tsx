import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdNotifications } from "react-icons/io";
import { FaUsersRectangle } from "react-icons/fa6";
import { MdLocalFireDepartment } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

function DSideBar() {
  
    console.log("hiiii side bar")
  
    const sideBard = [
      { path: "/doctor/manageTokens", element: "ManageTokens", icon: <LuLayoutDashboard /> },
      {
        path:"/doctor/",
        element: "Slot Availability",
        icon: <IoMdNotifications />,
      },
      {
        path:"/doctor/",
        element: "Patient Details",
        icon: <FaUsersRectangle />,
      },
      {
        path: "/doctor/addSchedule",
        element: "Add new Schedules",
        icon:<RiCalendarScheduleFill />
      },
      {
        path:"/doctor/appointmentPage",
        element: "view Appointments",
        icon: <MdLocalFireDepartment />,
      },
      {
        path:"/doctor/chatPage",
        element:"Messages",
        icon: <FaFacebookMessenger />,
      },
      {
        path:"/doctor/profile",
        element:"Profile",
        icon: <CgProfile />,
      }

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
      <div className=" md:p-5 md:h-screen md:text-center">
        <div>{sideBardElements()}</div>
      </div>
    );
  }
  
  export default React.memo(DSideBar);