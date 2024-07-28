import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { BookingData } from "../../interface/interfaceDoctor";
import { getBookingDataWithStatus } from "../../api/user";
import { Link } from "react-router-dom";

function PastBookingTokens() {
  const [datas, setDatas] = useState<BookingData[]>();

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await getBookingDataWithStatus("visited");
        console.log(response.data);
        setDatas(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  }, []);

  return (
    <div>
      <Card className="h-auto  w-full overflow-scroll">
        <table className="w-full min-w-max table-auto  text-center">
          <thead className="">
            <tr>
              <th
                // key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black"
              >
                <Typography
                  variant="body2"
                  className="font-medium text-2lg leading-none text-black"
                >
                  Date
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
            </tr>
          </thead>

          <tbody>
            {datas?.map((values, index) => (
              <tr className="text-center">
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
                   <Link to={`/prescriptionPage?id=${values._id}`}>
                     <p>
                     View Prescription
                     </p>
                   </Link> 
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default PastBookingTokens;
