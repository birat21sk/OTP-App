function validateData(data){
    const {code, codeLength} = data;
    const codeInt = parseInt(code); 
    
    if(code.length != codeLength){
        return {status:"fail", error:{message:"The code is not 6 digits"}} 
    }
    else if(isNaN(code)){
        return {status:"fail", error:{message:"Not a number"}}  
    } 
    else if(codeInt % 10 == 7){
        return {status:"fail", error:{message:"The code ends with digit '7'"}}  
    } 
    else{
        return {status:"success", error:{message:""}}  
    }
}

exports.validate = validateData;