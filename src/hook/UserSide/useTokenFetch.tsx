import { useDispatch } from "react-redux"
import { logout,login } from "../../Redux/slice/userAuthSlice"
import { useEffect } from "react"
import { getToken } from "../../api/user"


const useTokenFetch=()=>{
    
const dispatch=useDispatch()

  useEffect(()=>{
  
    const response=async()=>await getToken()
     console.log(response,"kpppppppppppppppppppppppp")
    //  if(response.data.token){}
  },[])

  

}

export default useTokenFetch