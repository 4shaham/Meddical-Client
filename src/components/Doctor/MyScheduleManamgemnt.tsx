import React, { useState } from "react";
import {
  IAddScheduleIntervals,
  addScheduleFormData,
} from "../../interface/interfaceDoctor";
import { useForm } from "react-hook-form";

function MyScheduleManamgemnt() {
  const [interval, setInterval] = useState<IAddScheduleIntervals[]>();
  const [showIntevalForm, setShowIntervalForm] = useState<boolean>(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<addScheduleFormData>();

  const hanldeAddInterval = () => {
    console.log(startTime);
  };

  const handleOnSubmit = () => {
    console.log("hiiii");
  };

  return (
    <div className="p-5">
      <div className="w-full bg-white h-full rounded-md p-3">
        <div>
          <h1 className="text-black font-medium text-xl mx-4">Add Schedules</h1>
        </div>
        <div className=" bg-white p-9 mx-auto w-2/3">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="mb-3">
              <label className="text-black font-semibold">
                select end date
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
                {errors.startDate?.message}
              </small>
            </div>
            <div className="mb-3">
              <label className="text-black font-semibold">
                select end date
              </label>
              <br />
              <input
                type="date"
                className="border-2 border-gray-300 rounded-sm w-2/3  h-8 bg-gray-100"
              />
            </div>
            <div className="mb-3">
              <label className="text-black font-semibold">
                consultation Start time
              </label>
              <br />
              <input
                type="time"
                className="border-2 border-gray-300 rounded-sm w-1/3  h-8 bg-gray-100"
              />
            </div>
            <div className="mb-3">
              <label className="text-black font-semibold">
                consultation End time
              </label>
              <br />
              <input
                type="time"
                className="border-2 border-gray-300 rounded-sm w-1/3  h-8 bg-gray-100"
              />
            </div>
            <div className="mb-3 mt-5">
              <input
                placeholder="plese enter interval name"
                type="text"
                className="border border-gray-100 bg-gray-100 rounded-sm w-3/3 h-8"
              />
              <button
                className="bg-btnColor text-white px-3 py-1"
                onClick={() => setShowIntervalForm(true)}
              >
                Add Interval
              </button>
            </div>

            {showIntevalForm && (
              <div className="bg-gray-100 rounded-md w-1/3 p-2">
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
                  onClick={hanldeAddInterval}
                >
                  Add
                </button>
              </div>
            )}
            <div className="mb-3  ">
              <button
                className="bg-red-500  text-white w-1/3 py-1 rounded-md mt-4"
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

export default MyScheduleManamgemnt;
