import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getEditSpecalityData, updateSpecality } from "../../api/admin";
import axios from "axios";
import { toast } from "react-toastify";

function EditSpecalityManagment() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("specalityId");

  const [image,setImage] = useState<File | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [specalityName, setSpecalityName] = useState<string>("");
  const [id, setId] = useState<string>();
  const [imageSrc,setImageSrc] = useState("");
  const [dataValues, setData] = useState<{
    _id: string;
    name: string;
    image: string;
  }>();

  useEffect(() => {
    const handleAsyncFunction = async () => {
      try {
        let data = await getEditSpecalityData(query as string);
        console.log(data);
        setId(data.data._id);
        setSpecalityName(data.data.name);
        setImageSrc(data.data.image);
        setData(data.data);
        console.log(dataValues, "hiii");
        // setBaseUrl(data.data.image)
      } catch (error) {
        console.log(error);
      }
    };
    handleAsyncFunction();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;

    const ImageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    let type = file?.name.split(".")[1];
    if (!ImageExtensions.includes(type as string)) {
      toast.error("The image type is not allowed");
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

  console.log(query);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (specalityName.trim() == "") {
        toast.error("name is required")
        return;
      }
      if (image == null && imageSrc == "") {
        toast.error("specality image is required")
        return;
      }

      if (dataValues?.name == specalityName && imageSrc != "") {
        toast.error(
          "You have not made any changes to your Specality. Please update your information before submitting"
        );
        return;
      }

      if (dataValues?.name != specalityName && imageSrc == "") {
        console.log("both changed");
        let response = await updateSpecality(
          dataValues?._id as string,
          specalityName,
          baseUrl
        );
        console.log(response);
        if (response.data.status == true) {
          toast.success("succussfully updated");
          navigate("/admin/specalityManagement");
        }
        return;
      }

      if (dataValues?.name != specalityName) {
        console.log("name only changed");
        let response = await updateSpecality(
          dataValues?._id as string,
          specalityName
        );
        console.log(response.data, "jiiiiii");
        if (response.data.status == true) {
          toast.success("succussfully updated");
          navigate("/admin/specalityManagement");
        }
        return;
      } else {
        console.log("image only changed");
        let response = await updateSpecality(
          dataValues?._id as string,
          "",
          baseUrl
        );
        if (response.data.status == true) {
          toast.success("succussfully updated");
          navigate("/admin/specalityManagement");
        }
        return;
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data.status == false) {
          toast.error(error.response.data.errMessage);
        }
      }
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto mt-16" onSubmit={handleFormSubmit}>
        <div className="">

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={specalityName}
              onChange={(e)=>setSpecalityName(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Specality Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {!image && imageSrc == "" && (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 text-white border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                    //   onChange={(e) => setImage(e.target.files[0])}
                    onChange={handleImageChange}
                  />
                  add Specality images
                </label>
              </div>
            )}
            {image && (
              <div className="w-full">
                <img
                  alt="Posts"
                  // width="200px"
                  // height="200px"
                  src={URL.createObjectURL(image)}
                  className="w-full object-cover"
                />
                <button
                  className="bg-red-500 text-white rounded-md px-4 py-1"
                  onClick={() => setImage(null)}
                >
                  Remove
                </button>
              </div>
            )}

            {imageSrc && (
              <div className="w-full">
                <img
                  alt="Posts"
                  // width="200px"
                  // height="200px"
                  src={imageSrc}
                  className="w-full object-cover"
                />
                <button
                  className="bg-red-500 text-white rounded-md px-4 py-1"
                  onClick={() => setImageSrc("")}
                >
                  Change Image
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Change Specality
        </button>
      </form>
    </div>
  );
}

export default EditSpecalityManagment;
