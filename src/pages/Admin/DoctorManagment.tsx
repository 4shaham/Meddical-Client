// import {
//   Card,
//   CardHeader,
//   Typography,
//   Button,
//   CardBody,
//   CardFooter,
//   Avatar,
//   IconButton,
//   Tooltip,
// } from "@material-tailwind/react"; 
// import { Input } from "@material-tailwind/react";
// import { ImBlocked } from "react-icons/im";
// import React, { useEffect, useState } from "react";
// import {
//   doctorBlocked,
//   doctorUnBlocked,
//   getAllDoctors,
// } from "../../api/admin";
// import { FaUserAlt } from "react-icons/fa";
// import { IDoctor } from "../../interface/interfaceDoctor";
// import { IoIosWarning } from "react-icons/io";
// import { toast } from "react-toastify";

// const TABLE_HEAD = [
//   "Profile Image",
//   "Email",
//   "Name",
//   "specality",
//   "Status",
//   "Action",
//   "",
// ];

// function DoctorManagment() {
//   const [doctorDatas, setDoctorDatas] = useState<IDoctor[]>();
//   const [doctors, setDoctors] = useState<IDoctor[]>();
//   const [searchValues, setSearchValues] = useState<string>();
//   const [isModal, setIsModal] = useState<boolean>(false);
//   const [isSelected, setIsSelected] = useState<IDoctor>();

//   // useEffect(() => {
//   //   const handleFn =async()=>{
//   //     const response = await getAllDoctors();
//   //     console.log(response.data.doctors);
//   //     setDoctorDatas(response.data.doctors);
//   //     setDoctors(response.data.doctors);
//   //   };
//   //   handleFn();
//   // },[]);
     
//   useEffect(() => { 
//     const handleFn = async () => {
//       console.log("Component mounted");
//       const response = await getAllDoctors();
//       console.log(response.data.doctors);
//       setDoctorDatas(response.data.doctors);
//       setDoctors(response.data.doctors);
//     };
//     handleFn();
//   }, []);

//   const serachHandler = (e: any) => {
//     const inputValue = e.target.value;
//     setSearchValues(inputValue);

//     if (inputValue.trim() == "") {
//       setDoctors(doctorDatas);
//       return;
//     }

//     const regex = new RegExp(inputValue, "i");
//     const filteredUsers = doctorDatas?.filter((doctor) =>
//       regex.test(doctor.name)
//     );
//     setDoctors(filteredUsers);
//     console.log(filteredUsers);
//   };

//   const handleModal = (id:string) => {
    
//     setIsModal(true);
//     setIsSelected(doctors?.find((values) => values._id == id));

//   };

//   const handleBlockedClick = async () => {
//     try {
//       if (isSelected?.isBlocked) {

//         await doctorUnBlocked(isSelected._id as string);
//         const fiterdDoctors = doctors?.map((val) => {
//           if (val._id == isSelected._id) {
//             val.isBlocked = false;
//             return val;
//           }
//           return val;
//         });
//         setDoctors(fiterdDoctors);
//         setIsModal(false);
//         toast.success("successfully doctor is unBolcked");

//       } else if (isSelected?.isBlocked == false) {

//         await doctorBlocked(isSelected?._id as string);
//         const fiterdDoctors = doctors?.map((val) => {
//           if (val._id == isSelected._id) {
//             val.isBlocked = true;
//             return val;
//           }
//           return val;
//         });
//         setDoctors(fiterdDoctors);
//         toast.success("successfully doctor is blocked");
//         setIsModal(false);

//       }

//     } catch (error) {

//       console.log(error);

//     }
//   };

//   return (
   
