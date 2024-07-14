
export interface IAddScheduleIntervals {
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
  startTime:string,
  endTime:string,
  isBooked:boolean,
  patientId:string,
  slotNumber:number
}

export default interface IDoctorSchedule{

  _id:string,
  doctorId:string,
  date:Date,
  consultationType:string,
  slots:slotsDate[]
}   


