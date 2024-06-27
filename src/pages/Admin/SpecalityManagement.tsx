import React, { useState } from "react";
import SpecalityManagmentTable from "../../components/Admin/SpecalityManagmentTable";
import { Link, useNavigate } from "react-router-dom";


function SpecalityManagement() {

  const navigate=useNavigate()
  
  return (
    <div className="w-full mx-2 mt-11">
   
     
        <Link to={"/admin/AddSpecalityManagment"}><button
          className="bg-btnColor text-white px-14 py-1 rounded-md mb-10 ml-2"
         onClick={()=>navigate("/admin/AddSpecalityManagment")} >
         Add Specality
        </button></Link>
       <SpecalityManagmentTable />
    </div>
  );
}

export default SpecalityManagement;
