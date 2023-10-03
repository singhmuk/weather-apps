import express from "express";
const router = express.Router();
import Item from "../models/items.js";

router.post("/", (req, res) => {
  const newItem = new Item(req.body);
  newItem.save()
    .then(item => res.json(item));
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndRemove(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

export default router;
