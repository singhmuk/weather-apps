const express = require('express');
const router = express.Router();
const Items = require('../models/items');

router.post('/', async (req,res) => {
  const newItem = new Items(req.body);
  await newItem.save()
    .then(item => res.json(item));
});

router.get('/', async (req,res) => {
  await Items.find()
    .then((item) => res.json(item))
})

router.delete('/:id', async (req,res) => {
  await Items.findByIdAndDelete(req.params.id)
    .then(()=>res.json({message:'success'}))
})

router.put('/:id', async (req, res) => {
  await Items.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    address: req.body.address,
  },{new:true})
    .then((item)=>res.json(item))
})

//API GET request that accepts a name as a parameter and returns the _id and address
router.get('/:name', async (req,res) => {
  const name=req.params.name;
  await Items.findOne({name}, '_id, address')
    .then(item => res.json(item))
})

module.exports = router;