const express = require('express');
const { addCategory, updateCategory, deleteCategory, getCategories, getCategory } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', addCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('/:id', getCategory);
router.get('/', getCategories);

module.exports = router;