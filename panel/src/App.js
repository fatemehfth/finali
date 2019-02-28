import React, { Component } from 'react';
import{user,signup,login} from '../pages';
import './App.css';
import{
  BrowserRouter as  Router,
  Route}
  from 'react-router-dom';

class App extends Component {
  render() {
    return (
     
        <Router>
       <>
        <Route exact path='/' component={login}/>
        <Route  path='/signup' component={signup}/>
        <Route  path='/user' component={user}/>
        </>
        </Router>
        
      
    );
  }
}

export default App;
