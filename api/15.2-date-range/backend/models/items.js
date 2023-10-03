import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
})

const Items = mongoose.model('datepiker', ItemSchema);
export default Items;