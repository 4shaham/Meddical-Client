import { Link, Outlet } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";


function UserRegistrationAndLogin() {

  return (
    <div className="p-12">
      <section className="bg-gray-50 mx-auto  h-auto w-full dark:bg-serviceColors-200  rounded-lg">
        <Link to="/">
          <h1 className="py-4 px-11 text-xl font-medium flex items-center">
            <IoArrowBackCircleOutline size="1.5rem" />
            Home
          </h1>
        </Link>
        
        <Outlet/>

      </section>
    </div>
  );
}

export default UserRegistrationAndLogin;
