const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: {type:String, required:true},
  content: {type:String, required:true},
  inputFields: {type:[String], default:[]},
})

const Items = mongoose.model('dynamicAdd', ItemSchema);
module.exports = Items;