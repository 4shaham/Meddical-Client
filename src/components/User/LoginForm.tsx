import React, { useState } from "react";
import { signIn } from "../../api/user";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/slice/userAuthSlice";
import { SubmitHandler, useForm } from "react-hook-form";

function LoginForm() {
  // interface
  interface CredentiolErr {
    emailErr: string;
    passwordErr: string;
  }

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credintaiolErr, setCredintiaolErr] = useState<CredentiolErr>({
    emailErr: "",
    passwordErr: "",
  });

   // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  interface IFormData {
    email: string;
    password: string;
  }

  const HandleOnSubmit:SubmitHandler<IFormData>=async (data) => {
    try {
      let response = await signIn(data.email, data.password);
      if (
        response.data.message == "the login sucesss" &&
        response.data.status == true
      ) {
        dispatch(login());
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data.message == "the password is not match") {
            setCredintiaolErr({
              emailErr: "",
              passwordErr: "This password is not match",
            });
          } else if (error.response.data.otpVerified == "false") {
            localStorage.setItem("timer", "60");
            navigate("/otpVerification");
          } else {
            setCredintiaolErr({
              emailErr: "This Email user is not found",
              passwordErr: "",
            });
          }
        }
      }
    }
  };

  return (
    <div>
      <section className="bg-gray-50 mt-6 dark:bg-serviceColors-500 md:my-34 md:mx-36 rounded-md">
        <Link to={"/"}>
          <h1 className="py-4 px-11  font-medium flex">
            {" "}
            <IoArrowBackCircleOutline size="1.5rem" />
            Home
          </h1>
        </Link>

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 text-black">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                User Sign In
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(HandleOnSubmit)}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    Your email
                  </label>
                  <input
                    placeholder="please enter Email"
                    className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    {...register("email",{
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                  />
                  {(errors.email?.type == "required" && (
                    <p className="font-medium text-red-600 text-center">
                      This field is required
                    </p>
                  )) ||
                    (errors.email?.type == "pattern" && (
                      <p className="font-medium text-red-500 text-center">
                        The email format is not valid
                      </p>
                    ))}
                  {credintaiolErr.emailErr && (
                    <p className="text-red-500 text-center">
                      {credintaiolErr.emailErr}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    Password
                  </label>
                  <input
                    placeholder="please Enter Password"
                    className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  {errors.email?.type == "required" && (
                    <p className="font-medium text-red-600 text-center">
                      This field is required
                    </p>
                  )}
                  {credintaiolErr.passwordErr && (
                    <p className="text-red-500 text-center">
                      {credintaiolErr.passwordErr}
                    </p>
                  )}
                </div>
                <p className="text-sm text-center font-light text-red-700 dark:text-red-700">
                  forgetPassword?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  ></a>
                </p>
                <div className="block text-center ">
                  <button className="bg-btnColor hover:bg-white hover:text-black text-white px-14 py-1 rounded-md mb-2">
                    Sign In
                  </button>
                  <br />
                  <Link to={"/registration"}>
                    <button className="bg-btnColor text-white px-14 py-1 rounded-md">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;


