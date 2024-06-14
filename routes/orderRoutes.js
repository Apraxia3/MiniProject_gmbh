const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, orderController.create);
router.get('/', authMiddleware, orderController.getAll);
router.get('/product', authMiddleware, orderController.getByProduct);
router.delete('/:id', authMiddleware, orderController.delete);

module.exports = router;
