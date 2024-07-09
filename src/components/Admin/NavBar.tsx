import React from "react";
import { adminLogout } from "../../api/admin";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const handleLogoutButton = async () => {
    try {
      const response = await adminLogout();
      if (response.data.status) {
        navigate("/admin/login");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="w-full  flex justify-between">
      {/* <div className="m-3 mx-10 my-7">
        <h1 className="text-black text-4xl custom-font">MEDDICAL</h1>
      </div> */}

      <div className="my-7 mx-10">
        <button
          className="bg-red-600 text-white rounded-md py-1 px-7"
          onClick={handleLogoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
