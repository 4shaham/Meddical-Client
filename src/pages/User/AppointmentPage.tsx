import React, { useEffect, useState } from "react";
import {
  getDoctorProfile,
  getDoctorSchedulePerticularDate,
} from "../../api/user";
import { useLocation } from "react-router-dom";
import IDoctorSchedule, { IDoctor } from "../../interface/interfaceDoctor";
import TokenBookingModal from "../../components/User/TokenBookingModal";

interface TokenData {
  doctorId: string;
  date: string;
  fees: number;
  tokenNumber: string;
}

function AppointmentPage() {
  // modal State

  const [showModal, SetShowModal] = useState<boolean>(false);

  //QuaryParmas
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query: string | null = searchParams.get("doctorId");

  //state for doctors and slots
  const [doctor, setDoctor] = useState<IDoctor>();
  // const [schedule, setSchedules] = useState<{}>();
  const [doctorSchedule, setDoctorScehdule] = useState<IDoctorSchedule>();

  // searching date
  const [date, setDate] = useState<string>();

  // for fetching DoctorProfile
  useEffect(() => {
    const fn = async () => {
      try {
        const response = await getDoctorProfile(query as string);
        setDoctor(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fn();
  }, []);

  // handleSerachButton
  const hanldeOnClickSerachBtn = async (id: string) => {
    try {
      if (!date) {
        return;
      }
      const scheduleData = await getDoctorSchedulePerticularDate(date, id);
      console.log(scheduleData.data);
      // if (scheduleData.data == null) {
      //   setSchedules({});
      // }
      setDoctorScehdule(scheduleData.data);
      // setSchedules(scheduleData.data.slots);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCallback = () => {
    SetShowModal(false);
  };

  const [tokenData, setTokenData] = useState<TokenData>();
  const showModalConfirmationBtnClick = () => {
    SetShowModal(true);
  };

  return (
    <div className="bg-white p-5">
      <div className="w-1/3 mx-auto p-2 mb-7 mt-7 rounded-md hover:bg-blue-50  shadow-lg realitive">
        <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
            <img
              src={doctor?.image}
              alt="Tania Andrew"
              className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {doctor?.name}
                </h5>
                <div className="flex items-center gap-0 5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                {doctor?.specialty}
              </p>
            </div>
          </div>
          <div className="p-0 mb-6">
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              "I found solution to all my design needs from Creative Tim. I use
              them as a freelancer in my hobby projects for fun! And its really
              affordable, very humble guys !!!"
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 h-20 flex items-center justify-center mb-8 mx-16 mt-20 rounded-md">
        <div className="flex justify-center p-5 items-center">
          <div className="bg-white border-2 border-yellow-300 px-16 py-2">
            <h1 className="text-center font-medium  ">
              choose any date to secure your Booking
            </h1>
          </div>
          <input
            type="date"
            className="bg-white border-2 border-yellow-200  px-12 py-2"
            placeholder="take any suitable date for "
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className="bg-btnColor text-white px-8 py-2 border-2 border-btnColor"
            onClick={() => hanldeOnClickSerachBtn(doctor?._id as string)}
          >
            Search
          </button>
        </div>
      </div>

      <div className="px-20 mb-8 mt-10">
        {doctorSchedule && (
          <div
            className={
              doctorSchedule.slots.length == 0
                ? "container mx-auto bg-gray-200 gap-5 p-10 rounded-md"
                : "container mx-auto bg-gray-200 grid grid-cols-7 gap-5 p-10 rounded-md"
            }
          >
            <div className="flex gap-1">
              <div className="w-5 h-5 bg-white rounded-xl"></div>
              <small>Available</small>
              <div className="w-5 h-5 bg-btnColor rounded-xl"></div>
              <small>Booked</small>
            </div>

            {doctorSchedule.slots.map((values, index) => (

              <div
                key={index}
                onClick={()=> showModalConfirmationBtnClick()}
                className={
                  values.isBooked == true
                    ? "bg-btnColor w-full h-24 rounded-lg items-center"
                    : "bg-white w-full h-24 rounded-lg items-center"
                }
              >
                <p className="text-gray-500 text-center mt-1 mb-3">
                  {values.startTime} To {values.endTime}
                </p>
                <h1 className="text-black text-center text-2xl font-bold my-auto">
                  {values.slotNumber}
                </h1>
              </div>
            ))}
            {/* {Object.entries(schedule).length == 0 &&(
              <p className="text-red-400 font-sans  text-center mt-4">
                Thank you for your inquiry. Unfortunately, Dr.{" "}
                {doctor?.specialty} does not have any available appointments on
                the selected date. Please choose an alternative date or contact
                our support team for further assistance.
              </p>
            )} */}
          </div>
        )}
      </div>
      {showModal && <TokenBookingModal callback={handleCallback} />}
    </div>
  );
}

export default AppointmentPage;
