import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doctorLogout } from "../../api/doctor";
import { logout } from "../../Redux/slice/DoctorAuthSlice";


interface rootNode {
  doctorAuth: {
    doctor: {
      name: string;
      image: String;
      email: string;
    };
  };
}

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state: rootNode) => state.doctorAuth.doctor);

  const handleLogout = async () => {
    try {
      const response = await doctorLogout();
      console.log(response.data.status, "jiiiiiiiii");
      if (response.data.status) {
        dispatch(logout());
        navigate("/doctor/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-16 my-11 flex justify-between ">
      <div className="flex gap-1">
        <img
          src={state.image ? (state.image as string) : "shhsj"}
          className="w-14 rounded-full mx-2"
          alt="Avatar"
        />

        <div>
          <h1 className="text-black text-xl font-medium">
            Hello,Dr {state.name}
          </h1>
          <p className="font-medium">Thank you for joining us today</p>
        </div>
      </div>
      <div className="">
        <div className="my-auto">
          <button
            className="bg-black text-white px-5 py-1  rounded-md mx-auto "
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
