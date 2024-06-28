import { Link, Outlet } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import UseProtectLoginAndRegistration from "../../hook/UserSide/useProtectLoginAndRegistration";
import bgimage from "../../assets/loginBg.jpeg"

function UserRegistrationAndLogin() {

  UseProtectLoginAndRegistration()

  return (
    <div className="">
      <section className=" mx-auto relative p-10  h-auto w-full dark:bg-serviceColors-200  rounded-2xl">
        <img className="absolute z-[-1] top-0 left-0 w-full h-full opacity-[100%] blur-[4px]" src={bgimage} alt="" />
        <Link to="/">
      

        <button className="bg-black rounded-md text-white px-5  py-1 flex gap-2" ><IoArrowBackCircleOutline size="1.5rem"/>Home</button>
          {/* <h1 className="py-4 px-11 text-xl font-medium flex items-center text-[#a01eafb2]">
            <IoArrowBackCircleOutline size="1.5rem" />
            Home
          </h1> */}
        </Link>
        <Outlet/>
      </section>
    </div>
  );
}

export default UserRegistrationAndLogin;
