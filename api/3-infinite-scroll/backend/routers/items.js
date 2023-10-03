import express from "express";
const router = express.Router();
import Items from "../models/items.js";

router.post('/', async(req, res) => {
  const newItem = new Items(req.body)
  newItem.save()
    .then(item => res.json(item));
})

router.get("/", async (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const skip = (page - 1) * size;

    const total = await Items.countDocuments();
    const users = await Items.find().skip(skip).limit(size);

    res.json({ users, total, page, size });
});

export default router;