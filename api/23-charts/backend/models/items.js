const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  label: {type:String, required:true},
  value: {type:Number, required:true},
})

const Items = mongoose.model('charts', ItemSchema);
module.exports = Items;