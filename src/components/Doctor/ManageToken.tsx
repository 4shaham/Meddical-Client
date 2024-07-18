import React from "react";

function ManageToken() {
  return (
    <div className="m-5 bg-white p-5">
      <div className="flex flex-col items-center p-4">
        <div className="border-2 border-blue-200 rounded-lg p-4 w-full max-w-lg bg-white   hover:bg-gray-100">
          <div className="flex flex-col sm:flex-row items-center">
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
              <p className="text-lg font-bold">
                Phone Number: <span className="font-normal">989897988797</span>
              </p>
            </div>
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
        </div>
        <button className="mt-4 bg-blue-900 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
          Call Next Token
        </button>
      </div>

      <div className=" grid grid-cols-5 gap-5 p-4 mt-9">
        
        <div className="bg-btnColor shadow-lg text-black w-full h-24 rounded-lg items-center cursor-pointer transition-all duration-[350ms] ease-[ease-in-out] hover:text-white">
          <p className="text-white text-center mt-1">completed</p>
          <h1 className=" text-center text-2xl font-bold my-auto text-white mt-2">1</h1>
        </div>
        <div className="bg-gray-100 shadow-lg text-black w-full h-24 rounded-lg items-center cursor-pointer transition-all duration-[350ms] ease-[ease-in-out]  hover:text-white">
          <p className="text-black text-center mt-1">pending</p>
          <h1 className=" text-center text-2xl font-bold my-auto mt-2">2</h1>
        </div>
        <div className="bg-gray-100 shadow-lg text-black w-full h-24 rounded-lg items-center cursor-pointer transition-all duration-[350ms] ease-[ease-in-out]  hover:text-white">
          <p className="text-black text-center mt-1">pending</p>
          <h1 className=" text-center text-2xl font-bold my-auto mt-2">3</h1>
        </div>
        <div className="bg-gray-100 shadow-lg text-black w-full h-24 rounded-lg items-center cursor-pointer transition-all duration-[350ms] ease-[ease-in-out]  hover:text-white">
          <p className="text-black text-center mt-1">pending</p>
          <h1 className=" text-center text-2xl font-bold my-auto mt-2">4</h1>
        </div>
        <div className="bg-gray-100 shadow-lg text-black w-full h-24 rounded-lg items-center cursor-pointer transition-all duration-[350ms] ease-[ease-in-out]  hover:text-white">
          <p className="text-black text-center mt-1">pending</p>
          <h1 className=" text-center text-2xl font-bold my-auto mt-2">5</h1>
        </div>
        <div className="bg-gray-100 shadow-lg text-black w-full h-24 rounded-lg items-center cursor-pointer transition-all duration-[350ms] ease-[ease-in-out]  hover:text-white">
          <p className="text-black text-center mt-1">pending</p>
          <h1 className=" text-center text-2xl font-bold my-auto mt-2">9</h1>
        </div>
      </div>
    </div>
  );
}

export default ManageToken;
