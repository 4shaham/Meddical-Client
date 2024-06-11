import "./App.css";
import AdminRouter from "./Routes/AdminRouter";
import DoctorRouter from "./Routes/DoctorRouter";
import UserRouter from "./Routes/UserRouter";

function App() {
  return (
    <>
      <AdminRouter/>
      <UserRouter/>
      <DoctorRouter/>
    </>
  );
}

export default App;
