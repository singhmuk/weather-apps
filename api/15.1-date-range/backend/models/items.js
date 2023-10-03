const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {type:String, required:true},
  price: {type:Number, required:true},
  startDate: {type:Date, required:true},
  endDate: {type:Date, required:true},
})

const Items = mongoose.model('dateRange', ItemSchema);
module.exports = Items;