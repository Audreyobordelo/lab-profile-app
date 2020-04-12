const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Item =require('../models/Item');
const User =require('../models/User');


router.get('/Lot-products', (req, res, next) => { 

    Product.find() 
      .then(lotProductsFromDB => {
        res.json(lotProductsFromDB); 
      })
      .catch(error => next(error));
  });

router.post('/addItemToUser', (req, res, render) => {
    console.log('REQ BODY', req.body)
    const { productId, /*image, */ description } = req.body;
    const itemToAdd = new Item ({
        owner : req.user._id,
        product : productId,
        //image,
        description,
    });

    itemToAdd.save()
        .then((item) => {
            User.findOneAndUpdate({ _id: req.user._id }, { $push: { items: item._id } })
                .then(() => {
                    User.findById(req.user._id)
                        .populate('items')
                        .then(updatedUser => res.json(updatedUser))
                })
        })
});

module.exports = router;

