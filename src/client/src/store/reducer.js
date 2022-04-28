import { createSlice } from "@reduxjs/toolkit";
 
export const otpSlice = createSlice({
    name: "otp",
    initialState: {code:"",error:""},
    reducers: {
        otpCodeUpdated: (otp, action) => {
            otp.code = action.payload;
        }, 
        optCodeError: (opt, action)=>{
            opt.error = action.payload;
        }
    }
});

export const {otpCodeUpdated, optCodeLengthUpdated, optCodeError} = otpSlice.actions;
export default otpSlice.reducer;