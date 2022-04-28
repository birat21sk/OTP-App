import React, {useState, useEffect} from 'react';

const Success = () =>{
    const [number, setNumber] = useState(0);
    const [table, setTable] =  useState([{}]);

    const displayTable = () => {
        let mult = [];

        for(let i=1;i<=10;i++){
            mult.push(
                {
                    num: number,
                    mul: i,
                    result: number*i
                }
            );
        }

        setTable(mult);
    }
 
    useEffect(()=>{
        displayTable();
    },[number]);

    return(
    <React.Fragment>
        <div className="paper mt validation">
            <h1 className="display-4">Validation Success</h1>
        </div>
        <div className="paper mt">
            <div className="container d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "2rem"}}>
                <input name="inp" type="number" onChange={e =>setNumber(e.target.value)}/>
                { table?
                    table.map(({num,mul,result})=> {
                        return (
                            <span>{num}x{mul}:{result}</span>
                        );
                    }) 
                    : null
                }  
            </div>
        </div>
        
    </React.Fragment>
    );
}

export default Success;