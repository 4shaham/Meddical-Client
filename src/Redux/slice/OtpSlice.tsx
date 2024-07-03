import { createSlice } from "@reduxjs/toolkit";


const initialState={
    OtpVerifed:false,
    otpType:"",
}


const OtpSlice=createSlice({

    name:"otpPageVerification",
    initialState,

    reducers:{
        verifed:(state,actions)=>{
           state.OtpVerifed=true
           state.otpType=actions.payload
        },
        unVerifed:(state)=>{
            state.OtpVerifed=false
        }
    }
})


export const {verifed,unVerifed}=OtpSlice.actions
export default OtpSlice.reducer
