import express from "express";
const router = express.Router();
import Items from "../models/items.js";


router.post("/", async (req, res) => {
    const newData = new Items(req.body);
    await newData.save()
      .then(item => res.json(item))
});

router.get("/", async (req, res) => {
  try {
    await Items.find()
      .then(item => res.json(item))
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.put("/:id", async (req, res) => {
    await Items.findByIdAndUpdate(req.params.id, req.body,
      { new: true })
      .then(item => res.json(item))
});

router.delete("/:id", async (req, res) => {
    await Items.findByIdAndDelete(req.params.id)
      .then(item => item.remove()
      .then(() => res.json({success:true})))
});

export default router;