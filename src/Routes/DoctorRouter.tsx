import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/Doctor/LoginPage'
import RegistrationPage from '../pages/Doctor/RegistrationPage'


function DoctorRouter() {
  return (
    <div>
        <Routes>
            <Route path='/doctor/login' element={<LoginPage/>}/>
            <Route path='/doctor/register' element={<RegistrationPage/>}/>
            <Route path='/doctor/'/>    
        </Routes>
      
    </div>
  )
}

export default DoctorRouter
