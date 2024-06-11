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
      <input
        key={index}
        ref={(element) => {
          if (element) inputRef.current[index] = element;
        }}
        maxLength={1}
        type="text"
        name={key}
        className="bg-white w-16 h-14 rounded-md text-center text-2xl"
        onChange={(event) => handleChange(event, index)}
        onKeyUp={(event) => handleKeyBack(event, index)}
      />
    ));
  };

  return (
    <div className="w-full h-screen">
      <form
        className="w-[500px] h-[300px] bg-serviceColors rounded-md mx-auto my-[20%] text-center justify-center py-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-medium">Please fill the OTP</h1>
        <div className="flex gap-5 mt-10 justify-center">{renderInput()}</div>
        {buttonStatus ? (
          <button
            className="bg-red-700 text-white px-12 py-1 rounded-md mx-4 mt-7"
            type="submit"
          >
            Resend
          </button>
        ) : (
          <>
            <h1 className="mt-5 mb-3">
              Timer: <span className="text-red">00:{timer}</span>
            </h1>
            <button
              className="bg-btnColor text-white px-12 py-1 rounded-md mt-5"
              type="submit"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default OtpComponent;
