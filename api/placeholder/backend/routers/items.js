const express = require('express');
const router = express.Router();
const Items = require('../models/items');

router.post('/', async (req,res) => {
  const newItem = new Items(req.body);
  await newItem.save()
    .then(item => res.json(item));
});

router.delete('/:id', async (req,res) => {
  await Items.findByIdAndDelete(req.params.id)
    .then(() => res.json())
})

router.get('/', async (req,res) => {
  await Items.find()
    .then((item) => res.json(item))
})

router.get('/:id', async (req,res) => {
  await Items.findById(req.params.id)
   .then((item) => res.json(item))
})

// Get by name
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.query;

  await Items.findById(id)
    .then((item) => {
      if (item) {
        if (name && item.name === name) {
          const userData = `
            _Id: ${item._id}
            Name: ${item.name}
            Username: ${item.username}
            Email: ${item.email}
            Address: ${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}
            Geo: ${item.address.geo.lat}, ${item.address.geo.lng}
            Phone: ${item.phone}
            Website: ${item.website}
            Company: ${item.company.name}, ${item.company.catchPhrase}, ${item.company.bs}
          `;
          res.json(userData);
        } else {
          res.json(item);
        }
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
});

// Get by company object values
router.get('/:id/company', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Items.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const companyList = user.company;
    res.json(companyList);
  } catch (error) {
    console.error('Error fetching company list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/allUser', async (req,res) => {
  await Items.findById(req.params.id)
   .then((item) => res.json(item))
})

// Return data if zipcode.length > 6
router.get('/:id/addresses', async (req, res) => {
  const { id } = req.params;

  await Items.findById(id)
    .then((item) => {
      if (item) {
        if (item.address.zipcode.length > 6) {
          res.json(item);
        } else {
          res.json({ address: null });
        }
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });
});
  


module.exports = router;