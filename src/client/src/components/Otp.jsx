import { connect } from "react-redux";
import React, { Component } from 'react' ;

import otpUtils from "../utils/otp.utils";
import { otpCodeUpdated, otpCodeLengthUpdated,otpCodeReadyUpdated } from "../store/reducer";

class Otp extends Component {   
    constructor(props){
        super(props);
        this.state={
            code: "",
            isInputFocused: false,
        };  
        this.inputRef = React.createRef();
    }
    componentDidMount(){
        this.props.otpCodeLengthUpdated(otpUtils.getCodeLength());
    }

    componentDidUpdate(){
        const {code} = this.state;
        const {codeLength} = this.props.otp;
        this.props.otpCodeReadyUpdated(code.length == codeLength && !isNaN(code));   
        this.props.otpCodeUpdated(this.state.code);
    }

    componentWillUnmount(){ 
        this.props.otpCodeReadyUpdated(false);
    }

    handleOnChange = e => {
        this.setState({ code: e.target.value });   
    }

    handleOnFocus = () =>{
        this.setState({isInputFocused: true});
        this.inputRef.current.focus();
    }

    codeDigitInput = (_val, idx) =>{
        const code = this.state.code;
        const {codeLength} = this.props.otp;
        const inputChar = ' ';
        const digit = code[idx] || inputChar;

        const isCurrentDigit = idx == code.length;
        const isLastDigit = idx == codeLength - 1;
        const isFull = code.length == codeLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isFull)

        let focusedClass = this.state.isInputFocused && isDigitFocused ? "digitFocusedIsNumber" : "digitFocusedIsBlank";

        if(isNaN(code)) focusedClass = "digitFocusedIsNotNumber"; // All digit highlight as red
        if(isFull && !isNaN(code)) focusedClass = "digitFocusedIsNumber"; //All digit highlight as green
        
        return(
            <div key={idx} className="codeBox">
                <input value={digit} className={`codeBoxInput ${focusedClass}`}/>
            </div>
        )
    }
    render() { 
        const {codeLength} = this.props.otp; 

        const codeArray = new Array(codeLength).fill(0);

        return (
            <div className="justify-content-center">
                <div className="codeBoxWrapper" onFocus={this.handleOnFocus}>
                    {codeArray.map(this.codeDigitInput)}
                </div>
                <input 
                    className="hiddenTextInput"
                    maxLength={codeLength}
                    ref={this.inputRef}
                    onChange={this.handleOnChange}
                />
            </div> 
        )
    }
}

const mapStateToProps = state => ({
    otp: state.otp,
})
const mapDispatchToProps = {
    otpCodeUpdated, 
    otpCodeLengthUpdated, 
    otpCodeReadyUpdated,
}

export default connect(mapStateToProps, mapDispatchToProps)(Otp);