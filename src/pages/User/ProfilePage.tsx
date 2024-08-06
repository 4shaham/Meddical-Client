import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfileData } from "../../api/user";
import { IUser } from "../../interface/interfaceUser";
import doctorImage3 from "../../assets/docterimage3.jpg"
import { toast } from "react-toastify";

function ProfilePage() {
  const [userData, setUserData] = useState<IUser>();

  const [name, setName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [age, setAge] = useState<number>();
  const [image, setImage] = useState<string | null>();

  useEffect(() => {
    const handleAsyncFn = async () => {
      try {
        const response = await getProfileData();
        setUserData(response.data.userData);
        const data: IUser = response.data.userData;
        setName(data.userName);
        setPhoneNumber(data.phoneNumber);
        setGender(data.gender);
        setAge(data.age);
        setImage(data.image);
      } catch (error) {
        console.log(error);
      }
    };
    handleAsyncFn();
  }, []);

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault()
     try {

      if(name==userData?.userName&&phoneNumber==userData?.phoneNumber&&age==userData?.age){
         toast.error("no changes in your profile")
         return
      }
      
     } catch (error) {
        
     }
  };


  




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
            <div className="relative w-24 h-24 mb-4">
              <img
                src={image?image:doctorImage3}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  value={userData?.email}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Phone Number</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Gender</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={gender}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Age</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
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
