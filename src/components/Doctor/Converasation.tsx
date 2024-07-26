import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { getDoctorProfile, getProfileData } from "../../api/user";
import IConverasation from "../../interface/chatingInterface";

type Props = {
  data: IConverasation;
};

const Converasation: React.FC<Props> = ({ data }) => {
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    const handelFn=async()=>{
        try {
            const response=await getProfileData(data.members[0].userId as string);
            console.log(response.data)
            setUserData(response.data.userData);
        } catch (error) {
            console.log(error)
        }
    }

    handelFn()
   
  },[]);

  return (
    <div>
      <div className="p-2 mx-5 hover:bg-green-50 rounded-md mt-1">
        <div className="w-ful h-auto flex">
          <Avatar
            alt="Remy Sharp"
            src={userData?.image}
            sx={{ width: 56, height: 56 }}
          />
          <h1 className="font-medium mx-10 md:text-xl mt-2">
            {userData?._id}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Converasation;
