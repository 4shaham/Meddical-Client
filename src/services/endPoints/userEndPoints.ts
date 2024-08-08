
import UpdatePassword from "../../components/User/UpdatePassword"


const userRoutes={

    signUp:'/api/register',
    singIn:'/api/login',
    verifyOtp:'/api/otpVerification',
    resendOtp:'/api/resendOtp',
    logOut:'/api/logOut',
    getToken:'/api/getToken',
    googleAuth:'/api/googleAuth',
    forgotPassword:'/api/forgotPassword',
    UpdatePassword:'/api/updatePassword',
    getAllDoctors:'/api/getDoctors',
    getDoctorProfile:'/api/getDoctorProfile',
    getSpecalityData:'/api/getSpecality',
    getDoctorSchedulePeticularDate:'/api/doctor/findSchedulePerticularDate',
    createToken:'/api/createTokenBooking',
    getBookingDataWithStatus:'/api/findBookingDataWithStatus',
    cancelBookedToken:'/api/cancelTokenBooking',
    getProfileData:'/api/profileData',
    getConverasation:'/api/getConverasation',
    storeMessages:'/api/storeMessage',
    getMessage:'/api/getMessage',
    paymentChekcout:'/api/payment',
    getPrescription:"/api/getPrescriptionData",
    getTransactionHistory:"/api/getTransactionHistory",
    rescheduleBooking:"/api/rescheduleBooking",
    getInvoiceData:"/api/getInvoiceData",
    updateUserProfile:"/api/updateProfile",
    doctorSortWithSpecality:'/api/getDoctorWithSpecalitySort',
    profilePasswordUpdate:'/api/profilePasswordUpdate',
    
}   


export default userRoutes