import { createSlice } from "@reduxjs/toolkit";


const initialState={
    OtpVerifed:false
}


const OtpSlice=createSlice({

    name:"otpPageVerification",
    initialState,

    reducers:{
        verifed:(state)=>{
           state.OtpVerifed=true
        }
    }
})


export const {verifed}=OtpSlice.actions
export default OtpSlice.reducer
