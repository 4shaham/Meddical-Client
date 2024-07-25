
const doctorRoutes={

   signIn:'/api/doctor/login',
   signUp:'/api/doctor/register',
   logout:'/api/doctor/logout',
   kycDataStoreStep1:'/api/doctor/storeKycData1',
   kycDataStoreStep2:'/api/doctor/storeKycData2',
   verifyOtp:'/api/doctor/otpVerification',
   resendOtp:'/api/doctor/resendOtp',
   getKycStatus:'/api/doctor/getKycStatus',
   getToken:'/api/doctor/getToken',
   // scedule Managment 
   addSchedule:'/api/doctor/addSchedule',
   findAllSchedule:'/api/doctor/findDoctorSchedule',
   findScheduleWithDate:'/api/doctor/findDoctorBookingWithDate'
}

export default doctorRoutes