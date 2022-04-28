import { Provider } from "react-redux";
import React, {Component} from "react";
import { configureStore } from "@reduxjs/toolkit";

import otpReducer from "./reducer";

const store = configureStore({
    reducer:{
        otp: otpReducer
    }
});
 
class StoreProvider extends Component {
  render() {
    return (
        <Provider store={store}>
            {this.props.children} 
        </Provider>
    )
  }
}

export const state = store;
export default StoreProvider;