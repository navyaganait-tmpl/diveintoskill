const express = require('express');
const blogController = require('../controllers/blogs');

const router = express.Router();

// Route to get all posts
router.get('/blogs',blogController.getAllBlogs);

router.get('/blogs/:id', blogController.getBlogById);

router.get('/blogs/related/:id', blogController.getRelatedBlogs);

router.get('/limited-blogs', blogController.getLimitedBlogs);

router.get('/similar/:searchTerm', blogController.getSimilarBlogs);

module.exports = router;