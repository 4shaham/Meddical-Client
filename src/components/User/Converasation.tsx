import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { IUser } from "../../interface/interfaceUser";
import IConverasation from "../../interface/chatingInterface";
import { getDoctorProfile, getProfileData } from "../../api/user";
import { IDoctor } from "../../interface/interfaceDoctor";

type Props = {
  data: IConverasation;
  onlineStatus:boolean;
  callback: (data:any) => void; 
};

const Converasation: React.FC<Props> = ({ data,onlineStatus,callback}) => {

  const [doctorData, setDoctorData] = useState<IDoctor>();


  console.log(onlineStatus,"dkfjdkjfkdjfkdjfkdjfkdjfkdjfkdj")

  useEffect(() => {

    console.log(data.members[0].doctorId);

    const handleFn = async() => {
      try {
        const doctorData = await getDoctorProfile(data.members[0].doctorId);
        console.log(doctorData.data.data);
        setDoctorData(doctorData.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  },[data.members]);


  const onSelect=(name:string)=>{
        console.log('hiiiiiiiii',name)
  }

  return (

    <div className="mx-5 bg-white border shadow-xl border-gray-500 rounded-md mt-1 mb-2 p-2" onClick={()=>callback(doctorData)}>
      <div className="w-ful h-auto flex">
        <Avatar
          alt="Remy Sharp"
          src={doctorData?.image}
          sx={{ width: 56, height: 56 }}
        />

        <div>
         <h1 className="font-medium mx-3 md:text-lg mt-1">{doctorData?.name}</h1>
         {onlineStatus && 
           <h1 className="text-green-500 text-md mx-3">online</h1>
         }
        </div> 
      </div>
    </div>
    
  );
};

export default Converasation;
