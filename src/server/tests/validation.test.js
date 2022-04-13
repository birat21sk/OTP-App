const {validate} = require('../models/validation')

test('Testing validate API', () => {
    const testRes =[
        {status: "success", error:{message:""}},
        {status: "fail", error:{message:"The code ends with digit '7'."}},
        {status: "fail", error:{message:"The code is not 6 digits."}},
        {status: "fail", error:{message:"Not a number"}}
    ];
    const data = [
        {code : "456859",codeLength:6},
        {code : "962487",codeLength:6},
        {code : "13584",codeLength:6},
        {code : "135a84",codeLength:6}
    ];

    let res;
    for(let i=0;i<4;i++){
        res = validate(data[i]);
        expect(res).toEqual(testRes[i]);
    } 
});