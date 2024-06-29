import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { IoLanguageSharp } from "react-icons/io5";
import { doctorSignUp } from "../../api/doctor";
import { useNavigate } from "react-router-dom";


interface FormDataFirstPage {
  email: string;
  name: string;
  phoneNumber: string;
  specialist: string;
  fees: number;
  password:string
}

function Registration() {
  
  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataFirstPage>();

  const [image, setImage] = useState<File | null>(null);
  const [baseUrl,setBaseUrl] = useState<string>("");



  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {

    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString() || "";
        setBaseUrl(base64String);
      };
      reader.readAsDataURL(file);
    }

  };

  const handleFirstFormSubmit = async (data:FormDataFirstPage) => {
    
    try {

      if (!image) {
        alert("Profile Image is required");
        return;
      }
    
      const response= await doctorSignUp(data.email,data.name,data.specialist,data.password,data.phoneNumber,data.fees,baseUrl)
      console.log(response)
      navigate('/doctor/kycVerification')
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-2/3  sm:w-2/3  md:w-2/3 h-full pr-0 sm:pr-5 md:pr-13 p-5 ">
      <div className="w-full h-fit  mx-auto   rounded-xl border-2 my-auto  bg-gray-100 p-2">
        <h1 className="custom-fontText text-3xl font-bold  md:text-4xl mt-[10%] ml-[12%] text-black p-4 ">
          Doctor Registration
        </h1>

        <div className="flex flex-col gap-6 mx-auto md:mx-32 max-w-full">
        <form onSubmit={handleSubmit(handleFirstFormSubmit)} className="space-y-6">
  <div className="w-full md:w-full mx-auto">
    <label
      className={`block mb-1 text-md fnot font-medium ${
        errors.email ? "text-red-500 text-lg font-medium" : "text-black"
      }`}
    >
      Email
    </label>
    <input
      type="email"
      id="email"
      aria-describedby="helper-text-explanation"
      className="w-full bg-white text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
      placeholder="name@flowbite.com"
      {...register("email", { required: true })}
    />
    {errors.email && (
      <small className="text-red-500 font-medium text-md">
        This field is required
      </small>
    )}
  </div>

  <div className="w-full mx-auto">
    <label className="block mb-1 text-md text-black font-medium">Name</label>
    <input
      className="w-full bg-white text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
      {...register("name", { required: true })}
    />
    {errors.name && (
      <small className="text-red-500 font-medium text-md">
        This field is required
      </small>
    )}
  </div>

  <div className="w-full mx-auto">
    <label className="block mb-1 text-md text-black font-medium">Phone Number</label>
    <input
      className="w-full bg-white text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
      {...register("phoneNumber", { required: true })}
    />
    {errors.phoneNumber && (
      <small className="text-red-500 font-medium text-md">
        This field is required
      </small>
    )}
  </div>

  <div className="w-full mx-auto">
    <label className="block mb-1 text-md text-black font-medium">Specialist</label>
    <input
      className="w-full bg-white text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
      {...register("specialist", { required: true })}
    />
    {errors.specialist && (
      <small className="text-red-500 font-medium text-md">
        This field is required
      </small>
    )}
  </div>

  <div className="w-full md:w-full mx-auto">
    <label className="block mb-1 text-md text-black">Consultation Fees</label>
    <input
      type="number"
      className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
      {...register("fees", { required: true })}
    />
    {errors.fees && (
      <small className="text-red-500 font-medium text-md">
        This field is required
      </small>
    )}
  </div>

  <div className="w-full mx-auto">
    <label className="block mb-1 text-md text-black font-medium">password</label>
    <input
      className="w-full bg-white text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
      {...register("password", { required: true })}
    />
    {errors.password&& (
      <small className="text-red-500 font-medium text-md">
        This field is required
      </small>
    )}
  </div>

  <div className="w-full mx-auto">
    <h1 className="text-lg font-medium mb-4">Upload Profile Image</h1>
    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50   dark:border-gray-600 dark:hover:border-gray-500 ">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          className="w-8 h-8 mb-4 0 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={handleImageChange}
      />
    </label>
    {image && (
      <div className="mt-4">
        <img
          alt="Uploaded License"
          src={URL.createObjectURL(image)}
          className="w-full max-h-64 object-cover"
        />
      </div>
    )}
  </div>

  

  <div className="w-full mx-auto mt-6">
    <button
      className="w-full bg-btnColor text-white py-2 rounded-lg"
      type="submit"
    >
      Submit
    </button>
  </div>
</form>

        </div>
      </div>
    </div>
    // </div>
  );
}

export default Registration;
