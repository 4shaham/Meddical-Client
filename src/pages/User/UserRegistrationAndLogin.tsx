import { Link, Outlet } from "react-router-dom";
import UseProtectLoginAndRegistration from "../../hook/UserSide/useProtectLoginAndRegistration";


function UserRegistrationAndLogin() {
  UseProtectLoginAndRegistration();

  return (
    <div className="">
      <section className=" mx-auto relative p-10  h-auto w-full dark:bg-serviceColors-200   rounded-2xl">
        {/* <img className="absolute z-[-1] top-0 left-0 w-full h-full opacity-[100%] blur-[4px]" src={bgimage} alt="" /> */}
        {/* <Link to="/">
      

        <button className="bg-black rounded-md text-white px-5  py-1 flex gap-2" ><IoArrowBackCircleOutline size="1.5rem"/>Home</button> */}
        {/* <h1 className="py-4 px-11 text-xl font-medium flex items-center text-[#a01eafb2]">
            <IoArrowBackCircleOutline size="1.5rem" />
            Home
          </h1> */}
        {/* </Link>
        <Outlet/> */}
        <div className="">
          <h1 className="text-black text-3xl md:text-4xl font-extrabold">
            <Link to={"/"}>
              <div className="flex items-center">
                <div>
                  <p>
                    ME<span className="text-blue-400">D</span>
                  </p>
                </div>
                <div>
                  <p className="relative flex items-center rotate-180 text-red-600">
                    D
                  </p>
                </div>
                <div>
                  <p>ICAL</p>
                </div>
              </div>
            </Link>
          </h1>
        </div>

        <div className="flex items-center justify-center h-auto min-h-screen ">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex  max-w-5xl w-auto md:w-full">
            <div className="hidden md:block w-1/2 p-2">
              <img
                src="https://i.pinimg.com/736x/60/1c/3a/601c3a9cc68c8c71d9ad1ca9e68ec805.jpg"
                alt="Beautiful beach view"
                className="w-full h-full object-fill"
              />
            </div>

            <Outlet/>
           
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserRegistrationAndLogin;
