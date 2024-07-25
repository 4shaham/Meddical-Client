import React, { useEffect, useState } from "react";
import IDoctorSchedule, { BookingData } from "../../interface/interfaceDoctor";
import { doctorSchedule, findDoctorSchedule } from "../../api/doctor";

function ManageToken() {
  const [slots, setSlots] = useState<BookingData[]>();
  const [status,setStatus] = useState<string>("pending");

  useEffect(() => {
    const handleFn = async () => {
      try {
        console.log("shaham");
        const response = await doctorSchedule();
        console.log(response.data.doctorSchedule);
        setSlots(response.data.doctorSchedule);
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  },[]);

  return (
    <div className="m-5 bg-white p-5 rounded-md">
      <div className="flex flex-col items-center p-4">
        <div className="border-2 border-blue-200 rounded-lg p-4 w-full max-w-lg bg-white   hover:bg-gray-100">
          <div className="flex flex-col sm:flex-row items-center">
            {slots?.filter((val)=>val.tokenStatus==status).splice(0,1).map((val) => (
              <div className="flex-1">
                <p className="text-lg font-bold">
                  Name: <span className="font-normal">mishab</span>
                </p>
                <p className="text-lg font-bold">
                  Age: <span className="font-normal">12</span>
                </p>
                <p className="text-lg font-bold">
                  Gender: <span className="font-normal">Male</span>
                </p>
                <p>tokenNumber:{val.slotNumber}</p>
                <p className="text-lg font-bold">
                  Phone Number:{" "}
                  <span className="font-normal">989897988797</span>
                </p>
              </div>
            ))}

            <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Patient"
                className="w-24 h-24 rounded-full"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Send That link
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100">
              Create Prescription
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

      <div className="flex gap-1">
        <div className="w-5 h-5 bg-white rounded-xl border border-black"></div>
        <small>notVisited</small>
        <div className="w-5 h-5 bg-btnColor rounded-xl"></div>
        <small>visited</small>
        <div className="w-5 h-5 bg-yellow-400 rounded-xl"></div>
        <small>nextToken</small>
      </div>

      <div className=" grid grid-cols-5 gap-5 p-4 mt-9">
        {slots?.map((val, index) => (
          <div
            className={
              val.tokenStatus != status
                ? "bg-btnColor w-full h-24 rounded-lg items-center cursor-pointer text-white"
                : "bg-white text-black w-full h-24 rounded-lg items-center border  border-black cursor-pointer transition-all duration-[350ms] ease-[ease-in-out] hover:bg-btnColor hover:bg-opacity-[0.60] hover:text-white"
            }
          >
            <p className=" text-center mt-1">{val.tokenStatus}</p>
            <h1 className=" text-center text-2xl font-bold my-auto  mt-2">
             <span>TokenNo:</span>{val.slotNumber}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageToken;
