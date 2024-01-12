const express = require('express');
const blogController = require('../controllers/blogs');

const router = express.Router();

// Route to get all posts
router.get('/blogs',blogController.getAllBlogs);

router.get('/limited-blogs', blogController.getLimitedBlogs);

router.get('/blogs/:id', blogController.getBlogById);

module.exports = router;