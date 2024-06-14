const express = require('express');
const router = express.Router();
const userReportProductController = require('../controllers/userReportProductController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, userReportProductController.create);
router.get('/', authMiddleware, userReportProductController.getAll);
router.get('/:id', authMiddleware, userReportProductController.getById);
router.delete('/:id', authMiddleware, userReportProductController.delete);

module.exports = router;
