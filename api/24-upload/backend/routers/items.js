const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

// File filter for allowed file types
const fileFilter = function (req, file, cb) {
  const allowedFileTypes = ['.zip', '.jpg', '.jpeg', '.png', '.mp4'];
  const extension = path.extname(file.originalname);
  if (allowedFileTypes.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type.'));
  }
};

// Set up multer upload instance
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Handle file upload route
router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    // File uploaded successfully
    const filePath = req.file.path;
    res.json({ filePath });
  } else {
    // No file provided or file type not allowed
    res.status(400).json({ message: 'Invalid file.' });
  }
});

module.exports = router;
