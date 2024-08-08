import React, { ChangeEvent, useEffect, useState } from "react";
import img from "../../assets/docterimage3.jpg";
import { getDoctorProfile, updateDoctorProfile } from "../../api/doctor";
import { IDoctor } from "../../interface/interfaceDoctor";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProfle } from "../../Redux/slice/DoctorAuthSlice";

function DoctorProfile() {

  const [doctorData, setDoctorData] = useState<IDoctor>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [fees, setFees] = useState<number>();
  const [image,setImage] = useState<string>();
  const [newImage,setNewImage]=useState<File|null>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [specality, setSpecality] = useState<string>();

  const dispatch=useDispatch()

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await getDoctorProfile();
        console.log(response.data);

        setDoctorData(response.data.profileData);
        setName(response.data.profileData.name);
        setEmail(response.data.profileData.email);
        setFees(response.data.profileData.fees);
        setImage(response.data.profileData.image);
        setPhoneNumber(response.data.profileData.phoneNumber);
        setSpecality(response.data.profileData.specialty)
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  }, []);


  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      try {
        e.preventDefault()
         console.log(doctorData?.specialty,specality);
         
        if(doctorData?.name==name && doctorData?.phoneNumber==phoneNumber && doctorData?.fees == fees && doctorData?.specialty==specality){
              toast.error("Your profile information remains unchanged")
              return
        }
      
        
      const response=await updateDoctorProfile(name as string,phoneNumber as string,fees as number,specality as string,imageUrl)
       let doctor={
          id:response.data.newData._id,
          name:response.data.newData.name,
          email:doctorData?.email,
          image:response.data.newData.image
        }
        dispatch(updateProfle(doctor))
        toast.success("profile updated")

        
      } catch (error) {
          console.log(error)
      }
  }


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const ImageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    let type = file?.name.split(".")[1];
    if (!ImageExtensions.includes(type as string)) {
      toast.error("The image type is not allowed");
      return;
    }
    setNewImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString() || "";
        setImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-2 min-h-screen">
      <div className="md:w-1/2  bg-gray-200 p-4 rounded-md shadow-md mb-4 md:mb-0 mx-auto mt-12 ">
        <div className="flex flex-col items-center p-5 mb-4">
          <div className="relative w-28 h-28 mb-4">
            <img
              src={newImage?URL.createObjectURL(newImage):image}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => handleImageChange(e)}
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
                value={email}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={phoneNumber}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Specality</label>
              <select
                id="gender"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                onChange={(e) => setSpecality(e.target.value)}
                value={specality}
              >
                <option value="" disabled>
                  Please select your gender
                </option>
                <option value="male">cardiology</option>
                <option value="female">humatolgoy</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Fees</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={fees}
                onChange={(e) => setFees(Number(e.target.value))}
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
    </div>
  );
}

export default DoctorProfile;
