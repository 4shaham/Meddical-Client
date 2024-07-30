import React, { useEffect, useState } from "react";
import IDoctorSchedule, { BookingData } from "../../interface/interfaceDoctor";
import {
  bookingReschedule,
  getDoctorSchedulePerticularDate,
} from "../../api/user";
import { toast } from "react-toastify";
import axios from "axios";

type RescheduleModalProps = {
  callback: () => void;
  isSelectedToReschedule: BookingData;
  callbackIncrementCounter: () => void;
};

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  callback,
  isSelectedToReschedule,
  callbackIncrementCounter,
}) => {
  const [availableTimes, setAvailableTimes] = useState<IDoctorSchedule>();
  const [newSlotNumber, setNewSlotNumber] = useState<number>();
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const handleFn = async () => {
      const response = await getDoctorSchedulePerticularDate(
        isSelectedToReschedule.date.toString().split("T")[0],
        isSelectedToReschedule?.doctorId
      );
      console.log(response, ";popopopopopop");
      setAvailableTimes(response.data);
    };
    handleFn();
  }, []);

  const setVisibleOfConvermationModal = (slot: number) => {
    setNewSlotNumber(slot);
    setIsConfirmationModalVisible(true);
  };

  const handleSumbitToBookingReschedule = async () => {
    try {
      await bookingReschedule(
        isSelectedToReschedule._id,
        isSelectedToReschedule.slotNumber,
        isSelectedToReschedule.scheduleId,
        newSlotNumber as number
      );
      callback();
      toast.success("successfully changed you schedule");
      callbackIncrementCounter();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 max-w-lg">
        <p className="mb-5 mt-5 text-center text-lg font-semibold">
          You are about to reschedule your appointment.
        </p>
        <p className="mb-5 text-center text-md font-medium bg-red-400 p-3 text-white rounded-md">
          Note: If you cancel your token, you will only get 50% of the money
          back.
        </p>
        <p className="mb-5 text-center text-lg font-semibold">
          Please select a new available time instead of cancelling:
        </p>
        <div className="grid grid-cols-2 gap-4 mb-5">
          {availableTimes?.slots.map((val, index) => (
            <button
              key={index}
              className={
                val.isBooked
                  ? "bg-btnColor text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  : "bg-gray-100 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              }
              onClick={() => setVisibleOfConvermationModal(val.slotNumber)}
            >
              {val.startTime}
              <br />
              <span>slotNumber:{val.slotNumber}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-2">
          <button
            className="bg-black px-5 py-2 text-white rounded-md"
            onClick={() => callback()}
          >
            Back
          </button>
        </div>
      </div>

      {isConfirmationModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 max-w-md">
            <p className="mb-5 text-center text-lg font-semibold">
              Confirm Reschedule
            </p>
            <p className="mb-5 text-center text-md font-medium">
              Are you sure you want to reschedule to
            </p>
            <div className="flex justify-center gap-2">
              <button
                className="bg-gray-300 px-5 py-2 rounded-md"
                onClick={() => setIsConfirmationModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 px-5 py-2 text-white rounded-md"
                onClick={handleSumbitToBookingReschedule}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RescheduleModal;
