import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfileData, proflePasswordUpdate, updateUserProfile } from "../../api/user";
import { IUser } from "../../interface/interfaceUser";
import doctorImage3 from "../../assets/docterimage3.jpg";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface passwordData {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

function ProfilePage() {
  const [userData, setUserData] = useState<IUser>();

  const [name, setName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [age, setAge] = useState<number>();
  const [image, setImage] = useState<File | null>();
  const [imageSrc, setImageSrc] = useState<string | null>();
  const [baseUrl, setBaseUrl] = useState<string>();
  const [changePasswordForm, setChangePasswordForm] = useState<boolean>(false);

  // password

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<passwordData>();
  const newPassword = watch("newPassword");
  const oldPassword=watch("password")

  useEffect(() => {
    const handleAsyncFn = async () => {
      try {
        const response = await getProfileData();
        setUserData(response.data.userData);
        const data: IUser = response.data.userData;
        setName(data.userName);
        setPhoneNumber(data.phoneNumber);
        setGender(data.gender);
        setAge(data.age);
        setImageSrc(data.image);
      } catch (error) {
        console.log(error);
      }
    };
    handleAsyncFn();
  }, []);


  const handleUpdatePassword:SubmitHandler<passwordData>=async(data:passwordData)=>{
        try {
          
        
          await proflePasswordUpdate(data.password,data.newPassword)
          toast.success("password updated successfully")
          setChangePasswordForm(false)

        } catch (error) {
            if(axios.isAxiosError(error)){
                if(error.response){
                    toast.error(error.response.data.message)
                }
            }
        }
  }




  const handleSubmitUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      if (
        name == userData?.userName &&
        phoneNumber == userData?.phoneNumber &&
        age == userData?.age &&
        !baseUrl
      ) {
        toast.error("no changes in your profile");
        return;
      }

      if (
        name?.trim() == "" ||
        phoneNumber?.trim() == "" ||
        gender == "" ||
        age == 0
      ) {
        toast.error("all field is required");
        return;
      }

      if (phoneNumber && phoneNumber?.length < 9) {
        toast.error("your number must be 10 numbers");
      }

      if (age && age <= 0) {
        toast.error("age is must be enter ");
      }

      await updateUserProfile(
        name as string,
        phoneNumber as string,
        age as number,
        gender as string,
        baseUrl
      );

      toast.success("updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

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

  const Userpages = [
    { path: "/", element: "Medical History" },
    {
      path: "/myAppointmentPage",
      element: "My Appointment",
    },
    {
      path: "/",
      element: "Patient Details",
    },
    {
      path: "/transaction",
      element: " Transaction List",
    },
    {
      path: "/appointmentPage",
      element: "Wallet",
    },
  ];

  return (
    <div>
      <main className="flex flex-1 flex-col md:flex-row p-4">
        <div className="md:w-1/2 mx-12 bg-gray-200 p-4 rounded-md shadow-md mb-4 md:mb-0">
          <div className="flex flex-col items-center p-5 mb-4">
            <div className="relative w-24 h-24 mb-4">
              {image == null && imageSrc && (
                <img
                  src={imageSrc}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              )}

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              )}

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleImageChange(e)}
              />
            </div>

            <form className="w-full" onSubmit={handleSubmitUpdateProfile}>
              <div className="mb-4">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  value={userData?.email}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Phone Number</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Gender</label>
                <select
                  id="gender"
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <option value="" disabled>
                    Please select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Age</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-btnColor text-white rounded-md"
              >
                Save Changes
              </button>
            </form>

            <p
              className="text-red-500 mt-1"
              onClick={() => setChangePasswordForm(!changePasswordForm)}
            >
              change password
            </p>
            {changePasswordForm && (
              <form className="w-full mt-2" onSubmit={handleSubmit(handleUpdatePassword)}>
                <div className="mb-4">
                  <label className="block text-gray-600">old password</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    {...register("password",{
                      required: "Password is required",
                      onChange: (e): any =>
                        setValue("password", e.target.value.trim()),
                    })}
                  />
                  {errors.password && (
                    <small className="font-medium text-red-600">
                      {errors.password.message}
                    </small>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">New password</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    {...register("newPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 5,
                        message: "Password must be at least 5 characters long",
                      },
                      maxLength: {
                        value: 8,
                        message: "Password cannot exceed 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                      },
                      onChange: (e) =>
                        setValue("newPassword", e.target.value.trim()),
                      validate: (value) =>
                        value != oldPassword || "old password and new password is same",
                    })}
                  />
                  {errors.newPassword && (
                    <small className="font-medium text-red-600">
                      {errors.newPassword.message}
                    </small>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">
                    confirm password
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    {...register("confirmPassword", {
                      required: "This field is required",
                      onChange: (e): any =>
                        setValue("confirmPassword", e.target.value.trim()),
                      validate: (value) =>
                        value === newPassword || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <small className="font-medium text-red-600">
                      {errors.confirmPassword.message}
                    </small>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full p-2 bg-btnColor text-white rounded-md"
                >
                  update Password
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col space-y-4 mx-auto my-auto">
          {Userpages.map((values) => (
            <Link to={values.path}>
              <button className="w-full flex justify-center md:w-1/2 mx-auto p-4 bg-gray-200 rounded-md shadow-md hover:bg-gradient-to-r hover:from-white hover:to-green-300 transition-all duration-300">
                {values.element}
              </button>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
