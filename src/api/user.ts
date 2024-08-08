import { BookingData } from "../interface/interfaceDoctor";
import userAuthSlice from "../Redux/slice/userAuthSlice";
import Api from "../services/axios";
import userRoutes from "../services/endPoints/userEndPoints";



// signUpInterface

interface response {
  data: {
    status: boolean;
    message: string;
  };
}


interface verifyOtpResponse {
  data: {
    status: boolean;
    message: string;
    token?: string;
  };
}

interface resendOtp {
  data: {
    status: boolean;
  };
}

interface LogoutResponse extends resendOtp {}

interface resendOtp {
  data: {
    status: boolean;
  };
}

interface getTokenRes {
  data: {
    status:boolean,
    decoded?:object
  };
}

export const signIn = async (email: string, password: string) => {
  const response = await Api.post(userRoutes.singIn, { email, password });
  return response;
};


export const signUp = async (
  email: string,
  userName: string,
  age: number,
  gender: string,
  password: string,
  phoneNumber: string
): Promise<response> => {
  const response = await Api.post(userRoutes.signUp, {
    email,
    userName,
    age,
    gender,
    password,
    phoneNumber,
  });
  return response;
};


export const verifyOtp = async (otp:number,typeOfOtp:string): Promise<verifyOtpResponse> => {
  const response = await Api.post(userRoutes.verifyOtp, {otp,typeOfOtp});
  return response;
};
export const resendOtp = async (): Promise<resendOtp> => {
  const response = await Api.post(userRoutes.resendOtp);
  return response;
};

export const logOut = async (): Promise<LogoutResponse> =>await Api.post(userRoutes.logOut);

export const getToken = async (): Promise<getTokenRes> => await Api.get(userRoutes.getToken);

export const googleAuth=async (email:string,userName:string,image:string)=> await Api.post(userRoutes.googleAuth,{email,userName,image})

export const forgotPassword=async(email:string)=>await Api.post(userRoutes.forgotPassword,{email})

export const updatePassword=async(password:string)=>await Api.patch(userRoutes.UpdatePassword,{password})

export const getAllDoctors=async()=>await Api.get(userRoutes.getAllDoctors)

export const getDoctorProfile=async(doctorid:string)=>await Api.get(`${userRoutes.getDoctorProfile}?doctorId=${doctorid}`)

export const getSpecality=async()=>await Api.get(userRoutes.getSpecalityData)

export const getDoctorSchedulePerticularDate=async(date:string,id:string)=>await Api.get(`${userRoutes.getDoctorSchedulePeticularDate}?date=${date}&doctorId=${id}`)

export const createToken=async(fees:number,typeOfConsaltation:string,schedulesId:string,slotNumber:number,startTime:string,endTime:string)=>await Api.post(userRoutes.createToken,{fees,typeOfConsaltation,schedulesId,slotNumber,startTime,endTime})

export const cancelToken=async(tokenId:string)=>await Api.delete(`${userRoutes.cancelBookedToken}?tokenId=${tokenId}`)

export const getBookingDataWithStatus=async(statusType:string)=>await Api.get(`${userRoutes.getBookingDataWithStatus}?statusType=${statusType}`)

export const getProfileData=async(userId?:string)=>await Api.get(`${userRoutes.getProfileData}?userId=${userId}`)

export const getConverasation=async()=>await Api.get(userRoutes.getConverasation)

export const getMessages=async(converasationId:string)=>await Api.get(`${userRoutes.getMessage}?converasationId=${converasationId}`)

export const paymentChekcout=async(userId:string,fees:number,typeOfConsaltation:string,schedulesId:string,slotNumber:number,startTime:string,endTime:string)=>await Api.post(userRoutes.paymentChekcout,{userId,fees,typeOfConsaltation,schedulesId,slotNumber,startTime,endTime})

export const storeMessage=async(conversationId:string,senderId:string,text:string)=>await Api.post(userRoutes.storeMessages,{conversationId,senderId,text})

export const getPrescription=async(id:string)=>await Api.get(`${userRoutes.getPrescription}?id=${id}`)

export const getTransactionHistory=async()=>await Api.get(userRoutes.getTransactionHistory)

export const bookingReschedule=async(slotId:string,slotNumber:number,scheduleId:string,newSlotNumber:number)=>await Api.put(userRoutes.rescheduleBooking,{slotId,slotNumber,scheduleId,newSlotNumber})

export const getInvoiceData=async(id:string)=>await Api.get(`${userRoutes.getInvoiceData}?id=${id}`)

export const updateUserProfile=async(userName:string,phoneNumber:string,age:number,gender:string,image?:string|null)=>await Api.put(userRoutes.updateUserProfile,{userName,phoneNumber,age,gender,image})

export const sortDoctorsWithSpecality=async(specality:string)=>await Api.get(`${userRoutes.doctorSortWithSpecality}?specality=${specality}`)