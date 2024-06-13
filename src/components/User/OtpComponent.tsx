import React, { useEffect, useRef, useState, useCallback } from "react";
import { resendOtp, verifyOtp } from "../../api/user";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/slice/userAuthSlice";
import axios from "axios";


function OtpComponent() {
  const navigate=useNavigate()
  const [buttonStatus, setButtonStatus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem("timer");
    return savedTimer ? parseInt(savedTimer, 10) : 5;
  });
  const dispatch=useDispatch()
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  useEffect(() => {
    if (timer === 0) {
      console.log("Timer finished");
      setButtonStatus(true);
    }
  }, [timer]);

  useEffect(() => {
    localStorage.setItem("timer", timer.toString());
  }, [timer]);

  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
  });

  const [err,setErr]=useState<string>('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { name, value } = event.target;
    setOtp((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value && index < 3) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyBack = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async(event:React.FormEvent) => {
    event.preventDefault();

    try {
      if(otp.digitOne=="" || otp.digitTwo=="" ||otp.digitThree==""|| otp.digitFour==""){
        
        setErr("all fields are Required")
        return null
     }
 
     let values=""
     let keys=Object.values(otp)
     for(let i=0;i<keys.length;i++){
        values+=keys[i]
     }
 
     const response=await verifyOtp(Number(values),"shahamsalam123@gmail.com")
     console.log(response)
 
     const {token}=response.data
 
     if(response.data.message=="the Otp verification is completed" && token){
         
       dispatch(login())
       navigate('/')
 
     }
    } catch (error) {
      
      console.log(error,"koko")

      if (axios.isAxiosError(error)) {

         if(error.response){
               
          if(!error.response.data.status){
             setErr(error.response.data.message)
          }

         }

      }  

    }
      
  };


  const handleResendOtp=async()=>{

    try {

      console.log("hdfjdhfjdhfjdhfjdhfjdhfjdhfjdhf")
      const response=await resendOtp("shahamsalam123@gmail.com")
      
      if(response.data.status){
        
        localStorage.setItem("timer","60")
     
      }
      
      
    } catch (error) {

      console.log(error)
      
    }


  }

  const renderInput = () => {
    return Object.keys(otp).map((key, index) => (
      <div className="w-16 h-16 ">
        <input
          className=" w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
          type="text"
          name={key}
          id=""
          key={index}
          ref={(element) => {
            if (element) inputRef.current[index] = element;
          }}
          maxLength={1}
          onChange={(event) => handleChange(event, index)}
          onKeyUp={(event) => handleKeyBack(event, index)}
        />
      </div>
    ));
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
          </div>

          <div>
            <form action="" method="post">
              <div className="flex flex-col space-y-5">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {renderInput()}
                </div>
                <div className="flex flex-col ">
                 {!buttonStatus?( 
                  <>
                      <p className="text-center text-red-500 ">{err}</p>
                    <h1 className="text-center text-red-600 mb-2">Timer:00:{timer}</h1>
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-btnColor border-none text-white text-sm shadow-sm" onClick={handleSubmit}>
                      Verify Account
                    </button>
                  </div>
                  </>):(<div>
                    {/* <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-red-500 border-none text-white text-sm shadow-sm" onClick={handleResendOtp}>
                      Resend Otp
                    </button> */}
           
                    <Link to="/otpVerification"><button onClick={handleResendOtp}>Resend otp</button></Link> 
                  </div>)}

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpComponent;
