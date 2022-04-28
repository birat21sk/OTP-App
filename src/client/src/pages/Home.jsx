import { connect } from "react-redux";
import React, { Component } from 'react' ;

import Otp from "../components/Otp"; 
import api from '../services/apiCall';
import apiUtils from '../utils/api.utils';
import {otpCodeErrorUpdated, otpCodeVerified} from "../store/reducer";

const Status ={
    SUCCESS: 200,
    ERROR: 400  
  }
Object.freeze(Status);

class Home extends Component { 
    constructor(props){
        super(props);
        this.apiEndPoint = apiUtils.getApiEndPoint();
    }
    validateCode = () =>{ 
        const entry = {code:this.props.otp.code, codeLength:this.props.otp.codeLength}

        api.post(this.apiEndPoint,entry)
        .then(res => {  
            if(res.data.status === Status.SUCCESS){
                this.props.otpCodeVerified(true);
                this.props.history.replace("/success")
            }
            else if(res.data.status === Status.ERROR){ 
                this.props.otpCodeErrorUpdated(res.data.error['message'])
            }
            else{
                this.props.otpCodeErrorUpdated("Something went wrong!")
            }
        })
        .catch(error => {
            console.log(error);
        })  
    }
    
    handleSubmit = (e) =>{
        e.preventDefault();

        this.validateCode();
    }

    render() {  
        const {code,codeReady,error} = this.props.otp;
        return (
            <React.Fragment>        
                <div className="paper border mt">  
                    <h1 className="mb-3">Verification Code:</h1>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <Otp/> 
                        <button className="submitBtn btn btn-success-1" disabled={!codeReady}>
                            Submit
                        </button>
                    </form>
                </div>
                {error && <div className="paper error text-danger">
                    <h3>Verification Error</h3>
                    {code}: {error}  
                </div>}
            </React.Fragment> 
        )
    }
}

const mapStateToProps = state => ({ 
    otp: state.otp,
}) 

const mapDispatchToProps = { 
    otpCodeVerified,
    otpCodeErrorUpdated,
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);