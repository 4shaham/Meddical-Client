
import { useState } from "react";
import { signUp } from "../../api/user";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { verifed } from "../../Redux/slice/OtpSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registrationErr,setRegistrationErr] = useState<RegistrationErr>({
    userNameErr: "",
    emailErr: "",
    genderErr: "",
    phoneNumberErr: "",
    ageErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  });

  const [isLoaidng,setIsLoading] = useState<boolean>(false);

  console.log(isLoaidng,registrationErr);
  

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
      setIsLoading(true);
      const response = await signUp(
        email,
        userName,
        age,
        gender,
        password,
        phoneNumber
      );

      setIsLoading(false);

      if (
        response.data.message ==
        "user Created successfully and Otp send successfully"
      ) {
        let timer = 60;
        localStorage.setItem("timer", timer.toString());
        dispatch(verifed("userEmailVerification"));
        navigate("/otpVerification");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IUserRegisterData>();
  const password = watch("password");

  return (

    <div className="w-full md:w-1/2 p-8 my-auto">
      <h2 className="text-3xl font-bold mb-6">Registration</h2>
      <form className="space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-zinc-700"
          >
            User Name
          </label>
          <input
            type="text"
            id="userName"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.userName ? "border-red-500" : "border-zinc-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            placeholder="Enter your name"
            {...register("userName", {
              required: "This field is required",
              onChange: (e) => setValue("userName", e.target.value.trim()),
            })}
          />
          {errors.userName && (
            <small className="font-medium text-red-600">
              {errors.userName.message}
            </small>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-zinc-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            placeholder="Enter your email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "The email format is not valid",
              },
              onChange: (e) => setValue("email", e.target.value.trim()),
            })}
          />
          {errors.email && (
            <small className="font-medium text-red-600">
              {errors.email.message}
            </small>
          )}
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-zinc-700"
          >
            Gender
          </label>
          <select
            id="gender"
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            {...register("gender", { required: "This field is required" })}
            onChange={(e) => setValue("gender", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Please select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <small className="font-medium text-red-600">
              {errors.gender.message}
            </small>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700"
          >
            PhoneNumber
          </label>
          <input
            type="number"
            id="password"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.phoneNumber ? "border-red-500" : "border-zinc-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            placeholder="Enter your phoneNumber"
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
            <small className="font-medium text-red-600">
              {errors.phoneNumber.message}
            </small>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700"
          >
            Age
          </label>
          <input
            type="number"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.age ? "border-red-500" : "border-zinc-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            placeholder="Enter your password"
            {...register("age", {
              required: true,
              min: {
                value: 0,
                message: "Age must be greater than 0",
              },
              onChange: (e): any => setValue("age", e.target.value.trim()),
            })}
          />
          {(errors.age?.type == "required" && (
            <small className="text-red-600 ">This field is required</small>
          )) ||
            (errors.age?.type == "min" && (
              <small className=" text-red-600 ">
                This age is must be greater Than 0 or equall to 0
              </small>
            ))}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-zinc-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            placeholder="Enter your phoneNumber"
            {...register("password", {
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
              onChange: (e) => setValue("password", e.target.value.trim()),
            })}
          />
          {errors.password && (
            <small className="font-medium text-red-600">
              {errors.password.message}
            </small>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700"
          >
            ConfirmPassword
          </label>
          <input
            type="password"
            id="password"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-zinc-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            placeholder="Enter your phoneNumber"
            {...register("confirmPassword", {
              required: "This field is required",
              onChange: (e): any =>
                setValue("confirmPassword", e.target.value.trim()),
               validate: value => value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && (
            <small className="font-medium text-red-600">
              {errors.confirmPassword.message}
            </small>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-btnColor text-white py-2 rounded-md hover:bg-primary/80"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-zinc-600">
        you have already an account ?
        <a href="#" className="text-primary hover:underline">
          <Link to={"/login"}>
            {" "}
            <span className="text-red-600">Signin</span>
          </Link>
        </a>
      </p>
    </div>
  );
}

export default Registration;
