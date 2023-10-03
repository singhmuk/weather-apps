const express = require('express');
const router = express.Router();
const Items = require('../models/items');

router.get('/', async (req, res) => {
    const { name, price } = req.query;
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (price) {
      const priceRange = price.split('-');
      if (priceRange.length === 2) {
        filter.price = { $gte: parseInt(priceRange[0]), $lte: parseInt(priceRange[1]) };
      }
    }

    const items = await Items.find(filter);
    res.json(items);
});

router.post('/', async (req, res) => {
  const newItem = new Items(req.body)
    await newItem.save();
    res.status(201).json(newItem);
});

module.exports = router;
