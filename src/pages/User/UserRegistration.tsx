import React, { FormEvent, useState } from "react";
import { signUp } from "../../api/user";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";


function UserRegistration() {
  interface UserRegisterData {
    userName: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    phoneNumber: string;
    confirmPassword: string;
  }

  interface FormErr {
    userNameErr: string;
    emailErr: string;
    passwordErr: string;
    ageErr: string;
    genderErr: string;
    phoneNumberErr: string;
    confirmPasswordErr: string;
  }
  
  const navigate=useNavigate()
  const [registerFormData, setRegisterFormData] = useState<UserRegisterData>({
    userName: "",
    email: "",
    password: "",
    age: 0,
    gender: "",
    phoneNumber: "",
    confirmPassword: "",
  });

  const [formErrData, setFormErrData] = useState<FormErr>({
    userNameErr: "",
    emailErr: "",
    passwordErr: "",
    ageErr: "",
    genderErr: "",
    phoneNumberErr: "",
    confirmPasswordErr: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async(e: FormEvent<HTMLFormElement>) => {

  try {

    e.preventDefault();

    const {
      userName,
      email,
      gender,
      age,
      password,
      confirmPassword,
      phoneNumber,
    } = registerFormData;

    console.log(userName, email, gender, age);

    if (
      userName.trim() == "" &&
      email.trim() == "" &&
      gender.trim() == "" &&
      password.trim() == "" &&
      confirmPassword.trim() == "" &&
      phoneNumber.trim() == ""
    ) {
      setFormErrData({
        userNameErr:"This Field is required",
        emailErr: "This Field is required",
        passwordErr: "This Field is required",
        ageErr: "This Field is required",
        genderErr: "This Field is required",
        phoneNumberErr: "This Field is required",
        confirmPasswordErr: "This Field is required",
      })
      return 
    }
    if (
      userName.trim() == "" &&
      email.trim() != "" &&
      gender.trim() != "" &&
      password.trim() != "" &&
      confirmPassword.trim() != "" &&
      phoneNumber.trim() != ""
    ) {
      setFormErrData({
        userNameErr:"This Field is required",
        emailErr: "This Field is required",
        passwordErr: "This Field is required",
        ageErr: "This Field is required",
        genderErr: "This Field is required",
        phoneNumberErr: "This Field is required",
        confirmPasswordErr: "This Field is required",
      })
      return 
    }

   const response=await signUp(email,userName,age,gender,password,phoneNumber)
   console.log(response,"dfhdjfhdjfhdjhfdjhfj")

   if(response.data.message=="user Created successfully and Otp send successfully"){
      
    let timer=60
    localStorage.setItem("timer", timer.toString());
      navigate("/otpVerification")
     
   }
   
  } catch (error) {

    console.log(error)
    
  }

   
   
  };

  return (
    <div className="p-12">
      <section className="bg-gray-50 mx-auto  h-auto w-full dark:bg-serviceColors-200  rounded-lg">
        <Link to="/">
          <h1 className="py-4 px-11 text-xl font-medium flex items-center">
            <IoArrowBackCircleOutline size="1.5rem" />
            Home
          </h1>
        </Link>
  
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
          <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-lg xl:p-12 text-black"> {/* Increased max-width and padding */}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                User Register
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleOnSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    User Name
                  </label>
                  <input
                    placeholder="Please enter your Name"
                    className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
                    value={registerFormData.userName}
                    name="userName"
                    onChange={(e) => handleOnchange(e)}
                  />
                  <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                    {formErrData.userNameErr}
                  </small>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    Email
                  </label>
                  <input
                    placeholder="Please enter Email"
                    className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
                    name="email"
                    value={registerFormData.email}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                    {formErrData.emailErr}
                  </small>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    Gender
                  </label>
                  <input
                    placeholder="Please enter your Gender"
                    className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
                    type="text"
                    name="gender"
                    value={registerFormData.gender}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                    {formErrData.genderErr}
                  </small>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    Phone Number
                  </label>
                  <input
                    placeholder="Please enter your valid Phone Number"
                    className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
                    type="number"
                    name="phoneNumber"
                    value={registerFormData.phoneNumber}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                    {formErrData.phoneNumberErr}
                  </small>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    Age
                  </label>
                  <input
                    placeholder="Please enter your Age"
                    className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
                    name="age"
                    type="number"
                    value={registerFormData.age}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                    {formErrData.ageErr}
                  </small>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    Password
                  </label>
                  <input
                    placeholder="Please enter Password"
                    className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
                    type="password"
                    value={registerFormData.password}
                    name="password"
                    onChange={(e) => handleOnchange(e)}
                  />
                  <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                    {formErrData.passwordErr}
                  </small>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-center">
                    Confirm Password
                  </label>
                  <input
                    placeholder="Please confirm Password"
                    className="text-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 disabled:border-0 disabled:bg-blue-gray-50"
                    name="confirmPassword"
                    type="password"
                    value={registerFormData.confirmPassword}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <small className="block mb-2 text-sm font-medium text-red-600 text-center">
                    {formErrData.confirmPasswordErr}
                  </small>
                </div>
                <div className="block text-center">
                  <button
                    className="bg-btnColor text-white px-14 py-1 rounded-md"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div> 
  );
}

export default UserRegistration;
