import AdminRouter from "../Routes/AdminRouter";
import Api from "../services/axios";
import adminRoutes from "../services/endPoints/adminEndPoints";

export const adminSignIn = async (email: string, password: string) => {
  const response = await Api.post(adminRoutes.singIn, { email, password });
  return response;
};

export const adminLogout = async () => {
  const response = await Api.post(adminRoutes.logout);
  return response;
};

interface adminGetTokenResponse {
  data: {
    status: boolean;
    decoded: object;
  };
}

export const adminGetToken = async (): Promise<adminGetTokenResponse> =>
  await Api.get(adminRoutes.getToken);

interface addSpecalityResponse {
  data: {
    status: boolean;
    message: string;
  };
}

export default interface ISpecality extends Document {
  data:{_id: string; image: string; name: string,createdAt:string,updatedAt:string,};
}

export const addSpecality = async (
  specalityName: string,
  image: string
): Promise<addSpecalityResponse> =>
  await Api.post(adminRoutes.addSpecality, { image, specalityName });

export const  findspecality = async (): Promise<ISpecality[]> =>
  await Api.get(adminRoutes.findspecality);
