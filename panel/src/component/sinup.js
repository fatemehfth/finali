import React, { Component } from 'react';
import './Loginpage.css';
import Axios from 'Axios';
class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
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
    
    if (!this.state.email) {
        return this.setState({ error: 'email is required' });
      }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    return this.setState({ error: '' });
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
          <label className="text ">User Name:</label>
          <br/>
          <input className="inputsize" type="text " data-test="username" value={this.state.username} onChange={this.handleUserChange} />
         <br/>
          <label className="text">Password:</label>
          <br/>
          <label className="text ">Email:</label>
          <br/>
          <input className="inputsize" type="email" data-test="email" value={this.state.email} onChange={this.handleUserChange} />
          <br/>
          <input className="inputsize" type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
          <br/>
          <input  className=" input" type="submit" value="Log In" data-test="submit" />

        </form>
      </div>
    );
  }
}

export default signup;