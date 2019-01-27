import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import NavBar from './components/NavBar';
import Index from './components/Index';
import Details from './components/Details';
import MyPokemon from './components/MyPokemon';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route path="/details/:id" component={Details} />
            <Route path="/mypokemon" component={MyPokemon} />
            <Route path="/" component={Index} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
