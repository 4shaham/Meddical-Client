import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../api/user';

const PrivateRoutes = () => {
  const [auth, setAuth] = useState(false);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getToken();
        if(response.data.token){
          setAuth(true);
        }
        
      } catch (error) {
        setAuth(false);
      }
    };

    checkAuth();
  }, []);


  

  return !auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
