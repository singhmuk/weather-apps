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

// Add a new comment/recommendation to an item
router.post('/:id/comment', auth, (req, res) => {
  const { comment } = req.body;
  const itemId = req.params.id;

  Item.findByIdAndUpdate(
    itemId,
    { $push: { comments: comment } },
    { new: true }
  )
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json({ success: false, error: err }));
});

// Delete a comment/recommendation from an item
router.delete('/:id/comment/:commentId', auth, (req, res) => {
  const itemId = req.params.id;
  const commentId = req.params.commentId;

  Item.findByIdAndUpdate(
    itemId,
    { $pull: { comments: { _id: commentId } } },
    { new: true }
  )
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json({ success: false, error: err }));
});


module.exports = router;
