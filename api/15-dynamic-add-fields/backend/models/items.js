import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  names: [{ type: String, required: true }],
})

const Items = mongoose.model('dynamicadd', ItemSchema);
export default Items;