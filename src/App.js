import React, { Component } from "react";
// import  {Router}  from 'react-router-dom';
import "./App.css";
import UserLogin from "../src/operations/userLogin";
import AdminHome from "./operations/adminHome";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import UserRegister from "./operations/userRegister";
import OperatorHome from "./operations/operatorHome";
import PendingList from "./operations/pendingList";
import PersonHome from "./operations/personHome";
import PersonPendingList from "./operations/pendingPersonList";
import PersonUpdateHome from "./operations/personUpdateHome";

const history = createBrowserHistory();
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={UserLogin}/>
          <Route exact path="/adminhome" component={AdminHome} />
          <Route exact path="/userregister" component={UserRegister} />
          <Route exact path="/operatorhome" component={OperatorHome} />
          <Route exact path="/pendinglist" component={PendingList} />
          <Route exact path="/personhome" component={PersonHome} />
          <Route exact path="/personupdatehome" component={PersonUpdateHome} />
          <Route exact path="/personpendinglist" component={PersonPendingList}  />
        </Switch>
      </Router>
    );
  }
}

export default App;

{
  /* <BrowserRouter>
      <UserLogin/>  
      <div>
        <Route exact path='/PPPP' component={UserLogin}/>
      </div>    
    </BrowserRouter> */
}
