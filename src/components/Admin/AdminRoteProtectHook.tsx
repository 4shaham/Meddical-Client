import { adminGetToken } from "../../api/admin";
import { useNavigate } from "react-router-dom";



const UseAdminRouteProtect = () => {

  const navigate = useNavigate();

  interface adminGetTokenResponse {
    data: {
      status: boolean;
      decoded: object;
    };
  }

  const hadnleFunciton = async () => {
    try {
      let response: adminGetTokenResponse = await adminGetToken();
      if (!response.data.status) {
        navigate("/admin/login");
      }
    } catch (error) {
      navigate("/admin/login");
      console.log(error, "dfdfjdkjf");
    }
  };
  hadnleFunciton();
};

export default UseAdminRouteProtect;
