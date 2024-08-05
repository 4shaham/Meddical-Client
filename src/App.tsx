import { useState } from "react";
import "./App.css";
import AdminRouter from "./Routes/AdminRouter";
import DoctorRouter from "./Routes/DoctorRouter";
import UserRouter from "./Routes/UserRouter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalRouter from "./Routes/GlobalRouter";



function  App() {

 
  return (
    <>

      <ToastContainer/>
      <AdminRouter/>
      <UserRouter/>
      <DoctorRouter/>
      <GlobalRouter/>

    </>
  );
}

export default App;
