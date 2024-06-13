import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminDashBoard from '../pages/Admin/AdminDashBoard'



function AdminRouter() {

  return (
     
    <Routes>
        <Route path='/admin/Login' element={<AdminLogin/>}></Route>
        <Route path='/admin/' element={<AdminDashBoard/>}></Route>
    </Routes>
    
  )

}



export default AdminRouter
