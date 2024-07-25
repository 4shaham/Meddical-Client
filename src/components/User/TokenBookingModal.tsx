import React, { useEffect, useState } from "react";
import IDoctorSchedule, {
  IDoctor,
  slotsDate,
} from "../../interface/interfaceDoctor";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store/store";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createToken, getProfileData, paymentChekcout } from "../../api/user";
import { IUser } from "../../interface/interfaceUser";
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";

type TokenBookingModalProps = {
  callback: () => void; // Define the type for callback prop
  doctorData: IDoctor;
  selectedSlot: slotsDate;
  doctorSchedule: IDoctorSchedule;
};

const TokenBookingModal: React.FC<TokenBookingModalProps> = ({
  callback,
  doctorData,
  selectedSlot, 
  doctorSchedule,
}) => {

  


  const navigate = useNavigate();
  const userStatus = useSelector((state: RootState) => state.user.userStatus);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData,setUserData]=useState<IUser>()

  useEffect(() => {
    if (userStatus != true) {
      callback();
      toast.error("your must signup your accont");
    }
  },[]);

  useEffect(()=>{
     const handleAsyncFn=async()=>{
        try {
          const response=await getProfileData()
          setUserData(response.data.userData)
        } catch (error) {
           console.log(error) 
        }
     }
     handleAsyncFn()
  },[])

  const [consultaionType, setConsultaionType] = useState<string>("offline");
  console.log(doctorData, selectedSlot.startTime);
  const handleConsultaionTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setConsultaionType(event.target.value);
  };

  const handleOnClickPay = async () => {
    try {
      if (loading == true) {
        return;
      }
      setLoading(true);
      const response = await createToken(
        doctorData.fees,
        consultaionType,
        doctorSchedule._id,
        selectedSlot.slotNumber
      );
      setLoading(false);

      if (response.data.status) {
        navigate("/successPage");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const makeaPayment = async () => {
    try {

      const stripe = await loadStripe("pk_test_51PdzTi2Mgx9NEftCeLyveEo29zJ2mygFOmBjxawVikLkqs6f7cnSvM2fxND7bMdB5K1DrCaOfGlbTsoviiP172Xb00nYW5MswS");
     
      if (!stripe) {
        console.error("Stripe failed to load");
        return;
      }

     const response=await paymentChekcout(
      userData?._id as string,
      doctorData.fees,
      consultaionType,
      doctorSchedule._id,
      selectedSlot.slotNumber
     )  
      if (!response.data || !response.data.sessionId) {
        console.error("Invalid response from API:", response);
        return;
      }
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
      if (result.error) {
        console.error("Stripe checkout error:", result.error.message);
      }
    }catch(error) {
      console.log("Caught error:", error);
    }
  };





  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  ">
        <div className="bg-white p-5 rounded w-1/3 h-auto ">
          <h2 className="text-center font-medium text-xl mb-3">
            Booking Details
          </h2>

          <h1>Pateint Details</h1>
          <div className="bg-gray-100 items-center rounded-md mt-3 h-1/3  p-8 ">
            <div className="flex w-full justify-between text-gray-500">
              <h1 className="text-start  ">name</h1>
              <h1 className="text-end ">{userData?.userName}</h1>
            </div>
            <div className="flex w-full justify-between text-gray-500">
              <h1 className="text-start ">Age</h1>
              <h1 className="text-end ">{userData?.age}</h1>
            </div>
            <div className="flex w-full justify-between">
              <h1 className="text-start text-gray-500 ">Gender</h1>
              <h1 className="text-end text-gray-500 ">{userData?.gender}</h1>
            </div>
            <div className="flex w-full justify-between">
              <h1 className="text-start text-gray-500 ">PhoneNumber</h1>
              <h1 className="text-end text-gray-500 ">{userData?.phoneNumber}</h1>
            </div>
          </div>

          <h1 className="text-center font-sans mt-3">Token Details</h1>

          <div className="bg-gray-100 items-center rounded-md  p-8 ">
            <div className="flex w-full justify-between mt-1">
              <h1 className="text-start text-gray-500">Date</h1>
              <h1 className="text-end text-gray-500">
                {doctorSchedule?.date instanceof Date
                  ? doctorSchedule.date.toISOString().split("T")[0]
                  : "N/A"}
              </h1>
            </div>
            <div className="flex w-full justify-between mt-1">
              <h1 className="text-start text-gray-500 ">TokenNumber</h1>
              <h1 className="text-end text-gray-500 ">
                {selectedSlot.slotNumber}
              </h1>
            </div>
            <div className="flex w-full justify-between mt-1">
              <h1 className="text-start text-gray-500 ">StartTime</h1>
              <h1 className="text-end text-gray-500 ">
                {selectedSlot.startTime}
              </h1>
            </div>

            <div className="flex w-full justify-between mt-1">
              <h1 className="text-start text-gray-500">consultaionType</h1>
              <select
                value={consultaionType}
                onChange={handleConsultaionTypeChange}
                className="bg-white rounded-md"
              >
                {doctorSchedule.consultationType == "both" && (
                  <>
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                  </>
                )}
                {doctorSchedule.consultationType == "online" && (
                  <option value="online">Online</option>
                )}
                {doctorSchedule.consultationType == "offline" && (
                  <option value="offline">offline</option>
                )}
              </select>
            </div>
            <div className="flex w-full justify-between mt-1">
              <h1 className="text-start text-gray-500 ">fees</h1>
              <h1 className="text-end text-gray-500 ">{doctorData.fees}</h1>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-red-500 text-white px-8 py-1 rounded mt-5 mb-2 mx-5"
              onClick={() => callback()}
            >
              Close
            </button>

            {loading==true 
            ?  <button
            className="bg-btnColor text-white px-8  rounded mt-5"
          >
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
          </button>:  <button
              className="bg-btnColor text-white px-8 py-1 rounded mt-5 mb-2 mx-5"
              onClick={makeaPayment}
            >
            pay
            </button>}
          
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenBookingModal;
