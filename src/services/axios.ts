
import axios, { AxiosInstance } from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/slice/userAuthSlice";

// import {logout} from "../Redux/slice/DoctorAuthSlice"


const Api: AxiosInstance = axios.create({
  baseURL: "https://server.shaham.website",
  withCredentials: true,
});

// const Api: AxiosInstance = axios.create({
//   baseURL: "http://localhost:4001",
//   withCredentials: true,
// });
   
export const axiosInterceptor = (navigate: any) => {
  const dispatch = useDispatch();

  console.log("Setting up Axios interceptor");

  // Api.interceptors.request.use(
  //   (config) => {
  //     console.log("Request:", config);
  //     return config;
  //   },
  //   (error) => {
  //     console.log("Request error:", error);
  //     return Promise.reject(error);
  //   }
  // );

  Api.interceptors.response.use(
    (response) => {
      console.log("Response:", response);
      return response;
    },
    async(error) => {
      console.log("Response error:", error);
      if (error.response) {
        if (error.response.status === 401) {

          if (error.response.data.message == "Admin is not authenticated") {
             navigate("/admin/login")
          }  

          if(error.response.data.message=="doctor is blocked" || error.response.data.message=="doctor token is expired"){
             navigate("/doctor/login")  
          }

          if (
            error.response.data.messsage == "user is blocked" ||
            error.response.data.message == "userTokenExpired"
          ) {
            dispatch(logout());
            navigate("/");
          }
        } else if (error.response.status === 500) {
          navigate("/internalServerError");
          console.log("Internal server error");
        }
      }
      return Promise.reject(error);
    }
  );
};

// Api.interceptors.request.use(
//     (config) => {
//       console.log('Request:', config);
//       return config;
//     },
//     (error) => {
//       // Handle request error
//       console.log(error)
//       return Promise.reject(error);
//     }
//   );

//   Api.interceptors.response.use(
//     (response) => {
//       console.log('Response:', response);
//       return response;
//     },
//     (error) => {
//       console.log(error)
//       if(error.response&& error.response.status==401 && error.response.data.message=="Payment"){
//            console.log('errorr')
//       }

//       if (error.response && error.response.status === 500) {

//         alert("hiiiii")
//         console.log("internal server erorro")

//         // Handle 401 Unauthorized error
//         // window.location.href = '/login';

//       }
//       return Promise.reject(error);
//     }

//   );

export default Api;
