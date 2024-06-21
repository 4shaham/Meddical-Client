// import React, { useState, useEffect } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { getToken } from "../api/user";
// import { adminGetToken } from "../api/admin";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../Redux/slice/AdminAuthSlice";

// const PrivateRoutes = () => {
//   const [auth, setAuth] = useState(false);
  

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await getToken();
//         if (response.data) {
//           setAuth(true);
//         }
//       } catch (error) {
//         setAuth(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   return !auth ? <Outlet /> : <Navigate to="/" />;
// };
// export default PrivateRoutes;


  
