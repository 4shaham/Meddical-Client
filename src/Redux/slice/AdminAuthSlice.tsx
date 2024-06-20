import { createSlice } from "@reduxjs/toolkit";


const initialState={
    Admin:{
        status:false
    }
}


const adminAuthSlice=createSlice({
    
    name:"admin",
    initialState,

    reducers:{
        login:(state)=>{
         state.Admin={
            status:true
          }  
        }
    }




})


export const{login}=adminAuthSlice.actions
export default adminAuthSlice.reducer
