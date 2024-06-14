const express = require('express');
const router = express.Router();
const userReportUserController = require('../controllers/userReportUserController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, userReportUserController.create);
router.get('/', authMiddleware, userReportUserController.getAll);
router.get('/:id', authMiddleware, userReportUserController.getById);
router.delete('/:id', authMiddleware, userReportUserController.delete);

module.exports = router;
