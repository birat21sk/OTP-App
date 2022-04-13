import React, { useState, useEffect } from "react"; 
import axios from 'axios';
import InputOTP from './components/InputOTP';
import "./App.css";

const App=()=> {
  const [code, setCode] = useState("");
  const [codeReady, setCodeReady] = useState(false);
  const [response, setResponse] = useState({});
  const CODE_LENGTH = 6;

   async function fetchResponse() {
    
    const entry = { code }

    const { data } = await axios.post(
      'http://127.0.0.1:8000/api/posts/',
      entry
    )
    setResponse(data)
  }

  useEffect(() => {
    fetchResponse()
  }, [])

  const handleCodeChange = e =>{
    setCode(e.target.value);
  }    

  const handleSubmit = e => {
    e.preventDefault();
 
    console.log(code, " Submitted");
    fetchResponse()
  }

  return (
      <div className="paper border">  
        <h1 className="mb-3">Verification Code</h1>
        <form method="post" className="form" onSubmit={handleSubmit}>
        <InputOTP 
          setCodeReady = {setCodeReady}
          code = {code}
          setCode = {handleCodeChange} 
          maxLength= {CODE_LENGTH}
        />
        <button className={"submitBtn btn btn-".concat(codeReady ? "success" : "outline-dark disabled")}>Submit</button>
        </form>
      </div>
  );
}

export default App;
