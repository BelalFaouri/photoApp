import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './components/login'
import SignupPage from './components/signup'
import HomePage from './components/home'

class App extends Component {
  componentDidMount(){
  
  }
  render() {

    return (
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/signup' component={SignupPage}/>
          <Route path ='/user' component={SignupPage}/>
        </Switch>

    </Router>
    );
  }
}

export default App;
