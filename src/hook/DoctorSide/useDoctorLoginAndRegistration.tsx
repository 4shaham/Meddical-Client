import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { docotorGetToken } from "../../api/doctor";

const useDoctorLoginaandRegistration = async () => {
  console.log("hiiiiii");

  const dispath = useDispatch();
  const navigate = useNavigate();

  let response = await docotorGetToken();

  if (response.data.status) {
    navigate("/doctor/");
  }

  return;
};

export default useDoctorLoginaandRegistration;
