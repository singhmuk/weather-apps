import express from "express";
const router = express.Router();
import Items from "../models/items.js";

router.post("/", async (req, res) => {
    const newItem = new Items(req.body);
    await newItem.save()
      .then(item => res.json(item))
});

router.get("/", async (req, res) => {
    await Items.find()
      .then(item => res.json(item))
  
});

export default router;
