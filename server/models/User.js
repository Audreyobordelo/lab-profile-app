const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,

  address: {
    city: String,
    country: String,
  },

  subscription: {
    type: String,
    enum: ['regular', 'experience', 'universe'],
  },

  image : { 
    type: String, 
    default : '../public/images/chelovecheck.jpeg',
  },

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;