import Api from "../services/axios";
import adminRoutes from "../services/endPoints/adminEndPoints";



export const adminSignIn=async(email:string,password:string)=>{
    const response=await Api.post(adminRoutes.singIn,{email,password})
    return response
}


export const adminLogout=async()=>{
    const response=await Api.post(adminRoutes.logout)
    return response
}

interface adminGetTokenResponse{
    data:{
        status:boolean,
        decoded:object
    }
}

export const adminGetToken = async():Promise<adminGetTokenResponse>=> await Api.get(adminRoutes.getToken) 
 

