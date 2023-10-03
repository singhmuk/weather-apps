import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Items = mongoose.model('infinie-scroll', ItemSchema);
export default Items;