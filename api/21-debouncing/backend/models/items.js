const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true }
})

const Items = mongoose.model('debouncing', ItemSchema);
module.exports = Items;