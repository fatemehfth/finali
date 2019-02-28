import React, { Component } from 'react';

import './App.css';


import SearchAppBar from './component/App Bar'
import LoginPage from './component/Loginpage'



class App extends Component {
  
  render() {
    
    return (
      <div className="App">
      

        <div>
           <SearchAppBar>
         </SearchAppBar>
        </div>

      <div>
         <LoginPage>
         </LoginPage>

      </div>
         </div>


     
    );
  }
}



export default login;
