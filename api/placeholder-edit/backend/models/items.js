const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  id:{type: Number, required: true},
  name:{type: String, required: true},
  address: {
    street:{type: String, required: true},
    geo: {
      lat:{type: String, required: true},
    },
  },
  phone:{type: String, required: true},
  company: {
    name:{type: String, required: true},
  },
  start:{type:Date, default:Date.now}

},{timestamps:true});

const Items = mongoose.model('itemCurd', ItemSchema);


module.exports = Items;