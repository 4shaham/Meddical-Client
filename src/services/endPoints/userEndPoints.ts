import { resendOtp } from "../../api/user"


const userRoutes={
    signUp:'/api/register',
    singIn:'/api/login',
    verifyOtp:'/api/otpVerification',
    resendOtp:'/api/resendOtp'
}   

export default userRoutes