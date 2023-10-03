import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {type:String, required:true},
  description: {type:String, required:true}
})

const Items = mongoose.model('search', ItemSchema);
export default Items;