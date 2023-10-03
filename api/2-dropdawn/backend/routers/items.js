import express from "express";
const router = express.Router();
import Item from "../models/items.js";

router.post('/', async (req,res) => {
  const newItem = new Item(req.body)
  newItem.save()
    .then(item => res.json(item))
})

router.get('/', async (req,res) => {
  Item.find()
    .then(item => res.json(item))
})

router.get('/:id', async (req,res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
})

router.delete('/:id', async (req,res) => {
  await Item.findById(req.params.id)
    .then(item => item.remove()
    .then(() => res.json({success:true})))
})

router.put('/:id', async (req,res) => {
  await Item.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    address: req.body.address,
    country: req.body.country,  //Radio
  }, {new:true})
    .then(item => res.json(item))
})

export default router;