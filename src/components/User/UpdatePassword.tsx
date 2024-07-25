import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../api/user";
import { useNavigate } from "react-router-dom";

interface FormData{
    password:string,
    confirmPassword:string
}

function UpdatePassword() {

const {register,handleSubmit,formState:{errors}}=useForm<FormData>()
const [credentiolErr,setCredinetionalErr]=useState<string>("")
const[isLoaidng,setIsLoading]=useState<boolean>(false)
const navigate=useNavigate()
const handleFormsubmit= async(data:FormData)=>{
     
    try {

        if(data.confirmPassword!=data.password){
            setCredinetionalErr("password is not match")
            return
        }
        setIsLoading(true)
        let res=await updatePassword(data.password)
        setIsLoading(false)
        console.log(res)
        if(res.data.status==true && res.data.message=="password changed"){
             navigate("/login")
        }
    } catch (error) {

        setIsLoading(false)
        console.log(error)
        
    }

}


  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-10">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Update password</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>you enter your new password</p>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs"></div>
              <div className="flex flex-col ">
                <form onSubmit={handleSubmit(handleFormsubmit)}>
                  <div className="mb-6">
                    <label className="block mb-2 text-md font-medium  text-black ">
                     password
                    </label>
                    <input
                      type="password"
                      id="large-input"
                      className="block w-full p-4 text-black border  rounded-lg "
                      {...register("password",{
                        required:true,
                        pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      })}
                    />
                    {errors.password?.type=="required" && <small className="text-red-500 ">This Filed is requied</small>}
                    {errors.password?.type=="pattern" && <small className="text-red-500 ">Password must contain at least one uppercase letter, one
                        lowercase letter, one number, and one special character"</small>}
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-md font-medium  text-black ">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="large-input"
                      className="block w-full p-4 text-black border  rounded-lg "
                      {...register("confirmPassword",{
                        required:true
                      })}
                    />
                     {errors.confirmPassword?.type=="required" &&  <small className="text-red-500 ">This Filed is requied</small>}
                     <small className="text-red-500 font-medium">{credentiolErr}</small>
                  </div>
                  <div>

                  {isLoaidng?<button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-btnColor border-none text-white text-sm shadow-sm"
                      type="submit"
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
                    </button>:<button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-btnColor border-none text-white text-sm shadow-sm"
                      type="submit"
                    >
                      submit
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

export default UpdatePassword;
