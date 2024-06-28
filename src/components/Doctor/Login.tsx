import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  const handleOnSubmitForm:SubmitHandler<FormData>=(data:FormData)=>{
    
    try {
      console.log(data)
    } catch (error) {
      
    }

  }

  return (
    // <div className="w-full bg-white h-screen flex">
    //   <div className="w-1/3 text-2xl  sm:w1/2  md:w-1/3 bg-white h-full flex">
    //     <h1 className="custom-font font-bold text-black text-xl   md:text-5xl lg:text-6xl my-auto mx-auto justify-center">
    //       MEDDICAL
    //     </h1>
    //   </div>
      <div className="w-2/3  sm:w-2/3  md:w-2/3 h-full pr-0 sm:pr-5 md:pr-13 p-2 ">
        <div className="w-full h-full   mx-auto  border-gray-100 rounded-xl border-solid border-2 my-auto px-16  bg-gray-100">
          <h1 className="custom-fontText text-3xl font-bold  md:text-4xl mt-[10%] ml-[12%] text-black ">
            Doctor Login
          </h1>

          <div className="flex flex-col gap-6  md:mx-32 max-w-72 mt-20">
            <form onSubmit={handleSubmit(handleOnSubmitForm)}>
              <div className="h-11 w-full min-w-[200px] md:min-w-[400px]">
                <label   className={errors.email?.type=="required"||errors.email?.type=="pattern"?"text-red-500 p-2 md:p-0 text-md  md:text-lg  mt-3 ":"text-balck p-2 md:p-0 text-md  md:text-lg  mt-3 "}  >
                 EMAIL ADDRESS  
                </label>
                <input
                  placeholder=""
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 focus:border-gray-300 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  {...register("email",{
                    required:true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
               />
               {errors.email?.type=="required" &&
                   <small  className="text-red-500 text-center"> This field is required</small> }
                 {errors.email?.type=="pattern" &&
                   <small  className="text-red-500 text-center"> This Email format is not valid</small> }    
              </div>
              <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-14 ">
                <label   className={errors.password?.type=="required"?"text-red-500 p-2 md:p-0 text-md  md:text-lg  mt-3 ":"text-balck p-2 md:p-0 text-md  md:text-xl  mt-3 "}  >
                  PASSWORD
                </label>
                <input
                  placeholder=""
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  {...register("password",{
                    required:true
                  })}
                />
                {errors.password?.type=="required"&& <small  className="text-red-500  mb-2">
                  This field is required</small>}
              </div>
              <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-16">
                <button
                  className="bg-btnColor text-white w-full py-2 rounded-md"
                  type="submit"
                >
                  Sign In
                </button>
               <Link to={"/doctor/register"}><button className="bg-btnColor text-white w-full py-2 rounded-md mt-2">
                  Register New Doctor
                </button>
                </Link> 
              </div>
            </form>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default Login;
