import React, { useState} from "react"; 
import axios from 'axios';
import InputOTP from './InputOTP';

const Home=({history, ...rest})=> {  
  const [code, setCode] = useState("");
  const [codeReady, setCodeReady] = useState(false);
  const [error, setError] =  useState(false);
  const [errorMsg, setErrorMsg] =  useState("");
  const CODE_LENGTH = 6; 
  const apiEndPoint = "/api/validation"

  const handleCodeChange = e =>{
    setCode(e.target.value);
  }    

  const handleSubmit = e => {
    e.preventDefault();
  
    const entry = { code:code, codeLength: CODE_LENGTH }
    axios.post(apiEndPoint,entry)
    .then(res => {  
      if(res.data.status === "success"){
        setError(false); 
        history.replace("/success")
      }else{ 
        setError(true);
        setErrorMsg(res.data.error['message']);
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
