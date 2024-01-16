const express = require('express');
const router = express.Router();
const subscribeController = require('../controllers/subscribe'); 

// Route to handle subscribe POST requests
router.post('/subscribe', subscribeController.subscribe);

module.exports = router;