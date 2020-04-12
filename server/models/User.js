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
    default : 'https://raw.githubusercontent.com/Audreyobordelo/LOTX/master/server/public/images/chelovecheck.jpeg',
  },

  items: [ {type:Schema.Types.ObjectId, ref : 'Item'} ],
 

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;