import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../api/doctor";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/slice/DoctorAuthSlice";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [credientioalErr, setCredintiaolErr] = useState<string>("");

  const handleOnSubmitForm: SubmitHandler<FormData> = async (
    data: FormData
  ) => {
    try {
      console.log(data);

      let response = await signIn(data.email, data.password);
      console.log(response.data.doctor,"response")
      if (response.data.status) {
        dispatch(login(response.data.doctor))
        navigate("/doctor/");
      }

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (
            error.response.data.status == false &&
            error.response.data.message == "otp is not verified"
          ) {
            let timer = 60;
            localStorage.setItem("timer", timer.toString());
            localStorage.setItem("otpPage", "verified");
            navigate("/doctor/otpVerifcation");
            return;
          }

          if(
            error.response.data.status == false &&
            error.response.data.message == "kyc status not completed"
          ){
            console.log(data.email);
            localStorage.setItem("kycEmail", data.email);
            navigate("/doctor/kycVerification");
            return;
          }

          if (error.response.data.status == false && error.response.data.Err) {
            setCredintiaolErr(error.response.data.Err);
          }
          
          if(error.response.data.message=="doctor is blocked"){
             toast.error("This docotr is blocked")
          }


        }
      }
    }
  };

  return (
    // <div className="w-full bg-white h-screen flex">
    //   <div className="w-1/3 text-2xl  sm:w1/2  md:w-1/3 bg-white h-full flex">
    //     <h1 className="custom-font font-bold text-black text-xl   md:text-5xl lg:text-6xl my-auto mx-auto justify-center">
    //       MEDDICAL
    //     </h1>
    //   </div>
    <div className="w-2/3  sm:w-2/3  md:w-2/3 h-full pr-0 sm:pr-5 md:pr-13 p-2 ">
      <div className="w-full h-full   mx-auto  border-gray-100 rounded-xl border-solid border-2 my-auto px-16  bg-gray-100">
        <h1 className="custom-fontText text-3xl font-bold  md:text-4xl mt-[10%] ml-[12%] text-black ">
          Doctor Login
        </h1>

        <div className="flex flex-col gap-6  md:mx-32 max-w-72 mt-20">
          <form onSubmit={handleSubmit(handleOnSubmitForm)}>
            {credientioalErr != "" && (
              <div className="w-full">
                <p className="text-center text-red-500 font-medium">
                  {credientioalErr}
                </p>
              </div>
            )}

            <div className="h-11 w-full min-w-[200px] md:min-w-[400px]">
              <label
                className={
                  errors.email?.type == "required" ||
                  errors.email?.type == "pattern"
                    ? "text-red-500 p-2 md:p-0 text-md  md:text-lg  mt-3 "
                    : "text-balck p-2 md:p-0 text-md  md:text-lg  mt-3 "
                }
              >
                EMAIL ADDRESS
              </label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 focus:border-gray-300 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  onChange: (e): any =>
                    setValue("email", e.target.value.trim()),
                })}
              />
              {errors.email?.type == "required" && (
                <small className="text-red-500 text-center">
                  {" "}
                  This field is required
                </small>
              )}
              {errors.email?.type == "pattern" && (
                <small className="text-red-500 text-center">
                  {" "}
                  This Email format is not valid
                </small>
              )}
            </div>
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-14 ">
              <label
                className={
                  errors.password?.type == "required"
                    ? "text-red-500 p-2 md:p-0 text-md  md:text-lg  mt-3 "
                    : "text-balck p-2 md:p-0 text-md  md:text-xl  mt-3 "
                }
              >
                PASSWORD
              </label>
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                {...register("password", {
                  required: true,
                  onChange: (e): any =>
                    setValue("password", e.target.value.trim()),
                })}
                type="password"
              />
              {errors.password?.type == "required" && (
                <small className="text-red-500  mb-2">
                  This field is required
                </small>
              )}
            </div>
            <div className="h-11 w-full min-w-[200px] md:min-w-[400px] mt-16">
              <button
                className="bg-btnColor text-white w-full py-2 rounded-md"
                type="submit"
              >
                Sign In
              </button>
              <Link to={"/doctor/register"}>
                <button className="bg-btnColor text-white w-full py-2 rounded-md mt-2">
                  Register New Doctor
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Login;
