const express = require('express');

// Import necessary modules
const router = express.Router();

router.get('/', (req, res) => {
    // Render the root page with a description and buttons
    res.render('index', {
    });
  });

// Export the router
module.exports = router;