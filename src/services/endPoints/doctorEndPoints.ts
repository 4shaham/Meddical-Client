
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
   addSchedule:'/api/doctor/addSchedule',
   findAllSchedule:'/api/doctor/findDoctorSchedule',
   findScheduleWithDate:'/api/doctor/findDoctorBookingWithDate',
   addPrescription:"/api/doctor/addPrescription",
   doctorGetConverasation:'/api/doctorGetConverasation',
   doctorUserProfileData:'/api/doctor/getUserProfileDoctor',
   getDoctorProfile:'/api/doctor/getDoctorProfile',
   updateDoctorProfile:'/api/doctor/updateDoctorProfile',
   updatedDoctorPassword:'/api/doctor/updateDoctorPassword'
}

export default doctorRoutes