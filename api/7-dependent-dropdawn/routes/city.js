const express = require("express");
const router = express.Router();
const City = require("../models/city");

router.get("/:stateId", async (req, res) => {
  try {
    const cities = await City.find({ state: req.params.stateId });
    res.json(cities);
  } 
  catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, stateId } = req.body;
    const city = new City({ name, state: stateId });
    await city.save();
    res.status(201).json(city);
  } 
  catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const city = await City.findById(id);

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    city.name = name;
    const updatedCity = await city.save();

    res.json(updatedCity);
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to update city name" });
  }
});

module.exports = router;
