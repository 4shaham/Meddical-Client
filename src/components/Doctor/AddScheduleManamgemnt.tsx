import React, { useState } from "react";
import {
  IAddScheduleIntervals,
  addScheduleFormData,
} from "../../interface/interfaceDoctor";
import { useForm } from "react-hook-form";
import { addSchedule } from "../../api/doctor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AddScheduleManamgemnt() {
  const navigate = useNavigate();

  const [credentialErr, setCredintiaolErr] = useState("");

  const [intervals, setIntervals] = useState<IAddScheduleIntervals[]>([]);
  const [showIntevalForm, setShowIntervalForm] = useState<boolean>(false);

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [intervalType, setIntervalType] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<addScheduleFormData>();

  const hanldeAddInterval = () => {

    const startTimerData =startTime.split(":");
    const endTimeData =endTime.split(":");
    
    if(startTime=="" || endTime=="") {
      toast.error("this fild is required")
      return
    }

    // if (
    //   startTimerData[0] <= endTimeData[0] &&
    //   endTimeData[1] <= startTimerData[1] 
    // ) {
    //   toast.error("The time must be greater than startTime");
    //   return;
    // }


    setIntervals((prevData) => [
      ...prevData,
      { type: intervalType, startTime, endTime },
    ]);

    setStartTime("");
    setEndTime("");
    setIntervalType("");
  };

  const handleOnSubmit = async (data: addScheduleFormData) => {
    try {
      const today = new Date();
      const inputDate = new Date(data.startDate);
  
      console.log(data.startTime, data.endTime);
  
      const [startHour, startMinute] = data.startTime.split(":").map(Number);
      const [endHour, endMinute] = data.endTime.split(":").map(Number);
  
      if (inputDate <= today) {
        toast.error("The date must be greater than today's date");
        return;
      }
  
      // Calculate start and end times in minutes
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;
  
      if (endTimeInMinutes - startTimeInMinutes < 60) {
        toast.error("The end time must be at least 1 hour after the start time");
        return;
      }
  
      let response = await addSchedule(
        data.startDate,
        data.consultationMethod,
        data.startTime,
        data.endTime,
        intervals
      );
      navigate("/doctor/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setCredintiaolErr(error.response?.data.message);
      }
      console.log(error);
    }
  };
  

  const handleShowForm = () => {
    if (intervalType.trim() == "") {
      toast.error("you enterd must be type of interval");
      return;
    }
    setShowIntervalForm(true);
  };

  return (
    <div className="px-12 py-12">
      <div className="w-2/3 mx-auto  my-auto bg-white h-auto  rounded-md p-3">
        <div>
          <h1 className="text-black text-center font-medium text-2xl mx-4">
            Add Schedules
          </h1>
        </div>
        <div className=" bg-white p-9 mx-auto  w-full">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="mb-5">
              <label className="text-black font-semibold mb-2">
                select date
              </label>
              <br />
              <input
                type="date"
                className="border-2 border-gray-300 rounded-sm w-2/3  h-8 bg-gray-100"
                placeholder="    select the when start date"
                {...register("startDate", {
                  required: "This field is required",
                  onChange: (e): any =>
                    setValue("startDate", e.target.value.trim()),
                })}
              />
              <br />
              <small className="text-red-500 font-medium">
                {errors.startDate?.message || credentialErr}
              </small>
            </div>
            <div className="mb-5">
              <label className="text-black font-semibold mb-2">
                Select Consultation Method
              </label>
              <br />
              <select
                className="border-2 border-gray-300 rounded-sm w-2/3 h-8 bg-gray-100"
                {...register("consultationMethod", {
                  required: "This field is required",
                })}
              >
                <option value="">Select Option</option>
                <option value="offline">Offline</option>
                <option value="online">Online</option>
                <option value="both">Both</option>
              </select>
              <br />
              <small className="text-red-500 font-medium">
                {errors.consultationMethod?.message || credentialErr}
              </small>
            </div>
            <div className="mb-5">
              <label className="text-black font-semibold mb-2">
                consultation Start time
              </label>
              <br />
              <input
                type="time"
                className="border-2 border-gray-300 rounded-sm w-1/3  h-8 bg-gray-100"
                {...register("startTime", {
                  required: "This field is required",
                })}
              />
              <br />
              <small className="text-red-500 font-medium">
                {errors.startTime?.message}
              </small>
            </div>
            <div className="mb-5">
              <label className="text-black font-semibold mb-2">
                consultation End time
              </label>
              <br />
              <input
                type="time"
                className="border-2 border-gray-300 rounded-sm w-1/3  h-8 bg-gray-100"
                {...register("endTime", {
                  required: "This field is required",
                })}
              />
              <br />
              <small className="text-red-500 font-medium">
                {errors.endTime?.message}
              </small>
            </div>
            <div className="mb-3 mt-5">
              <input
                placeholder="plese enter interval name"
                type="text"
                className="border border-gray-100 bg-gray-100 rounded-md w-3/3 h-8"
                onChange={(e) => setIntervalType(e.target.value)}
              />
              <button
                className="bg-btnColor text-white px-3 py-1"
                type="button"
                onClick={handleShowForm}
              >
                Add Interval
              </button>
            </div>

            {showIntevalForm && (
              <div className="bg-gray-100 rounded-md w-1/3 p-2 mb-5">
                <label htmlFor="" className="mx-3 font-medium">
                  start time
                </label>
                <input
                  type="time"
                  className="bg-white border mb-2 rounded-sm py-0 mx-1"
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <br />
                <label
                  htmlFor=""
                  className="
                   mx-3 font-medium"
                >
                  end time{" "}
                </label>
                <input
                  type="time"
                  className="bg-white  border rounded-sm py-0 mx-1 mb-1"
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <br />

                <button
                  className="bg-black  rounded-md text-white px-6 mt-2"
                  type="button"
                  onClick={hanldeAddInterval}
                >
                  Add
                </button>
              </div>
            )}
            <div className="mb-3 mt-5">
  <table className="min-w-full bg-white border border-gray-300">
    <thead>
      <tr className="w-full bg-gray-200 text-left">
        <th className="py-1 px-4 border-b border-gray-300">Type</th>
        <th className="py-1 px-4 border-b border-gray-300">Start Time</th>
        <th className="py-1 px-4 border-b border-gray-300">End Time</th>
      </tr>
    </thead>
    <tbody>
      {intervals?.map((values,index)=>
         <tr className="hover:bg-gray-100">
         <td className="py-2 px-4 border-b border-gray-300">{values.type}</td>
         <td className="py-2 px-4 border-b border-gray-300">{values.startTime}</td>
         <td className="py-2 px-4 border-b border-gray-300">{values.endTime}</td>
       </tr>
      )}
      
     
    </tbody>
  </table>
</div>
            <div className="mb-5">
              <button
                className="bg-red-500  text-white w-1/3 py-1 rounded-md mt-4 "
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddScheduleManamgemnt;
