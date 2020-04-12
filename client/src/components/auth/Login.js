import React from 'react';

import {Link} from 'react-router-dom';

import Popin from '../Popin.js';
import authService from './auth-service.js';

export default class extends React.Component {
  state = {
    username: "",
    password: "",

    error: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();

    authService.login(this.state.username, this.state.password, this.state.error)
      .then(response => {
        this.setState({error: ""});

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
          <h1>Log in</h1>
          
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

          </form>

          <p>

          </p>

          <p>
            <small>If you don't have an account yet, you can create your account <Link to="/signup">here</Link></small>
          </p>
        </>
      )} two={(
        <>
          <p>
            <strong>Hello!!</strong>
            <p>

            </p>
            <span role="img">🏴</span> Welcome back fellow LOT user <span role="img">🏴</span> 
          </p>

          <img src = "https://raw.githubusercontent.com/Audreyobordelo/LOTX/master/client/public/images/we%20are%20running%20to%20a%20higher%20ground.png" alt = 'higher ground'></img>
          
          <p>
            <small>If you login, you agree with all our terms and conditions where we can do whatever we want with the data! <span role="img">😈</span> </small>
            <button className="btn" onClick={this.handleSubmit}>Log in</button>
          </p>
        </>
      )} />
    );
  }
}