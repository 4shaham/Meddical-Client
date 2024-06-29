import Api from "../services/axios";
import doctorRoutes from "../services/endPoints/doctorEndPoints";

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
