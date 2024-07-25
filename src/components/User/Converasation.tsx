import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { IUser } from "../../interface/interfaceUser";
import IConverasation from "../../interface/chatingInterface";
import { getDoctorProfile, getProfileData } from "../../api/user";
import { IDoctor } from "../../interface/interfaceDoctor";

type Props = {
  data: IConverasation;
};

const Converasation: React.FC<Props> = ({ data }) => {
  const [doctorData, setDoctorData] = useState<IDoctor>();

  useEffect(() => {
    console.log(data.members[0].doctorId);

    const handleFn = async () => {
      try {
        const doctorData = await getDoctorProfile(data.members[0].doctorId);
        console.log(doctorData.data.data);
        setDoctorData(doctorData.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  }, [data.members]);


  const onSelect=(name:string)=>{
        console.log('hiiiiiiiii',name)
  }

  return (

    <div className="p-2 mx-5 hover:bg-green-50 rounded-md mt-1" onClick={()=>onSelect(doctorData?.name as string)}>
      <div className="w-ful h-auto flex">
        <Avatar
          alt="Remy Sharp"
          src={doctorData?.image}
          sx={{ width: 56, height: 56 }}
        
        />
        <h1 className="font-medium mx-10 md:text-xl mt-2">{doctorData?.name}</h1>
      </div>
    </div>
    
  );
};

export default Converasation;
