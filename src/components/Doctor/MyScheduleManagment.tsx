import  {useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { findDoctorSchedule } from "../../api/doctor";
import IDoctorSchedule from "../../interface/interfaceDoctor";

function MyScheduleManagment() {
  const [schedules, setSchedules] = useState<IDoctorSchedule[]>();

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await findDoctorSchedule();
        setSchedules(response.data.data);
      } catch (error) {}
    };

    handleFn();
  }, []);

  return (
    <div className="p-10">
      <Card className="h-full w-full overflow-scroll">
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
                >
                  Provide Tokens
                </Typography>
              </th>
              {/* <th
                // key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black"
              >
                <Typography
                  variant="body2"
                  className="font-medium text-2lg leading-none text-black"
                >
                  Edit
                </Typography>
              </th> */}
            </tr>
          </thead>

          <tbody>
            {schedules?.map((values, index) => (
              <tr
                //   className={index % 2 === 0 ? 'bg-blue-gray-50/50' : ''}
                className="text-center"
              >
                <td className="p-4" key={index}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="font-normal"
                  >
                    {values.date.toString().split("T")[0]}
                  </Typography>
                </td>
                <td className="p-4" key={index}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="font-normal"
                  >
                    {values.consultationType}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="font-normal"
                  >
                    {values.slots.length}
                  </Typography>
                </td>
                {/* <td className="p-4">
                  <Typography
                    component="a"
                    variant="body2"
                    color="primary"
                    className="font-medium"
                  >
                    <button className="bg-red-500 text-white px-5 py-1 rounded-lg">
                      Delete
                    </button>
                  </Typography>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default MyScheduleManagment;
