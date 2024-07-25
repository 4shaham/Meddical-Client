
import React, { useEffect, useState } from 'react'
import { getToken } from '../api/user';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserProtectRoutes() {


  // const userRedux=useSelector((state)=>)
  const [status,setStatus]=useState<boolean>(false)
 
  const [loading,setIsLoading]=useState<boolean>(true)
  console.log('response hiii')
  
  useEffect(() => {

    const checkAuth = async () => {
      try {

        const response = await getToken();
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
  
  return status ?<Outlet/>:<Navigate to="/login"/>;

}

export default UserProtectRoutes
