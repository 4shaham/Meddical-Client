
import OtpComponent from '../../components/User/OtpComponent'
import {  useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

interface root{
   
  otpPageVerification:{
 
      OtpVerifed:boolean
  
  }
  

}


function UserVerifyOtp() {

 const statusOfPageVerfication=useSelector((state:root)=>state.otpPageVerification.OtpVerifed)

 console.log(statusOfPageVerfication,"shaham")
 

  return (
    <div> 
      {statusOfPageVerfication ?<OtpComponent/>: <Navigate to={"/login"} />} 
    </div>
  )
}

export default UserVerifyOtp
