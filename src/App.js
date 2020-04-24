import React, { Component } from "react";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";

import "./App.css";
import {Register,Layout,Login,NotFound} from "./components/index";
import { PrivateRoute } from "./Router/index";

function App() {
  return (
   

    <div className="App">
      <Router >
        <Switch>
            <PrivateRoute exact path="/" component={Layout} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />    
            <Route path="*" component={NotFound}/>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
