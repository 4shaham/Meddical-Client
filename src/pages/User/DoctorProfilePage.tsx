import React, { useEffect, useState } from "react";

import profileImage from "../../assets/docterimage3.jpg";
import { Link, useLocation } from "react-router-dom";
import { getDoctorProfile } from "../../api/user";
import { IDoctor } from "../../interface/interfaceDoctor";

function DoctorProfilePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query: string | null = searchParams.get("doctorId");

  const [doctorData, setDoctorData] = useState<IDoctor>();

  useEffect(() => {
    const fn = async () => {
      if (!query) {
        return;
      }
      const response = await getDoctorProfile(query);
      setDoctorData(response.data.data);
    };
    fn();
  }, []);

  return (
    <div className="px-12  h-screen mt-5 mb-5">
      <div className="bg-gray-50 rounded-md p-10 h-full mt-5">
        {doctorData ? (
          <div className=" h-auto p-5 rounded-md mx-12  grid grid-cols-1  lg:grid-cols-2 gap-0">
            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 mx-10 ">
              <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                <img src={doctorData.image} />
              </div>
              <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Dr {doctorData.name}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {doctorData.specialty}
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link to={`/appointmentPage?doctorId=${doctorData._id}`}    >
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-btnColor text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                  >
                    Book an appointment
                  </button>
                </Link>
              </div>
            </div>
            <div className="mt-3">
              <h1 className="block mb-2 font-sans text-xl mt-8 antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                About us
              </h1>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                Dr.{doctorData.name} is a highly skilled cardiologist with a
                specialization in the diagnosis and treatment of cardiovascular
                diseases. With [X] years of experience and a passion for heart
                health, Dr. [Doctor's Name] utilizes the latest medical
                advancements to deliver exceptional care and improve patient
                outcomes
              </p>
              {/* <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
              <div className="p-6"> */}
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 mt-9">
                Personal Details
              </h5>
              <div className="">
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  Dr.{doctorData.name}
                </p>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {doctorData.specialty}
                </p>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {doctorData.phoneNumber}
                </p>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {doctorData.email}
                </p>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  Fees:{doctorData.fees}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default DoctorProfilePage;
