import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  username: {type:String, required:false},
  email: {type:String, required:false},
  password: {type:String, required:false},
  firstName: {type:String, required:false},
  lastName: {type:String, required:false},
  address: {type:String, required:false},
  phone: {type:Number, required:false},
  food: {type:String, required:false},
})

const Items = mongoose.model('multiStep', ItemSchema);
export default Items;