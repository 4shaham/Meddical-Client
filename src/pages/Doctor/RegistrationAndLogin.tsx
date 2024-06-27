import React from "react";
import Login from "../../components/Doctor/Login";
import { Outlet } from "react-router-dom";

function RegistrationAndLogin() {
  return (
    <div className="w-full bg-white h-screen flex">
      <div className="w-1/3 text-2xl  sm:w1/2  md:w-1/3 bg-white h-full flex">
        <h1 className="custom-font font-bold text-black text-xl   md:text-5xl lg:text-6xl my-auto mx-auto justify-center">
          MEDDICAL
        </h1>
      </div>
      
      <Outlet/>
     
    </div>
  );
}

export default RegistrationAndLogin;
