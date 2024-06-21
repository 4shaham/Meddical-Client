import React, { useEffect, useRef, useState, useCallback } from "react";
import { resendOtp, verifyOtp } from "../../api/user";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/slice/userAuthSlice";
import axios from "axios";
import { FaS } from "react-icons/fa6";

function OtpComponent() {
  const navigate = useNavigate();
  const [buttonStatus, setButtonStatus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [isLoaidng, setIsLoading] = useState<boolean>(false);
  let isFormSumbited: boolean = false;

  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem("timer");
    return savedTimer ? parseInt(savedTimer, 10) : 5;
  });

  const dispatch = useDispatch();
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

  const [err, setErr] = useState<string>("");

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (
        otp.digitOne == "" ||
        otp.digitTwo == "" ||
        otp.digitThree == "" ||
        otp.digitFour == "" ||
        isFormSumbited
      ) {
        setErr("all fields are Required");
        return null;
      }

      console.log("hiiiiiii submited");

      isFormSumbited = true;

      let values = "";
      let keys = Object.values(otp);
      for (let i = 0; i < keys.length; i++) {
        values += keys[i];
      }

      const response = await verifyOtp(Number(values));
      isFormSumbited = false;
      console.log(response);

      const { token } = response.data;

      if (
        response.data.message == "the Otp verification is completed" &&
        token
      ) {
        dispatch(login());
        navigate("/");
      }
    } catch (error) {
      console.log(error, "koko");

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (!error.response.data.status) {
            setErr(error.response.data.message);
          }
        }
      }
    }
  };

  const handleResendOtp = async () => {
    try {

      

     
      console.log("handle resend Otp");
      setIsLoading(true)
      const response = await resendOtp("shahamsalam123@gmail.com");
      setIsLoading(false)
  
      console.log(response);
      if (response.data.status) {
        setTimer(60);
        localStorage.setItem("timer", "60");
        setButtonStatus(false);
        console.log(buttonStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <div className="flex flex-col space-y-5">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {renderInput()}
                </div>
                <div className="flex flex-col ">
                  {!buttonStatus ? (
                    <>
                      <p className="text-center text-red-500 ">{err}</p>
                      <h1 className="text-center text-red-600 mb-2">
                        Timer:00:{timer}
                      </h1>
                      <div>
                        <button
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-btnColor border-none text-white text-sm shadow-sm"
                          onClick={handleSubmit}
                        >
                          Verify Account
                        </button>
                      </div>
                    </>
                  ) : (
                    <div>
                      {!isLoaidng ? (
                        <button
                          type="button"
                          className="w-full bg-red-600 rounded-md py-4 text-white"
                          onClick={handleResendOtp}
                        >
                          Resend Otp
                        </button>
                      ) : (
                        <button type="button"
                        className="w-full bg-red-600 rounded-md py-4 text-white"
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
                  )}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpComponent;
