const mongoose = require("mongoose");
const { Schema } = mongoose;

const StateSchema = new Schema({
  name: { type: String, required: true },
  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
});

const StateModel = mongoose.model("State", StateSchema);

module.exports = StateModel;
