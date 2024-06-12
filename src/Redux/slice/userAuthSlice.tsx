
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



interface userState{
    userData:any
}

const initialState:userState={
    userData:null
}


const userAuthSlice=createSlice({
    
    name:"users",
    initialState,

    reducers:{
        login:(state,action:PayloadAction<any>)=>{
             
           state.userData=action.payload

        },  
        logout:(state,action:PayloadAction<void>)=>{
               
            state.userData=null
        
        }
    }

})


export const {login,logout}=userAuthSlice.actions
export default userAuthSlice.reducer

