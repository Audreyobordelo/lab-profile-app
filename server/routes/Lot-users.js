const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

router.get('/Lot-users', (req, res, next) => { 

    User.find()
      .then(lotUsersFromDB => {
        res.json(lotUsersFromDB);
      })
      .catch(error => next(error));
  });

router.get('/findOneUser/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
  .populate('items')
  .then(fellowLotUser => {
    res.json(fellowLotUser);
  })
  .catch(error => next(error));
});




module.exports = router;