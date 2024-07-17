
// import React, { Component, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Props } from 'recharts/types/container/Surface';

// function UserProtect(WrappedComponent:Component) {
//   return (props:Props) => {
    

//     const navigate=useNavigate()
//     const [isAuthenticated, setIsAuthenticated]=useState<boolean>(false); 

//     useEffect(() => {
     
//       const checkAuth = () => {
       
//         const token = localStorage.getItem('token');
//         if (token) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       };

//       checkAuth();
//     }, []);

//     useEffect(() => {
//       if (isAuthenticated === false) {
//          navigate("/login") 
//       }
//     }, [isAuthenticated,navigate]);


//     if (isAuthenticated === null) {
//       return <div>Loading...</div>;
//     }

//     return <WrappedComponent {...props} />;

//   };
// }

// export default UserProtect;

