
export  interface IUser  {
    _id: string;
    email: string ;
    userName: string;
    phoneNumber?:string;
    password: string;
    age: number;
    gender: string;
    status: boolean;
    image?:string;
    otpVerified:boolean;
    isBlock:boolean
}