import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../components/Doctor/LoginPage'

function DoctorRouter() {
  return (
    <div>

        <Routes>
            <Route path='/doctor/login' element={<LoginPage/>}/>
            <Route path='/doctor/registration'/>
            <Route path='/doctor/'/>    
        </Routes>
      
    </div>
  )
}

export default DoctorRouter
