import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminGetToken } from "../../api/admin";


const UseAdminLogin = async () => {
  console.log("coustom hook worked is successess");

  const dispath = useDispatch();
  const navigate = useNavigate();

  let response = await adminGetToken();

  if (response.data.status) {
    navigate("/admin/");
  }

  return;

};

export default UseAdminLogin;