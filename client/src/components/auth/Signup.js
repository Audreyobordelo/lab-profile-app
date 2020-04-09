import React from 'react';

import {Link} from 'react-router-dom';

import Popin from '../Popin.js';
import authService from './auth-service.js';

export default class extends React.Component {
  state = {
    username: "",
    password: "",
    city: "",
    country: "",
    subscription: "",
    error: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, city, country, subscription } = this.state;

    // 1. Signup
    authService.signup(username, password, city, country, subscription)
      .then(response => {
            this.props.updateUser(response);
            this.props.history.push('/homepage');
      })
      .catch(err => this.setState({error: err.response.data.message}))
    ;
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  } 

  render() {
   
    return (
      <Popin one={(
        <>
          <h1>Sign up</h1>
          
          <form onSubmit={this.handleSubmit}>

            {this.state.error && (
              <p className="error">{this.state.error}</p>
            )}

            <p>
              <label>
                <em>Username</em>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
              </label>
            </p>

            <p>
              <label>
                <em>Password</em>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
              </label>
            </p>

            <p>
              <label>
                <em>City</em>
                <input type="city" name="city" value={this.state.city} onChange={this.handleChange} />
              </label>
            </p>

            <p>
              <label>
                <em>Country</em>
                <input type="country" name="country" value={this.state.country} onChange={this.handleChange} />
              </label>
            </p>

            <p>
              <label>
                <em>Subscription</em>
                <select name="subscription" value={this.state.subscription} onChange={this.handleChange}>
                  <option value=""></option>
                  <option value="regular">Regular</option>
                  <option value="experience">Experience</option>
                  <option value="universe">Universe</option>
                </select>
              </label>
            </p>

          </form>

          <p>
            <small>If you already have an account, you can login from <Link to="/login">here</Link></small>
          </p>

        </>
      )} two={(
        <>
          <p>
            <strong>Hello!!</strong>
            Welcome to LOTX
          </p>
          
          <p>
            <small>If you signup, you agree with all our terms and conditions where we can do whatever we want with the data!</small>
            <button className="btn" onClick={this.handleSubmit}>Create the account</button>
          </p>
        </>
      )} />
    );
  }
}