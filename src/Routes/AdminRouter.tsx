import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLogin'



function AdminRouter() {

  return (
     
    <Routes>
        <Route path='/admin/Login' element={<AdminLogin/>}></Route>
        <Route path='/admin/' element={<AdminRouter/>}></Route>
    </Routes>
    
  )

}



export default AdminRouter
