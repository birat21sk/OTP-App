import React from "react"; 
import {Route, Switch} from 'react-router-dom'; 
import Home from "./components/home";
import Success from "./components/success";
import "./App.css";

const App=()=> {
  return (
     <React.Fragment>
       {/* <Home/> */}
       <div className="content">
         <Switch>
          <Route path="/success" component={Success}/>
          <Route path="/" component={Home}/>
         </Switch>
       </div>
     </React.Fragment>
  );
}

export default App;