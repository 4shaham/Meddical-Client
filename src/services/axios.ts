
import axios,{AxiosInstance} from "axios";


const Api:AxiosInstance=axios.create({
    baseURL:'http://localhost:4001',
    withCredentials:true
})

export default Api