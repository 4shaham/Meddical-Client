import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { TransactionHistoryData } from "../../interface/interfaceAdmin";
import { getTransactionHistory } from "../../api/user";
import { getTransactionHistroyAdmin } from "../../api/admin";


function TransactionHistory() {
  const TABLE_HEAD = [
    "doctorName",
    "patientName",
    "TransactionId",
    "Amount",
    "Date",
    "Status",
    "",
  ];

  const [transactionHistoryData, setTransactionHistoryData] =
    useState<TransactionHistoryData[]>();

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await getTransactionHistroyAdmin();
        console.log(response.data);
        setTransactionHistoryData(response.data.transactionData);
      } catch (error) {}
    };
    handleFn();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-medium text-center mt-4 mb-4">
        Transaction History
      </h1>

      <Card className="h-full w-full border">
        {/* <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center bg-gray-300">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader> */}
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
                  >
                    <Typography
                      variant="small"
                      className="font-medium text-black  leading-none  "
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactionHistoryData?.map((val, index) => {
                return (
                  <tr key={index}>
                     <td className="p-4 border-b border-blue-gray-50 ">
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {val.doctorData.name}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 ">
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {val.userData.userName}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 ">
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {val.transactionId}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {val.amount}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {val.createdAt.split("T")[0]}
                        <span className="text-red-400 mx-1">{`${val.createdAt.split("T")[1].split(":")[0]}:`}</span>
                        <span className="text-red-400">{val.createdAt.split("T")[1].split(":")[1]}</span>
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Paid
                      </Typography>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm" className="bg-black text-white">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton variant="text" size="sm">
              2
            </IconButton>
            <IconButton variant="text" size="sm">
              3
            </IconButton>
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" size="sm">
              8
            </IconButton>
            <IconButton variant="text" size="sm">
              9
            </IconButton>
            <IconButton variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" size="sm" className="bg-black text-white">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default TransactionHistory;
