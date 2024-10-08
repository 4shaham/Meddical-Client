import { Medicine } from "../components/Doctor/PrescriptionModal";
import { IAddScheduleIntervals } from "../interface/interfaceDoctor";
import Api from "../services/axios";
import doctorRoutes from "../services/endPoints/doctorEndPoints";

interface Achievements {
  data: Date;
  description: string;
  title: string;
}

interface Experiences {
  startDate: Date;
  hospitalName: string;
  responsibilities: string;
  endDate: Date;
}

interface IKyc {
  data: {
    _id: string;
    email: string;
    licenseNumber: string;
    licenseImage: string;
    yearsOfexperience: number;
    identityCardImage: string;
    achievements?: Achievements[];
    experiences?: Experiences[];
    step: number;
    appliedStatus: AppliedStatus;
  };
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
  date: Date | null;
  description?: string;
  title?: string;
}

export const doctorKycStoreDatastep2 = (
  yearsOfExperience: number,
  fullName: string,
  idCardImage: string,
  acheivemnts: IAcheivmentsData[],
  email: string
) =>
  Api.put(doctorRoutes.kycDataStoreStep2, {
    yearsOfExperience,
    fullName,
    acheivemnts,
    idCardImage,
    email,
  });

interface VerifyOtpResponse {
  data: {
    status: boolean;
    message: string;
  };
}

export const DoctorVerifyOtp = async (
  otp: number
): Promise<VerifyOtpResponse> =>
  await Api.patch(doctorRoutes.verifyOtp, { otp });

export const resendOtp = async (): Promise<{ status: boolean }> =>
  await Api.post(doctorRoutes.resendOtp);

export const getKycStatus = async (email: string): Promise<IKyc> =>
  Api.get(`${doctorRoutes.getKycStatus}/${email}`);

interface IDoctorData {
  name: string;
  image: string;
  email: string;
}

interface LoginResponse {
  data: {
    status: boolean;
    message?: string;
    Err?: string;
    token?: string;
    doctor?: IDoctorData;
  };
}

export const signIn = async (
  email: string,
  password: string
): Promise<LoginResponse> =>
  await Api.post(doctorRoutes.signIn, { email, password });

  
export const doctorLogout=async()=>await Api.post(doctorRoutes.logout)
export const docotorGetToken=async()=>await Api.get(doctorRoutes.getToken)
export const addSchedule=async(date:Date,consultationMethod:string,startTime:string,endTime:string,interval:IAddScheduleIntervals[])=> await Api.post(doctorRoutes.addSchedule,{consultationMethod,date,startTime,endTime,interval})

export const findDoctorSchedule=async()=>await Api.get(doctorRoutes.findAllSchedule)

export const doctorSchedule=async()=>await Api.get(doctorRoutes.findScheduleWithDate)


export const doctorGetConverasation=async()=>await Api.get(doctorRoutes.doctorGetConverasation)


export const createPrescription=async(description:string,medicines:Medicine[],recoverySteps:string,patientId:string,patientName:string,slotId:string)=>await Api.post(doctorRoutes.addPrescription,{description,medicines,recoverySteps,patientId,patientName,slotId})

export const getUserProfileDataInChating=async(id:string)=>Api.get(`${doctorRoutes.doctorUserProfileData}?id=${id}`)  

export const getDoctorProfile=async()=>Api.get(doctorRoutes.getDoctorProfile)

export const updateDoctorProfile=async(name:string,phoneNumber:string,fees:number,specialty:string,image?:string|null)=>Api.put(doctorRoutes.updateDoctorProfile,{name,phoneNumber,fees,specialty,image})

export const updateDoctorPassword=async(oldPassword:string,newPassword:string)=>await Api.patch(doctorRoutes.updatedDoctorPassword,{oldPassword,newPassword})