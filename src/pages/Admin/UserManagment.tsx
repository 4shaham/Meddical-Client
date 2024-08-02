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
import { getAllUsers } from "../../api/admin";
import { FaUserAlt } from "react-icons/fa";
// import { Button } from "";

const TABLE_HEAD = ["Profile Image", "Email", "Name", "Status", "Action", ""];

function UserManagment() {
  
  const[userDatas,setUserDatas]=useState<IUser[]>()
  const [users, setUsers] = useState<IUser[]>();
  const [searchValues, setSearchValues] = useState<string>();
  

  useEffect(() => {
    const handleFn = async () => {
      const response = await getAllUsers();
      console.log(response.data.users);
      setUserDatas(response.data.users)
      setUsers(response.data.users);
    
     

    };

    handleFn();
  }, []);

  const serachHandler = (e: any) => {
    
    const inputValue = e.target.value;
    setSearchValues(inputValue);
    console.log(inputValue,"values")
    
    if(inputValue.trim()==""){
      
           setUsers(userDatas)
           return
    }
 
    const regex = new RegExp(inputValue, 'i');
    const filteredUsers =userDatas?.filter((user) => regex.test(user.userName));
    setUsers(filteredUsers)
    console.log(filteredUsers);
    

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
                    <td className="p-5">
                      <div className="items-center gap-3">
                        {val.image?
                           <Avatar
                           src={"/static/images/avatar/1.jpg"}
                           size="md"
                           className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                         />
                        :<FaUserAlt className="text-black text-4xl"/>}
                       
                      </div>
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
                            Blocked
                          </Typography>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className=" text-red-500 font-medium"
                          >
                            UnBlock
                          </Typography>
                        </div>
                      )}
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <Button
                          variant="outlined"
                          className="bg-black text-white"
                          size="sm"
                        >
                          Block
                        </Button>
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
            <IconButton variant="text" size="sm" className="hover:bg-slate-400 my-auto p-2">
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
    </div>
  );
}

export default UserManagment;
