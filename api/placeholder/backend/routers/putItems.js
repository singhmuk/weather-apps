const express = require('express');
const router = express.Router();
const Items = require('../models/items');

router.put('/:id/zipcode', async (req, res) => {
  const { id } = req.params;
  const { zipcode } = req.body;

  try {
    const item = await Items.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'User not found' });
    }

    item.address.zipcode = zipcode;
    await item.save();

    res.json({ message: 'Zipcode updated successfully' });
  } catch (error) {
    console.error('Error updating zipcode:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;