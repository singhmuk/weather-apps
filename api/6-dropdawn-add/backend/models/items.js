import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

const Items = mongoose.model('dropdawn-add', ItemSchema);
export default Items;