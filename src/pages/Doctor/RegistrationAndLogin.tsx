import React from "react";
import Login from "../../components/Doctor/Login";
import { Outlet } from "react-router-dom";
import doctorProfile from "../../assets/doctoProfiler.jpg"

function RegistrationAndLogin() {
  return (
    <div className="w-full bg-white h-screen flex">
      <div className="w-1/3 text-2xl  sm:w1/2  md:w-1/2 bg-white h-full flex">
       
        <img className="object-contain" src={doctorProfile} alt="" />
      </div>
      
      <Outlet/>
     
    </div>
  );
}

export default RegistrationAndLogin;
