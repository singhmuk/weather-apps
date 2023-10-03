import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  selectedValues: { type: [String], required: true },
  date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Items = mongoose.model('multiSelect', ItemSchema);
export default Items;