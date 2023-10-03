const mongoose = require("mongoose");
const { Schema } = mongoose;

const CountrySchema = new Schema({
  name: { type: String, required: true },
});

const CountryModel = mongoose.model("Country", CountrySchema);

module.exports = CountryModel;
