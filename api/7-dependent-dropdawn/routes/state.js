const express = require("express");
const router = express.Router();
const State = require("../models/state");

router.get("/", async (req, res) => {
  try {
    const states = await State.find({ country: req.params.countryId });
    res.json(states);
  } 
  catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:countryId", async (req, res) => {
  try {
    const states = await State.find({ country: req.params.countryId });
    res.json(states);
  } 
  catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, countryId } = req.body;
    const state = new State({ name, country: countryId });
    await state.save();
    res.status(201).json(state);
  } 
  catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const state = await State.findById(id);
    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }

    state.name = name;
    const updatedState = await state.save();
    res.json(updatedState);
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to update state name" });
  }
});

module.exports = router;
