const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, productController.create); // Creating requires authentication
router.post('/products', authMiddleware, productController.createMultiple);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.put('/', authMiddleware, productController.update); // Updating requires authentication
router.delete('/', authMiddleware, productController.delete); // Deleting requires authentication

module.exports = router;
