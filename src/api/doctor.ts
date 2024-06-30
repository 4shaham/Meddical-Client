import DoctorRouter from "../Routes/DoctorRouter";
import Api from "../services/axios";
import doctorRoutes from "../services/endPoints/doctorEndPoints";

interface Achievements {
  data: Date;
  description: string;
  title: string;
}

interface Experiences{
  startDate:Date,
  hospitalName:string,
  responsibilities:string,
  endDate:Date
}

interface IKyc{
  _id: string;
  email:string,
  licenseNumber:string,
  licenseImage:string,
  yearsOfexperience:number,
  identityCardImage:string,
  achievements?:Achievements[],
  experiences?:Experiences[],
  step:number,
  appliedStatus?:AppliedStatus;
}

enum AppliedStatus {
  Approved = "approved",
  Applied = "applied",
  Rejected = "rejected",
}

export const doctorSignUp = (
  email: string,
  name: string,
  specialty: string,
  password: string,
  phoneNumber: string,
  fees: number,
  image: string
) =>
  Api.post(doctorRoutes.signUp, {
    email,
    name,
    specialty,
    password,
    fees,
    phoneNumber,
    image,
  });

interface ExperienceData {
  startDate: Date | null;
  endDate?: Date | null;
  hospitalName?: string;
  responsibilities?: string;
}

export const doctorKycStoreDatastep1 = (
  email: string,
  licenseNumber: string,
  image: string,
  experiences?: ExperienceData[]
) =>
  Api.post(doctorRoutes.kycDataStoreStep1, {
    email,
    licenseNumber,
    image,
    experiences,
  });

interface IAcheivmentsData {
  date:Date|null;
  description?:string;
  title?: string;
}


export const doctorKycStoreDatastep2 =(
  yearsOfExperience:number,
  fullName: string,
  idCardImage:string,
  acheivemnts:IAcheivmentsData[],
) => Api.put(doctorRoutes.kycDataStoreStep2,{yearsOfExperience,fullName,acheivemnts,idCardImage})


interface VerifyOtpResponse{
 data:{
  status:boolean,
  message:string
 } 
}

export const DoctorVerifyOtp = async (otp:number): Promise<VerifyOtpResponse> =>  await Api.patch(doctorRoutes.verifyOtp,{otp})


export const resendOtp=async():Promise<{status:boolean}>=>await Api.post(doctorRoutes.resendOtp)

export const getKycStatus=async(email:string):Promise<IKyc>=>Api.get(`${doctorRoutes.getKycStatus}/${email}`)