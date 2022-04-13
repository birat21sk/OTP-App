import React, {useRef, useState, useEffect} from 'react';

const codeBoxWrapper = {
    width : "100%",
    display: "flex",
    flexDirection: "row",
    JustifyContent: "space-around"
}

const codeBox = { 
    // minWidth:"20%",
    borderWidth:"2px",
    borderRadius: "5%",
    padding: "1rem"
}
const codeBoxInput = { 
    width:"60px",
    borderRadius:"10%",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center"
}

const hiddenTextInput = {
    position: "absolute",
    width: "1px",
    height: "1px",
    opacity: "0"
}


const InputOTP = ({setCodeReady, code, setCode, maxLength }) => {

    const codeInputRef = useRef(null);
    const [isInputFocused,setIsInputFocused] = useState(false);

    const codeArray = new Array(maxLength).fill(0);

    const handleOnFocus = () =>{
        setIsInputFocused(true);
        codeInputRef.current.focus();
    }

    const handleOnBlur = () => {
        setIsInputFocused(false);
    };

    useEffect(()=>{
        // update code ready
        setCodeReady(code.length == maxLength && !isNaN(code));
        return () => setCodeReady(false);
    },[code]);

    const codeDigitInput = (_value, index) =>{
        const inputChar = " ";
        const digit = code[index] || inputChar;
        
        const isCurrentDigit = index == code.length;
        const isLastDigit = index == maxLength - 1;
        const isFull = code.length == maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isFull)

        let focusedClass = isInputFocused && isDigitFocused ? "digitFocusedIsNumber" : "digitFocusedIsBlank";

        if(isNaN(code)) focusedClass = "digitFocusedIsNotNumber"; // All digit highlight as red
        if(isFull && !isNaN(code)) focusedClass = "digitFocusedIsNumber"; //All digit highlight as green
        
        return (
            //Individual digit block
            <div key={index} style={codeBox}>
                <input className={focusedClass} value={digit} style={codeBoxInput}/>
            </div>
        )
    }
    
    return(
        <div className="justify-content-center">
            <div style={codeBoxWrapper} onFocus={handleOnFocus}>
                {codeArray.map(codeDigitInput)}
            </div>
            <input 
                style={hiddenTextInput}
                value={code} 
                onChange={setCode} 
                maxLength={maxLength}
                ref={codeInputRef}
                onBlur = {handleOnBlur}
                name="codeValue"
            />
        </div>
    );
};

export default InputOTP;