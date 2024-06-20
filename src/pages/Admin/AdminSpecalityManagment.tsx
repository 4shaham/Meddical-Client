import React, { useState } from "react";
import SideBar from "../../components/Admin/SideBar";
import NavBar from "../../components/Admin/NavBar";
import UseAdminRouteProtect from "../../components/Admin/AdminRoteProtectHook";

function AdminSpecalityManagment() {
  UseAdminRouteProtect();

  const [isAdd, setIsAdd] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex">
      <SideBar />
      <div className="bg-white w-full">
        <NavBar />
        <div className="bg-white-500 w-full h-full pt-2">
          <div className="my-17">
            {!isAdd ? (
              <div className="m-5 mx-16 font-medium text-black">
                <button onClick={() => setIsAdd(true)}>Add Specality</button>
              </div>
            ) : (
              <div className="m-5 mx-16 font-medium text-black">
                <button onClick={() => setIsAdd(!setIsAdd)}>back</button>
              </div>
            )}
          </div>

          <div className="container rounded-lg p-3">
            {!isAdd ? (
              <div className="mx-auto">
                <table className="table-auto w-full ">
                  <thead className="w-1/2 bg-gray-200 rounded-md" >
                    <tr>
                      <th className="text-center w-1/2">Song</th>
                      <th className="text-center">Artist</th>
                      <th>Year</th>
                    </tr>
                  </thead>
                  <tbody className=" bg-black">
                    <tr>
                      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                      <td>Malcolm Lockyer</td>
                      <td>1961</td>
                    </tr>
                    <tr>
                      <td>Witchy Woman</td>
                      <td>The Eagles</td>
                      <td>1972</td>
                    </tr>
                    <tr>
                      <td>Shining Star</td>
                      <td>Earth, Wind, and Fire</td>
                      <td>1975</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <h1>hiii</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSpecalityManagment;
