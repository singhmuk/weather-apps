const express = require('express');
const router = express.Router();
const Condition = require('../models/items');

router.post('/', async (req, res) => {
  try {
    const { title, age, list, status, qty, level } = req.body;

    const newCondition = new Condition({ title, age, list, status, qty, level});
    const createdCondition = await newCondition.save();
    res.status(201).json(createdCondition);
  } 
  catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { or, orAnd, level } = req.query;

    let conditions = {};

    if (or) {
      conditions.$or = [{ level: { $in: or } }];
    }

    if (orAnd) {
      conditions.level = { $all: orAnd };
    }

    if (level) {
      conditions.level = level;
    }

    const result = await Condition.find(conditions);
    res.json(result);
  } 
  catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCondition = await Condition.findByIdAndDelete(id);
    if (!deletedCondition) {
      return res.status(404).json({ message: 'Condition not found' });
    }

    res.json({ message: 'Condition deleted' });
  } 
  catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
