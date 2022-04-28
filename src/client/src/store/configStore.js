import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import otpReducer from "./reducer";

const store = configureStore({
    reducer:{
        otp: otpReducer
    }
});

const StoreProvider = ({children: App}) =>{
    return(
        <Provider store={store}>
            {App }
        </Provider>
    )
};

export default StoreProvider;