import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { doctorKycStoreDatastep2 } from "../../api/doctor";

interface ExpeirenceData {
  date: Date | null;
  description: string;
  title: string;
}

interface FormData {
  yearsOfExperience: number;
  fullName: string;
}

interface IEmail{
   email:string,
   callback:Function
}

function KycStep2({email,callback}:IEmail) {
  
  const [acheievmentsDatas, setAcheievmentDatas] = useState<ExpeirenceData>({
    date: null,
    description: "",
    title: "",
  });

  const [Acheievments, setAcheievment] = useState<ExpeirenceData[]>([]);
  const [AcheievmentStatus, setAcheievmentStatus] = useState<boolean>(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAcheievmentDatas((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAcheivement = () => {
    setAcheievment((prev) => [...prev, acheievmentsDatas]);
    setAcheievmentStatus(false);
  };

  const [idImage, setIdImage] = useState<File | null>();
  const [idImageUrl, setIdImageUrl] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setIdImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString() || "";
        setIdImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleOnSubmit = async (data: FormData) => {
    try {
      if (!idImage) {
        return;
      }
      console.log(data, Acheievments, idImageUrl,email);
      const response = await doctorKycStoreDatastep2(
        data.yearsOfExperience,
        data.fullName,
        idImageUrl,
        Acheievments,
        email
      );
      console.log(response);
      callback(2)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="w-auto text-start mx-24 mb-3">
          <label className="font-medium">Years of Experience</label>
          <br />
          <input
            className="py-2 px-10 border  rounded-lg bg-gray-200 text-black b"
            placeholder=""
            type="number"
            {...register("yearsOfExperience", {
              required: true,
            })}
          ></input>
          {errors.yearsOfExperience?.type == "required" && (
            <p className="text-red-500 font-medium">This field is required</p>
          )}
        </div>
        <div className="w-auto text-start mx-24 mb-3">
          <label className="font-medium">Full Name</label>
          <br />
          <input
            className="py-2 px-10 border  rounded-lg bg-gray-200 text-black b"
            placeholder="enter your name"
            {...register("fullName", {
              required: true,
            })}
          ></input>
          {errors.fullName?.type == "required" && (
            <p className="text-red-500 font-medium">This field is required</p>
          )}
        </div>

        {!AcheievmentStatus && (
          <div className="w-1/2 text-start mx-24 mb-3">
            <button
              className="py-1 px-7 bg-btnColor text-white rounded-md"
              onClick={() => setAcheievmentStatus(true)}
            >
              Add Acheivements
            </button>
          </div>
        )}

        {AcheievmentStatus && (
          <div className="w-1/2 text-start mx-24 mb-3 grid grid-cols-2 gap-2">
            <div>
              <label>Date</label>
              <br />
              <input
                type="date"
                className="py-1 px-5 border  rounded-lg bg-gray-200 text-black b"
                placeholder="enter your start date"
                name="date"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Description</label>
              <input
                type="string"
                className="py-1 px-5 border  rounded-lg bg-gray-200 text-black b"
                placeholder="enter your hospital name"
                onChange={handleChange}
                name="description"
                value={acheievmentsDatas.description}
              ></input>
            </div>

            <div>
              <label>Title</label>
              <input
                type="string"
                className="py-1 px-5 border  rounded-lg bg-gray-200 text-black b"
                placeholder="enter your Responsibilites"
                value={acheievmentsDatas.title}
                onChange={handleChange}
                name="title"
              ></input>
            </div>
            <div></div>

            <button
              className="bg-black text-white rounded-md"
              onClick={() => setAcheievmentStatus(false)}
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
          <label className="text-black font-medium ">Acheievments</label>
          <table className="border bg-white  w-full mt-2">
            <thead className=" rounded-md font-medium">
              <td>slno</td>
              <td>date</td>
              <td>description</td>
              <td>title</td>
            </thead>

            <tbody className="border ">
              {Acheievments.map((val, index) => (
                <tr className="bg-white">
                  <td>{index + 1}</td>
                  <td>24434</td>
                  <td>d{val.description}</td>
                  <td>{val.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="relative z-0 w-1/2 mx-24 mb-5 group mt-2">
          <label className="text-black font-medium">ID Proof</label>

          {idImage ? (
            <div className="mt-2">
              <img src={URL.createObjectURL(idImage)} alt="" />
              <button className="bg-red-500 rounded-md text-white mt-1">
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
                add licenseImage
              </label>
            </div>
          )}
        </div>
        <div className="p-4 mx-20">
          <button
            className="w-full py-2 bg-btnColor text-white rounded-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default KycStep2;
