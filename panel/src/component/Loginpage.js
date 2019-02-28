import React, { Component } from 'react';
import './Loginpage.css';
import Axios from 'Axios';
class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

   
    Axios.post('//localhost:3000/authentication',{id:id}).then(res=>{
        console.log(res);
         this.setState({comment:res.data.comment,article:res.data.article,waite:false,user:res.data.user});
         console.log(res.data.user)
        
    })
     ;
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {


    return (
      <div className="Login back">
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          <label className="text ">User Name</label>
          <br/>
          <input className="inputsize" type="text " data-test="username" value={this.state.username} onChange={this.handleUserChange} />
         <br/>
          <label className="text">Password</label>
          <br/>
          <input className="inputsize" type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
          <br/>
          <input  className=" input" type="submit" value="Log In" data-test="submit" />

        </form>
      </div>
    );
  }
}

export default LoginPage;