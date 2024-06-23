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
        }
    }
})


export const {verifed}=OtpSlice.actions
export default OtpSlice.reducer
