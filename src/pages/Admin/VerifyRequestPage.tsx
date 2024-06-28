import React, { FC } from "react";
import profileImage from "../../assets/doctoProfiler.jpg";

const VerifyRequestPage: FC = () => {
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
            <tr className="bg-white border-b    hover:bg-gray-50 dark:hover:bg-gray-100">
              <th
                scope="row"
                className="flex items-center px-6 py-4  text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={profileImage}
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">Neil Sims</div>
                  <div className="font-normal text-gray-500">
                    neil.sims@flowbite.com
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">React Developer</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                  Not completed
                </div>
              </td>
              <td className="px-6 py-4">
                {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a> */}
                <button className="btn bg-btnColor py-1 px-5 text-white rounded-md">
                  View Kyc Data
                </button>
              </td>
            </tr>
            <tr className="bg-white border-b   hover:bg-gray-50 dark:hover:bg-gray-100">
              <th
                scope="row"
                className="flex items-center px-6 py-4  text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={profileImage}
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">Neil Sims</div>
                  <div className="font-normal text-gray-500">
                    neil.sims@flowbite.com
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">React Developer</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                  Not completed
                </div>
              </td>
              <td className="px-6 py-4">
    
                <button className="btn bg-btnColor py-1 px-5 text-white rounded-md">
                  View Kyc Data
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifyRequestPage;
