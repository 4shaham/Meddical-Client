import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../api/user";
import { adminGetToken } from "../api/admin";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/slice/AdminAuthSlice";
import Login from "../components/Doctor/Login";
import { FaTruckMedical } from "react-icons/fa6";
import { docotorGetToken } from "../api/doctor";


interface rootNode{
    doctorAuth:{
        doctor:{
            isAuthenticated:boolean
        }
    }
}



const PrivateRoutes = () => {

    
  console.log('hiiiiiiiii')

  // const auth= useSelector((state:rootNode)=>state.doctorAuth.doctor.isAuthenticated);
  const [status,setStatus]=useState<boolean>(false)
  // const dispatch=useDispatch()
  const [loading,setIsLoading]=useState<boolean>(true)
  console.log('response hiii')
  
  useEffect(() => {

    const checkAuth = async () => {
      try {
        const response = await docotorGetToken();
        console.log(response)
        setIsLoading(true)
        if (response.data) {
            // dispatch(Login())
           setStatus(true)
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
         setStatus(false)
      }
    };
    checkAuth();
   

  },[]);

  
  if(loading && !status){
     return <div>loaidng...</div>
  }
  return status ?<Outlet/>:<Navigate to="/doctor/login"/>;
};
export default PrivateRoutes;


  
