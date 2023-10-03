const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  address: {type:String, required:true},
  date: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

module.exports = Item = mongoose.model('items', ItemSchema);
