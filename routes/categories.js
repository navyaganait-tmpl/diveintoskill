const express = require('express');
const categoryController = require('../controllers/category');

const router = express.Router();

router.get('/categories',categoryController.getAllCategories);

router.get('/category/:categoryName', categoryController.getBlogsByCategory);
module.exports = router;