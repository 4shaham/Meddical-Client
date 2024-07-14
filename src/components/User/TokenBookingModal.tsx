import React, { useState } from "react";

type TokenBookingModalProps = {
  callback: () => void; // Define the type for callback prop
};

const TokenBookingModal: React.FC<TokenBookingModalProps> = ({ callback }) => {

  
    const [consultaionType, setConsultaionType] = useState<string>("offline");

    const handleConsultaionTypeChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
       setConsultaionType(event.target.value);
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
              <h1 className="text-end ">shaham</h1>
            </div>
            <div className="flex w-full justify-between text-gray-500">
              <h1 className="text-start ">Age</h1>
              <h1 className="text-end ">12</h1>
            </div>
            <div className="flex w-full justify-between">
              <h1 className="text-start text-gray-500 ">Gender</h1>
              <h1 className="text-end text-gray-500 ">male</h1>
            </div>
            <div className="flex w-full justify-between">
              <h1 className="text-start text-gray-500 ">PhoneNumber</h1>
              <h1 className="text-end text-gray-500 ">12334545</h1>
            </div>
            <div className="flex w-full justify-between">
              <h1 className="text-start text-gray-500 ">Place</h1>
              <h1 className="text-end text-gray-500 ">kannur</h1>
            </div>
          </div>

          <h1 className="text-center font-sans mt-3">Token Details</h1>

          <div className="bg-gray-100 items-center rounded-md  p-8 ">
            <div className="flex w-full justify-between mt-1">
              <h1 className="text-start text-gray-500 ">Date</h1>
              <h1 className="text-end text-gray-500 ">2304949</h1>
            </div>
            <div className="flex w-full justify-between mt-1">
              <h1 className="text-start text-gray-500 ">TokenNumber</h1>
              <h1 className="text-end text-gray-500 ">2</h1>
            </div>
            <div className="flex w-full justify-between mt-1">
              <h1 className="text-start text-gray-500 ">Time</h1>
              <h1 className="text-end text-gray-500 ">445</h1>
            </div>
            <div className="flex w-full justify-between mt-1">
              <h1 className="text-start text-gray-500">consultaionType</h1>
              <select
                value={consultaionType}
                onChange={handleConsultaionTypeChange}
                className="bg-white rounded-md"
              >
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div className="flex w-full justify-between mt-1">
              <h1 className="text-start text-gray-500 ">fees</h1>
              <h1 className="text-end text-gray-500 ">5000</h1>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-red-500 text-white px-8 rounded mt-4"
              onClick={() => callback()}
            >
              Close
            </button>
            <button className="bg-btnColor text-white px-8  rounded mt-5">
              Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenBookingModal;
