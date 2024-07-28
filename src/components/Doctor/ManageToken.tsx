import React, { useEffect, useState } from "react";
import { IMangeTokenData } from "../../interface/interfaceDoctor";
import { doctorSchedule, findDoctorSchedule } from "../../api/doctor";
import Typography from "@mui/material/Typography";
import PrescriptionModal from "./PrescriptionModal";
function ManageToken() {
  const [slots, setSlots] = useState<IMangeTokenData[]>();
  const [status, setStatus] = useState<string>("pending");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [onCounsultationPatient, setConsultaionPatient] = useState<any>();

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await doctorSchedule();
        setSlots(response.data.doctorSchedule);
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  }, [counter]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSuccessesCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="m-5 bg-white p-5 rounded-md min-h-screen">
      {slots
        ?.filter((val) => val.tokenStatus == status)
        .splice(0, 1)
        .map((val) => (
          <>
            <div className="flex flex-col items-center p-4">
              <div className=" rounded-lg p-4 w-full max-w-lg bg-gray-100 hover:bg-white hover:shadow-xl hover:shadow-blue-950">
                <div className="flex flex-col sm:flex-row items-center">
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
                  {val.userData.image && (
                    <div className="flex-shrink-0  sm:mt-0 sm:ml-4 w-24 h-24 bg-white rounded-md">
                      <img
                        src={val.userData.image}
                        alt="Patient"
                        className="w-full h-full rounded-md object-fit"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-4">
                  {val.conusultationType == "online" && (
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                      Send That link
                    </button>
                  )}

                  <button
                    className="bg-btnColor text-white py-2 px-4 rounded-lg "
                    onClick={() => setShowModal(true)}
                  >
                    create Prescription
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}

      {!slots ||
        (slots.length == 0 && (
          <h1 className="text-center ">
            You have no scheduled appointments for today
          </h1>
        ))}

      {showModal &&
        slots?.filter((val) => val.tokenStatus == status).splice(0, 1)[0]
          ?.userData && (
          <PrescriptionModal
            consulationPatient={slots
              ?.filter((val) => val.tokenStatus == status)
              .splice(0, 1)}
            callback={handleCloseModal}
            successesCounter={handleSuccessesCounter}
          />
        )}

      <div className="flex gap-1  mt-9">
        <div className="w-5 h-5 bg-white rounded-xl border border-black"></div>
        <small>notVisited</small>
        <div className="w-5 h-5 bg-btnColor rounded-xl"></div>
        <small>visited</small>
      </div>

      <div className=" grid grid-cols-5 gap-5 p-4 mt-2  bg-gray-100 rounded-md">
        {slots?.map((val, index) => (
          <>
            <div
              className={
                val.tokenStatus != status
                  ? "bg-btnColor w-full h-28 rounded-lg cursor-pointer text-white   "
                  : "bg-white  w-full h-28 rounded-lg cursor-pointer text-gray-400  hover:bg-btnColor hover:bg-opacity-[0.60] hover:text-white"
              }
            >
              <div className="text-center mt-4">
                <small className="text-center mx-auto w-full">
                  Time<span className="text-red-500">{val.startTime}</span>
                </small>
              </div>

              <Typography color="blue-gray" className="font-medium text-center">
                <span className="font-normal text-center ">
                  {val.slotNumber}
                </span>
              </Typography>
              <Typography color="blue-gray" className="font-medium text-center">
                <span className="font-normal text-center ">
                  {val.tokenStatus}
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
