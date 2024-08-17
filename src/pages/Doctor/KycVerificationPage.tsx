import React, { ChangeEvent, useEffect,useState } from "react";
import image from "../../assets/image.png";
import { useForm } from "react-hook-form";
import KycStep2 from "../../components/Doctor/KycStep2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doctorKycStoreDatastep1, getKycStatus } from "../../api/doctor";
import axios from "axios";

interface ExpeirenceData {
  startDate: Date | null;
  endDate?: Date | null;
  hospitalName?: string;
  responsibilities?: string;
}

interface FormData {
  email: string;
  licenseNumber: string;
}

function KycVerificationPage() {
  // experiences

  const [kycStatus, setKycStatus] = useState<string>("");

  useEffect(() => {
    const email: string | null = localStorage.getItem("kycEmail");
    console.log(email);
    const handlefn = async () => {
      try {
        const response = await getKycStatus(email != null ? email : "");
        console.log(response, "stages of kyc verifcation");
        if (response.data?._id) {
          setStep(response.data.step);
          setPropsEmail(response.data.email);
          setKycStatus(response.data.appliedStatus);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handlefn();
  });

  const [propsEmail, setPropsEmail] = useState("");

  console.log(propsEmail, "hiiiiii");
  // First Step
  const [credentialErr, setCredintiaolErr] = useState<string>("");
  const [experiencesDatas, setExperiencesDatas] = useState<ExpeirenceData>({
    startDate: null,
    endDate: null,
    responsibilities: "",
    hospitalName: "",
  });
  const [experiences, setExperiences] = useState<ExpeirenceData[]>([]);
  const [experiencesStatus, setexperiencesStatus] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExperiencesDatas((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAcheivement = () => {
    setExperiences((prev) => [...prev, experiencesDatas]);
    setexperiencesStatus(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [LicenseImage, setLicenseImage] = useState<File | null>();
  const [licenseImageUrl, setLicenseImageUrl] = useState<string>("");
  const [imageErr, setImageErr] = useState("");

  // image

  // const [idCardImage, setIdCardImage] = useState<File | null>();
  // const [idCardImageUrl, setIdCardImageUrl] = useState<string>("");

  const handleOnSubmit = async (data: FormData) => {
    try {
      if (!LicenseImage) {
        setImageErr("this field is required");
        return;
      } else {
        setImageErr("");
      }

      console.log(data, licenseImageUrl, experiencesDatas);
      const response = await doctorKycStoreDatastep1(
        data.email,
        data.licenseNumber,
        licenseImageUrl,
        experiences
      );
      console.log("next", response);

      if (response.data.status) {
        setStep(1);
        setPropsEmail(data.email);
        toast.success("first step completed");
        localStorage.setItem("kycEmail", data.email);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data.status == false) {
          setCredintiaolErr(error.response.data.errMessage);
        }
      }
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;

    const ImageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    let type = file?.name.split(".")[1];
    if (!ImageExtensions.includes(type as string)) {
      toast.error("The image type is not allowed");
      return;
    }

    setLicenseImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString() || "";
        setLicenseImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const CallbackChange = (val: number) => {
    setStep(val);
    console.log(val, step);
  };

  // kycData
  const [step, setStep] = useState(0);

  return (
    <div className="w-full h-full bg-gray-200  p-14 ">
      <div className="w-full h-auto  rounded-3xl  p-2  flex">
        <div className="w-1/2 h-auto bg-white ">
          <img className="object-cover w-full h-screen" src={image} alt="" />
        </div>

        <div className="w-1/2 h-auto bg-white">
          <h1 className="text-black font-bold text-4xl mt-10 ml-11 mb-7">
            KYC Verification
          </h1>

          <div className="mb-7 ">
            <ol className="flex items-center w-1/2 mx-auto text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
              <li
                className={
                  step == 0
                    ? "flex md:w-full items-center   sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                    : "flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                }
              >
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  {step != 0 ? (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  ) : (
                    ""
                  )}
                  Step <span className="hidden sm:inline-flex sm:ms-2">1</span>
                </span>
              </li>
              <li
                className={
                  step != 0 && step != 1
                    ? "flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                    : "flex md:w-full items-center   sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                }
              >
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  {step == 2 ? (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  ) : (
                    ""
                  )}
                  Step <span className="hidden sm:inline-flex sm:ms-2">2</span>
                </span>
              </li>
              <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1    after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ">
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <span className="me-2"></span>
                  status <span className="hidden sm:inline-flex sm:ms-2"></span>
                </span>
              </li>
            </ol>
          </div>
          {step == 2 && (
            <div className="mt-10">
              <h1 className="text-2xl font-medium text-black text-center">
                KYC Status
              </h1>
              {kycStatus == "applied" && (
                <h1 className="mt-5 mx-auto w-1/2">
                  Your KYC (Know Your Customer) application has been
                  successfully submitted and is currently under review. The
                  status of your application is applied
                </h1>
              )}
              {kycStatus == "rejected" && (
                <h1 className="mt-5 mx-auto w-1/2">
                  We regret to inform you that your KYC (Know Your Customer)
                  application has been rejected
                </h1>
              )}
            </div>
          )}
          {step == 0 ? (
            <div>
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                {credentialErr != "" && (
                  <div className="w-full text-center mt-2">
                    <p className="text-center font-medium text-red-500">
                      {credentialErr}
                    </p>
                  </div>
                )}
                <div className="w-1/2 text-start mx-24 mb-3">
                  <label className="font-medium">Email</label>
                  <br />
                  <input
                    className="py-2 px-10 border  rounded-lg bg-gray-200 text-black b"
                    placeholder="enter your name"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      onChange: (e): any =>
                        setValue("email", e.target.value.trim()),
                    })}
                    name="email"
                  ></input>
                  {errors.email?.type == "required" && (
                    <p className="text-red-500 font-medium">
                      This field is required
                    </p>
                  )}
                  {errors.email?.type == "pattern" && (
                    <p className="text-red-500 font-medium">
                      This Email format is not valid
                    </p>
                  )}
                </div>
                <div className="w-1/2 text-start mx-24 mb-3">
                  <label className="font-medium">LicenseNumber</label>
                  <br />
                  <input
                    className="py-2 px-10 border  rounded-lg bg-gray-200 text-black b"
                    {...register("licenseNumber", {
                      required: true,
                      onChange: (e): any =>
                        setValue("licenseNumber", e.target.value.trim()),
                    })}
                    name="licenseNumber"
                  ></input>
                  {errors.licenseNumber?.type == "required" && (
                    <p className="text-red-500 font-medium">
                      This field is required
                    </p>
                  )}
                </div>

                <div className="relative z-0 w-1/2 mx-24 mb-5 group mt-2">
                  <label className="text-black font-medium">
                    license Image
                  </label>

                  {LicenseImage ? (
                    <div className="mt-2">
                      <img src={URL.createObjectURL(LicenseImage)} alt="" />
                      <button
                        className="bg-red-500 rounded-md text-white mt-1"
                        onClick={() => setLicenseImage(null)}
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 text-white border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-500  ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4  dark:text-gray-400"
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
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
                        add licenseImage
                      </label>
                    </div>
                  )}
                  {imageErr && (
                    <p className="text-red-500">This field is required</p>
                  )}
                </div>

                {!experiencesStatus && (
                  <div className="w-1/2 text-start mx-24 mb-3">
                    <button
                      className="py-1 px-7 bg-btnColor text-white rounded-md"
                      onClick={() => setexperiencesStatus(true)}
                    >
                      Add ExperiencesStatus
                    </button>
                  </div>
                )}

                {experiencesStatus && (
                  <div className="w-1/2 text-start mx-24 mb-3 grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="py-1 px-5 border  rounded-lg bg-gray-200 text-black b"
                      placeholder="enter your start date"
                      onChange={handleChange}
                      name="startDate"
                    ></input>
                    <input
                      type="string"
                      className="py-1 px-5 border  rounded-lg bg-gray-200 text-black b"
                      placeholder="enter your hospital name"
                      onChange={handleChange}
                      name="hospitalName"
                      value={experiencesDatas.hospitalName}
                    ></input>
                    <input
                      type="string"
                      className="py-1 px-5 border  rounded-lg bg-gray-200 text-black b"
                      placeholder="enter your Responsibilites"
                      value={experiencesDatas.responsibilities}
                      onChange={handleChange}
                      name="responsibilities"
                    ></input>
                    <input
                      type="date"
                      className="py-1 px-5 border  rounded-lg bg-gray-200 text-black b"
                      placeholder="enter your start date"
                      name="endDate"
                      onChange={handleChange}
                    ></input>
                    <button
                      className="bg-black text-white rounded-md"
                      onClick={() => setexperiencesStatus(false)}
                    >
                      Back
                    </button>
                    <button
                      className="bg-btnColor rounded-md text-white"
                      onClick={handleAddAcheivement}
                    >
                      Add
                    </button>
                  </div>
                )}

                <div className="w-2/3 text-center mx-24 bg-gray-200 p-2 rounded-md">
                  <label className="text-black font-medium ">experiences</label>
                  <table className="border bg-white  w-full mt-2">
                    <thead className=" rounded-md font-medium">
                      <td>slNo</td>
                      <td>startDate</td>
                      <td>EndDate</td>
                      <td>Hospital Name</td>
                      <td>Responsibilities</td>
                    </thead>

                    <tbody className="border ">
                      {experiences.map((val, index) => (
                        <tr className="bg-white">
                          <td>{index}</td>
                          {/* <td>{val.startDate}</td> */}
                          <td>{val?.hospitalName}</td>
                          {/* <td>{val?.endDate}</td> */}
                          <td>{val.responsibilities}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="w-2/3 mx-auto mt-5">
                  <button
                    className="bg-blue-700 text-white px-5 py-1 rounded-md"
                    type="submit"
                  >
                    Next Step
                  </button>
                </div>
              </form>
            </div>
          ) : (
            step == 1 && (
              <KycStep2
                email={propsEmail as string}
                callback={CallbackChange}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default KycVerificationPage;
