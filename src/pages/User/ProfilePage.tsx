import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfileData } from "../../api/user";
import { IUser } from "../../interface/interfaceUser";

function ProfilePage() {

  const [userImutableData,setUserImutableData]=useState<IUser>()
  const [userData,setUserData]=useState<IUser>()

  useEffect(()=>{
     const handleAsyncFn=async()=>{
        try {
            const response=await getProfileData()  
            setUserData(response.data.userData) 
            setUserImutableData(response.data.userData)

        } catch (error) {
            console.log(error)
        }  
     }
     handleAsyncFn()
  },[])



  const handleBtnSaveChange=()=>{

  }





  const Userpages = [
    { path: "/", element: "Medical History" },
    {
      path: "/myAppointmentPage",
      element: "My Appointment",
    },
    {
      path: "/",
      element: "Patient Details",
    },
    {
      path: "/transaction",
      element: " Transaction List",
    },
    {
      path: "/appointmentPage",
      element: "Wallet",
    },
  ];

  return (
    <div>
      <main className="flex flex-1 flex-col md:flex-row p-4">
        <div className="md:w-1/2 mx-12 bg-gray-200 p-4 rounded-md shadow-md mb-4 md:mb-0">
          <div className="flex flex-col items-center p-5 mb-4">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-user text-4xl text-gray-500"></i>
              {/* <img src={userData?.image} alt="" /> */}
            </div>
            <form className="w-full">
              <div className="mb-4">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={userData?.userName}
                  readOnly
                  // onChange={(e)=>setUserData(userData?.userName=e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  value={userData?.email}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={userData?.phoneNumber}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Gender</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={userData?.gender}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Age</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={userData?.age}
                  readOnly
                />
              </div>
              <button
                type="button"
                className="w-full p-2 bg-btnColor text-white rounded-md"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col space-y-4 mx-auto my-auto">
          {Userpages.map((values) => (
            <Link to={values.path}>
              <button className="w-full flex justify-center md:w-1/2 mx-auto p-4 bg-gray-200 rounded-md shadow-md hover:bg-gradient-to-r hover:from-white hover:to-green-300 transition-all duration-300">
                {values.element}
              </button>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
