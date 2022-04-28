import { createSlice } from "@reduxjs/toolkit";
 
export const otpSlice = createSlice({
    name: "otp",
    initialState: {code:"",codeLength:0,codeReady:false,isVerified:false,error:""},
    reducers: {
        otpCodeUpdated: (otp, action) => {
            otp.code = action.payload;
        }, 
        otpCodeReadyUpdated: (otp, action)=>{
            otp.codeReady = action.payload;
        },
        otpCodeLengthUpdated: (otp, action)=>{
            otp.codeLength = action.payload;
        },
        otpCodeErrorUpdated: (otp, action)=>{
            otp.error = action.payload;
        },
        otpCodeVerified: (otp, action)=>{
            otp.isVerified = action.payload;
        }
    }
});

export const {
    otpCodeLengthUpdated,
    otpCodeReadyUpdated,
    otpCodeErrorUpdated,
    otpCodeVerified,
    otpCodeUpdated, 
} = otpSlice.actions;
export default otpSlice.reducer;