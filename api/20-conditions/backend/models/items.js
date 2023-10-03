const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const condSchema = new Schema({
  title: { type: String, required: true },
  age: { type: Number, required: true },
  list: { type: Array, required: true },
  status: { type: String, default: false },
  qty: { type: Number },
  level: [Number],
});

module.exports = mains = mongoose.model('conditions', condSchema);