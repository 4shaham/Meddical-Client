import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { doctorSignUp } from "../../api/doctor";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { ISpecality } from "../../interface/interfaceDoctor";
import { getSpecality } from "../../api/user";

interface FormDataFirstPage {
  email: string;
  name: string;
  phoneNumber: string;
  specialist: string;
  fees: number;
  password: string;
}

function Registration() {
  const navigate = useNavigate();

  const [credentionErr, setCredintiaolErr] = useState("");
  const [specality, setSpecality] = useState<ISpecality[]>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataFirstPage>();

  const [image, setImage] = useState<File | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await getSpecality();
        console.log(response.data);
        setSpecality(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    handleFn();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;

    const ImageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    let type = file?.name.split(".")[1];
    if (!ImageExtensions.includes(type as string)) {
      toast.error("The image type is not supported");
      return;
    }

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
    try {
      if (!image) {
        alert("Profile Image is required");
        return;
      }

      const response = await doctorSignUp(
        data.email,
        data.name,
        data.specialist,
        data.password,
        data.phoneNumber,
        data.fees,
        baseUrl
      );
      console.log(response);

      if (response.data.status) {
        let timer = 60;
        localStorage.setItem("timer", timer.toString());
        localStorage.setItem("otpPage", "verified");
        navigate("/doctor/otpVerifcation");
      }
    } catch (error) {
      console.log("error", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data.status == false) {
          setCredintiaolErr(error.response.data.errMessage);
        }
      }
    }
  };

  return (
    <div className="w-2/3  sm:w-2/3  md:w-2/3 h-full pr-0 sm:pr-5 md:pr-13 p-5 ">
      <div className="w-full h-fit  mx-auto   rounded-xl border-2 my-auto  bg-gray-100 p-2">
        <h1 className="custom-fontText text-3xl font-bold  md:text-4xl mt-[10%] ml-[12%] text-black p-4 ">
          Doctor Registration
        </h1>

        <div className="flex flex-col gap-6 mx-auto md:mx-32 max-w-full">
          <form
            onSubmit={handleSubmit(handleFirstFormSubmit)}
            className="space-y-6"
          >
            {credentionErr != "" && (
              <div className="w-full mx-auto">
                <h1 className="text-red-500 text-center font-medium">
                  {credentionErr}
                </h1>
              </div>
            )}

            <div className="w-full md:w-full mx-auto">
              <label
                className={`block mb-1 text-md fnot font-medium ${
                  errors.email
                    ? "text-red-500 text-lg font-medium"
                    : "text-black"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                aria-describedby="helper-text-explanation"
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@flowbite.com"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  onChange: (e): any =>
                    setValue("email", e.target.value.trim()),
                })}
              />
              {errors.email?.type == "required" && (
                <small className="text-red-500 font-medium text-md">
                  This field is required
                </small>
              )}
              {errors.email?.type == "pattern" && (
                <small className="text-red-500 font-medium text-md">
                  Invalid email format
                </small>
              )}
            </div>

            <div className="w-full mx-auto">
              <label className="block mb-1 text-md text-black font-medium">
                Name
              </label>
              <input
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                {...register("name", {
                  required: true,
                  onChange: (e): any => setValue("name", e.target.value.trim()),
                })}
              />
              {errors.name && (
                <small className="text-red-500 font-medium text-md">
                  This field is required
                </small>
              )}
            </div>

            <div className="w-full mx-auto">
              <label className="block mb-1 text-md text-black font-medium">
                Phone Number
              </label>
              <input
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  onChange: (e): any =>
                    setValue("phoneNumber", e.target.value.trim()),
                  minLength: {
                    value: 10,
                    message: `Phone number must be ${10} digits long`,
                  },
                  maxLength: {
                    value: 10,
                    message: `Phone number must be ${10} digits long`,
                  },
                })}
              />
              {errors.phoneNumber && (
                <small className="text-red-500 font-medium text-md">
                  {errors.phoneNumber.message}
                </small>
              )}
            </div>

            {/* <div className="w-full mx-auto">
              <label className="block mb-1 text-md text-black font-medium">
                Speciality
              </label>
              <input
                className="w-full bg-white border border-gray-600 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                {...register("specialist", {
                  required: true,
                  onChange: (e): any =>
                    setValue("specialist", e.target.value.trim()),
                })}
              />
              {errors.specialist && (
                <small className="text-red-500 font-medium text-md">
                  This field is required
                </small>
              )}
            </div> */}
            <div className="w-full mx-auto">
              <label className="block mb-1 text-md text-black font-medium">
                Specialty
              </label>
              <select
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                {...register("specialist", {
                  required: true,
                  onChange: (e): any =>
                    setValue("specialist", e.target.value.trim()),
                })}
              >
                <option value="">Select Specialty</option>
                {specality?.map((values) => (
                  <option value={values.name}>{values.name}</option>
                ))}
              </select>
              {errors.specialist && (
                <small className="text-red-500 font-medium text-md">
                  This field is required
                </small>
              )}
            </div>

            <div className="w-full md:w-full mx-auto">
              <label className="block mb-1 text-md text-black">
                Consultation Fees
              </label>
              <input
                type="number"
                className="w-full bg-gray-50  border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                {...register("fees", {
                  required: "This field is required",
                  min: {
                    value: 100,
                    message: "lessthan 100 is not possible",
                  },
                  onChange: (e): any => setValue("fees", e.target.value.trim()),
                })}
              />
              {errors.fees && (
                <small className="text-red-500 font-medium text-md">
                  {errors.fees.message}
                </small>
              )}
            </div>

            <div className="w-full mx-auto">
              <label className="block mb-1 text-md text-black font-medium">
                password
              </label>
              <input
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                {...register("password", {
                  required: true,
                  onChange: (e): any =>
                    setValue("password", e.target.value.trim()),
                })}
                type="password"
              />
              {errors.password && (
                <small className="text-red-500 font-medium text-md">
                  This field is required
                </small>
              )}
            </div>

            <div className="w-full mx-auto">
              <h1 className="text-lg font-medium mb-4">Upload Profile Image</h1>
              {!image && (
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
              )}

              {image && (
                <div className="mt-4">
                  <img
                    alt="Uploaded License"
                    src={URL.createObjectURL(image)}
                    className="w-full max-h-64 object-fit"
                  />
                  <MdDelete size={40} onClick={() => setImage(null)} />
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
