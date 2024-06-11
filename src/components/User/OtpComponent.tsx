import React, { useEffect, useRef, useState, useCallback } from "react";

function OtpComponent() {
  const [buttonStatus, setButtonStatus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem("timer");
    return savedTimer ? parseInt(savedTimer, 10) : 5;
  });

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("OTP submitted:", otp);
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
            <form action="" method="post">
              <div className="flex flex-col space-y-5">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {renderInput()}
                </div>
                <div className="flex flex-col ">
                 {!buttonStatus?( 
                  <>
                    <h1 className="text-center text-red-600 mb-2">Timer:00:{timer}</h1>
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-btnColor border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>
                  </>):(<div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-red-500 border-none text-white text-sm shadow-sm">
                      Resend Otp
                    </button>
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
