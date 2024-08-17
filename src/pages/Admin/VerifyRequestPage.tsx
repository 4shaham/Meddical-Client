import { FC, useEffect, useState } from "react";
import { findAllNewRequestedDoctors } from "../../api/admin";
import { Link } from "react-router-dom";

interface Achievements {
  data: Date;
  description: string;
  title: string;
}

interface Experiences {
  startDate: Date;
  hospitalName: string;
  responsibilities: string;
  endDate: Date;
}

enum AppliedStatus {
  Approved = "approved",
  Applied = "applied",
  Rejected = "rejected",
}

interface IKyc {
  _id: string;
  email: string;
  licenseNumber: string;
  licenseImage: string;
  yearsOfexperience: number;
  identityCardImage: string;
  achievements: Achievements[];
  experiences: Experiences[];
  step: number;
  appliedStatus: AppliedStatus;
}

interface IDoctor {
  _id: string;
  name: string;
  specialty: string;
  email: string;
  password: string;
  phoneNumber: string;
  approved: boolean;
  fees: number;
  image: string;
  isBlocked: boolean;
  otpVerified: boolean;
}

interface Response extends IKyc {
  doctorDetails:IDoctor[];
}

const VerifyRequestPage: FC = () => {
  const [doctors, setDoctors] = useState<Response[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await findAllNewRequestedDoctors();
      console.log(data.data);
      setDoctors(data.data);
    };
    fetchData();
  }, []);

 

  return (
    <div className="p-2">
      <div className="header">
        <h1 className="text-center text-4xl mb-1 font-medium">
          Verify New Request
        </h1>
      </div>

      <div className="relative  overflow-x-auto shadow-md sm:rounded-lg p-1 mt-16 ">
        <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
          <thead className="text-xs  uppercase  text-black font-medium">
            <tr>
            <th scope="col" className="px-6 py-3">
               image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Specality
              </th>
              <th scope="col" className="px-6 py-3">
                KYC Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((values:Response) => (
              <tr className="bg-white border-b    hover:bg-gray-50 dark:hover:bg-gray-100">
                <td
                  scope="row"
                  className="flex items-center px-6 py-4  text-gray-900 whitespace-nowrap "
                >
                  <img
                    className="w-20 h-20 rounded-full object-fill"
                    src={values.doctorDetails[0].image}
                    alt="Jese image"
                  />

                </td>
                <td className="px-6 py-4"> {values.doctorDetails[0].email}</td>
                <td className="px-6 py-4">{values.doctorDetails[0].specialty}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                    {values.appliedStatus}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a> */}
                <Link to={`/admin/kycDataView?id=${values._id}`}><button className="btn bg-btnColor py-1 px-5 text-white rounded-md">
                    View Kyc Data
                  </button>
                </Link>   
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifyRequestPage;
