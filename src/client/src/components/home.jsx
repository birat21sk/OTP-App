import React, { useState} from "react"; 

import api from '../services/apiCall';
import InputOTP from './InputOTP';

import apiUtils from '../utils/api.utils';
import otpUtils from '../utils/otp.utils';

const Status ={
  SUCCESS: 200,
  ERROR: 400  
}
Object.freeze(Status);

const Home=({history, ...rest})=> {  
  const [code, setCode] = useState("");
  const [codeReady, setCodeReady] = useState(false);
  const [error, setError] =  useState(false);
  const [errorMsg, setErrorMsg] =  useState("");

  const CODE_LENGTH = otpUtils.getCodeLength();
  const apiEndPoint = apiUtils.getApiEndPoint();

  const handleCodeChange = e =>{
    setCode(e.target.value);
  }    

  const handleSubmit = e => {
    e.preventDefault();
  
    const entry = { code:code, codeLength: CODE_LENGTH }
    
    api.post(apiEndPoint,entry)
    .then(res => {  
      if(res.data.status === Status.SUCCESS){
        setError(false); 
        history.replace("/success")
      }
      else if(res.data.status === Status.ERROR){ 
        setError(true);
        setErrorMsg(res.data.error['message']);
      }
      else{
        setError(true);
        setErrorMsg("Something went wrong");
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
      {error && <div className="paper error text-danger">
        <h3>Verification Error</h3>
        {errorMsg} 
      </div>}
    </React.Fragment>
  );
}

export default Home;
