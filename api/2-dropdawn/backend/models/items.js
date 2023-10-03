import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {type:String, required:true},
  address: {type:String, required:true},
  country: { type: String, enum: ["India", "USA", "UK"], required: true }, 
  date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Items = mongoose.model('dropdawnbtn', ItemSchema);
export default Items;