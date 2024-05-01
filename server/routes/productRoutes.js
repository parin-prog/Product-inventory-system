const express = require('express');
const { addProduct, updateProduct, deleteProduct, getProducts, getProduct, getProductCategories } = require('../controllers/productController');

const router = express.Router();

router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/categories/:id', getProductCategories);

module.exports = router;
