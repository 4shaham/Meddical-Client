import React from "react";

function SuccessesPage() {
  return (
    <div className="w-full px-5 h-screen bg-white flex justify-center">
      <div className="h-60 w-1/2 mx-auto my-auto bg-gray-50 shadow-md rounded-md justify-center hover:bg-green-50  ">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6 hover:translate-x-2"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <h1 className="text-black font-sans text-center text-xl mt-5">
           Your Appointment is Booked Successfully
        </h1>
        <button className="px-10 py-1 align-center flex bg-black mx-auto mt-5 text-white rounded-md hover:translate-x-1">
          Ok
        </button>
      </div>
    </div>
  );
}
export default SuccessesPage;
