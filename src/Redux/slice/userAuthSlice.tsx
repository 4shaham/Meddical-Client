
import { PayloadAction,createSlice } from "@reduxjs/toolkit";



interface userState{
    userStatus:boolean
}

const initialState:userState={
    userStatus:false
}


const userAuthSlice=createSlice({
    
    name:"users",
    initialState,

    reducers:{
        login:(state)=>{
             
           state.userStatus=true

        },  
        logout:(state)=>{
               
            state.userStatus=false
        
        }
    }

})


export const {login,logout}=userAuthSlice.actions
export default userAuthSlice.reducer

