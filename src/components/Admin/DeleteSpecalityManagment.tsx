import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import {
  deletedSpecalityData,
  updatedDeletedSpecalityStatus,
} from "../../api/admin";
import { toast } from "react-toastify";

interface vlaues {
  _id: string;
  name: string;
  image: string;
}

const TABLE_HEAD: string[] = ["Image", "specality Name", "Action"];

const DeleteSpecalityManagment: React.FC = () => {
  const [datas, setDatas] = useState<vlaues[]>();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const handleAsyncFn = async () => {
      try {
        const response = await deletedSpecalityData();
        console.log(response, "jiiii");
        setDatas(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleAsyncFn();
  }, [count]);

  const handleRestore = async (id: string) => {
    try {
      const response = await updatedDeletedSpecalityStatus(id);

      console.log(response);
      if (response.data.status) {
        setCount(count + 1);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-5 py-5">
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto  text-center">
          <thead className="">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black"
                >
                  <Typography
                    variant="body2"
                    className="font-medium text-2lg leading-none text-black"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datas?.map((name: vlaues, index: number) => (
              <tr
                key={name._id}
                //   className={index % 2 === 0 ? 'bg-blue-gray-50/50' : ''}
                className="text-center"
              >
                <td className="p-4">
                  {/* <Avatar
                    src={name.image}
                    alt={"sjsj"}
                    size="md"
                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                  /> */}
                  <Avatar
                    alt="Remy Sharp"
                    src={name.image} // or other valid image source
                  />
                </td>
                <td className="p-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="font-normal"
                  >
                    {name.name}
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
                      className="bg-btnColor text-white px-5 py-1 rounded-lg"
                      onClick={() => handleRestore(name._id)}
                    >
                      Restore
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
};

export default DeleteSpecalityManagment;
