import React, { useState } from "react"; 

import api from '../services/apiCall';
import InputOTP from './InputOtp';

import apiUtils from '../utils/api.utils';
import otpUtils from '../utils/otp.utils';

import { useSelector ,useDispatch } from "react-redux";
import { optCodeError, otpCodeUpdated } from "../store/reducer";

const Status ={
  SUCCESS: 200,
  ERROR: 400  
}
Object.freeze(Status);

const Home=({history, ...rest})=> { 
  const otp = useSelector((state)=>state.otp);

  const [code, setCode] = useState("");
  const [codeReady, setCodeReady] = useState(false); 

  const CODE_LENGTH = otpUtils.getCodeLength();
  const apiEndPoint = apiUtils.getApiEndPoint();

  const dispatch = useDispatch();

  const handleCodeChange = e =>{
    setCode(e.target.value); 
  }     

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(otpCodeUpdated(code));
    validateCode();
  }
 
  const validateCode= ()=>{ 
    const entry = {code:code, codeLength:CODE_LENGTH};
    api.post(apiEndPoint,entry)
    .then(res => {  
      if(res.data.status === Status.SUCCESS){
        history.replace("/success")
      }
      else if(res.data.status === Status.ERROR){ 
        dispatch(optCodeError(res.data.error['message']));
      }
      else{
        dispatch(optCodeError("Something wrong!"));
      }
    })
    .catch(error => {
      console.log(error);
    })  
  }

  return (
    <React.Fragment>
      <div className="paper border mt">  
        <h1 className="mb-3">Verification Code</h1>
        <form className="form" onSubmit={handleSubmit}>
        <InputOTP 
          setCodeReady = {setCodeReady}
          code = {code}
          setCode = {handleCodeChange} 
          maxLength= {CODE_LENGTH}
        />
        <button className={"submitBtn btn btn-".concat(codeReady ? "success-1" : "outline-dark disabled")}>Submit</button>
        </form>
      </div>
      {otp.error && <div className="paper error text-danger">
        <h3>Verification Error</h3>
        {otp.code}: {otp.error}  
      </div>}
    </React.Fragment>
  );
}

export default Home;
