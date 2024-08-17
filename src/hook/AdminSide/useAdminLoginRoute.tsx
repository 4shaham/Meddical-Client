import { useNavigate } from "react-router-dom";
import { adminGetToken } from "../../api/admin";


const UseAdminLogin = async () => {
  console.log("coustom hook worked is successess");

  const navigate = useNavigate();

  let response = await adminGetToken();

  if (response.data.status) {
    navigate("/admin/");
  }

  return;

};

export default UseAdminLogin;