//     <div className="p-10">
//       <Card  className="h-full w-full">
//         <CardHeader floated={false} shadow={false} className="rounded-none">
//           <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center bg-gray-300 p-5 rounded-md">
//             <div>
//               <Typography variant="h5" color="blue-gray"  >
//                 Doctor Managment
//               </Typography>
//               <Typography color="gray" className="mt-1 font-normal">
//                 These are details about all Doctors
//               </Typography>
//             </div>
//             <div className="flex w-full shrink-0 gap-2 md:w-max">
//               <div className="w-full md:w-72 p-2">
//                 <Input
//                   className="flex bg-white hover:border-white border"
//                   placeholder="serach user"
//                   value={searchValues}
//                   onChange={(e) => serachHandler(e)}
//                 />
//               </div>
//             </div>
//           </div>
//         </CardHeader>
//         <CardBody className="overflow-scroll px-0">
//           <table className="w-full min-w-max table-auto text-left ">
//             <thead className="border border-blue-gray-100">
//               <tr>
//                 {TABLE_HEAD.map((head) => (
//                   <th
//                     key={head}
//                     className="border border-blue-gray-100 bg-blue-gray-50/50 p-4 bg-gray-200"
//                   >
                    
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="fleading-none opacity-70 font-medium "
//                     >
//                       {head as string}
//                     </Typography>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {doctors?.map((val, index) => {
//                 const isLast = index === doctors.length - 1;
//                 const classes = isLast
//                   ? "p-2"
//                   : "p-2 border-b border-blue-gray-50";
//                 return (
//                   <tr key={index}>
//                     <td className="p-1">
//                       {/* <div className="items-center gap-3">
//                         {val.image ? (
//                           // <Avatar
//                           //   src={val.image}
//                           //   size="md"
//                           //   className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
//                           // />
//                           ""
//                         ) : (
//                           <FaUserAlt className="text-black text-4xl" />
//                         )}
//                       </div> */}
//                        <td className="p-1">
//                         <Avatar
//                           src={val.image}
//                           alt={"sjsj"}
//                           size="md"
//                           width={80}
//                           height={80}
//                           className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
//                         />
//                       </td>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal"
//                       >
//                         {val.email}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal"
//                       >
//                         {val.name}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <div className="w-max flex">
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal"
//                         >
//                           {val.specialty}
//                         </Typography>
//                       </div>
//                     </td>
//                     <td className={classes}>
//                       {val.isBlocked == true ? (
//                         <div className="flex items-center gap-1">
//                           <ImBlocked />
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className=" text-red-500 font-medium"
//                           >
//                             InActive
//                           </Typography>
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-1">
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className=" text-red-500 font-medium"
//                           >
//                             Active
//                           </Typography>
//                         </div>
//                       )}
//                     </td>
//                     <td className={classes}>
//                       {val.isBlocked ? (
//                         <Tooltip content="doctor block">
//                           <Button
//                             variant="outlined"
//                             className="bg-black text-white"
//                             size="sm"
//                             onClick={() => handleModal(val._id)}
//                           >
//                             unBlock
//                           </Button>
//                         </Tooltip>
//                       ) : (
//                         <Tooltip content="doctor block">
//                           <Button
//                             variant="outlined"
//                             className="bg-black text-white flex gap-1"
//                             size="sm"
//                             onClick={() => handleModal(val._id)}
//                           >
//                             <ImBlocked className="my-auto" /> Block
//                           </Button>
//                         </Tooltip>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </CardBody>
//         <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" onClick={()=>console.log("clikc footere")} >
//           <Button variant="outlined" size="sm" className="bg-black text-white">
//             Previous
//           </Button>
//           <div className="flex items-center gap-2">
//             <IconButton variant="outlined" size="sm">
//               1
//             </IconButton>
//             <IconButton variant="text" size="sm">
//               2
//             </IconButton>
//             <IconButton variant="text" size="sm">
//               3
//             </IconButton>
//             <IconButton variant="text" size="sm">
//               ...
//             </IconButton>
//             <IconButton variant="text" size="sm">
//               8
//             </IconButton>
//             <IconButton
//               variant="text"
//               size="sm"
//               className="hover:bg-slate-400 my-auto p-2"
//             >
//               9
//             </IconButton>
//             <IconButton variant="text" size="sm">
//               10
//             </IconButton>
//           </div>
//           <Button variant="outlined" className="bg-black text-white" size="sm">
//             Next
//           </Button>
//         </CardFooter>
//       </Card>
//       {isModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  ">
//           <div className="bg-white p-5 rounded-md  h-auto w-1/3 justify-center ">
//             <div className="w-10 mx-auto">
//               <IoIosWarning className="text-center text-6xl" />
//             </div>

//             <p className="mb-5 mt-5 text-center">
//               Are you sure you want to block {isSelected?.name}?
//             </p>
//             <p className="mb-5 mt-5 text-center text-red-500">
//               Warning: Blocking this doctor will prevent them from accessing
//               their account.
//             </p>
//             <div className="flex justify-center gap-6 mb-2 mt-5">
//               <button
//                 className="bg-black px-5 py-1 text-white rounded-md"
//                 onClick={() => setIsModal(false)}
//               >
//                 cancel
//               </button>
//               <button
//                 className="bg-red-600 px-5 py-1 text-white rounded-md"
//                 onClick={() => handleBlockedClick()}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default React.memo(DoctorManagment) ;

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Tooltip,
  Typography,
  TextField,
} from '@mui/material';
import { ImBlocked } from 'react-icons/im';
import { FaUserAlt } from 'react-icons/fa';
import { IoIosWarning } from 'react-icons/io';
import { toast } from 'react-toastify';
import {
  doctorBlocked,
  doctorUnBlocked,
  getAllDoctors,
} from '../../api/admin';
import { IDoctor } from '../../interface/interfaceDoctor';

