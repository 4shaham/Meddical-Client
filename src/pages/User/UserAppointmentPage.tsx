import React, { useState } from "react";
import UpComingBookingtokens from "../../components/User/UpComingBookingtokens";
import PastBookingTokens from "../../components/User/PastBookingTokens.";

enum ButtonStatus {
  visited = "visited",
  pending = "pending",
}

function UserAppointmentPage() {
  const [status, setStatus] = useState<string>(ButtonStatus.pending);

  return (
    <div className="container mx-auto rounded-md h-auto min-h-screen">
      <div className="flex justify-center mt-10">
        <button
          className={
            status == ButtonStatus.pending
              ? "px-4 py-2 w-1/2 text-center font-medium bg-gray-200 text-x"
              : "px-4 py-2 w-1/2 text-center text-red-400 border border-black font-medium  hover:to-green-300 text-x"
          }
          onClick={() => setStatus(ButtonStatus.visited)}
        >
          Past
        </button>
        <button
          className={
            status != ButtonStatus.pending
              ? "px-4 py-2 w-1/2 text-center font-medium bg-gray-200 text-x"
              : "px-4 py-2 w-1/2 text-center text-red-400 border border-gray-500 bg-gray-50 rounded-md font-medium  hover:to-green-300 text-x"
          }
          onClick={() => setStatus(ButtonStatus.pending)}
        >
          Upcoming
        </button>
      </div>

      {status == ButtonStatus.pending ? (
        <UpComingBookingtokens />
      ) : (
        <PastBookingTokens />
      )}
    </div>
  );
}

export default UserAppointmentPage;
