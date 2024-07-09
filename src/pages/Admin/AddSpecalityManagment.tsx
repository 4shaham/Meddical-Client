import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import AddSpecalityForm from '../../components/Admin/AddSpecalityForm'
function AddSpecalityManagment() {
  return (
    <div>
       <div className="w-full mx-2 mt-11">
   
     
  <Link to={"/admin/specalityManagement"}><button
     className="bg-btnColor text-white px-14 py-1 rounded-md mb-10 ml-2"
   >
    Back to
   </button></Link>
   <Outlet/>
</div>
    </div>
  )
}

export default AddSpecalityManagment
