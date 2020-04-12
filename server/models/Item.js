const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const itemSchema = new Schema({
  owner:  { type: Schema.Types.ObjectId, ref: 'User' },
  product: {type : Schema.Types.ObjectId, ref : 'Product'},
//   image: String,
  description: String,

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
