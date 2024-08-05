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
import {
  doctorBlocked,
  doctorUnBlocked,
  getAllDoctors,
} from "../../api/admin";
import { FaUserAlt } from "react-icons/fa";
import { IDoctor } from "../../interface/interfaceDoctor";
import { IoIosWarning } from "react-icons/io";
import { toast } from "react-toastify";

const TABLE_HEAD = [
  "Profile Image",
  "Email",
  "Name",
  "specality",
  "Status",
  "Action",
  "",
];

function DoctorManagment() {
  const [doctorDatas, setDoctorDatas] = useState<IDoctor[]>();
  const [doctors, setDoctors] = useState<IDoctor[]>();
  const [searchValues, setSearchValues] = useState<string>();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<IDoctor>();

  useEffect(() => {
    const handleFn = async () => {
      const response = await getAllDoctors();
      console.log(response.data.doctors);
      setDoctorDatas(response.data.doctors);
      setDoctors(response.data.doctors);
    };
    handleFn();
  }, []);

  const serachHandler = (e: any) => {
    const inputValue = e.target.value;
    setSearchValues(inputValue);

    if (inputValue.trim() == "") {
      setDoctors(doctorDatas);
      return;
    }

    const regex = new RegExp(inputValue, "i");
    const filteredUsers = doctorDatas?.filter((doctor) =>
      regex.test(doctor.name)
    );
    setDoctors(filteredUsers);
    console.log(filteredUsers);
  };

  const handleModal = (id:string) => {
    
    setIsModal(true);
    setIsSelected(doctors?.find((values) => values._id == id));

  };

  const handleBlockedClick = async () => {
    try {
      if (isSelected?.isBlocked) {

        await doctorUnBlocked(isSelected._id as string);
        const fiterdDoctors = doctors?.map((val) => {
          if (val._id == isSelected._id) {
            val.isBlocked = false;
            return val;
          }
          return val;
        });
        setDoctors(fiterdDoctors);
        setIsModal(false);
        toast.success("successfully doctor is unBolcked");

      } else if (isSelected?.isBlocked == false) {

        await doctorBlocked(isSelected?._id as string);
        const fiterdDoctors = doctors?.map((val) => {
          if (val._id == isSelected._id) {
            val.isBlocked = true;
            return val;
          }
          return val;
        });
        setDoctors(fiterdDoctors);
        toast.success("successfully doctor is blocked");
        setIsModal(false);

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
                Doctor Managment
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about all Doctors
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
              {doctors?.map((val, index) => {
                const isLast = index === doctors.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index}>
                    <td className="p-5">
                      {/* <div className="items-center gap-3">
                        {val.image ? (
                          // <Avatar
                          //   src={val.image}
                          //   size="md"
                          //   className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          // />
                          ""
                        ) : (
                          <FaUserAlt className="text-black text-4xl" />
                        )}
                      </div> */}
                       <td className="p-4">
                        <Avatar
                          src={val.image}
                          alt={"sjsj"}
                          size="md"
                          width={80}
                          height={80}
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                      </td>
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {val.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max flex">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {val.specialty}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      {val.isBlocked == true ? (
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
                      {val.isBlocked ? (
                        <Tooltip content="doctor block">
                          <Button
                            variant="outlined"
                            className="bg-black text-white"
                            size="sm"
                            onClick={() => handleModal(val._id)}
                          >
                            unBlock
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip content="doctor block">
                          <Button
                            variant="outlined"
                            className="bg-black text-white flex gap-1"
                            size="sm"
                            onClick={() => handleModal(val._id)}
                          >
                            <ImBlocked className="my-auto" /> Block
                          </Button>
                        </Tooltip>
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
              Are you sure you want to block {isSelected?.name}?
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
                onClick={() => handleBlockedClick()}
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

export default DoctorManagment;
