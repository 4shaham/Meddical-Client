import React, { useState } from "react";

function Registration() {
  const [pageStatus, setPageStatus] = useState<boolean>(false);

  return (
    <div className="w-full bg-white h-screen flex">
      <div className="w-1/3 text-2xl sm:w1/2  md:w-1/2 bg-white h-full flex">
        <h1 className="custom-font font-bold text-black text-xl   md:text-5xl lg:text-6xl my-auto mx-auto justify-center">
          MEDDICAL
        </h1>
      </div>
      <div className="w-2/3  sm:w-2/3  md:w-1/2 h-full pr-0 sm:pr-5 md:pr-13  ">
        <div className="w-full h-auto  mx-auto mt-16 border-gray-300 rounded-xl border-solid border-2 my-auto  bg-white">
          <h1 className="custom-fontText text-3xl font-bold  md:text-4xl mt-[10%] ml-[12%] text-black ">
            Doctor Login
          </h1>
          {!pageStatus ? (
            <div className="flex flex-col gap-6 mx-auto md:mx-32 max-w-72 mt-20">
              <div className="h-11 w-full min-w-[200px] md:min-w-[400px]">
                <label className="text-balck p-2 md:p-0 text-md  md:text-xl   ">
                  Email
                </label>
                <input
                  placeholder=""
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 focus:border-gray-300 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>
              <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10">
                <label className="text-balck p-2 md:p-0 text-md  md:text-xl  ">
                  Name
                </label>
                <input
                  placeholder=""
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>
              <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10">
                <label className="text-balck p-2 md:p-0 text-md  md:text-xl  ">
                  Phone Number
                </label>
                <input
                  placeholder=""
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>
              <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10 mb-5">
                <button
                  className="bg-btnColor text-white px-6 py-2 rounded-md "
                  onClick={() => setPageStatus(true)}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 mx-auto md:mx-32 max-w-72 mt-20 p-4 md:p-0">
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px]">
              <label className="text-black p-2 md:p-0 text-md md:text-xl">Specialist</label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 focus:border-gray-300 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10">
              <label className="text-black p-2 md:p-0 text-md md:text-xl">License Number</label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10">
              <label className="text-black p-2 md:p-0 text-md md:text-xl">Years of Experience</label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div className="h-11 flex w-full min-w-[200px] md:min-w-[400px] mt-10 gap-5">
              <p>Experiences</p>
              <button className="bg-btnColor px-4 text-white rounded-md -mt-2">Add</button>
            </div>
            <div className="h-11 flex w-full min-w-[200px] md:min-w-[400px] mt-10 gap-5">
              <p>Achievements</p>
              <button className="bg-btnColor px-4 text-white rounded-md -mt-2">Add</button>
            </div>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10">
              <button className="bg-btnColor text-white w-full py-2 rounded-md mb-10">Submit</button>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Registration;
