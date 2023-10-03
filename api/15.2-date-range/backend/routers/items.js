import express from "express";
const router = express.Router();
import DateModel from "../models/items.js";

router.post("/", async (req, res) => {
    const date = new DateModel(req.body);
      date.save().then(item => res.json(item))
});

router.get("/", async (req, res) => {
    await DateModel.find()
      .then((item)=>res.json(item));
});


export default router;