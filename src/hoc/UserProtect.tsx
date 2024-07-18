
// import React, { Component, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Props } from 'recharts/types/container/Surface';

// interface Props {
//     // Define the props type for the wrapped component here
//     // If there are no specific props, leave it as an empty interface
// }

// function UserProtect<T extends Props>(WrappedComponent:Component<T>) {
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

