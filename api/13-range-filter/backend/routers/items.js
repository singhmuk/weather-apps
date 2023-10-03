const express = require('express');
const router = express.Router();
const Item = require('../models/items');

router.get('/', async (req, res) => {
  try {
    const { minPrice, maxPrice, startDate, endDate, categories } = req.query;
    let query = {};

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }

    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    if (categories && categories.length > 0) {
      query.category = { $in: categories };
    }

    const items = await Item.find(query);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, price, date, category } = req.body;
    const newItem = new Item({ name, price, date, 
      category: category.map(option => option.value)
     });
    await newItem.save()
      .then(item => res.json(item))
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