const TABLE_HEAD = [
  'Profile Image',
  'Email',
  'Name',
  'Specialty',
  'Status',
  'Action',
];

function DoctorManagement() {
  const [doctorDatas, setDoctorDatas] = useState<IDoctor[]>();
  const [doctors, setDoctors] = useState<IDoctor[]>();
  const [searchValues, setSearchValues] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<IDoctor | undefined>();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors();
        setDoctorDatas(response.data.doctors);
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValues(inputValue);

    if (inputValue.trim() === '') {
      setDoctors(doctorDatas);
      return;
    }

    const regex = new RegExp(inputValue, 'i');
    const filteredDoctors = doctorDatas?.filter((doctor) =>
      regex.test(doctor.name)
    );
    setDoctors(filteredDoctors);
  };

  const handleModal = (id: string) => {
    setIsModal(true);
    setIsSelected(doctors?.find((doctor) => doctor._id === id));
  };

  const handleBlockedClick = async () => {
    try {
      if (isSelected?.isBlocked) {
        await doctorUnBlocked(isSelected._id as string);
        const updatedDoctors = doctors?.map((doctor) =>
          doctor._id === isSelected._id
            ? { ...doctor, isBlocked: false }
            : doctor
        );
        setDoctors(updatedDoctors);
        setIsModal(false);
        toast.success('Successfully unblocked the doctor');
      } else {
        await doctorBlocked(isSelected?._id as string);
        const updatedDoctors = doctors?.map((doctor) =>
          doctor._id === isSelected?._id
            ? { ...doctor, isBlocked: true }
            : doctor
        );
        setDoctors(updatedDoctors);
        toast.success('Successfully blocked the doctor');
        setIsModal(false);
      }
    } catch (error) {
      console.error('Failed to update doctor status:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <CardHeader>
          <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5">Doctor Management</Typography>
            <Typography variant="body2" color="textSecondary">
              These are details about all doctors
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Search user"
              value={searchValues}
              onChange={searchHandler}
              fullWidth
              style={{ marginTop: '20px' }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <table style={{ width: '100%', tableLayout: 'auto' }}>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} style={{ padding: '10px', backgroundColor: '#e0e0e0' }}>
                    <Typography variant="body2" color="textSecondary">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doctors?.map((doctor) => (
                <tr key={doctor._id}>
                  <td style={{ padding: '10px' }}>
                    {doctor.image ? (
                      <Avatar
                        src={doctor.image}
                        alt={doctor.name}
                        style={{ width: '80px', height: '80px' }}
                      />
                    ) : (
                      <FaUserAlt style={{ fontSize: '24px' }} />
                    )}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <Typography variant="body2">{doctor.email}</Typography>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <Typography variant="body2">{doctor.name}</Typography>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <Typography variant="body2">{doctor.specialty}</Typography>
                  </td>
                  <td style={{ padding: '10px' }}>
                    {doctor.isBlocked ? (
                      <Typography variant="body2" color="error">
                        Inactive
                      </Typography>
                    ) : (
                      <Typography variant="body2">Active</Typography>
                    )}
                  </td>
                  <td style={{ padding: '10px' }}>
                    {doctor.isBlocked ? (
                      <Tooltip title="Unblock doctor">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleModal(doctor._id)}
                        >
                          Unblock
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Block doctor">
                        <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<ImBlocked />}
                          onClick={() => handleModal(doctor._id)}
                        >
                          Block
                        </Button>
                      </Tooltip>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="primary">
            Previous
          </Button>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {/* Pagination controls */}
          </div>
          <Button variant="outlined" color="primary">
            Next
          </Button>
        </CardActions>
      </Card>

      {isModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <IoIosWarning style={{ fontSize: '48px', color: 'red' }} />
            </div>
            <Typography variant="h6" align="center">
              Are you sure you want to {isSelected?.isBlocked ? 'unblock' : 'block'} {isSelected?.name}?
            </Typography>
            <Typography variant="body2" align="center" color="error" style={{ marginTop: '10px' }}>
              Warning: {isSelected?.isBlocked ? 'Unblocking' : 'Blocking'} this doctor will change their access rights.
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
              <Button
                variant="outlined"
                onClick={() => setIsModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleBlockedClick()}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(DoctorManagement);

