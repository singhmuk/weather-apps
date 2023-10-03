const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {type:String, required:true},
  price: {type:String, required:true},
  date: {type:Date, required:true},
  category: {type:[String], required:true},
})

const Items = mongoose.model('rangeFilter', ItemSchema);
module.exports = Items;