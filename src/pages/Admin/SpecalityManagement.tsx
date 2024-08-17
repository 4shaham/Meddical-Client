
import SpecalityManagmentTable from "../../components/Admin/SpecalityManagmentTable";
import {  useNavigate } from "react-router-dom";


function SpecalityManagement() {

  const navigate=useNavigate()
  
  return (
    <div className="w-full mx-2 mt-11">
     
       <button
          className="bg-btnColor text-white px-14 py-1 rounded-md mb-10 ml-2"
         onClick={()=>navigate("/admin/deletedSpecality")} >
         Deleted Specality
        </button>
        <button
          className="bg-btnColor text-white px-14 py-1 rounded-md mb-10 ml-2"
         onClick={()=>navigate("/admin/AddSpecalityManagment")} >
         Add Specality
        </button>
       <SpecalityManagmentTable />
    </div>
  );
}

export default SpecalityManagement;
