import React from "react"; 
import {Route, Switch} from 'react-router-dom'; 
import Home from "./components/home";
import Success from "./components/success";
import "./App.css";

const App=()=> {
  return ( 
    <Switch>
      <Route path="/success" component={Success}/>
      <Route path="/" component={Home}/>
    </Switch>  
  );
}

export default App;