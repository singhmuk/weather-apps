const express = require("express");
const router = express.Router();
const Country = require("../models/country");

router.get("/", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const country = new Country({ name });
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const country = await Country.findById(id);
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    country.name = name;
    const updatedCountry = await country.save();

    res.json(updatedCountry);
  } catch (error) {
    res.status(500).json({ error: "Failed to update country name" });
  }
});

module.exports = router;
