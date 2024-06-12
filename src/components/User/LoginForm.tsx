import React, { useState } from "react";
import { signIn } from "../../api/user";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function LoginForm() {
  interface FormData {
    email: string;
    password: string;
  }

  interface FormErr {
    emailErr: string;
    passwordErr: string;
  }

  // hooks

  const navigate=useNavigate()

  const [formDatas, setFormDatas] = useState<FormData>({
    email: "",
    password: "",
  });

  const [formErr, setFormErr] = useState<FormErr>({
    emailErr: "",
    passwordErr: "",
  });

  const handleSubmit = async (e: React.FormEvent): Promise<null> => {
    e.preventDefault();

    try {
      const { email, password } = formDatas;

      if (email.trim() == "" && password.trim() == "") {
        setFormErr({
          emailErr: "This fild is requied",
          passwordErr: "This filed is required",
        });
        return null;
      }

      if (email.trim() != "" && password.trim() != "") {
        setFormErr({ emailErr: "", passwordErr: "" });
      }

      if (email.trim() == "" && password.trim() != "") {
        setFormErr((prev) => ({
          ...prev,
          emailErr: "This field is required",
          passwordErr: "",
        }));
        return null;
      }

      if (password.trim() == "" && email.trim() != "") {
        setFormErr((prev) => ({
          ...prev,
          passwordErr: "This field is required",
        }));
        return null;
      }

      if (password.trim() != "") {
        setFormErr((prev) => ({ ...prev, passwordErr: "" }));
      }

      if (email.trim() != "") {
        setFormErr((prev) => ({ ...prev, emailErr: "" }));
      }

      let a = await signIn(email, password);
      console.log("response", a);
      return null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data.message == "the password is not match") {
            setFormErr({
              emailErr: "",
              passwordErr: "This password is not match",
            });

          }else if(error.response.data.otpVerified=='false'){
             
            console.log("hdfdhfhdjfhdj")
            localStorage.setItem("timer",'60')
            navigate('/otpVerification')

          }else {
            setFormErr({
              emailErr: "This Email user is not found",
              passwordErr:"",
            });
          }
          console.log("Response status:", error.response.status);
          console.log("Response data:", error.response.data);
          console.log("Response headers:", error.response.headers);
        }
      }
      console.log(error);
      return null;
    }
  };

  return (
    <div>
      <section className="bg-gray-50 mt-6 dark:bg-serviceColors-500 md:my-34 md:mx-36 rounded-md">
       <Link to={"/"}><h1 className="py-4 px-11  font-medium flex">  <IoArrowBackCircleOutline size="1.5rem" />Home</h1></Link> 

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 text-black">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                User Sign In
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    Your email
                  </label>
                  <input
                    placeholder="please enter Email"
                    className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={formDatas.email}
                    onChange={(event) =>
                      setFormDatas({
                        email: event.target.value,
                        password: formDatas.password,
                      })
                    }
                  />
                  {formErr.emailErr.length != 0 ? (
                    <p className="text-red-600 text-center">
                      {formErr.emailErr}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    Password
                  </label>
                  <input
                    placeholder="please Enter Password"
                    className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={formDatas.password}
                    onChange={(event) =>
                      setFormDatas({
                        email: formDatas.email,
                        password: event.target.value,
                      })
                    }
                  />
                  {formErr.passwordErr.length != 0 ? (
                    <p className="text-red-600 text-center">
                      {formErr.passwordErr}
                    </p>
                  ) : null}
                </div>
                <p className="text-sm text-center font-light text-red-700 dark:text-red-700">
                  forgetPassword?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  ></a>
                </p>
                <div className="block text-center ">
                  <button
                    className="bg-btnColor hover:bg-white hover:text-black text-white px-14 py-1 rounded-md mb-2"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Sign In
                  </button>
                  <br />
                  <Link to={"/registration"}><button className="bg-btnColor text-white px-14 py-1 rounded-md">
                    Sign Up
                  </button></Link>
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
