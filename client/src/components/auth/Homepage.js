import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

import Popin from '../Popin.js';



class UserList extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get('http://localhost:5000/Lot-users')
      .then(response => response.data)
      .then(data => this.setState({users: data}))

  }

  sortByNameHandler = () => {
    this.setState({
      users: [...this.state.users].sort(function (a, b) {
        return a.username.localeCompare(b.username);
      })
    })
  }

  sortByCityHandler = () => {
    this.setState({
      users: [...this.state.users].sort(function (a, b) {
        return a.address.city.localeCompare(b.address.city);
      })
    })
  }

  sortByCountryHandler = () => {
    this.setState({
      users: [...this.state.users].sort(function (a, b) {
        return a.address.country.localeCompare(b.address.country);
      })
    })
  }

  render() {
  //  if (this.state.users.length < 1) return <Loader>loading users list...</Loader>

    return (
      <div className="UserList">
        <h1>Fellow LOT users</h1>

        <p>
          <button onClick={this.sortByNameHandler}>Sort by name</button>
          <button onClick={this.sortByCityHandler}>Sort by city</button>
          <button onClick={this.sortByCountryHandler}>Sort by country</button>
        </p>

        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Username</th>
              <th>City</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user._id}>
                <td>
                  <img src={user.image} alt="" />
                </td>
                <td>
                 <strong><Link to={`/lotprofile/${user._id}`}>{user.username}</Link></strong>
                </td> 
                <td>{user.address.city}</td>
                <td>{user.address.country}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
