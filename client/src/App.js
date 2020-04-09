import React, { Component } from 'react';
import './App.scss';

import {Switch, Route} from 'react-router-dom';
import {Link, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Landingpage from './components/auth/Landingpage.js';
import Signup from './components/auth/Signup.js';
import Login from './components/auth/Login.js';
import Profile from './components/auth/Profile.js';
import Homepage from './components/auth/Homepage.js';
import Lotprofile from './components/auth/Lotprofile.js';


import authService from './components/auth/auth-service.js';

class App extends Component {
  state = {
    user: {}
  }

  fetchUser = () => {
    if (!this.state.user._id) {
      authService.loggedin()
        .then(data => this.setState({user: data}))
        .catch(err => this.setState({user: {}}))
      ;
    } else {
      console.log('user already in the state')
    }
  };

  updateUser = (data) => {
    this.setState({user: data});
  };

  componentDidMount() {
    this.fetchUser();
  };

  handleLogout = () => {
    authService.logout()
    .then(() => {
      this.updateUser({});
      this.props.history.push('/');
    }) ;
  }

  render() {
    return (


      <Route render={props => (
        <div className="App" data-route={props.location.pathname}> {/* data-route="/" allow us to style pages */}

         { this.state.user._id && (
            <nav className='navbar'>
              <Link to="/profile">Profile </Link>
              <Link to="/homepage">Home </Link>
              <button onClick= {this.handleLogout}>Logout </button>
            </nav>
         )} 
          

          <Switch>

            <Route exact path="/" render={(props) => (
              <Landingpage user={this.state.user} />
            )} />

            <Route exact path="/homepage" render={(props) => (
              <Homepage user={this.state.user} />
            )} />

            <Route exact path="/signup" render={(props) => (
              <Signup updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/login" render={(props) => (
              <Login updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/profile" render={(props) => (
              <Profile user={this.state.user} updateUser={this.updateUser} history={props.history} />
            )} />

            <Route exact path="/lotprofile/:id" render={(props) => {
              return <Lotprofile user={this.state.user} history={props.history} />
            }} />

            {/* last route, ie: 404 */}
            <Route render={() => (<h1>Not Found</h1>)} />
          </Switch>
        </div>
      )} />
    );
  }
}

export default withRouter(App);
