import { useState } from "react";
import { adminGetToken } from "../../api/admin";
import { useNavigate } from "react-router-dom";

interface adminGetTokenResponse {
    data: {
      status: boolean;
      decoded: object;
    };
  }

const UseAdminRouteProtect = () => {

   const navigate = useNavigate();
  console.log("coustom hook worked is successess")
                                                                      
 

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

  return 
};

export default UseAdminRouteProtect;
