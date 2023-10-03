const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  address: {type:String, required:true},
  image: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = Item = mongoose.model('items', ItemSchema);
