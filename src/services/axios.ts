
import axios,{AxiosInstance} from "axios";
import { useNavigate } from "react-router-dom";


const Api:AxiosInstance=axios.create({
    baseURL:'http://localhost:4001',
    withCredentials:true
})




Api.interceptors.request.use(
    (config) => {
      console.log('Request:', config);
      return config;
    },
    (error) => {
      // Handle request error
      console.log(error)
      return Promise.reject(error);
    }
  );

  Api.interceptors.response.use(
    (response) => {
      console.log('Response:', response);
      return response;
    },
    (error) => {
      console.log(error)
      if(error.response&& error.response.status==401 && error.response.data.message=="Payment"){
           console.log('errorr')
      }


      if (error.response && error.response.status === 500) {

        console.log("internal server erorro")
        // Handle 401 Unauthorized error
        // window.location.href = '/login';
      
      }
      return Promise.reject(error);
    }

     
  ); 


export default Api