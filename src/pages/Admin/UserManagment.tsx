import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { ImBlocked } from "react-icons/im";
import { useEffect, useState } from "react";
import { IUser } from "../../interface/interfaceUser";
import { getAllUsers, userBlocked, userUnBlocked } from "../../api/admin";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { IoIosWarning } from "react-icons/io";
// import { Button } from "";

const TABLE_HEAD = ["Profile Image", "Email", "Name", "Status", "Action", ""];

function UserManagment() {
  const [userDatas, setUserDatas] = useState<IUser[]>();
  const [users, setUsers] = useState<IUser[]>();
  const [searchValues, setSearchValues] = useState<string>();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<IUser>();

  useEffect(() => {
    const handleFn = async () => {
      const response = await getAllUsers();
      console.log(response.data.users);
      setUserDatas(response.data.users);
      setUsers(response.data.users);
    };

    handleFn();
  }, []);

  const serachHandler = (e: any) => {
    const inputValue = e.target.value;
    setSearchValues(inputValue);

    if (inputValue.trim() == "") {
      setUsers(userDatas);
      return;
    }

    const regex = new RegExp(inputValue, "i");
    const filteredUsers = userDatas?.filter((user) =>
      regex.test(user.userName)
    );
    setUsers(filteredUsers);
  };

  const handleOpenModal = (userId: string) => {
    setIsModal(true);
    setIsSelected(users?.find((val) => val._id == userId));
  };

  const handleConfirmBtn = async () => {
    try {
      if (isSelected?.isBlock) {
        await userUnBlocked(isSelected._id as string);

        const datas = users?.map((val) => {
          if (val._id == isSelected._id) {
            val.isBlock = false;
            return val;
          }

          return val;
        });
        setUsers(datas);
        const userdatas = userDatas?.map((val) => {
          if (val._id == isSelected._id) {
            val.isBlock = false;
            return val;
          }

          return val;
        });
        setUserDatas(userdatas);
        setIsModal(false);

        toast.success("user unBlocked is successfully updated");
      } else if (isSelected?.isBlock == false) {
        await userBlocked(isSelected._id as string);
        const datas = users?.map((val) => {
          if (val._id == isSelected._id) {
            val.isBlock = true;
            return val;
          }

          return val;
        });
        setUsers(datas);
        const userdatas = userDatas?.map((val) => {
          if (val._id == isSelected._id) {
            val.isBlock = true;
            return val;
          }

          return val;
        });
        setUserDatas(userdatas);
        setIsModal(false);
        toast.success("user Blocked is successfully updted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center bg-gray-200 p-5 rounded-md">
            <div>
              <Typography variant="h5" color="blue-gray" className="text-2xl">
                User Managment
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about all Users
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72 p-2">
                <Input
                  className="flex bg-white hover:border-white border"
                  placeholder="serach user"
                  value={searchValues}
                  onChange={(e) => serachHandler(e)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left ">
            <thead className="border border-blue-gray-100">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border border-blue-gray-100 bg-blue-gray-50/50 p-4 bg-gray-200"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="fleading-none opacity-70 font-medium"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map((val, index) => {
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index}>
                  
                      <td className="p-4">
                        {/* <Avatar
                          src={val.image}
                          alt={"sjsj"}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        /> */}
                      </td>
               
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {val.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {val.userName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      {val.isBlock == true ? (
                        <div className="flex items-center gap-1">
                          <ImBlocked />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className=" text-red-500 font-medium"
                          >
                            InActive
                          </Typography>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className=" text-red-500 font-medium"
                          >
                            Active
                          </Typography>
                        </div>
                      )}
                    </td>
                    <td className={classes}>
                      {val.isBlock ? (
                        <Button
                          variant="outlined"
                          className="bg-black text-white"
                          size="sm"
                          onClick={() => handleOpenModal(val._id)}
                        >
                          UnBlock
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          className="bg-black text-white"
                          size="sm"
                          onClick={() => handleOpenModal(val._id)}
                        >
                          Block
                        </Button>
                      )}
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
            <IconButton
              variant="text"
              size="sm"
              className="hover:bg-slate-400 my-auto p-2"
            >
              9
            </IconButton>
            <IconButton variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" className="bg-black text-white" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  ">
          <div className="bg-white p-5 rounded-md  h-auto w-1/3 justify-center ">
            <div className="w-10 mx-auto">
              <IoIosWarning className="text-center text-6xl" />
            </div>

            <p className="mb-5 mt-5 text-center">
              Are you sure you want to block {isSelected?.userName}?
            </p>
            <p className="mb-5 mt-5 text-center text-red-500">
              Warning: Blocking this doctor will prevent them from accessing
              their account.
            </p>
            <div className="flex justify-center gap-6 mb-2 mt-5">
              <button
                className="bg-black px-5 py-1 text-white rounded-md"
                onClick={() => setIsModal(false)}
              >
                cancel
              </button>
              <button
                className="bg-red-600 px-5 py-1 text-white rounded-md"
                onClick={handleConfirmBtn}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagment;
