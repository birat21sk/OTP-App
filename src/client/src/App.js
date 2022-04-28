import React, {Component} from "react";  
import {Route, Switch} from 'react-router-dom'; 

import "./App.css";
import Home from "./pages/Home";
import Success from "./pages/Success"; 

class App extends Component {
  render() { 
    return (
      <Switch>
        <Route path="/success" component={Success}/>
        <Route path="/" component={Home}/>
      </Switch>
    )
  }
} 

export default App;