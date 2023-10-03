import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  selectedValue: { type: String, required: true },
  date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Items = mongoose.model('saveDropdawn', ItemSchema);
export default Items;