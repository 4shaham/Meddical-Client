import React, { useEffect, useState } from "react";
import { IMangeTokenData } from "../../interface/interfaceDoctor";
import { doctorSchedule, findDoctorSchedule } from "../../api/doctor";
import Typography from "@mui/material/Typography";
import PrescriptionModal from "./PrescriptionModal";
function ManageToken() {
  const [slots, setSlots] = useState<IMangeTokenData[]>();
  const [status, setStatus] = useState<string>("pending");
  const [onPatient, setOnPatient] = useState<number>();
  const [showModal,setShowModal]=useState<boolean>(false)

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await doctorSchedule();
        console.log(response.data.doctorSchedule);
        setSlots(response.data.doctorSchedule);
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  }, []);

  return (
    <div className="m-5 bg-white p-5 rounded-md">
      <div className="flex flex-col items-center p-4">
        <div className=" rounded-lg p-4 w-full max-w-lg bg-white hover:bg-white hover:shadow-xl hover:shadow-blue-950">
          <div className="flex flex-col sm:flex-row items-center">
            {slots
              ?.filter((val) => val.tokenStatus == status)
              .splice(0, 1)
              .map((val) => (
                <>
                  <div className="flex-1">
                    <Typography color="blue-gray" className="font-medium">
                      Name{" "}
                      <span className="font-normal text-gray-400">
                        {val.userData.userName}
                      </span>
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      Age{" "}
                      <span className="font-normal text-gray-400">
                        {val.userData.age}
                      </span>
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      Gender{" "}
                      <span className="font-normal text-gray-400">
                        {val.userData.gender}
                      </span>
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      TokenNumber{" "}
                      <span className="font-normal text-gray-400">
                        {val.slotNumber}
                      </span>
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      phoneNumber{" "}
                      <span className="font-normal text-gray-400">
                        {val.userData.phoneNumber}
                      </span>
                    </Typography>
                  </div>

                  <div className="flex-shrink-0  sm:mt-0 sm:ml-4 w-24 h-24 bg-white">
                    <img
                      src={
                        val.userData.image
                          ? val.userData.image
                          : "https://toolset.com/wp-content/uploads/2018/06/9"
                      }
                      alt="Patient"
                      className="w-full h-full rounded-md object-fit"
                    />
                  </div>
                </>
              ))}
          </div>
          <div className="flex justify-between mt-4">

            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Send That link
            </button>

            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" onClick={()=>setShowModal(true)}>
               create Prescription
            </button>
             


          </div>

          <div className="mx-auto flex justify-center">
            <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 mt-2 mx-auto">
              Change Token status
            </button>
          </div>
        </div>
        <button className="mt-4 bg-blue-900 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
          Call Next Token
        </button>
      </div>

      {showModal && <PrescriptionModal/>  }

      <div className="flex gap-1">
        <div className="w-5 h-5 bg-white rounded-xl border border-black"></div>
        <small>notVisited</small>
        <div className="w-5 h-5 bg-btnColor rounded-xl"></div>
        <small>visited</small>
        <div className="w-5 h-5 bg-yellow-400 rounded-xl"></div>
        <small>nextToken</small>
      </div>

      <div className=" grid grid-cols-5 gap-5 p-4 mt-9 bg-gray-100 rounded-md">
        {slots?.map((val, index) => (
          <>
            <div
              className={
                val.tokenStatus != status
                  ? "bg-btnColor w-full h-28 rounded-lg cursor-pointer text-white flex items-center  "
                  : "bg-white text-black w-full h-24 rounded-lg cursor-pointer transition-all duration-[350ms] ease-[ease-in-out] hover:bg-btnColor hover:bg-opacity-[0.60] hover:text-white"
              }
            >
              <p className="text-red-500 text-center">{val.startTime}</p>
              <Typography color="blue-gray" className="font-medium text-center">
                Name{" "}
                <span className="font-normal text-center text-gray-400">
                  {val.slotNumber}
                </span>
              </Typography>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default ManageToken;
