const express = require("express");
const router = express.Router();
const Country = require("../models/country");
const State = require("../models/state");
const City = require("../models/city");

router.post("/", async (req, res) => {
  try {
    const { countryId, stateId, cityId } = req.body;

    // Find the selected country
    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    // Find the selected state
    const state = await State.findById(stateId);
    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }

    // Find the selected city
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    // Create an object to store the selected data
    const selectedData = {
      country: country.name,
      state: state.name,
      city: city.name,
    };

    await selectedData.save();
    res.status(200).json({ message: "Data saved successfully", data: selectedData });
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

module.exports = router;
