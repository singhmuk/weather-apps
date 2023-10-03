const express = require('express');
const multer = require('multer');
const Item = require('../models/items');

const router = express.Router();

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Export endpoint
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();

    // Convert items to desired export format (e.g., CSV, Excel)
    // Generate the export file and send it as a response
    // ...
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    const newItem = new Item({
      name,
      price,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } 
  catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Import endpoint
router.post('/files', upload.single('file'), async (req, res) => {
  try {
    // Parse the imported file and handle the data
    const importedData = parseImportedFile(req.file.buffer);

    // Save the imported data to the database
    await Item.insertMany(importedData);

    res.json({ message: 'Import successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
