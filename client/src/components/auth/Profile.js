import React from 'react';

import Popin from '../Popin.js';
import authService from './auth-service.js';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// create a form to add a new product, above the owned products list
// create the select to choose a product from the list
// create the field for description
// create the submit method
// the submit method will use axios to call our backend route
// it must provide the information contained in the form

export default class extends React.Component {
  
  state = {
    products: [],
    productId: '',
    description: '',
  };

  componentDidMount() {
    axios.get('http://localhost:5000/Lot-products')
      .then(response => response.data)
      .then(data => this.setState({products: data}))

  }
 
  logout = (event) => {  
    authService.logout()
      .then(response => {
        this.props.updateUser(false);
      })
    ;
  }

  handleUpload = (event) => {
    let formData = new FormData();
    formData.append('photo', event.target.files[0]);

    authService.upload(formData)
      .then(response => {
        this.props.updateUser(response);
      })
    ;
  }
  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  } 
 
  handleSubmit = event => {
    event.preventDefault();
    const service = axios.create({
      baseURL: `${process.env.REACT_APP_APIURL  || ""}`,
      withCredentials: true
    });
    service.post('/addItemToUser', {
      productId: this.state.productId,
      description: this.state.description,
    })
      .then(response => response.data)
      .then(data => this.props.updateUser(data))
  }



  render() {
    console.log(this.state);
    return (
    
      <>
        {!this.props.user._id ? (
          <Redirect to="/" />
        ) : (
          <Popin one={(
            <>
              <h1><span role="img">🏴</span> Your LOTX profile <span role="img">🏴</span> </h1>

              <form>
                <label>
                  <img className="avatar" src={this.props.user.image} alt=""/>
                  <input type="file" name="image" onChange={this.handleUpload} />
                </label>
              </form>
              
              <p>
                <em>Username</em>
                <span>{this.props.user.username}</span>
              </p>
              <p>
                <em>City</em>
                <span>{this.props.user.address.city}</span>
              </p>
              <p>
                <em>Country</em>
                <span>{this.props.user.address.country}</span>
              </p>
              <p>
                <em>Subscription</em>
                <span>{this.props.user.subscription}</span>
              </p>
    
              
            </>
          )} two={(
            <>
            <div className='LotProducts'>
                <h1>Your LOT products</h1>

                {/*  <select>
                    <option name='Please select an item' value='' />
                    {this.state.products.map(product => {
                      return <option name={product.name} value={product._id} />
                    })}
                  </select> */}


                <form onSubmit={event => this.handleSubmit(event)}>

                  {this.state.error && (
                    <p className="error">{this.state.error}</p>
                  )}

                  <select name='productId' onChange={this.handleChange}>
                    <option value=''>Please select an item</option>
                    {this.state.products.map(product => {
                      return <option value={product._id}>{product.number + ' - ' + product.name}</option>
                    })}
                  </select>

                 
                  <label>
                    <em>Description</em>
                    <input type='texarea' name="description" value={this.state.description} onChange={this.handleChange} />
                  </label>
               
                  <button className="btn">Add the item to your list</button>

                </form> 

                <table>
                  <thead>
                    <tr>
                      <th>LOT#</th>
                      <th>Name</th>
                      <th>Link</th>
                      <th>Desciption</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.user.items.map(item => (
                      <tr key={item._id}>
                        <td>{item.number}</td>
                        <td>{item.name}</td>
                        <td>{item.link}</td>
                        <td>{item.description}</td>
                      </tr> 
                    ))}
                  </tbody>
                </table>
    
            </div> 
            </>
          )} />
        )}
      </>
    );
  }
}