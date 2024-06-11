import React from 'react'

function UserRegistration() {
  return (
    <section className="bg-gray-50  dark:bg-serviceColors md:my-10 md:mx-36 rounded-md">
   

    <h1 className="py-4 px-11 font-medium">Home</h1>

  
    

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 text-black">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            User Register
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label className="block mb-2 text-sm font-medium text-center">
                User Name
              </label>
              <input
                placeholder="please enter your Name"
                className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-center">
                Email
              </label>
              <input
                placeholder="please enter Email"
                className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-center">
                Gender
              </label>
              <input
                placeholder="please enter your Sex"
                className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-center">
               Phone Number 
              </label>
              <input
                placeholder="please enter your vlaid Phone Number"
                className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-center">
                Age
              </label>
              <input
                placeholder="please enter your age"
                className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-center">
                Password
              </label>
              <input
                placeholder="please Enter Password"
                className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-center">
               Confirm Password
              </label>
              <input
                placeholder="please Enter Password"
                className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
           
            <div className="block text-center">
              <button className="bg-btnColor text-white px-14 py-1 rounded-md">
                Sign Up
              </button>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
           
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}

export default UserRegistration
