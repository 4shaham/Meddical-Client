import  { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { cancelToken, getBookingDataWithStatus } from "../../api/user";
import { BookingData } from "../../interface/interfaceDoctor";
import RescheduleModal from "./RescheduleModal";
import { FaFileInvoice } from "react-icons/fa";
import { Link } from "react-router-dom";

function UpComingBookingtokens() {
  
  const [isModal, setIsModal] = useState<boolean>(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [datas, setDatas] = useState<BookingData[]>();

  const [counter, setCounter] = useState(1);
  const [isSelectedToReschedule, setIsSelectedToReschedule] =
    useState<BookingData>();

  // const currentDate = Date.now();

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await getBookingDataWithStatus("pending");
        setDatas(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  }, [counter]);

  const [selctedId, setSelectedId] = useState<string>();

  const handleTokenCancelClick = async () => {
    try {
      await cancelToken(selctedId as string);
      setCounter(counter + 1);
      setIsModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (id: string) => {
    setIsModal(!isModal);
    setSelectedId(id);
  };

  const handleBack = () => {
    setIsModal(!isModal);
  };

  const handleCallback = () => {
    setRescheduleModal(false);
  };

  const handleCallbackIncrementCounter = () => {
    setCounter(counter + 1);
  };

  const handleToSelectRescheduleData = (data: BookingData) => {
    setIsSelectedToReschedule(data);
    setRescheduleModal(true);
  };

  return (
    <div>
      <Card className="h-auto min-h-screen  w-full overflow-scroll">
        <table className="w-full min-w-max table-auto  text-center">
          <thead className="">
            <tr>
              <th
                // key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black"
              >
                <Typography
                  variant="body2"
                  className="font-bold text-2xl  text-green"
                >
                  Date
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black">
                <Typography
                  variant="body2"
                  className="font-medium text-2lg leading-none text-black"
                >
                  TokenNumber
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black">
                <Typography
                  variant="body2"
                  className="font-medium text-2lg leading-none text-black"
                >
                  Time
                </Typography>
              </th>
              <th
                // key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black"
              >
                <Typography
                  variant="body2"
                  className="font-medium text-2lg leading-none text-black"
                >
                  Doctor Name
                </Typography>
              </th>
              <th
                // key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black"
              >
                <Typography
                  variant="body2"
                  className="font-medium text-2lg leading-none text-black"
                >
                  consultationType
                </Typography>
              </th>

              <th
                // key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black"
              >
                <Typography
                  variant="body2"
                  className="font-medium text-2lg leading-none text-black"
                ></Typography>
              </th>
              <th
                // key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black"
              >
                <Typography
                  variant="body2"
                  className="font-medium text-2lg leading-none text-black"
                ></Typography>
              </th>
             
            </tr>
          </thead>

          <tbody>
            {datas?.map((values,index) => (
              <tr className="text-center" key={index}>
                <td className="p-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="font-normal"
                  >
                    {values.date.toString().split("T")[0]}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="font-normal"
                  >
                    {values.slotNumber}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="font-normal"
                  >
                    {values.startTime}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="font-normal"
                  >
                    priyan
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="font-normal"
                  >
                    {values.conusultationType}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    component="a"
                    variant="body2"
                    color="primary"
                    className="font-medium"
                  >
                    <button
                      className="bg-red-500 text-white px-5 py-1 rounded-lg"
                      onClick={() => handleModal(values._id)}
                    >
                      Cancel
                    </button>
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    component="a"
                    variant="body2"
                    color="primary"
                    className="font-medium"
                  >
                    {new Date(values.date).getTime() > Date.now() && (
                      <button
                        className="bg-btnColor text-white px-5 py-1 rounded-lg"
                        onClick={() => handleToSelectRescheduleData(values)}
                      >
                        Reschedule
                      </button>
                    )}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    component="a"
                    variant="body2"
                    color="primary"
                    className="font-medium"
                  >
                   <Link to={`/invoicePage?id=${values._id}`}><FaFileInvoice className="text-4xl" /></Link> 
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  ">
          <div className="bg-white p-5 rounded  h-auto justify-center ">
            <p className="mb-5 mt-5 text-center">
              cancel your token you only get 50% of money
            </p>
            <div className="flex justify-center gap-2 mb-2 mt-5">
              <button
                className="bg-black px-5 py-1 text-white rounded-md"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="bg-red-500 px-5 py-1 text-white rounded-md"
                onClick={() => handleTokenCancelClick()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {rescheduleModal && isSelectedToReschedule && (
        <RescheduleModal
          callback={handleCallback}
          isSelectedToReschedule={isSelectedToReschedule}
          callbackIncrementCounter={handleCallbackIncrementCounter}
        />
      )}
    </div>
  );
}

export default UpComingBookingtokens;
