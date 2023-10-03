import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  text: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Items = mongoose.model('paginations', ItemSchema);
export default Items;