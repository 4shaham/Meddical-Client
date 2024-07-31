import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { getDoctorProfile, getProfileData } from "../../api/user";
import IConverasation from "../../interface/chatingInterface";
import { IUser } from "../../interface/interfaceUser";
import { getUserProfileDataInChating } from "../../api/doctor";

type Props = {
  data: IConverasation;
  onlineStatus:boolean;
  callback: (data:any) => void; 
};

const Converasation: React.FC<Props> = ({ data,onlineStatus,callback}) => {
  const [userData, setUserData] = useState<IUser>();
  useEffect(() => {
    const handelFn=async()=>{
        try {
            const response=await getUserProfileDataInChating(data.members[0].userId as string);
            console.log(response.data)
            setUserData(response.data.userData);
        } catch (error) {
            console.log(error)
        }
    }

    handelFn()
   
  },[]);

  return (
    <div className="mx-5 bg-white border shadow-xl border-gray-500 rounded-md mt-1 mb-2 p-2" onClick={()=>callback(userData)}>
    <div className="w-ful h-auto flex">
      <Avatar
        alt="Remy Sharp"
        src={userData?.image}
        sx={{ width: 56, height: 56 }}
      />

      <div>
       <h1 className="font-medium mx-3 md:text-lg mt-1 text-black">{userData?.userName}</h1>
       {onlineStatus && 
         <h1 className="text-green-500 text-md mx-3">online</h1>
       }
      </div> 
    </div>
  </div>




  );
};

export default Converasation;
