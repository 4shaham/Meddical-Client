import React from "react";
import NavBar from "../../components/Doctor/NavBar";

function DoctorHomePage() {
  return (
    <div className="bg-white w-full h-screen">
      
      <NavBar />

      <div className="w-full  sm:h-1/3 md:h-1/2 mt-4  flex">
        <div className="my-auto mx-auto">
          <h1 className="text-lg sm:text-2xl md:text-5xl font-serif text-black ">
            Hello, Dr. Shaham! Thank you for joining us today
          </h1>
        </div>
      </div>

      <div className="container h-1/2 bg-serviceColors grid grid-cols-3 grid-rows-2 p-14 gap-11 text-white  mx-auto rounded-lg ">
        <div className="bg-white rounded-lg flex">
          <h1 className="text-black text-2xl font-medium my-auto mx-auto">
            PatientDetails
          </h1>
        </div>
        <div className="bg-white rounded-lg flex">
          <h1 className="text-black text-2xl font-medium my-auto mx-auto">
            Availability of slot{" "}
          </h1>
        </div>
        <div className="bg-white rounded-lg flex">
          <h1 className="text-black text-2xl font-medium my-auto mx-auto">
          View Appointments
          </h1>
        </div>
        <div className="bg-white rounded-lg flex">
          <h1 className="text-black text-2xl font-medium my-auto mx-auto p-2">
           Manage Today's Tokens and Call Next Patients
          </h1>
        </div>
        <div className="bg-white rounded-lg flex">
          <h1 className="text-black text-2xl font-medium my-auto mx-auto p-2">
            Manage Today's Tokens and Call Next Patients
          </h1>
        </div>
        
      </div>
    </div>
  );
}

export default DoctorHomePage;
