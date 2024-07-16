import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { cancelToken, getBookingDataWithStatus } from "../../api/user";
import { BookingData } from "../../interface/interfaceDoctor";

function UpComingBookingtokens() {
  const [datas, setDatas] = useState<BookingData[]>();

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await getBookingDataWithStatus("pending");
        console.log(response.data);
        setDatas(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  }, []);



  const handleTokenCancelClick=async(id:string)=>{

      try {
        
        const response=await cancelToken(id)

        if(response.data.message==true){
            console.log('hiiiiiiiii')
        }
 
      } catch (error) {
         console.log(error)
      }

  }



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
                  className="font-bold text-2xl  text-black"
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
                    {values.slotNumber}
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
                    <button className="bg-red-500 text-white px-5 py-1 rounded-lg" onClick={()=>handleTokenCancelClick(values._id)}>
                      cancel
                    </button>
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

export default UpComingBookingtokens;
