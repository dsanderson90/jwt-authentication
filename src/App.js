import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Secret from './Secret';
import Login from './Login';

export default class App extends Component {
  render() {
  return (
    <div className="App">
 <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/secret" component={Secret} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
    </div>
  );
  }
}