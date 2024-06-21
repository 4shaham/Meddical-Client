import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { adminSignIn } from "../../api/admin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/slice/AdminAuthSlice";
import UseAdminLogin from "../../hook/AdminSide/useAdminLoginRoute";

function Login() {
  
  UseAdminLogin()

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onsubmit = async (data: any) => {
    try {
      let response = await adminSignIn(data.EmailAddress, data.password);

      if (response.data.status) {
        dispatch(login());
        navigate("/admin/");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (!error.response?.data.status) {
          setError(error.response?.data.message);
        }
      }
    }
  };

  const handleTrim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name, value.trim(), { shouldValidate: true });
  };
  
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
            Admin Login
          </h1>

          <div className="flex flex-col gap-6 mx-auto md:mx-32 max-w-72 mt-20">
            <p className="text-center text-red-500">{error}</p>
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="h-11 w-full min-w-[200px] md:min-w-[400px]">
                <label className="text-balck p-2 md:p-0 text-md  md:text-xl   ">
                  EMAIL ADDRESS
                </label>
                <input
                  placeholder=""
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 focus:border-gray-300 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  {...register("EmailAddress", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                />
                {(errors.EmailAddress?.type == "required" && (
                  <p className="font-medium text-red-600">
                    This field is required
                  </p>
                )) ||
                  (errors.EmailAddress?.type == "pattern" && (
                    <p className="font-medium text-red-500">
                      The email format is not valid
                    </p>
                  ))}
              </div>
              <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-14">
                <label className="text-balck p-2 md:p-0 text-md  md:text-xl  ">
                  PASSWORD
                </label>
                <input
                  placeholder=""
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  {...register("password", {
                    required: true,
                    maxLength: 10,
                    onChange: handleTrim,
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 font-medium">
                    This field is required
                  </p>
                )}
              </div>
              <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-14">
                <button className="bg-btnColor text-white w-full py-2 rounded-md">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
