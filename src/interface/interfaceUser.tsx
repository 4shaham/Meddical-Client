
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


export interface Medicine {
    name: string;
    dosage: string;
    instructions?: string;
  }
  
  export  interface IPrescription {
    _id:string  
    date: Date;
    doctorId:string;
    doctorName: string;
    pateintId:string;
    patientName: string;
    diagnosis:string;
    medicines: Medicine[];
    recoverySteps: string[];
    slotId:string
  }
  

  export interface prescriptionData extends IPrescription {
    userData:IUser[]
  } 


  export interface IPaymentData{
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