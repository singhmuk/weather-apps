const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {type:String, required:true},
  price: {type:Number, required:true},
})

const Items = mongoose.model('serverFilter', ItemSchema);
module.exports = Items;