const express = require('express');
const router = express.Router();
const Item = require("../models/items.js");


router.post('/', async (req, res) => {
  const { name, category, price } = req.body;

  try {
    const newItem = new Item({ name, category, price});
    await newItem.save()
      .then(item => res.json(item))
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/', async (req, res) => {
  const { category, price, sort } = req.query;

  try {
    let query = {};

    // Construct MongoDB query based on the received filters
    if (category) {
      query = { ...query, category };
    }
    if (price) {
      query.price = { $lte: parseInt(price) };
    }

    // Apply sorting based on the specified criteria
    let sortOptions = {};
    if (sort === 'price_asc') {
      sortOptions = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOptions = { price: -1 };
    }

    // Execute the query and apply sorting
    const filteredData = await Item.find(query).sort(sortOptions);
    res.json(filteredData);
  } 
  catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;