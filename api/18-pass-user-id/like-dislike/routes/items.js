const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Item = require('../models/Item');


router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.post('/', auth, (req, res) => {
  const newItem = new Item(req.body);

  newItem.save().then(item => res.json(item));
});

router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

router.put('/:id', auth, (req, res) => {
  Item.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    address: req.body.address,
  }, {new:true})
    .then((items) => res.json(items))
})

router.put('/:id/like', auth, (req, res) => {
  const userId = req.user.id;
  Item.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: userId }, $pull: { dislikes: userId } },
    { new: true }
  )
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

router.put('/:id/dislike', auth, (req, res) => {
  const userId = req.user.id;
  Item.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { dislikes: userId }, $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});


module.exports = router;
