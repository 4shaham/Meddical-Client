
import { useNavigate } from "react-router-dom";
import { docotorGetToken } from "../../api/doctor";
import { useDispatch } from "react-redux";
import { logout, setIsAuthenticated } from "../../Redux/slice/DoctorAuthSlice";

const UseDoctorProtoct = async (): Promise<boolean | undefined> => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  try {
    const response = await docotorGetToken();
    console.log(response, "oooooooooooooo");

    if (!response.data.status) {
      dispatch(logout())
      navigate("/doctor/login");
    } else {
      // dispatch(response.data.doctorData)
      dispatch(setIsAuthenticated())
      console.log("it is logined", response.data.doctorData);
      return true;
    }
  } catch (error) {

    console.log(error, "jiiii");
    console.log("vidanmae");
    navigate("/doctor/login");
    return false;
  }
};

export default UseDoctorProtoct;