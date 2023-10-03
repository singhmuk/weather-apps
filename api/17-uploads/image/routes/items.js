const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Item = require('../models/Item');
const upload = require('./uploads');


router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.post('/', auth, upload.single('image'), (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    address: req.body.address,
    image: req.file.filename
  });

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

module.exports = router;
