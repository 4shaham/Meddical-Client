
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    specality:[]
}


const AdminSpecality=createSlice({
    
    name:"specality",
    initialState,
    
    reducers:{
        add:(state,actions)=>{
            state.specality=actions.payload
        }
    }
})


export const {add}=AdminSpecality.actions
export default AdminSpecality.reducer