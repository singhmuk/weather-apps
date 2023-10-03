const express = require('express');
const router = express.Router();

// Mock data for suggestions (replace with your actual data source or database query)
const suggestions = [
  'Apple',
  'Banana',
  'Cherry',
  'Grape',
  'Lemon',
  'Orange',
  'Peach',
  'Strawberry',
  'Watermelon',
];

// API endpoint for fetching suggestions based on user input
router.get('/suggestions', (req, res) => {
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().startsWith(req.query.query.toLowerCase())
  );
  res.json(filteredSuggestions);
});

module.exports = router;
