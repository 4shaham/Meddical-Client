import React from "react";

function Login() {
  return (
    <div className="w-full bg-white h-screen flex">
      <div className="w-1/3 text-2xl sm:w1/2  md:w-1/3 bg-white h-full flex">
        <h1 className="custom-font font-bold text-black text-xl   md:text-5xl lg:text-6xl my-auto mx-auto justify-center">
          MEDDICAL
        </h1>
      </div>
      <div className="w-2/3  sm:w-2/3  md:w-2/3 h-full pr-0 sm:pr-5 md:pr-13  ">
        <div className="w-full h-[80%]  mx-auto mt-16 border-gray-300 rounded-xl border-solid border-2 my-auto  bg-white">
          <h1 className="custom-fontText text-3xl font-bold  md:text-4xl mt-[10%] ml-[12%] text-black ">
            Doctor Login
          </h1>

          <div className="flex flex-col gap-6 mx-auto md:mx-32 max-w-72 mt-20">
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px]">
              <label className="text-balck p-2 md:p-0 text-md  md:text-xl   ">EMAIL ADDRESS</label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 focus:border-gray-300 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10">
              <label className="text-balck p-2 md:p-0 text-md  md:text-xl  ">
                PASSWORD
              </label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10">
              <button className="bg-btnColor text-white w-full py-2 rounded-md">Sign In</button>
              <button className="bg-btnColor text-white w-full py-2 rounded-md mt-2">Register New Doctor</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
