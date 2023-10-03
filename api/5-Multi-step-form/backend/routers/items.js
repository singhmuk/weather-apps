import express from "express";
const router = express.Router();
import Items from "../models/items.js";

router.post('/', async(req, res) => {
  const newItem = new Items(req.body)
  newItem.save()
    .then(item => res.json(item));
})

router.get('/', async (req, res) => {
  Items.find()
    .then(item => res.json(item))
})

router.delete('/:id', async (req,res) => {
  await Items.findById(req.params.id)
    .then(item => item.remove()
    .then(() => res.json({success:true})))
})

router.put('/:id', async (req, res) => {
  const { username, email, password, firstName, lastName, address, phone, food } = req.body;
  
  try {
    const updatedItem = await Items.findByIdAndUpdate(
      req.params.id,
      { username, email, password, firstName, lastName, address, phone, food },
      { new: true }
    );
    res.json(updatedItem);
  } 
  catch (err) {
    res.status(500).json({ err: 'Failed to update item' });
  }
});

export default router;