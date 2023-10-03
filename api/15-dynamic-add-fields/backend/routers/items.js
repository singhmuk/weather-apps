import express from "express";
const router = express.Router();
import Item from "../models/items.js";

router.post('/', async (req, res) => {
  const newItem = new Item();
  newItem.names = req.body.names; // Access the names array from the request body
  await newItem.save().then((vals)=>res.json(vals));
});

router.get('/', async (req,res) => {
  Item.find()
    .then(item => res.json(item))
})

router.delete('/:id', async (req,res) => {
  await Item.findById(req.params.id)
    .then(item => item.remove()
    .then(() => res.json({success:true})))
})


export default router;