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