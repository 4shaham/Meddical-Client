
import DSideBar from "../../components/Doctor/DSideBar";
import NavBar from "../../components/Doctor/NavBar";
import { Outlet} from "react-router-dom";

function DoctorMainPage() {
  // UseDoctorProtoct();

  return (
    <div>
      <div className="w-full  bg-red-500 flex">
        <div className="w-[20%] h-auto bg-gray-200">
          <div className="text-blue-500 items-center justify-center text-center my-11">
            <h1 className="custom-font text-4xl text-black">MEDDICAL</h1>
          </div>
          <div>
            <DSideBar />
          </div>
        </div>

        <div className="w-full h-auto bg-gray-100 block ">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DoctorMainPage;
