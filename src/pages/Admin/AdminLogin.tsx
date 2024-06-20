import React, { useEffect } from 'react'
import Login from '../../components/Admin/Login'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Redux/slice/AdminAuthSlice'

function AdminLogin() {

  const dispatch=useDispatch()
  const status=useSelector((state:root)=>state.admin.Admin)



  interface root{
    admin:{
      Admin:{
        
      }
    }
  }

  
   console.log(status,"shahamsalam")


  return (
    <div>
      <Login/> 
    </div>
  )
}

export default AdminLogin
