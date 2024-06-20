import React from 'react'
import SideBar from '../../components/Admin/SideBar'
import NavBar from '../../components/Admin/NavBar'
import UseAdminRouteProtect from '../../components/Admin/AdminRoteProtectHook'


function AdminUserManagment() {

  UseAdminRouteProtect()

  return (
<div className="w-full h-full flex">
    <SideBar />
  <div className="bg-white w-full">
    <NavBar />
    <h1>User mangemt</h1>
  </div>
</div>
  )
}

export default AdminUserManagment
