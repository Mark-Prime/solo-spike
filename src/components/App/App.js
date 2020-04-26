import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/Home'
import Login from '../Login/Login'



class App extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
        </Router>
      </div>
    );
  }
}

export default App;
