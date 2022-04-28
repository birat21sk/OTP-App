function validateData(data){
    const {code, codeLength} = data;
    const codeInt = parseInt(code); 
    
    if(code.length !== codeLength){
        return {status:400, error:{message:"The code is not 6 digits"}} 
    }
    else if(isNaN(code)){
        return {status:400, error:{message:"Not a number"}}  
    } 
    else if(codeInt % 10 === 7){
        return {status:400, error:{message:"The code ends with digit '7'"}}  
    } 
    else{
        return {status:200, error:{message:""}}  
    }
}

exports.validate = validateData;