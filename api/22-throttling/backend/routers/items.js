const express = require("express");
const router = express.Router();
const Item = require("../models/items");

router.get("/", async (req, res) => {
  const { title, price } = req.query;
  try {
    const items = await Item.find({
      title: new RegExp(title, "i"),
      price: { $lte: price }
    });
    res.json(items);
  } 
  catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { title, price } = req.body;
  try {
    const newItem = new Item({ title, price });
    await newItem.save();
    res.status(201).json(newItem);
  } 
  catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
