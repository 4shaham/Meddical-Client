import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { IoLanguageSharp } from "react-icons/io5";

interface FormDataFirstPage {
  email: string;
  name: string;
  phoneNumber: string;
  specialist: string;
  licenseNumber: string;
  yearsOfExperience: string;
  fees: number;
  // languages: string[];
}

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataFirstPage>();
  const [image, setImage] = useState<File | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>("");
  
  // const[values,setValues]=useState("")
  // const[language,setLanguage]=useState<string[]>([])



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

  const handleFirstFormSubmit = async (data: FormDataFirstPage) => {
    console.log(data);
    try {

      if (!image) {
        alert("the Licence Image is required");
        return;
      }

      // console.log(language)

    } catch (error) {
       console.log("error",error)
    }
  };



  return (
    <div className="w-2/3  sm:w-2/3  md:w-2/2 h-full pr-0 sm:pr-5 md:pr-13  ">
      <div className="w-full h-auto  mx-auto mt-16 border-gray-300 rounded-xl border-solid border-2 my-auto  bg-white">
        <h1 className="custom-fontText text-3xl font-bold  md:text-4xl mt-[10%] ml-[12%] text-black ">
          Doctor Registration
        </h1>

        <div className="flex flex-col gap-6 mx-auto md:mx-32 max-w-72 mt-20">
          <form onSubmit={handleSubmit(handleFirstFormSubmit)}>
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px]">
              <label
                className={
                  errors.email?.type == "required" ||
                  errors.email?.type == "pattern"
                    ? "text-red-500 p-2 md:p-0 text-md  md:text-md"
                    : "text-black p-2 md:p-0 text-md  md:text-m"
                }
              >
                Email
              </label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 focus:border-gray-300 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email?.type == "required" && (
                <small className="text-red-500 font-medium text-md  mb-4">
                  This field is required
                </small>
              )}
            </div>

            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-12">
              <label className="text-balck p-2 md:p-0 text-md  md:text-md  ">
                Name
              </label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name?.type == "required" && (
                <small className="text-red-500 font-medium text-md  mb-4">
                  This field is required
                </small>
              )}
            </div>
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10 mb-10">
              <label className="text-balck p-2 md:p-0 text-md  md:text-md  ">
                Phone Number
              </label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                {...register("phoneNumber", {
                  required: true,
                })}
              />
              {errors.phoneNumber?.type == "required" && (
                <small className="text-red-500 font-medium text-md  mb-4">
                  This field is required
                </small>
              )}
            </div>
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px]">
              <label className="text-balck p-2 md:p-0 text-md  md:text-md">
                Specialist
              </label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 focus:border-gray-300 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                {...register("specialist", {
                  required: true,
                })}
              />
              {errors.specialist?.type == "required" && (
                <small className="text-red-500 font-medium text-md  mb-4">
                  This field is required
                </small>
              )}
            </div>

            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10">
              <label className="text-black p-2 md:p-0 text-md md:text-md">
                License Number
              </label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                {...register("licenseNumber", {
                  required: true,
                })}
              />
              {errors.licenseNumber?.type == "required" && (
                <small className="text-red-500 font-medium text-md  mb-4">
                  This field is required
                </small>
              )}
            </div>

            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10 ">
              <label className="text-black p-2 md:p-0 text-md ">
                Years of Experience
              </label>
              <input
                type="number"
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                {...register("yearsOfExperience", {
                  required: true,
                })}
              />
              {errors.yearsOfExperience?.type == "required" && (
                <small className="text-red-500 font-medium text-md  mb-4">
                  This field is required
                </small>
              )}
            </div>

            <h1 className="mt-10">upload LicenseImage</h1>

            <div className="flex items-center justify-center w-full ">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                upload License image
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
            </div>
            {image && (
              <div className="w-full h-full">
                <img
                  alt="Posts"
                  width="200px"
                  height="200px"
                  src={URL.createObjectURL(image)}
                  className="w-full"
                />
              </div>
            )}

            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10 ">
              <label className="text-black p-2 md:p-0 text-md ">
                Consultation Fees
              </label>
              <input
              
                type="number"
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                {...register("fees",{
                  required: true,
                })}
              />

              {errors.fees?.type == "required" && (
                <small className="text-red-500 font-medium text-md  ">
                  This field is required
                </small>
              )}
            </div>

            

            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-10">
              <button
                className="bg-btnColor text-white w-full py-2 rounded-md mb-10"
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
