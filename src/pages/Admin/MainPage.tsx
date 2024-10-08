
import SideBar from "../../components/Admin/SideBar";
import { Outlet} from "react-router-dom";
import UseAdminRouteProtect from "../../hook/AdminSide/useAdminRouteProtectHook";

function MainPage() {

    UseAdminRouteProtect();

    
  
  return (
    <div className="w-full h-full flex bg-gray-100">
       <SideBar />
      <div className="bg-white w-full"> 
        <Outlet/>
      </div>
    </div>
  );
}

export default MainPage;
