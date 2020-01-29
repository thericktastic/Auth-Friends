import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/PrivateRoute";

// styling
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Switch>
            <PrivateRoute exact path="/protected" component={FriendsList}/>
            <Route path="/login" component={Login} />
            <Route component={Login} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
