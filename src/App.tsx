import "./App.css";
import AdminRouter from "./Routes/AdminRouter";
import UserRouter from "./Routes/UserRouter";

function App() {
  return (
    <>
      <AdminRouter />
      <UserRouter />
    </>
  );
}

export default App;
