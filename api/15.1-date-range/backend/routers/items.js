const express = require('express');
const router = express.Router();
const Item = require('../models/items');

router.post('/', async (req, res) => {
  try {
    const { name, price, startDate, endDate } = req.body;

    // Perform date range validation
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({ message: 'End date must be greater than start date' });
    }

    const newItem = new Item({ name, price, startDate, endDate});

    await newItem.save();
    res.status(201).json(newItem);
  } 
  catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } 
  catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
