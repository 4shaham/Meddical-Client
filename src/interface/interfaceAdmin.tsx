import { BookingData } from "./interfaceDoctor";
import { IUser } from "./interfaceUser";


export default interface IDoctor {
    _id:string;
    name:string;
    specialty:string;
    email:string;
    password:string;
    phoneNumber:string;
    approved:boolean;
    fees:number;
    image:string;
    isBlocked:boolean;    
    otpVerified:boolean;
}

export  interface PaymentEntity{
    _id:string,
    tokenId:string,
    doctorId:string,
    transactionId:string,
    userId:string,
    amount:number,
    paymentMethod:string,
    createdAt:string,
    updateAt:string
}



export interface TransactionHistoryData extends PaymentEntity {
  doctorData:IDoctor,
  userData:IUser
}


export interface InvoiceData extends PaymentEntity{
   userData:IUser,
   bookingData:BookingData
}