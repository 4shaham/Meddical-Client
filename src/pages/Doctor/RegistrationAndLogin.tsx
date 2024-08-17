
import { Outlet } from "react-router-dom";
import doctorProfile from "../../assets/doctoProfiler.jpg"
import UseDoctorLoginAndRegistration from "../../hook/DoctorSide/useDoctorLoginAndRegistration";

function RegistrationAndLogin() {

  UseDoctorLoginAndRegistration ()

  return (
    <div className="w-full bg-white h-screen flex">
      <div className="w-1/3 text-2xl  sm:w1/2  md:w-1/2 bg-white h-full flex">
       
        <img className="object-contain" src={doctorProfile} alt="" />
      </div>
      
      <Outlet/>
     
    </div>
  );
}

export default RegistrationAndLogin;
