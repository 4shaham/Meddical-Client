import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { findspecality } from "../../api/admin";
import  Avatar  from "@mui/material/Avatar";

interface TableRow {
  _id: string;
  image: string;
  name: string;
}

const TABLE_HEAD: string[] = ["Image", "specality Name", "Action"];


const MyComponent: React.FC = () => {
  const [TABLE_ROWS, setTableRow] = useState<TableRow[]>();

  useEffect(() => {
    const hadnleAsyncronus = async () => {
      let response = await findspecality();
      console.log(response);
      setTableRow(response.data);
    };

    hadnleAsyncronus();
  }, []);

  console.log(TABLE_ROWS, "hiii");

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
          {TABLE_ROWS?.map(({ name, image }, index) => (
            <tr
              key={name}
              //   className={index % 2 === 0 ? 'bg-blue-gray-50/50' : ''}
              className="text-center"
            >
              <td className="p-4">
                <Avatar
                  src={image}
                  alt={name}
                  size="md"
                  className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                />
              </td>
              <td className="p-4">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="font-normal"
                >{name}</Typography>
              </td>
              <td className="p-4">
                {/* Consider adding an anchor tag with appropriate styling (Tailwind CSS or custom CSS) */}
                <Typography
                  component="a"
                  href="#"
                  variant="body2"
                  color="primary"
                  className="font-medium p-4"
                ><button className="bg-btnColor text-white px-3 py-1 rounded-lg">Edit</button>
                </Typography>
                <Typography
                  component="a"
                  variant="body2"
                  color="primary"
                  className="font-medium"
                >
                 <button className="bg-red-500 text-white px-5 py-1 rounded-lg">Delete</button>
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

export default MyComponent;
