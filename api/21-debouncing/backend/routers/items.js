const express = require("express");
const router = express.Router();
const Item = require("../models/items");


router.get("/", async (req, res) => {
  const { price } = req.query;
  const title = req.query.q; 
  const regex = new RegExp(title, 'i');
  
    await Item.find({
      title: regex,
      price: { $lte: price }
    })
    .then(item => res.json(item))
});

router.post("/", async (req, res) => {
  const newItem = new Item(req.body)
    await newItem.save();
    res.status(201).json(newItem);
});

module.exports = router;
