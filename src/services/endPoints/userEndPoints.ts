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
    getAllDoctors:'/api/getDoctors'
}   

export default userRoutes