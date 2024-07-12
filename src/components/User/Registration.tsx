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
    const [isLoaidng,setIsLoading]=useState<boolean>(false)
    const handleOnSubmit:SubmitHandler<IUserRegisterData> = async (
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
        setIsLoading(true)
        const response = await signUp(
          email,
          userName,
          age,
          gender,
          password,
          phoneNumber
        );

        setIsLoading(false)
  
          if(response.data.message=="user Created successfully and Otp send successfully"){
            let timer=60
            localStorage.setItem("timer", timer.toString());
            dispatch(verifed("userEmailVerification"))
            navigate('/otpVerification')
          }
      } catch (error) {
         console.log(error)
         setIsLoading(false)
      }
  
    };
  
    const {
      register,
      handleSubmit,
      setValue,
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
                onChange:(e):any=>setValue("userName",e.target.value.trim())
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
                onChange:(e):any=>setValue("email",e.target.value.trim())  
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
          <select
        className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
        {...register("gender", { required: "This field is required" })}
        onChange={(e) => setValue("gender", e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Please select your Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && (
        <small className="block mb-2 text-sm font-medium text-red-600 text-center">
          {errors.gender.message}
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
                required:'Phone number is required',
                onChange:(e):any=>setValue("phoneNumber",e.target.value.trim()),
                minLength: {
                  value:10,
                  message: `Phone number must be ${10} digits long`,
                },
                maxLength: {
                  value:10,
                  message: `Phone number must be ${10} digits long`,
                },
              })}
            />
            {(errors.phoneNumber && (
              <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                {errors.phoneNumber.message}
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
              {...register("age",{
                required: true,
                min: {
                  value: 0,
                  message: "Age must be greater than 0",
                },
                onChange:(e):any=>setValue("age",e.target.value.trim())  
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
                  onChange:(e):any=>setValue("password",e.target.value.trim())    
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
                lowercase letter, one number, and one special character
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
                onChange:(e):any=>setValue("confirmPassword",e.target.value.trim())  
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
            {isLoaidng?
               <button
               className="bg-btnColor text-white px-14 py-1 rounded-md"
             >  <svg
             aria-hidden="true"
             role="status"
             className="inline w-4 h-4 me-3 text-white animate-spin"
             viewBox="0 0 100 101"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
               fill="#E5E7EB"
             />
             <path
               d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
               fill="currentColor"
             />
           </svg>

             </button>:<button
              className="bg-btnColor text-white px-14 py-1 rounded-md"
              type="submit"
            >
              Sign Up
            </button>}
         
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
