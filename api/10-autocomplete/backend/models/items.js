const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: {type:String, required:false},
  content: {type:String, required:false},
  inputFields: {type:[String], default:[]},
  suggestions: { type: [String], default: [] },
})

const Items = mongoose.model('autocomplate', ItemSchema);
module.exports = Items;