import Api from "../services/axios";
import userRoutes from "../services/endPoints/userEndPoints";

export const signIn = async (email: string, password: string) => {
  const response = await Api.post(userRoutes.singIn, { email, password });
  return response;
};

// signUpInterface

interface response {
  data: {
    status: boolean;
    message: string;
  };
}
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

interface verifyOtpResponse {
  data: {
    status: boolean;
    message: string;
    token?: string;
  };
}
export const verifyOtp = async (otp: number): Promise<verifyOtpResponse> => {
  const response = await Api.post(userRoutes.verifyOtp, { otp });
  return response;
};

interface resendOtp {
  data: {
    status: boolean;
  };
}

export const resendOtp = async (email: string): Promise<resendOtp> => {
  const response = await Api.post(userRoutes.resendOtp, { email });
  return response;
};

interface LogoutResponse extends resendOtp {}

interface resendOtp {
  data: {
    status: boolean;
  };
}
export const logOut = async (): Promise<LogoutResponse> =>
  await Api.post(userRoutes.logOut);

interface getTokenRes {
  data: {
    status:boolean,
    decoded?:object
  };
}
export const getToken = async (): Promise<getTokenRes> => await Api.get(userRoutes.getToken);
