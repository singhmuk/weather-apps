import express from "express";
const router = express.Router();
import Items from "../models/items.js";

router.post("/", async (req, res) => {
  const newItem = new Items({
    text: req.body.text,
    title: req.body.title,
  });

  const post = await newItem.save();
  res.json(post);
});

router.get("/", async (req, res) => {
  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const total = await Items.countDocuments({});
  const posts = await Items
    .find({})
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);

  res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    posts,
  });
});

export default router;