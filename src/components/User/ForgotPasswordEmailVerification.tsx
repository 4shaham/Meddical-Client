import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../api/user";
import axios from "axios";
import { useDispatch } from "react-redux";
import { verifed } from "../../Redux/slice/OtpSlice";
import { useNavigate } from "react-router-dom";

interface ForgotFome {
  email: string;
}

function ForgotPasswordEmailVerification() {

 const [isLoaidng,setIsLoading]=useState<boolean>(false) 
 const [credinetioalErr,setCredinetionalErr]=useState<string>('') 
 const dispatch=useDispatch()
 const navigate=useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFome>();

  const handleFormSubmit = async(data: ForgotFome) => {

    try {
        setCredinetionalErr("")
        const{email}=data
        console.log(email);
        setIsLoading(true)

      let res=await forgotPassword(email)
      setIsLoading(false)
      console.log(res)

      if(res.data.status && res.data.message=="otp Send"){
        localStorage.setItem("timer", "60");
        dispatch(verifed("forgotPassword"));
        navigate("/otpVerification");
      }
        
    } catch (error) {
       if(axios.isAxiosError(error)){
           if(error.response){
             if(error.response.data.status==false){
                  setCredinetionalErr(error.response.data.message)
             }
           }
       }
       setIsLoading(false)
       console.log(error)
       
    }
   
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden p-2  py-12 w-1/2">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl ">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-10">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Forgot password Email verification</p>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs"></div>
              <div className="flex flex-col ">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="mb-6">
                    {errors.email?.type == "required" ||
                    errors.email?.type == "pattern" ? (
                      <label className="block mb-2 text-lg font-medium  text-red-400 ">
                        Email
                      </label>
                    ) : (
                      <label className="block mb-2 text-lg font-medium  text-black ">
                        Email
                      </label>
                    )}

                    <input
                      type="text"
                      id="large-input"
                      className="block w-full p-4 text-black border  rounded-lg "
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      })}
                    />
                    {errors.email?.type == "required" && (
                      <p className="text-red-500 text-center">
                        This field is required
                      </p>
                    )}
                    {errors.email?.type == "pattern" && (
                      <p className="text-red-500 text-center">
                        This Email form is not valide
                      </p>
                    )}
                    {credinetioalErr!="" && <small className="text-red-500 text-md">{credinetioalErr}</small>} 
                  </div>
                  <div>
                    {!isLoaidng?<button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-btnColor border-none text-white text-sm shadow-sm"
                        type="submit"
                        >
                        Verify Account
                        </button>:<button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-btnColor border-none text-white text-sm shadow-sm"
                      type="submit"
                    > <svg
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
                    </button>}
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordEmailVerification;
