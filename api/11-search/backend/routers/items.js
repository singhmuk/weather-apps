import express from "express";
const router = express.Router();
import Items from "../models/items.js";

router.post('/', async(req, res) => {
  const newItem = new Items(req.body)
  newItem.save()
    .then(item => res.json(item));
})

router.get('/', (req, res) => {
  const searchTerm = req.query.q; // Assumes the search query is passed as a query parameter
  const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search

  Items.find({ name: regex })
    .then(item => res.json(item))

    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while searching items' });
    });
});

export default router;