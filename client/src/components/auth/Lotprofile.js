import React from 'react';

import Popin from '../Popin.js';
import authService from './auth-service.js';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

 class Lotprofile extends  React.Component {

    state = {
        user: {}
    };

    handleUpload = (event) => {
        let formData = new FormData();
        formData.append('photo', event.target.files[0]);
    
        authService.upload(formData)
          .then(response => {
            this.props.updateUser(response);
          })
        ;
      }
    componentDidMount() {
        axios.get(`http://localhost:5000/findOneUser/${this.props.match.params.id}`)
            .then(response => response.data)
            .then(data => this.setState({user: data}))
    }

  render() {
    const userIsLoaded = Object.keys(this.state.user).length > 0;
    return (
      <>
        {!this.props.user._id ? (
          <Redirect to="/" />
        ) : userIsLoaded && 
            <Popin one={(
                <>
                <h1><span role="img">🏴</span> Fellow LOT user profile <span role="img">🏴</span> </h1>
                
                <p>
                    <em>Username </em>
                    <span>{this.state.user.username}</span>
                </p>
                <p>
                    <em>City </em>
                    <span>{this.state.user.address.city}</span>
                </p>
                <p>
                    <em>Country </em>
                    <span>{this.state.user.address.country}</span>
                </p>
                </>
            )} two={(
                <>
                <form>
                <label>
                  <img className="avatar" src={this.state.user.image} alt=""/>
                 
                </label>
              </form>
                <p>
                </p>
                </>
            )} />
        }
      </>
    );
  }
}

export default withRouter(Lotprofile);