
import SideBar from "../../components/Admin/SideBar";
import NavBar from "../../components/Admin/NavBar";
import UseAdminRouteProtect from "../../components/Admin/AdminRoteProtectHook";

function AdminVerifyNewDoctorRequest() {

  UseAdminRouteProtect()

  return (
    <div className="w-full h-full flex">
      <SideBar />
      <div className="bg-white w-full">
        <NavBar />
        <h1>Verify new Request</h1>
      </div>
    </div>
  );
}

export default AdminVerifyNewDoctorRequest;
