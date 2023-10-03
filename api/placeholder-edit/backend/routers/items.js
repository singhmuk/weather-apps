const express = require('express');
const router = express.Router();
const Items = require('../models/items');

router.post('/', async (req,res) => {
  const newItem = new Items(req.body);
  await newItem.save()
    .then(item => res.json(item));
});

router.delete('/:id', async (req,res) => {
  await Items.findByIdAndDelete(req.params.id)
    .then(() => res.json())
})

router.get('/', async (req,res) => {
  await Items.find()
    .then((item) => res.json(item))
})

router.get('/:id', async (req,res) => {
  await Items.findById(req.params.id)
   .then((item) => res.json(item))
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  await Items.findByIdAndUpdate(id, updates, { new: true })
    .then((item) => res.json(item))
    .catch((error) => res.status(500).json({ error: 'Unable to update item.' }));
});


module.exports = router;