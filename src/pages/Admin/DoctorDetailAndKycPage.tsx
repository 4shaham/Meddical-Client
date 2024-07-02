import React, { useEffect, useState } from "react";
import image from "../../assets/doctoProfiler.jpg";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { findDoctorKycData, updateDoctorKycStatus } from "../../api/admin";

interface Achievements {
  date: string;
  description: string;
  title: string;
}

interface Experiences {
  startDate: string;
  hospitalName: string;
  responsibilities: string;
  endDate: string;
}

enum AppliedStatus {
  Approved = "approved",
  Applied = "applied",
  Rejected = "rejected",
}

interface IKyc {
  _id: string;
  email: string;
  licenseNumber: string;
  licenseImage: string;
  yearsOfexperience: number;
  identityCardImage: string;
  achievements: Achievements[];
  experiences: Experiences[];
  step: number;
  appliedStatus: AppliedStatus;
}

interface IDoctor {
  _id: string;
  name: string;
  specialty: string;
  email: string;
  password: string;
  phoneNumber: string;
  approved: boolean;
  fees: number;
  image: string;
  isBlocked: boolean;
  otpVerified: boolean;
}

interface Response extends IKyc {
  doctorDetails: IDoctor[];
}

function DoctorDetailAndKycPage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("id");
  const [values, setValue] = useState<Response[]>();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const navigate=useNavigate()


  const handlebuttonSubmit=async(email:string)=>{
      try {
        console.log(email,selectedOption)
      
        if(selectedOption==""){
           alert("choose any option to change status")
           return
        }

        setIsLoading(true)
        let response=await updateDoctorKycStatus(email,selectedOption)
        setIsLoading(false)
        console.log(response.data.status,"")
       if(response.data.status){
        navigate("/admin/verifyNewRequest")
       }
      } catch (error) {
         console.log(error)
      }
  }
   

  useEffect(() => {
    console.log(query);
    const handleFetch = async () => {
      const response = await findDoctorKycData(query as string);
      console.log(response.data.data);
      setValue(response.data.data);
    };
    handleFetch();
  }, []);

  return (
    <div>
      {values?.map((values, index) => (
        <div className="w-full h-screen  md:flex p-5 gap-2">
          <div className="w-full md:w-1/2 bg-white">
            <div className="w-[20] mx-auto">
              <img
                className="rounded-full w-[20%] mx-auto"
                src={values.doctorDetails[0].image}
                alt=""
              />
            </div>

            <div className="w-3/2 mx-auto">
              <div className="bg-gray-200 rounded-md mt-2">
                <h1 className="text-black text-start py-1 mx-1 font-medium">
                  DoctorName :
                  <span className="text-black text-center mx-2">
                    {values.doctorDetails[0].name}
                  </span>
                </h1>
              </div>
              <div className="bg-gray-200 rounded-md mt-2">
                <h1 className="text-start py-1 mx-1 font-medium">
                  Specality:
                  <span className="text-black text-center mx-2">
                    {values.doctorDetails[0].specialty}
                  </span>
                </h1>
              </div>
              <div className="bg-gray-200 rounded-md mt-2 w-auto">
                <h1 className="text-black text-start py-1 mx-1 font-medium">
                  Email:
                  <span className="text-black text-center mx-2">
                    {values.email}
                  </span>
                </h1>
              </div>
              <div className="bg-gray-200 rounded-md mt-2">
                <h1 className="text-black text-start py-1 mx-1 font-medium">
                  PhoneNumber:
                  <span className="text-black text-center mx-2">
                    {values.doctorDetails[0].phoneNumber}
                  </span>
                </h1>
              </div>
              <div className="bg-gray-200 rounded-md mt-2">
                <h1 className="text-black text-start py-1 mx-1 font-medium">
                  Fees:
                  <span className="text-black text-center mx-2">
                    {values.doctorDetails[0].fees}
                  </span>
                </h1>
              </div>
            </div>

            <div className="relative  overflow-x-auto shadow-md sm:rounded-lg p-1 mt-7 border bg-gray-100">
              <h1 className="text-center font-medium text-black ">
                Experiences
              </h1>
              <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
                <thead className="text-xs  uppercase  text-black font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      startDate
                    </th>
                    <th scope="col" className="px-6 py-3">
                      EndDate
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Hospital Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Responsibilities
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {values.experiences.map((data, index) =>(
                    <tr className="bg-gray-100 border-b hover:bg-gray-50 dark:hover:bg-gray-100">
                      <td
                        scope="row"
                        className="flex items-center px-6 py-4  text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        {data.startDate.split("T")[0]}
                      </td>
                      <td className="px-6 py-4">
                        {data.endDate.split("T")[0]}
                      </td>
                      <td className="px-6 py-4">{data.hospitalName}</td>
                      <td>{data.responsibilities}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="relative  overflow-x-auto shadow-md sm:rounded-lg p-1 mt-7 border bg-gray-100">
              <h1 className="text-center font-medium text-black">
                Acheivments
              </h1>
              <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
                <thead className="text-xs  uppercase  text-black font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      title
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {values.achievements.map((data,index)=>(
                    <tr className="bg-gray-100 border-b    hover:bg-gray-50 dark:hover:bg-gray-100">
                      <td
                        scope="row"
                        className="flex items-center px-6 py-4  text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">{data.date.split("T")[0]}</td>
                      <td className="px-6 py-4">{data.description}</td>
                      <td className="px-6 py-4">{data.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full mx-auto text-center mt-3"> 
              <select className="bg-white border border-gray-300 rounded-md px-4 py-2 mt-3"
                value={selectedOption} 
                onChange={(e)=>setSelectedOption(e.target.value)}>
                <option value="" disabled>
                  Select an option
                </option>
                <option value="rejected">Rejected</option>
                <option value="approved">approved</option>
              </select>
              {!isLoading?( <button className="bg-btnColor text-white rounded-md text-center px-8 py-2 mt-8" onClick={()=>handlebuttonSubmit(values.email)}>
                Change Staus
              </button>):(<button className="bg-btnColor text-white rounded-md text-center px-8 py-2 mt-8">
              <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
              </button>)} 
             
            
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-gray-100 rounded-md p-1">
            <div className="mt-9 mb-5">
              <h1 className="font-medium mx-8">
                LicenseNumber :
                <span className="text-red-500 mx-3">
                  {values.licenseNumber}
                </span>
              </h1>
              <h1 className="font-medium mx-8">
                years of Experience:
                <span className="text-red-500 mx-3">
                  {values.yearsOfexperience}
                </span>
              </h1>
              <h1 className="font-medium mx-8">
                KycStatus:
                <span className="text-red-500 mx-3">
                  {values.appliedStatus}
                </span>
              </h1>
            </div>
            <div>
              <h1 className="text-center">License image</h1>
              <img
                className="w-1/2 object-contain mx-auto rounded-md h-56"
                src={values.licenseImage}
                alt=""
              />
            </div>
            <div className="mx-auto">
              <h1 className="text-center">Identity card </h1>
              <img
                className="object-contain w-1/2  mx-auto h-56 rounded-md"
                src={values.identityCardImage}
                alt=""
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorDetailAndKycPage;
