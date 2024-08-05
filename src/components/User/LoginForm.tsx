import { useState } from "react";
import { googleAuth, signIn } from "../../api/user";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/slice/userAuthSlice";
import { verifed } from "../../Redux/slice/OtpSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";
import { toast } from "react-toastify";

interface CredentialPayload extends JwtPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
}

interface IFormData {
  email: string;
  password: string;
}

interface CredentiolErr {
  emailErr: string;
  passwordErr: string;
}

function LoginForm() {
  // hooks

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaidng, setIsLoading] = useState<boolean>(false);
  const [credintaiolErr, setCredintiaolErr] = useState<CredentiolErr>({
    emailErr: "",
    passwordErr: "",
  });

  // useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  // gogle auth

  const responseMessage = async (
    response: CredentialResponse
  ): Promise<void> => {
    try {
      let creditonalDetails: CredentialPayload = jwtDecode(
        response.credential as string
      );
      console.log(creditonalDetails.email, "response");
      let ApiResponse = await googleAuth(
        creditonalDetails.email,
        creditonalDetails.name,
        creditonalDetails.picture
      );

      if (ApiResponse.data.status == true) {
        dispatch(login(ApiResponse.data.userData._id));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const errorMessage = () => {
    console.log("errors in gogle auth");
  };

  const HandleOnSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    try {
      if (isLoaidng) {
        return;
      }
      setIsLoading(true);
      let response = await signIn(data.email, data.password);
      console.log(response,"sucessess response login")
      setIsLoading(false);
      if (
        response.data.message == "the login sucesss" &&
        response.data.status == true
      ) {
        dispatch(login(response.data.userData._id));
        navigate("/");
      }
    } catch (error) {
      console.log("error")
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setIsLoading(false);
          if (error.response.data.message == "the password is not match") {
            setCredintiaolErr({
              emailErr: "",
              passwordErr: "This password is not match",
            });
          } else if (error.response.data.otpVerified == "false") {
            localStorage.setItem("timer", "60");
            dispatch(verifed("userEmailVerification"));
            navigate("/otpVerification");
          } else {
            
            if(error.response.data.message=="this user is blocked"){
              toast.error("This email user is blocked")
            }

            setCredintiaolErr({
              emailErr:error.response.data.message,
              passwordErr: "",
            });
          }
        }
      }
    }
  };

  return (
    <div className="w-auto md:w-1/2 p-8 my-auto">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit(HandleOnSubmit)}>
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
              errors.email?.type == "required" || errors.email?.type=="pattern"
                ? "border-red-500"
                : "text-zinc-700"
            }  rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              onChange: (e): any => setValue("email", e.target.value.trim()),
            })}
          />

          {(errors.email?.type == "required" && (
            <small className="font-medium text-red-600 text-center">
              This field is required
            </small>
          )) ||
            (errors.email?.type == "pattern" && (
              <small className="font-medium text-red-500 text-center">
                This email format is not valid
              </small>
            ))}
          {credintaiolErr.emailErr && (
            <small className="text-red-500">{credintaiolErr.emailErr}</small>
          )}
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
            className={`mt-1 block w-full px-3 py-2 border  ${
              errors.password?.type == "required"
                ? "border-red-500"
                : "border-zinc-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            placeholder="Password"
            {...register("password", {
              required: true,
              onChange: (e): any => setValue("password", e.target.value.trim()),
            })}
          />
          {errors.password?.type == "required" && (
            <small className="font-medium text-red-600 text-center">
              This field is required
            </small>
          )}
          {credintaiolErr.passwordErr && (
            <small className="text-red-500 ">
              {credintaiolErr.passwordErr}
            </small>
          )}
        </div>
        <div>
          {!isLoaidng ? (
            <button
              type="submit"
              className="w-full bg-btnColor text-white py-2 rounded-md hover:bg-primary/80"
            >
              Sign In
            </button>
          ) : (
            <button
              type="button"
              className="w-full bg-btnColor text-white py-2 rounded-md hover:bg-primary/80"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          )}
        </div>
      </form>
      <Link to={"/forgotPassword"}><p className="text-red-500 text-center mt-2">Forgot password?</p></Link>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-zinc-300"></div>
        <span className="mx-4 text-zinc-500">or continue with</span>
        <div className="flex-grow border-t border-zinc-300"></div>
      </div>
      <div className="flex justify-center">
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
      <p className="mt-4 text-center text-sm text-zinc-600">
        Don’t have an account yet?
        <a href="#" className="text-primary hover:underline">
          <Link to={"/registration"}>
            {" "}
            <span className="text-red-600">Signup</span>
          </Link>
        </a>
      </p>     
    </div>
    // <div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //   <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 text-black">
    //     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //       <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
    //         User Sign In
    //       </h1>
    //       <form
    //         className="space-y-4 md:space-y-6"
    //         onSubmit={handleSubmit(HandleOnSubmit)}
    //       >
    //         <div>
    //           <label className="block mb-2 text-sm font-medium text-center">
    //             Your email
    //           </label>
    //           <input
    //             placeholder="please enter Email"
    //             className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    //             {...register("email", {
    //               required: true,
    //               pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //               onChange:(e):any=>setValue("email",e.target.value.trim())
    //             })}
    //           />
    //           {(errors.email?.type == "required" && (
    //             <p className="font-medium text-red-600 text-center">
    //               This field is required
    //             </p>
    //           )) ||
    //             (errors.email?.type == "pattern" && (
    //               <p className="font-medium text-red-500 text-center">
    //                 The email format is not valid
    //               </p>
    //             ))}
    //           {credintaiolErr.emailErr && (
    //             <p className="text-red-500 text-center">
    //               {credintaiolErr.emailErr}
    //             </p>
    //           )}
    //         </div>
    //         <div>
    //           <label className="block mb-2 text-sm font-medium text-center">
    //             Password
    //           </label>
    //           <input
    //             placeholder="please Enter Password"
    //             className="text-center  peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    //             {...register("password", {
    //               required: true,
    //               onChange:(e):any=>setValue("password",e.target.value.trim())
    //             })}
    //           />
    //           {errors.password?.type == "required" && (
    //             <p className="font-medium text-red-600 text-center">
    //               This field is required
    //             </p>
    //           )}
    //           {credintaiolErr.passwordErr && (
    //             <p className="text-red-500 text-center">
    //               {credintaiolErr.passwordErr}
    //             </p>
    //           )}
    //         </div>
    //        <Link to={"/forgotPassword"}><p className="text-sm text-center font-light text-red-700 dark:text-red-700">
    //           forgetPassword?{" "}
    //         </p></Link>
    //         <div className="block text-center ">
    //           {!isLoaidng ? (
    //             <button
    //               className="bg-btnColor text-white px-14 py-1 rounded-md mb-2"
    //               type="submit"
    //             >
    //               Sign In
    //             </button>
    //           ) : (
    //             <button className="bg-btnColor  text-white px-14 py-1 rounded-md mb-2">
    //               <svg
    //                 aria-hidden="true"
    //                 role="status"
    //                 className="inline w-4 h-4 me-3 text-white animate-spin"
    //                 viewBox="0 0 100 101"
    //                 fill="none"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
    //                   fill="#E5E7EB"
    //                 />
    //                 <path
    //                   d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
    //                   fill="currentColor"
    //                 />
    //               </svg>
    //               Loading...
    //             </button>
    //           )}
    //           <br />
    //           <Link to={"/registration"}>
    //             <button className="bg-btnColor text-white px-14 py-1 rounded-md mb-2">
    //               Sign Up
    //             </button>
    //           </Link>
    //           <br />
    //            <div className="md:mx-16 md:pl-9">
    //            <GoogleLogin
    //               onSuccess={responseMessage}
    //               onError={errorMessage}
    //             />
    //            </div>

    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}

export default LoginForm;
