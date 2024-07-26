
export interface IAddScheduleIntervals {
  type:string;
  startTime: string;
  endTime: string;
}


// form data

export interface addScheduleFormData{
    startDate:Date,
    consultationMethod:string,
    startTime:string,
    endTime:string,
} 

export interface IDoctor{
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

export interface ISpecality{
  _id:string;
  image:string;
  name:string,
  isDeleted:boolean
}

export interface slotsDate{
  startTime:string;
  endTime:string;
  isBooked:boolean;
  slotNumber:number;
}

export default interface IDoctorSchedule{
  _id:string,
  doctorId:string,
  date:Date,
  consultationType:string,
  slots:slotsDate[]
}   

enum TokenStatus{
  applied="applied",
  visted="visted"
}

export interface BookingData{
  _id:string,
  doctorId:string,
  date:Date,
  userId:string,
  conusultationType:"online"|"offline",
  scheduleId:string,
  slotNumber:number,
  tokenStatus:TokenStatus,
  startTime:string
  endTime:string,
  isCanceled:boolean
}


export  interface IDoctor {
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

