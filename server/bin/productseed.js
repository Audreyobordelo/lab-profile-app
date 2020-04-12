// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
 
const mongoose = require("mongoose");
const Product = require("../models/Product");
const json = require('./../products.json');

mongoose
    .connect('mongodb://localhost/lotx', { useNewUrlParser: true })
    .then(() => {
    console.log('Connected to Mongo!')
    })
    .catch(err => {
    console.error('Error connecting to mongo', err)
    });

Product.create(json)
    .then(() => {
        console.log( `Successfully created ${ json.length } products!` )
    })
    .catch(( err ) => {
        next( err );
    });