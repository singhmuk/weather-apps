const mongoose = require("mongoose");
const { Schema } = mongoose;

const CitySchema = new Schema({
  name: { type: String, required: true },
  state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
});

const CityModel = mongoose.model("City", CitySchema);

module.exports = CityModel;
