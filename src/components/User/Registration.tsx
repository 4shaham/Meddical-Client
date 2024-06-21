import React from 'react'
import {  useState } from "react";
import { signUp } from "../../api/user";
import {Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { verifed } from '../../Redux/slice/OtpSlice';


interface IUserRegisterData {
  userName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  age: number;
  password: string;
  confirmPassword: string;
}

interface RegistrationErr {
  userNameErr: string;
  emailErr: string;
  genderErr: string;
  phoneNumberErr: string;
  ageErr: string;
  passwordErr: string;
  confirmPasswordErr: string;
}

function Registration() {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [registrationErr, setRegistrationErr] = useState<RegistrationErr>({
      userNameErr: "",
      emailErr: "",
      genderErr: "",
      phoneNumberErr: "",
      ageErr: "",
      passwordErr: "",
      confirmPasswordErr: "",
    });
  
    const handleOnSubmit: SubmitHandler<IUserRegisterData> = async (
      data: IUserRegisterData
    ) => {
      try {
        const {
          userName,
          email,
          gender,
          phoneNumber,
          age,
          password,
          confirmPassword,
        } = data;
  
        let errrors: boolean = false;
        if (password != confirmPassword) {
          setRegistrationErr((prev) => ({
            ...prev,
            confirmPasswordErr: "password is not match",
          }));
          errrors = true;
        }
  
        if (errrors) {
          return null;
        }
  
        const response = await signUp(
          email,
          userName,
          age,
          gender,
          password,
          phoneNumber
        );
  
          if(response.data.message=="user Created successfully and Otp send successfully"){
  
            let timer=60
            localStorage.setItem("timer", timer.toString());
            dispatch(verifed())
            navigate('/otpVerification')

          }
         
        
  
      } catch (error) {
         console.log(error)
      }
  
    };
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IUserRegisterData>();
  
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
    <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-lg xl:p-12 text-black">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          User Register
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-center">
              User Name
            </label>
            <input
              placeholder="Please enter your Name"
              className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
              type="text"
              {...register("userName", {
                required: "this field is required",
              })}
            />
            {errors.userName && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                This field is required
              </small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-center">
              Email
            </label>
            <input
              placeholder="Please enter Email"
              className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
              type="text"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.email?.type == "required" && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                This field is required
              </small>
            )}
            {errors.email?.type == "pattern" && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                The email format is not valid
              </small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-center">
              Gender
            </label>
            <input
              placeholder="Please enter your Gender"
              className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
              type="text"
              {...register("gender", {
                required: true,
              })}
            />
            {errors.gender?.type == "required" && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                This field is required
              </small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-center">
              Phone Number
            </label>
            <input
              placeholder="Please enter your valid Phone Number"
              className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
              type="text"
              {...register("phoneNumber", {
                required: true,
                minLength: 10,
              })}
            />
            {(errors.phoneNumber?.type == "required" && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                This field is required
              </small>
            )) ||
              (errors.phoneNumber?.type == "maxLength" && (
                <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                  This age is must be greater Than 0
                </small>
              ))}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-center">
              Age
            </label>
            <input
              placeholder="Please enter your Age"
              className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
              type="number"
              {...register("age", {
                required: true,
                min: {
                  value: 0,
                  message: "Age must be greater than 0",
                },
              })}
            />
            {(errors.age?.type == "required" && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                This field is required
              </small>
            )) ||
              (errors.age?.type == "min" && (
                <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                  This age is must be greater Than 0 or equall to 0
                </small>
              ))}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-center">
              Password
            </label>
            <input
              placeholder="Please enter Password"
              className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              })}
            />
            {errors.password?.type == "required" && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                This field is required
              </small>
            )}
            {errors.password?.type == "pattern" && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and one special character"
              </small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-center">
              Confirm Password
            </label>
            <input
              placeholder="Please confirm Password"
              className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
              type="password"
              {...register("confirmPassword", {
                required: true,
              })}
            />
            {errors.confirmPassword?.type == "required" && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                This field is required
              </small>
            )}
            {registrationErr.confirmPasswordErr && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                {registrationErr.confirmPasswordErr}
              </small>
            )}
          </div>
          <div className="block text-center">
            <button
              className="bg-btnColor text-white px-14 py-1 rounded-md"
              type="submit"
            >
              Sign Up
            </button>
            <br />
           <Link to={"/login"}> <button
              className="bg-btnColor text-white px-14 py-1 rounded-md mt-2"
              type="submit"
            >
              Sign  In
            </button></Link>
               
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Registration
