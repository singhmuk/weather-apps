const express = require('express');
const router = express.Router();
const Data = require('../models/items');

router.post('/', async (req, res) => {
  try {
    const { label, value } = req.body;

    if (!label) {
      return res.status(400).json({ message: 'Label is required' });
    }

    const newData = new Data({ label, value });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
